import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const dateTimePicker = document.getElementById("datetime-picker");

flatpickr(dateTimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      alert("Please choose a date in the future");
    } else {
      startBtn.disabled = false;
    }
  },
});
const startBtn = document.querySelector('[data-start]');
const timerFields = document.querySelectorAll('.value');
const endDate = document.getElementById('datetime-picker');

let countdownInterval;

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  const targetDate = new Date(endDate.value).getTime();

  countdownInterval = setInterval(() => {
    const currentDate = new Date().getTime();
    const timeRemaining = targetDate - currentDate;

    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      updateTimerFields(0);
      startBtn.disabled = false;
    } else {
      updateTimerFields(timeRemaining);
    }
  }, 1000);
});

function updateTimerFields(timeRemaining) {
  const time = convertMs(timeRemaining);
  timerFields[0].textContent = addLeadingZero(time.days);
  timerFields[1].textContent = addLeadingZero(time.hours);
  timerFields[2].textContent = addLeadingZero(time.minutes);
  timerFields[3].textContent = addLeadingZero(time.seconds);
}

function convertMs(ms) {
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

