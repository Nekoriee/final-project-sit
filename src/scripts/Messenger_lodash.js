let toNumber = require('lodash/toNumber');
let replace = require('lodash/replace');

const inputArea = document.querySelector('.mes-textarea');
const outputArea = document.querySelector('.mes-messages');
const buttonSend = document.getElementById("button_send");

function Round(){
    let text = inputArea.value.trim();

    if(text !== ''){
        if (text == '/clear') {
            localStorage.clear();
        }
        else {
            outputArea.insertAdjacentHTML('beforeend',`<div class="mes-message-row"><p><span class="mes-message" id="sen">${text}</span></p></div>`);
            text = replace(text, ',', '.');
            let number, type;
            let spaceIndex = text.indexOf(" ");
            if (spaceIndex != -1) {
                number = toNumber(text.substring(0, spaceIndex));
                type = text.substring(spaceIndex + 1);

                if (!Number.isNaN(number)) {
                    if (type == "ceil") {
                        outputArea.insertAdjacentHTML('beforeend',`<div class="mes-message-row"><p><span class="mes-message" id="rec">${Math.ceil(number)}</span></p></div>`);
                    }
                    else if (type == "floor") {
                        outputArea.insertAdjacentHTML('beforeend',`<div class="mes-message-row"><p><span class="mes-message" id="rec">${Math.floor(number)}</span></p></div>`);
                    }
                    else {
                        outputArea.insertAdjacentHTML('beforeend',`<div class="mes-message-row"><p><span class="mes-message" id="rec">Я не знаю такой тип округления :c</span></p></div>`);
                    }
                }
                else {
                    outputArea.insertAdjacentHTML('beforeend',`<div class="mes-message-row"><p><span class="mes-message" id="rec">Это не число :c</span></p></div>`);
                }
            }
            else  {
                outputArea.insertAdjacentHTML('beforeend',`<div class="mes-message-row"><p><span class="mes-message" id="rec">В сообщении нет пробела :c</span></p></div>`);
            }

        }
    }

    inputArea.value = '';
}

buttonSend.addEventListener("click", function() {
    Round();
});