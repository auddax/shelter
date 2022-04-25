// Burger menu

const burgerIcon = document.querySelector('.burger')
const burgerList = document.querySelectorAll('.burger-menu ul li')
const overlayDark = document.querySelector('.overlay-darken')

function toggleBurger(event) {
    let targetClasses = event.target.classList;
    if (targetClasses.contains('burger-menu-item') 
    || targetClasses.contains('overlay-darken') 
    || targetClasses.contains('burger')) {
        let target = document.querySelector('body');
        target.classList.toggle('menu-active');
        event.stopPropagation();
    }
}

burgerIcon.addEventListener('click', toggleBurger);
overlayDark.addEventListener('click', toggleBurger);

for (let item of burgerList) {
    item.addEventListener('click', toggleBurger);
}



// Carousel

const buttonLeft = document.querySelector('.button-arrow-left');
const buttonRight = document.querySelector('.button-arrow-right');
const buttonStart = document.querySelector('.button-arrow-start');
const buttonEnd = document.querySelector('.button-arrow-end');
const carousel = document.querySelector('.carousel');
let numberOfPetsRow = 3;
let petsData = [];

if (document.body.clientWidth < 1280 && document.body.clientWidth > 767) {
    numberOfPetsRow = 2;
  } else if (document.body.clientWidth < 768) {
    numberOfPetsRow = 1;
  }

document.addEventListener('DOMContentLoaded', () => {
    getData('https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/markups/level-2/shelter/pets.json')
    .then(result => {
        petsData = result;

        let randomIndex = randomizer(result.length);
        randomIndex.push(randomIndex[0]); // Adding third element to the right carousel items
        for (j = 0; j < 3; j++) {
            for (let i = 0; i < numberOfPetsRow; i++) {
                let index = randomIndex.pop()
                let imgPath = 'assets/img/pets-' + result[index]["img"].split('/')[4];
                let name = result[index]["name"];
                carousel.children[j].insertAdjacentHTML('afterbegin',`<article class="card"><figure><img src=${imgPath} alt="Cat"><figcaption>${name}</figcaption></figure><button class="button button-outline">Learn more</button></article>`)
            }    
        }
    }).then(() => {
        const cardList = document.querySelectorAll('.card');
        for (let card of cardList) {
            card.addEventListener('click', showPopup);
        }
    })
})


async function getData(url) {
    let response = await fetch(url);
    if (response.ok) {
        let result = await response.json();
        return result;
    } else {
        return new Error(response.status)
    }
}

function randomizer(length) {
    let randomNumSet = [];
    while (randomNumSet.length < length) {
        let randomNum = Math.floor(Math.random()*length)
        if (randomNumSet.indexOf(randomNum) === -1) randomNumSet.push(randomNum)
    }
    return randomNumSet;
}

function moveRight() {
    if (document.URL.includes('main')) {
        carousel.classList.add('transition-right');
        buttonLeft.removeEventListener('click', moveLeft);
        buttonRight.removeEventListener('click', moveRight);
    } else {
        let left = parseInt(carousel.style.left, 10) - 1200;
        if (left < -6000) {
            left = -6000;
        }
        carousel.style.left = left + 'px';
    }
}

function moveLeft() {
    if (document.URL.includes('main')) {
        carousel.classList.add('transition-left');
        buttonLeft.removeEventListener('click', moveLeft);
        buttonRight.removeEventListener('click', moveRight);
    } else {
        let left = parseInt(carousel.style.left, 10) + 1200
        if (left > 0) {
            left = 0;
        }
        carousel.style.left = left + 'px';
    }
    
}

buttonRight.addEventListener('click', moveRight);
buttonLeft.addEventListener('click', moveLeft);

carousel.addEventListener('animationend', (event) => {
    let centerItems = document.querySelector('.center-carousel-items')
    let leftItems = document.querySelector('.left-carousel-items')
    let rightItems = document.querySelector('.right-carousel-items')
    let tempHTML;

    if (event.animationName === 'move-left') {
        carousel.classList.remove('transition-left');
        tempHTML = centerItems.innerHTML;
        centerItems.innerHTML = leftItems.innerHTML;
        leftItems.innerHTML = rightItems.innerHTML;
        rightItems.innerHTML = tempHTML;

        const cardList = document.querySelectorAll('.card');
        for (let card of cardList) {
            card.addEventListener('click', showPopup);
        }
        
    } else {
        carousel.classList.remove('transition-right');
        tempHTML = centerItems.innerHTML;
        centerItems.innerHTML = rightItems.innerHTML;
        rightItems.innerHTML = leftItems.innerHTML;
        leftItems.innerHTML = tempHTML;

        const cardList = document.querySelectorAll('.card');
        for (let card of cardList) {
            card.addEventListener('click', showPopup);
        }
        
    }

    buttonRight.addEventListener('click', moveRight);
    buttonLeft.addEventListener('click', moveLeft);
})




// Popup

const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close')

popup.addEventListener('click', showPopup)
popupClose.addEventListener('click', showPopup)
popup.addEventListener('click', closePopup)
popupClose.addEventListener('click', closePopup)


function showPopup(event) {
    if (event.currentTarget.classList.contains('card')) {
        let body = document.querySelector('body');
        body.classList.add('popup-active');

        if (event.currentTarget.classList.contains('card')) {
          let content = document.querySelector('.popup__content')  
          let name = event.currentTarget.firstElementChild.lastElementChild.innerText
          let card = petsData.filter(item => item.name === name)[0]
          let image = 'assets/img/pets-' + card.img.split('/')[4];
          content.children[0].insertAdjacentHTML('afterbegin', `<img src="${image}" alt="Pet">`);
          content.children[1].children[0].insertAdjacentText('afterbegin', name);
          content.children[1].children[1].insertAdjacentText('afterbegin', `${card.type} - ${card.breed}`);
          content.children[1].children[2].insertAdjacentText('afterbegin', `${card.description}`);
          content.children[1].children[3].children[0].insertAdjacentHTML('afterbegin', `<strong>Age: </strong>${card.age}`);
          content.children[1].children[3].children[1].insertAdjacentHTML('afterbegin', `<strong>Inoculations: </strong>${card.inoculations}`);
          content.children[1].children[3].children[2].insertAdjacentHTML('afterbegin', `<strong>Diseases: </strong>${card.diseases}`);
          content.children[1].children[3].children[3].insertAdjacentHTML('afterbegin', `<strong>Parasites: </strong>${card.parasites}`);
        }
        
    }
}

function closePopup(event) {
    if (event.target.classList.contains('popup') 
    || event.currentTarget.classList.contains('popup__close')) {
        let body = document.querySelector('body');
      
        if (body.classList.contains('popup-active')) {
            let content = document.querySelector('.popup__content')
            content.children[0].innerHTML = '';
            content.children[1].children[0].innerHTML = '';
            content.children[1].children[1].innerHTML = '';
            content.children[1].children[2].innerHTML = '';
            content.children[1].children[3].children[0].innerHTML = '';
            content.children[1].children[3].children[1].innerHTML = '';
            content.children[1].children[3].children[2].innerHTML = '';
            content.children[1].children[3].children[3].innerHTML = '';
  

            body.classList.remove('popup-active');
        }
    }  
}






