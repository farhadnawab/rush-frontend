import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import './scss/style.scss';

$(() => {
  // Toggle dark mode
  $('[data-toggle-dark-mode]').on('click', () => {
    $('body').toggleClass('dark-mode');
  });

  // Accordion
  $('.block .collapse').on('show.bs.collapse', (e) => {
    const $this = $(e.currentTarget);

    $('.main-container .left-column > .block').removeClass('active');
    $('.main-container .left-column > .block .collapse').collapse('hide');
    $this.closest('.block').addClass('active');
  });
  $('.block .collapse').on('hide.bs.collapse', (e) => {
    const $this = $(e.currentTarget);

    $this.closest('.block').removeClass('active');
  });

  // Vh height calculation for mobile
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  // We listen to the resize event
  window.addEventListener('resize', () => {
    // We execute the same script as before
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  /* $('[data-toggle="collapse"]').on('click', (e) => {
    const $this = $(e.currentTarget);

    setTimeout(() => {
      const isExpanded = $this.attr('aria-expanded');
      console.log(isExpanded);
      $('.main-container .left-column > .block').removeClass('active');
      if (isExpanded) { $this.closest('.block').addClass('active'); }
    }, 50);
  }); */

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
