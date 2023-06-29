var timeFocus = 30;
var isRunning = false; 
var interval;
var minutes = timeFocus;
var seconds = 0;

const minusBtn = document.querySelector('.minus');
const plusBtn = document.querySelector('.plus');
const focusBtn = document.querySelector('.btn-focus');

minusBtn.addEventListener('click', () => {
    if (timeFocus === 5) {
        return;
    }
    timeFocus -= 5;
    console.log(timeFocus);
    updatetimeFocus(timeFocus);
});

plusBtn.addEventListener('click', () => {
    timeFocus += 5;
    console.log(timeFocus);
    updatetimeFocus(timeFocus);
});

focusBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(interval);
        isRunning = false;
        focusBtn.innerHTML = '<div><i class="fa-solid fa-play"></i>  Focus</div>';
    } else {
        if (minutes === 0 && seconds === 0) {
            minutes = timeFocus;
        }
        if (minutes === timeFocus && seconds === 0) {
            start();
        } else {
            resetTime();
            start();
        }
        isRunning = true;
        focusBtn.innerHTML = '<div><i class="fa-solid fa-pause"></i>  Pause</div>';
    }
});

function updatetimeFocus() {
    document.querySelector('.default').innerText = timeFocus;
}

function start() {
    interval = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(interval);
                isRunning = false;
                focusBtn.innerText = 'Focus';
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }

        var counterElement = document.querySelector('.counter');
        var formattedTime = "";

        if (seconds < 10) {
            formattedTime = minutes + ":0" + seconds;
        } else {
            formattedTime = minutes + ":" + seconds;
        }

        counterElement.innerText = formattedTime;
    }, 1000);
}

function resetTime() {
    clearInterval(interval);
    minutes = timeFocus;
    seconds = 0;
    var counterElement = document.querySelector('.counter');
    counterElement.innerText = timeFocus + ":00";
}
