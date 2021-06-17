const popup = document.querySelector('.modal-wrapper');
const button = document.querySelector('.button--contact');

if (button && popup) {
  button.addEventListener('click', function (evt) {
    evt.preventDefault();
    // evt.stopPropagation();
    popup.classList.remove('hidden');
    eventclose();

  });
}
function eventclose() {
  window.addEventListener('keydown', onEscKeydown);

  window.addEventListener('click', onOverlayClick);
}
function onEscKeydown(evt) {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    removeMessage();
  }
}

function removeMessage() {
  popup.classList.add('hidden');
  window.removeEventListener('keydown', onEscKeydown);
  window.removeEventListener('click', onOverlayClick);
}

function onOverlayClick() {
  console.log('clickocerlay')

  removeMessage();
}
