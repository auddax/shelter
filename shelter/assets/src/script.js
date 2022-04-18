let navbar = document.querySelectorAll('.navbar li');
let burger = document.querySelector('.burger')
let burgerNav = document.querySelectorAll('.burger-menu ul li')

function toggler() {
    let target = document.querySelector('header');
    if (target.classList.contains('menu-active')) {
        target.classList.remove('menu-active');
    } else {
       target.classList.add('menu-active');
    }
}

for (let item of navbar) {
    item.addEventListener('mouseenter', () => {
        let target = document.querySelector('.focus');
        if (target === null) return;
        if (item.textContent === target.textContent) return;
        target.classList.remove('focus');
    })
}

for (let item of burgerNav) {
    item.addEventListener('click', toggler)
}

burger.addEventListener('click', () => {
    let target = document.querySelector('header');
    if (target.classList.contains('menu-active')) {
        target.classList.remove('menu-active');
    } else {
       target.classList.add('menu-active');
    }
})
