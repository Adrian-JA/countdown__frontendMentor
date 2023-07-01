const days = document.querySelector(".counter--days");
const counter = document.querySelectorAll(".counter");
const counterCard = document.querySelector(".counter__card");

const cardDay = document.getElementById("counter-days");
const cardHour = document.getElementById("counter-hours");
const cardMinute = document.getElementById("counter-minutes");
const cardSecond = document.getElementById("counter-seconds");

const calendar = [
    { month: "jan", days: 31 },
    { month: "feb", days: 28 },
    { month: "mar", days: 31 },
    { month: "apr", days: 30 },
    { month: "may", days: 31 },
    { month: "jun", days: 30 },
    { month: "jul", days: 31 },
    { month: "aug", days: 31 },
    { month: "sep", days: 30 },
    { month: "oct", days: 31 },
    { month: "nov", days: 30 },
    { month: "dec", days: 31 },
];

const date = new Date();
const month = calendar[date.getMonth() + 1];
const day = date.getDate();
const hour = date.getHours();
const minute = date.getMinutes();
const second = date.getSeconds();

const remainingDays = month.days - day;
const remainingHours = 24 - hour;
const remainingMinutes = 60 - minute;
const remainingSeconds = 60 - second;

const setCountdown = [remainingDays, remainingHours, remainingMinutes, remainingSeconds];

function addZeros(count) {
    if (count < 10) {
        count = "0" + count;
    }

    return count;
}

for (let i = 0; i < counter.length; i++) {
    let count = addZeros(setCountdown[i]);

    counter[i].setAttribute("data-digit-start", count);
    counter[i].firstElementChild.setAttribute("data-digit-start", count);

    counter[i].setAttribute("data-digit-end", count);
    counter[i].firstElementChild.setAttribute("data-digit-end", count - 1);
}

let counterDays = remainingDays;
let counterHours = remainingHours;
let counterMinutes = remainingMinutes;
let counterSeconds = remainingSeconds;

let canFlipHoursCard = true;
let canFlipDaysCard = true;

function flipCard(cardElement, count) {
    let cardFlip = cardElement.firstElementChild;
    cardElement.setAttribute("data-digit-start", count);
    cardFlip.setAttribute("data-digit-end", count);
    cardFlip.classList.add("counter__card--flip");

    cardFlip.addEventListener("transitionend", () => {
        cardFlip.classList.remove("counter__card--flip");
        cardElement.setAttribute("data-digit-end", count);
        cardFlip.setAttribute("data-digit-start", count);

        cardFlip.setAttribute("data-digit-end", count - 1);
    });
}

function flipSecondsCard() {
    counterSeconds === "00" ? (counterSeconds = 59) : (counterSeconds -= 1);
    counterSeconds = addZeros(counterSeconds);
    flipCard(cardSecond, counterSeconds);
}

function flipMinutesCard() {
    counterMinutes === "00" ? (counterMinutes = 59) : (counterMinutes -= 1);
    counterMinutes = addZeros(counterMinutes);
    flipCard(cardMinute, counterMinutes);
    canFlipHoursCard = true;
}

function flipHoursCard() {
    counterHours === "00" ? (counterHours = 23) : (counterHours -= 1);
    counterHours = addZeros(counterHours);
    flipCard(cardHour, counterHours);
    canFlipDaysCard = true;
    canFlipHoursCard = false;
}

function flipDaysCard() {
    counterDays === "00" ? (counterDays = month.days) : (counterDays -= 1);
    counterDays = addZeros(counterDays);
    flipCard(cardDay, counterDays);
    canFlipDaysCard = false;
}

// countdown to know when the month ends

window.addEventListener("DOMContentLoaded", () => {
    setInterval(() => {
        flipSecondsCard();

        if (counterSeconds === 0) {
            flipMinutesCard();
        }

        if (counterMinutes === 0 && canFlipHoursCard) {
            console.log(canFlipHoursCard);
            flipHoursCard();
        }

        if (counterHours === 0 && canFlipDaysCard) {
            flipDaysCard();
        }
    }, 1000);
});
