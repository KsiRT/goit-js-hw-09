// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';
const startTimerBtn = document.querySelector('button[data-start]');
const dateInput = document.querySelector('#datetime-picker');

let targetTime = null;
let timerInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    targetTime = selectedDates[0];
    if (targetTime < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startTimerBtn.disabled = true;
    } else {
      startTimerBtn.disabled = false;
    }
  },
};

flatpickr(dateInput, options);

function pad(value) {
  return String(value).padStart(2, 0);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function getTimeUntilTarget() {
  const today = new Date();
  const difference = targetTime - today;
  const convertedDiff = convertMs(difference);
  if (difference < 0) {
    clearInterval(timerInterval);
    Notiflix.Notify.success('Memento mori');
    return;
  }
  // console.log(convertedDiff);

  // const { days, hours, minutes, seconds } = convertedDiff;
  for (const prop in convertedDiff) {
    const propValue = convertedDiff[prop];
    document.querySelector(`[data-${prop}]`).textContent = pad(propValue);
  }
  //   document.querySelector('[data-days]').textContent = pad(days);
  //   document.querySelector('[data-hours]').textContent = pad(hours);
  //   document.querySelector('[data-minutes]').textContent = pad(minutes);
  //   document.querySelector('[data-seconds]').textContent = pad(seconds);
}

const onStartBtnClick = evt => {
  // getTimeUntilTarget();
  timerInterval = setInterval(getTimeUntilTarget, 1000);
  // console.log(timerInterval);
  startTimerBtn.disabled = true;
  dateInput.disabled = true;
};

startTimerBtn.addEventListener('click', onStartBtnClick);
