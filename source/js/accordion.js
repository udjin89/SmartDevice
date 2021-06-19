const accordion = document.querySelector('.accordion');
// var panelItem = accordion.querySelectorAll('h3'),
//   bodyItem = accordion.querySelectorAll('ul');
// panelItem.__proto__.forEach = [].__proto__.forEach;

// var activePanel;
// panelItem.forEach(function (item, i, panelItem) {
//   item.addEventListener('click', function (e) {
//     //show new thingy;
//     this.classList.add('panel-active');
//     this.nextElementSibling.classList.add('active');
//     //hide old thingy
//     if (activePanel) {
//       activePanel.classList.remove('panel-active');
//       activePanel.nextElementSibling.classList.remove('active');
//     }
//     //update thingy
//     activePanel = (activePanel === this) ? 0 : this;
//   });
// });

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
