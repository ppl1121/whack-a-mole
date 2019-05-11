let $startButton, $moles, $scoreBoard;
let leftOver_playTime, interval_callback, index_lastActiveMoles;
let score = 0;


$(document).ready(function() {
   $startButton = $(".controls button[name='start']");
   $moles = $(".mole");
   $scoreBoard = $(".controls .score span");
   $startButton.on('click', startGame);
   $moles.each(function() {$(this).on("click", getPoint)});
});

function startGame() {
  $startButton.attr("disabled","true");
  leftOver_playTime = 10;
  $scoreBoard.text("0");
  score = 0;
  clearInterval(interval_callback);
  playTime_countdown();
  showMole();
}


function showMole() {
  let $mole = $(randomMole($moles.length));
  let time = randomTime(500, 1500);

  $mole.addClass('out');

  setTimeout(() => {
    $mole.removeClass('out');
    if (leftOver_playTime > 0) showMole();
  }, time);
}

function getPoint() {
  score++;
  $scoreBoard.text(score);
  $(this).removeClass("out");
}

function playTime_countdown() {
  const $timer = $(".timer");
  interval_callback = setInterval(() => {
    if (leftOver_playTime < 0) {
      clearInterval(interval_callback);
      $startButton.removeAttr("disabled");
      alert("You whack " + score + " moles")
      return;
    }
    $timer.text(leftOver_playTime);
    leftOver_playTime--;
  }, 1000);
}

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomMole(molesCount) {
  let index = Math.floor(Math.random() * molesCount),
  mole = $moles[index];
  if (index === index_lastActiveMoles) return randomMole(molesCount);
  index_lastActiveMoles = index;
  return mole;
}

