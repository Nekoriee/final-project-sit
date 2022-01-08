const pageName = window.location.pathname;
const inputArea = document.querySelector('.mes-textarea');
const outputArea = document.querySelector('.mes-messages');
const pageCount = pageName.substring(pageName.length - 6, pageName.length - 5)
let count = 0;

function AddMessage(){

    let text = inputArea.value.trim();

    if(text !== ''){
        localStorage.setItem("mes" + pageCount + "_" + count, "sen." + text)
        count++;
        localStorage.setItem("mes" + pageCount + "_count", count)
        outputArea.insertAdjacentHTML('beforeend',`<div class="mes-message-row"><p><span class="mes-message" id="sen">${text}</span></p></div>`);
    }

    inputArea.value = '';

}

//localStorage.clear();

//получаем количество сообщений в localStorage
if (localStorage.getItem("mes"+ pageCount + "_count") != null) {
    count = localStorage.getItem("mes" + pageCount + "_count");
}

//восстанавливаем сообщения
for (let i = 0; i < count; i++) {
    let text = localStorage.getItem("mes" + pageCount + "_" + i);
    outputArea.insertAdjacentHTML('beforeend',`<div class="mes-message-row"><p><span class="mes-message" id=${text.substring(0,3)}>${text.substring(4)}</span></p></div>`);
}