let navbar = document.querySelectorAll('.navbar li')
for (let item of navbar) {
    item.addEventListener('mouseenter', () => {
        document.querySelector('.focus').classList.remove('focus')
    })
}