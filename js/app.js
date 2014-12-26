$( document ).ready(function() {
  var newLetterInterval = 1000;
  var letterShiftInterval = 100;
  var bonusAtScore = 20;
  var bonusInervalDecrease = 0.1;
  var shiftRightBy = 10;
  var isGameOver = false;
  var plusScore = 1;
  var minusScore = -1;
  
  while(!isGameOver){
    
    var newLetterIntervalId = setInterval(function(){
      
      $('.gameArea').append("<div>a</div>");
      
    }, newLetterInterval);
    
  }
});