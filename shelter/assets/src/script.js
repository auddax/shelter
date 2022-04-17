let navbar = document.querySelectorAll('.navbar li');
let burger = document.querySelector('.burger')

for (let item of navbar) {
    item.addEventListener('mouseenter', () => {
        let target = document.querySelector('.focus');
        if (target === null) return;
        if (item.textContent === target.textContent) return;
        target.classList.remove('focus');
    })
}

burger.addEventListener('click', () => {
    let burgerMenu = document.querySelector('.burger-menu')
    if (burgerMenu.classList.contains('menu-active')) {
        burgerMenu.classList.remove('menu-active');
        document.querySelector('.logo').classList.remove('menu-active')
    } else {
       burgerMenu.classList.add('menu-active');
       document.querySelector('.logo').classList.add('menu-active')
    }
})
