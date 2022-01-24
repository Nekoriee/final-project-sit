let timer = 0;
let stopped = true;

let button_hrPlus = document.getElementById("hr+");
let button_hrMinus = document.getElementById("hr-");
let button_minPlus = document.getElementById("min+");
let button_minMinus = document.getElementById("min-");
let button_secPlus = document.getElementById("sec+");
let button_secMinus = document.getElementById("sec-");
let button_start = document.getElementById("startCountdown");
let button_stop = document.getElementById("stopCountdown");

// используется при отсчёте
function addTime(time) {
    timer += time;
    if (timer < 0) timer = 0;
}

// используется при изменении времени перед отсчётом
function addTimeUpdate(time) {
    timer += time;
    if (timer < 0) timer = 0;
    updateText(timer);
}

// изменить состояние всех кнопок, активных до отсчёта
function setButtonState(disabled) {
    let buttons = document.getElementsByClassName("countdown-button");
    for (let i = 0; i < buttons.length - 1; i++) {
        buttons[i].disabled = disabled;
    }
}

// обновление отображаемого времени
function updateText(time) {
    let hours = Math.trunc(time / 3600);
    if (hours < 10) hours = "0" + hours;

    let minutes = Math.trunc((time - 3600 * hours) / 60);
    if (minutes < 10) minutes = "0" + minutes;

    let seconds = Math.trunc(time - 3600 * hours - 60 * minutes);
    if (seconds < 10) seconds = "0" + seconds;

    let text = hours + ":" + minutes + ":" + seconds;
    document.getElementsByClassName("countdown-timer")[0].innerText = text;
}

// начать отсчёт
async function startCountdown() {
    stopped = false;
    document.getElementById("stopCountdown").disabled = false;
    setButtonState(true);

    while (timer > 0 && stopped != true) {
        await new Promise((resolve, reject) =>
            setTimeout(function() {
                if (stopped != true) addTime(-1);
                resolve();
            }, 1000));
        updateText(timer);
    }

    updateText(timer);
    setButtonState(false);
    document.getElementById("stopCountdown").disabled = true;
}

// остановить отсчёт
function stopCountdown() {
    stopped = true;
    document.getElementById("stopCountdown").disabled = true;
}

updateText(timer);
document.getElementById("stopCountdown").disabled = true;

// добавляем EventListener кнопкам
button_hrPlus.addEventListener("click", function() {
    addTimeUpdate(3600);
})

button_hrMinus.addEventListener("click", function() {
    addTimeUpdate(-3600);
})

button_minPlus.addEventListener("click", function() {
    addTimeUpdate(60);
})

button_minMinus.addEventListener("click", function() {
    addTimeUpdate(-60);
})

button_secPlus.addEventListener("click", function() {
    addTimeUpdate(1);
})

button_secMinus.addEventListener("click", function() {
    addTimeUpdate(-1);
})

button_start.addEventListener("click", function() {
    startCountdown();
})

button_stop.addEventListener("click", function() {
    stopCountdown();
})