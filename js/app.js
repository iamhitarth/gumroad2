$( document ).ready(function() {
  var newLetterInterval = 1000;
  var shiftLetterInterval = 100;
  var shiftRightBy = 10;
  var bonusAtScore = 20;
  var bonusInervalDecrease = 0.1;
  var plusScore = 1;
  var minusScore = -1;
  var isGameOver = false;

  var newLetterIntervalId = setInterval(function(){

    $('.gameArea').append("<div class='gameLetter'>a</div>");

  }, newLetterInterval);

  var shiftLetterIntervalId = setInterval(function(){
    $('.gameLetter')
  }, shiftLetterInterval);

  var clearIntervals = function(){
    clearInterval(newLetterIntervalId);
    clearInterval(shiftLetterIntervalId);
  };

  Mousetrap.bind('escape', function() {
    clearIntervals();
  });


});
