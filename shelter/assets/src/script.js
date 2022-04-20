let burgerIcon = document.querySelector('.burger')
let burgerList = document.querySelectorAll('.burger-menu ul li')
let overlayDark = document.querySelector('.overlay-darken')

function toggler(event) {
    let targetClasses = event.target.classList;
    if (targetClasses.contains('burger-menu-item') || targetClasses.contains('overlay-darken') || targetClasses.contains('burger')) {
        let target = document.querySelector('body');
        if (target.classList.contains('menu-active')) {
            target.classList.remove('menu-active');
        } else {
        target.classList.add('menu-active');
        }
        event.stopPropagation();
    }
}

burgerIcon.addEventListener('click', toggler);
overlayDark.addEventListener('click', toggler);

for (let item of burgerList) {
    item.addEventListener('click', toggler);
}


