var lettersList = "abcdefghijklmnopqrstuvwxyz".split("");
var startingKeyCode = 97;
var intervalIds = [];

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
      var index = Math.floor(Math.random() * 25);
      var displayLetter = lettersList[index];

      var _letters = self.state.letters;

      _letters.push({
        displayLetter: displayLetter,
        keyCode: startingKeyCode + index
      });

      self.setState({
        score: self.state.score,
        letters: _letters
      });

    }, 1000);

    //Store interval id in global array for safe removal later
    intervalIds.push(newLetterIntervalId);

    //On press of Escape key, stop the game
    Mousetrap.bind('escape', clearAllIntervals);

    //Remove letters if their corresponding key is pressed
    window.addEventListener('keypress', function(e){
      console.log("Key pressed: " + e.keyCode);

      var pressedLetter = $('.gameLetter[data-keycode="'+ e.keyCode + '"]');

      if(pressedLetter.length == 1){
        //Remove the letter
        pressedLetter.remove();

        //Increment the score

      }else if(pressedLetter.length == 0){
        //Decrement the score because of wrong keypress
        
      }


      //Decrease new letter time interval for every 20 letters

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
      <div className='gameLetter' data-keycode={this.props.keyCode} style={this.state.style}>
        {this.props.displayLetter}
      </div>
    );
  }
});

var GameAreaComponent = React.createClass({
  render: function(){
    var letterComponents = this.props.letters.map(function(letter, index){
      return (
        <LetterComponent displayLetter={letter.displayLetter} keyCode={letter.keyCode}/>
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
