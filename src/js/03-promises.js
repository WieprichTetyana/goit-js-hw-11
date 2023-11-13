 import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      const promise = { position, delay };
      if (shouldResolve) {
        resolve(promise);
      } else {
        reject(promise);
      }
      }, delay);
  });
  }
const formElem = document.querySelector(".form");

formElem.addEventListener("submit", onFormElemSub);
 function onFormElemSub(elem) {
   elem.preventDefault();

   const step = elem.currentTarget.elements.step.value;
   const delay = elem.currentTarget.elements.delay.value;
   const amount = elem.currentTarget.elements.amount.value;
 
   for (let i = 0; i < amount; i++) {
     const myDelay = delay + i * step;

     createPromise(i, myDelay)
       .then(({ position, delay }) => {
         Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
       })
       .catch(({ position, delay }) => {
         Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
       });
   }
 }
