import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

const onFormSubmit = evt => {
  evt.preventDefault();
  // console.log(evt.target.elements);
  const { delay, step, amount } = evt.target.elements;
  let followingDelay = +delay.value;
  for (let position = 1; position <= +amount.value; position += 1) {
    console.log(followingDelay);

    createPromise(position, followingDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    followingDelay += +step.value;
  }
};

formEl.addEventListener('submit', onFormSubmit);
