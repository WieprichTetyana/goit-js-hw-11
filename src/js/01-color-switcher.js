const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');

let intervalId = null;

startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    stopBtn.disabled = false;

    intervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
      }, 1000);
    });

stopBtn.addEventListener('click', () => {
    startBtn.disabled = false;
    stopBtn.disabled = true;

    clearInterval(intervalId);
    });

    function getRandomHexColor() {
      return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    }
  





