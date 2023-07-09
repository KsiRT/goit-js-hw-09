function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
const startButton = document.querySelector('button[data-start]');
// console.log(startButton);
const stopButton = document.querySelector('button[data-stop]');
// console.log(stopButton);
stopButton.disabled = true;

let colorInterval = null;

const onStartClick = ({ target }) => {
  target.disabled = true;
  stopButton.disabled = false;
  colorInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

const onStopClick = ({ target }) => {
  target.disabled = true;
  startButton.disabled = false;
  clearInterval(colorInterval);
};

startButton.addEventListener('click', onStartClick);
stopButton.addEventListener('click', onStopClick);
