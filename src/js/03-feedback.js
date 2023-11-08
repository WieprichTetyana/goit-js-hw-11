import throttle  from 'lodash.throttle';

const contactFormEl = document.querySelector('.js-feedback-form');

const userData = {};

const fillFeedbackFormField = () => {
  const userDataFromLS = localStorage.getItem('contactFormInfo');

if (userDataFromLS) {
  console.log(userDataFromLS);
  const userDataParsed = JSON.parse(userDataFromLS);

  for (const key in userDataParsed) {
    if (userDataParsed.hasOwnProperty(key)) {
      contactFormEl.elements[key].value = userDataParsed[key];
    }
  }
}
};

fillFeedbackFormField();

const feedbackFormStateThrottle = throttle(({ target: feedbackFormField }) => {
  const feedbackFormFieldValue = feedbackFormField.value;
  const feedbackFormFieldName = feedbackFormField.name;

  userData[feedbackFormFieldName] = feedbackFormFieldValue;

  localStorage.setItem('contactFormInfo', JSON.stringify(userData));
}, 500);

const feedbackFormSubmit = event => {
  event.preventDefault();

  contactFormEl.reset();
  localStorage.removeItem('contactFormInfo');
};

contactFormEl.addEventListener('change', feedbackFormStateThrottle);
contactFormEl.addEventListener('submit', feedbackFormSubmit);
