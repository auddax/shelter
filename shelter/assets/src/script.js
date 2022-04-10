let navbar = document.querySelectorAll('.navbar li');

for (let item of navbar) {
    item.addEventListener('mouseenter', () => {
        let target = document.querySelector('.focus');
        if (target === null) return;
        if (item.textContent === target.textContent) return;
        target.classList.remove('focus');
    })
}