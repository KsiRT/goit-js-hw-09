function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
const startButton = document.querySelector('button[data-start]');
// console.log(startButton);
const stopButton = document.querySelector('button[data-stop]');
// console.log(stopButton);

const onStartClick = evt => {
  document.body.style.backgroundColor = getRandomHexColor();
};

const onStopClick = evt => {};

startButton.addEventListener('click', onStartClick);
stopButton.addEventListener('click', onStopClick);
