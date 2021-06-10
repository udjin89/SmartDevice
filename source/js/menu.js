const toggle = document.querySelector('.toggle');
const menu = document.querySelector('.menu');
const menuNav = document.querySelector('.navigation');
const body = document.querySelector('.page__body');

// // No-js menu
if (menu) {
  menu.classList.remove('menu--open');
}
if (menuNav) {
  menuNav.classList.remove('navigation--open');
  menuNav.classList.remove('navigation--no-js');
}
if (toggle) {
  toggle.classList.remove('toggle--off');
}
// Кнопка гамбургер
if (toggle) {
  toggle.addEventListener('click', (evt) => {
    (toggle.classList.contains('is-active') === true) ? closeMenu() : openMenu();
  });
}

function openMenu() {
  toggle.classList.add('is-active');
  menuNav.classList.add('navigation--open');
  menu.classList.add('menu--open');
  body.classList.add('overflow');
}
function closeMenu() {
  toggle.classList.remove('is-active');
  menuNav.classList.remove('navigation--open');
  menu.classList.remove('menu--open');
  body.classList.remove('overflow');
}
