var lettersList = "abcdefghijklmnopqrstuvwxyz".split("");
var startingKeyCode = 97;
var intervalIds = [];
var numScoreIncremented = 0;
var newLetterInterval = 1000;

var clearAllIntervals = function(){
  //Go through array of intervals ids and clear them
  intervalIds.forEach(function(id){
    clearInterval(id);
  });
}

var GameComponent = React.createClass({
  getInitialState: function(){
    return {
      score: 0,
      letters: []
    };
  },
  componentDidMount: function(){
    //Start generating random letters
    var self = this;
    var newLetterIntervalId = setInterval(function(){
      //Get the new letter and its matching code
      var index = Math.floor(Math.random() * 25);
      var displayLetter = lettersList[index];

      //Get existing array of letters
      var _letters = self.state.letters;

      //Add new letter on to existing array
      _letters.push({
        displayLetter: displayLetter,
        keyCode: startingKeyCode + index,
        isVisible: true
      });

      //Set modified array of letters as the new array in state
      self.setState({
        score: self.state.score,
        letters: _letters
      });

    }, newLetterInterval);

    //Store interval id in global array for safe removal later
    intervalIds.push(newLetterIntervalId);

    //On press of Escape key, stop the game
    Mousetrap.bind('escape', clearAllIntervals);

    //Remove letters if their corresponding key is pressed
    window.addEventListener('keypress', function(e){
      var _letters = self.state.letters;
      var _score = self.state.score;

      //Find element in DOM using JQuery
      var pressedLetter = $('.gameLetter[data-keycode="'+ e.keyCode + '"][data-isvisible="true"]');

      if(pressedLetter.length == 1){
        //Set visibility to false
        var reactid = pressedLetter.data('reactid');
        var index = parseInt(reactid.slice(reactid.indexOf('$')+1), 10);
        _letters[index].isVisible = false;

        //Hide the letter
        pressedLetter.data('isvisible', "false");
        pressedLetter.hide();

        //Increment the score
        _score++;
        numScoreIncremented++;

      }else if(pressedLetter.length == 0){
        //Decrement the score because of wrong keypress
        _score--;
      }else{
        //Hide the older instance of letter
        //Don't need to worry about sorting because JQuery returns elements in
        //the same order they are present in the DOM
        //Set visibility to false
        var reactid = $(pressedLetter[0]).data('reactid');
        var index = parseInt(reactid.slice(reactid.indexOf('$')+1), 10);
        _letters[index].isVisible = false;

        //Hide the letter
        $(pressedLetter[0]).data('isvisible', "false");
        $(pressedLetter[0]).hide();

        //Increment the score
        _score++;
        numScoreIncremented++;
      }

      //Set modified array of letters and score as new state
      self.setState({
        score: _score,
        letters: _letters
      });

      //TODO: Decrease new letter creation interval for every 20 points scored
      if((numScoreIncremented > 1) && (numScoreIncremented % 20 == 0)){
        console.log(newLetterInterval);
        newLetterInterval = newLetterInterval * 0.9;
      }

    });
  },
  render: function(){
    return (
      <div className="gameContent">
        <h1>Gumroad Test - Typing Game</h1>
        <ScoreComponent score={this.state.score} />
        <GameAreaComponent letters={this.state.letters} />
      </div>
    );
  }
});

var ScoreComponent = React.createClass({
  render: function(){
    return (
      <h3>Score: {this.props.score}</h3>
    );
  }
});

var LetterComponent = React.createClass({
  getInitialState: function(){
    return {
      style: {
        marginLeft: 0
      },
      shiftIntervalId: 0
    };
  },
  componentDidMount: function(){
    //Shift to right by modifying state
    var self = this;
    var shiftIntervalId = setInterval(function(){
      self.setState({
        style: {
          marginLeft: self.state.style.marginLeft + 10
        },
        shiftIntervalId: self.state.shiftIntervalId
      });
    }, 100);

    //Store interval id as part of component state
    this.setState({
      style: this.state.style,
      shiftIntervalId: shiftIntervalId
    });

    //Store interval id in global array for safe removal later
    intervalIds.push(shiftIntervalId);

  },
  componentWillUnmount: function(){
    //Clear interval using id stored in state
    clearInterval(this.state.shiftIntervalId);
  },
  render: function(){
    return (
      <div className='gameLetter' data-keycode={this.props.keyCode} data-isvisible={this.props.isVisible}
      style={this.state.style}>
        {this.props.displayLetter}
      </div>
    );
  }
});

var GameAreaComponent = React.createClass({
  render: function(){
    var letterComponents = this.props.letters.map(function(letter, index){
      return (
        <LetterComponent displayLetter={letter.displayLetter} key={index}
        keyCode={letter.keyCode} isVisible={letter.isVisible}/>
      );
    });
    return (
      <div className="gameArea">
        {letterComponents}
      </div>
    );
  }
});

React.render(
  <GameComponent />, document.getElementById('mainContent')
);
