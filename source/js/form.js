
const inputNumberPhone = document.querySelectorAll('input[type=tel]');

if (inputNumberPhone) {

  inputNumberPhone.forEach(function (item) {

    console.log('start input phone');
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
