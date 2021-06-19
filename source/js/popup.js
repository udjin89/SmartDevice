
const overlay = document.querySelector('.bg-overlay');
const button = document.querySelector('.button--contact');
const modal = document.querySelector('.modal--call');
const buttonClose = modal.querySelector('.button--close');
const inputName = modal.querySelector('input[type=text]');
const body = document.querySelector('.page__body');

if (button) {
  button.addEventListener('click', function (evt) {
    evt.preventDefault();
    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
    inputName.focus();
    // body.dataset.scrollY = getBodyScrollTop() // сохраним значение скролла
    // body.style.top = `-${body.dataset.scrollY}px`
    body.classList.add('overflow');
    eventclose();

  });
}

function eventclose() {
  window.addEventListener('keydown', onEscKeydown);
  overlay.addEventListener('click', onOverlayClick);
  buttonClose.addEventListener('click', removeModal);

  // popup.addEventListener('click', function () {
  //   document.querySelector('.modal').classList.add('hidden');
  //   this.classList.add('hidden');
  // });
}
function onEscKeydown(evt) {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    removeModal();
  }
}

function removeModal() {
  overlay.classList.add('hidden');
  modal.classList.add('hidden');
  body.classList.remove('overflow');
  window.removeEventListener('keydown', onEscKeydown);
  overlay.removeEventListener('click', onOverlayClick);

}

function onOverlayClick() {
  console.log('clickocerlay');
  removeModal();
}

function getBodyScrollTop() {
  return self.pageYOffset || (document.documentElement && document.documentElement.ScrollTop) || (document.body && document.body.scrollTop);
}
