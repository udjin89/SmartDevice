
const accordion = document.querySelector('.accordion');
if (accordion) {
  const panelItem = accordion.querySelectorAll('h3');
  const active = accordion.getElementsByClassName('panel-active');

  panelItem.forEach(function (item) {
    item.classList.remove('panel-active');
  });

  Array.from(panelItem).forEach(function (item, i, panelItem) {
    item.addEventListener('click', function (e) {
      if (active.length > 0 && active[0] !== this) // если есть активный элемент, и это не тот по которому кликнули
        active[0].classList.remove('panel-active'); // убрать класс panel-active

      // изменить состояние класса panel-active на текущем элементе: добавить если не было, убрать если было.
      this.classList.toggle('panel-active');
    });
  });
}


const inputNumberPhone = document.querySelectorAll('input[type=tel]');

if (inputNumberPhone) {

  inputNumberPhone.forEach(function (item) {
    var options = {
      onKeyPress: function (cep, e, field, options) {
        const masks = ['+7(000) 000-00-00'];
        $(item).mask(masks, options);
      }
    };

    $(item).mask('+7(000) 000-00-00', options);
  });
  inputNumberPhone.forEach(function (item) {
    item.addEventListener('focus', function (item) {
      item.value = '+7(';
    });
  });
}


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
    modal.classList.add("modal-show-x");
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
  modal.classList.remove("modal-show-x");
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

// Smooth scroll
const links = document.querySelectorAll('a[href^="#"]');
if (links) {
  for (let link of links) {
    link.addEventListener('click', function (evt) {
      evt.preventDefault();
      const id = link.getAttribute('href');
      document.querySelector(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  };
}
