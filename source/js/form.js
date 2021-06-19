
// import $ from '/../lib/jquery/src/jquery.js'
// import $ from './../node_modules/jquery/src/jquery.js';
const inputNumberPhone = document.querySelector('#user-tel');
if (inputNumberPhone) {
  inputNumberPhone.addEventListener('keyup', (evt) => {
    inputNumberPhone.value = inputNumberPhone.value.replace(/[^\d^(^)^+^ ]/g, '');
  });
}

// const inputNumberPhone = document.querySelector('#user-tel');
// const pop = document.querySelector('.phone_with_ddd');

// inputNumberPhone.onfocus = function () { inputNumberPhone.value = '+7('; };
// console.log('start'); $(document).ready(function () { $('.date').mask('00/00/0000'); });
// var options = {
//   onKeyPress: function (cep, e, field, options) {
//     var masks = ['+7(000) 000-00-00']; var mask = (cep.length > 17) ? masks[1] : masks[0];
//     $('#user-tel').mask(mask, options);
//   }
// };
// $('#user-tel').mask('+7(000) 000-00-00', options);
// $('.crazy_cep').mask('00000-000', options);
