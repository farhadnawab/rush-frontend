import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import './scss/style.scss';

$(() => {
  // Toggle dark mode
  $('[data-toggle-dark-mode]').on('click', () => {
    $('body').toggleClass('dark-mode');
  });

  // Form validation -- Bootstrap way
  // JavaScript for disabling form submissions if there are invalid fields
  window.addEventListener('load', () => {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    const validation = Array.prototype.filter.call(forms, (form) => {
      form.addEventListener('submit', (event) => {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
});
