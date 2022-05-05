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
let numberOfPages = 6;
let numberOfPets = 8;
let numberOfPetsRow = 4;
let cardWidth = 270;
let cardGap = 40;
let petsData = [];

if (document.body.clientWidth < 1280 && document.body.clientWidth > 767) {
  numberOfPages = 8;
  numberOfPets = 6;
  numberOfPetsRow = 2;
} else if (document.body.clientWidth < 768) {
  numberOfPages = 16;
  numberOfPets = 3;
  numberOfPetsRow = 1;
}


document.addEventListener('DOMContentLoaded', createCarouselContent)


function createCarouselContent() {
  getData('https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/markups/level-2/shelter/pets.json')
  .then(result => {
      let carousel = document.querySelector('.carousel')
      for (let i = 0; i < numberOfPages; i++) {
        carousel.insertAdjacentHTML('afterbegin', '<div class="carousel-items"></div>')
      }

      petsData = result;
      return petsData;
  }).then(() => {
    let randomIndex = [];
    for (let i = 0; i < numberOfPages; i++) {
        let res = randomizer(numberOfPets)
        randomIndex.push(res)
    }

    for (let j = 0; j < numberOfPages; j++) {
      for (let i = 0; i < numberOfPets; i++) {
          let index = randomIndex[j].pop()
          let imgPath = 'assets/img/pets-' + petsData[index]["img"].split('/')[4];
          let name = petsData[index]["name"];
          carousel.children[j].insertAdjacentHTML('afterbegin',`<article class="card"><figure><img src=${imgPath} alt="Cat"><figcaption>${name}</figcaption></figure><button class="button button-outline">Learn more</button></article>`)
      }    
  }
  }).then(() => {
    const cardList = document.querySelectorAll('.card');
    for (let card of cardList) {
        card.addEventListener('click', showPopup);
    }
  })
}

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
        let randomNum = Math.floor(Math.random()*8)
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
        let buttonPageNumber = document.querySelector('.button-page-number');
        let buttonRight = document.querySelector('.button-arrow-right');
        let buttonLeft = document.querySelector('.button-arrow-left');
        let buttonStart = document.querySelector('.button-arrow-start');
        let buttonEnd = document.querySelector('.button-arrow-end');

        let currenPageNumber = +buttonPageNumber.innerText;
        let carouselWindowWidth = (cardWidth + cardGap)*numberOfPetsRow;
        let carouselWidth = carouselWindowWidth*(numberOfPages - 1)

        let left = parseInt(carousel.style.left, 10) - carouselWindowWidth;
        if (left < -carouselWidth) left = -carouselWidth;
        carousel.style.left = left + 'px';

        if (currenPageNumber < numberOfPages) currenPageNumber++;
        buttonPageNumber.innerText = currenPageNumber;

        if (currenPageNumber > 1) {
          buttonStart.classList.remove('button-inactive');
          buttonLeft.classList.remove('button-inactive');
        }

        if (currenPageNumber === numberOfPages) {
          buttonEnd.classList.add('button-inactive');
          buttonRight.classList.add('button-inactive');
        }
    }
}

function moveLeft() {
    if (document.URL.includes('main')) {
        carousel.classList.add('transition-left');
        buttonLeft.removeEventListener('click', moveLeft);
        buttonRight.removeEventListener('click', moveRight);
    } else {
      let buttonPageNumber = document.querySelector('.button-page-number');
      let buttonRight = document.querySelector('.button-arrow-right');
      let buttonLeft = document.querySelector('.button-arrow-left');
      let buttonStart = document.querySelector('.button-arrow-start');
      let buttonEnd = document.querySelector('.button-arrow-end');

      let currenPageNumber = +buttonPageNumber.innerText;
      let carouselWindowWidth = (cardWidth + cardGap)*numberOfPetsRow;
      let left = parseInt(carousel.style.left, 10) + carouselWindowWidth;
      if (left > 0) left = 0;
      carousel.style.left = left + 'px';

      if (currenPageNumber > 1) currenPageNumber--;
      buttonPageNumber.innerText = currenPageNumber;

      if (currenPageNumber < numberOfPages) {
        buttonEnd.classList.remove('button-inactive');
        buttonRight.classList.remove('button-inactive');
      }

      if (currenPageNumber === 1) {
        buttonStart.classList.add('button-inactive');
        buttonLeft.classList.add('button-inactive');
      }
    }
    
}

function moveStart() {
    let buttonPageNumber = document.querySelector('.button-page-number');
    let buttonLeft = document.querySelector('.button-arrow-left');
    let buttonRight = document.querySelector('.button-arrow-right');
    let buttonStart = document.querySelector('.button-arrow-start');
    let buttonEnd = document.querySelector('.button-arrow-end');

    carousel.style.left = '0';
    buttonPageNumber.innerText = '1';
    buttonEnd.classList.remove('button-inactive');
    buttonRight.classList.remove('button-inactive');
    buttonStart.classList.add('button-inactive');
    buttonLeft.classList.add('button-inactive');
}

function moveEnd() {
    let buttonPageNumber = document.querySelector('.button-page-number');
    let buttonLeft = document.querySelector('.button-arrow-left');
    let buttonRight = document.querySelector('.button-arrow-right');
    let buttonStart = document.querySelector('.button-arrow-start');
    let buttonEnd = document.querySelector('.button-arrow-end');

    let carouselWindowWidth = (cardWidth + cardGap)*numberOfPetsRow;
    let carouselWidth = carouselWindowWidth*(numberOfPages - 1)
    carousel.style.left = '-' + carouselWidth + 'px';

    buttonPageNumber.innerText = numberOfPages;
    buttonEnd.classList.add('button-inactive');
    buttonRight.classList.add('button-inactive');
    buttonStart.classList.remove('button-inactive');
    buttonLeft.classList.remove('button-inactive');
}

buttonRight.addEventListener('click', moveRight);
buttonLeft.addEventListener('click', moveLeft);
buttonStart.addEventListener('click', moveStart);
buttonEnd.addEventListener('click', moveEnd);

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
    || event.currentTarget.classList.contains('popup__close')
    || event.target.classList.contains('popup__body')) {
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

// Hover effect for close-popup button
popup.addEventListener('mouseover', (event) => {
    let targetClasses = event.target.classList;
    if (targetClasses.contains('popup')
    || targetClasses.contains('popup__body')) {
        popupClose.classList.add('popup__hover');
    }
})

popup.addEventListener('mouseout', (event) => {
    let targetClasses = event.target.classList;
    if (targetClasses.contains('popup')
    || targetClasses.contains('popup__body')) {
        popupClose.classList.remove('popup__hover');
    }
})