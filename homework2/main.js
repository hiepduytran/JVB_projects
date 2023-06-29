const dayInString = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthInString = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const TODAY = new Date();
var year, month, date;

function init() {
    year = TODAY.getFullYear();
    month = TODAY.getMonth();
    date = TODAY.getDate();
}
init();

const toDay = document.querySelector('.today');
toDay.innerText = `${dayInString[getDay(year, month, date)]}, ${monthInString[month]} ${date}`;

const monthYear = document.querySelector('.current-month-year');
const dates = document.querySelector('.list-dates');
renderCalendar();

document.querySelector('.calendar-header .arrow-up').addEventListener('click', () => {
    if (month === 0) {
        year = year - 1;
        month = 11;
    } else {
        year = year;
        month = month - 1;
    }
    renderCalendar();
});

document.querySelector('.calendar-header .arrow-down').addEventListener('click', () => {
    if (month === 11) {
        year = year + 1;
    } else {
        year = year;
    }
    month = (month + 1) % 12;
    renderCalendar();
});

// HIDE CALENDAR
const calendarContainer = document.querySelector('.calendar-container')
const arrowDownMain = document.querySelector('.arrow-down-main')
arrowDownMain.addEventListener('click', () => {
    calendarContainer.classList.toggle('hide');
});

// MONTH PICKING
const monthPicking = document.querySelector('.month-picking');
const months = monthPicking.querySelector('.months');
renderMonth();
monthYear.addEventListener('click', () => {
    monthPicking.classList.toggle('show');
});

monthPicking.querySelector('.arrow-up').addEventListener('click', () => {
    year--;
    renderCalendar();
    renderMonth();
});

monthPicking.querySelector('.arrow-down').addEventListener('click', () => {
    year++;
    renderCalendar();
    renderMonth();
});

months.addEventListener('click', function (e) {
    if (e.target.closest('.month')) {
        const target = e.target.closest('.month');
        year = Number(target.dataset.year);
        month = Number(target.dataset.month);
        renderCalendar();
        renderMonth();
        monthPicking.classList.toggle('show');
    }
    return;
});

// YEAR PICKING
const yearPicking = document.querySelector('.year-picking');
const years = yearPicking.querySelector('.years');
renderYear(year);

var result = year;
yearPicking.querySelector('.arrow-up').addEventListener('click', () => {
    result -= 10;
    renderYear(result);
});

yearPicking.querySelector('.arrow-down').addEventListener('click', () => {
    result += 10;
    renderYear(result);
});

yearPicking.querySelector('.years').addEventListener('click', function (e) {
    if (e.target.closest('.year')) {
        const target = e.target.closest('.year');
        year = Number(target.dataset.year);
        renderCalendar();
        renderMonth();
        renderYear(year);
        monthPicking.classList.toggle('show');
        yearPicking.classList.toggle('show');
    }
    return;
});

monthPicking.querySelector('.current-year').addEventListener('click', () => {
    yearPicking.classList.toggle('show');
    monthPicking.classList.toggle('show');
});


function getDay(year, month, date) {
    return new Date(year, month, date).getDay();
}

function renderCalendar() {
    const CELLS = 42;
    const numDates = new Date(year, month + 1, 0).getDate();
    let htmlDates = '';

    // Offset-top
    const lastDateOfPreviousMonth = new Date(year, month, 0).getDate();
    let firstDay = getDay(year, month, 1);
    if (firstDay === 0){
        firstDay = 7;
    } 
    for (let i = firstDay; i >= 1; i--) {
        htmlDates += `<div class="date date-offset">${lastDateOfPreviousMonth - i + 1}</div>`;
    }
    // Current month
    let isActive = false;
    for (let i = 1; i <= numDates; i++) {
        isActive = i === date && month === TODAY.getMonth() && year === TODAY.getFullYear();
        htmlDates += `<div class="date ${isActive ? 'active' : ''}">${i}</div>`;
    }

    // Offset-bottom
    const offset = CELLS - numDates - firstDay;
    for (let i = 1; i <= offset; i++) {
        htmlDates += `<div class="date date-offset">${i}</div>`;
    }

    monthYear.innerText = `${monthInString[month]} ${year}`;
    dates.innerHTML = htmlDates;
}

function renderMonth() {
    let htmlMonths = '';
    let isActive = false;
    for (let i = 0; i < 12; i++) {
        isActive = i === TODAY.getMonth() && year === TODAY.getFullYear();
        htmlMonths += `<div class="month ${isActive ? 'active' : ''}" data-month="${i}" data-year="${year}">${monthInString[i].slice(0, 3)}</div>`;
    }

    // Offset-bottom
    for (let i = 0; i < 4; i++) {
        htmlMonths += `<div class="month month-offset" data-month="${i}" data-year="${year + 1}">${monthInString[i].slice(0, 3)}</div>`;
    }
    monthPicking.querySelector('.current-year').innerText = year;
    document.querySelector('.months').innerHTML = htmlMonths;
}

function renderYear(year) {
    const CELLS = 16;
    const MIN = year - (year % 10);
    const MAX = MIN + 9;
    let htmlYears = '';

    const offsetTop = MIN % 4 === 0 ? 1 : 3;
    for (let i = 1; i <= offsetTop; i++) {
        htmlYears += `<div class="year year-offset" data-year="${MIN - i}">${MIN - i}</div>`;
    }

    let isActive = false;
    for (let i = MIN; i <= MAX; i++) {
        isActive = i === TODAY.getFullYear();
        htmlYears += `<div class="year ${isActive ? 'active' : ''}" data-year="${i}">${i}</div>`;
    }

    const offsetBottom = CELLS - (MAX - MIN + 1) - offsetTop;
    for (let i = 1; i <= offsetBottom; i++) {
        htmlYears += `<div class="year year-offset" data-year="${MAX + i}">${MAX + i}</div>`;
    }

    yearPicking.querySelector('.current-year-period').innerText = `${MIN} - ${MAX}`;
    document.querySelector('.years').innerHTML = htmlYears;
}
