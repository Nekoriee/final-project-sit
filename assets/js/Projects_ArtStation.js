let url = '/assets/json/images.json';

let images = document.querySelector(".as_images");

async function loadImages() {
    let response = await fetch(url);
    let json = await response.json();
    images.insertAdjacentHTML('beforeend', `<img src="${json.client_image}" width="1000" height="563" class="content-center">`);
    images.insertAdjacentHTML('beforeend', `<p class="text-center">Serious Sam Fusion</p>`)

    images.insertAdjacentHTML('beforeend', `<img src="${json.client_image_02}" width="1000" height="563" class="content-center">`);
    images.insertAdjacentHTML('beforeend', `<p class="text-center">"Adepti's Abode" - Serious Sam 4</p>`)

    images.insertAdjacentHTML('beforeend', `<img src="${json.url_image}" class="content-center">`);
    images.insertAdjacentHTML('beforeend', `<p class="text-center">"Adepti's Abode" - Serious Sam 4</p>`)

    images.insertAdjacentHTML('beforeend', `<img src="${json.base64_image}" class="content-center">`);
    images.insertAdjacentHTML('beforeend', `<p class="text-center">Лого канала athwart</p>`)
}

loadImages();
