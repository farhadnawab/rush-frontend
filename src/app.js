import $ from 'jquery';
import 'popper.js';
import './scss/style.scss';
import 'bootstrap';

$(() => {
  // Toggle dark mode
  $('[data-toggle-dark-mode]').on('click', () => {
    $('body').toggleClass('dark-mode');
  });

  // Accordion
  $('.block .collapse').on('show.bs.collapse', (e) => {
    e.stopPropagation();
    const $this = $(e.currentTarget);

    $('.blocks-wrapper > .block').removeClass('active');
    $('.blocks-wrapper > .block .collapse').collapse('hide');
    $this.closest('.block').addClass('active');
  });
  $('.block .collapse').on('hide.bs.collapse', (e) => {
    e.stopPropagation();
    const $this = $(e.currentTarget);

    $this.closest('.block').removeClass('active');
  });

  // Notify
  $('.notification-wrapper').on('click', (e) => {
    e.stopPropagation();
    const $this = $(e.currentTarget);

    $this.toggleClass('active');

    // For Mobile
    if (window.matchMedia('(max-width: 768px)') && $this.hasClass('active')) {
      $('.main-container').not('.mobile-layout-1').animate({
        scrollTop: 0,
      });
    }
  });

  // Mobile menu
  $(document).on('show.bs.collapse', '.navbar-collapse', (e) => {
    const $this = $(e.target);

    if ($this.hasClass('navbar-collapse')) {
      $('body').addClass('navbar-active');
    }
  });
  $(document).on('hide.bs.collapse', '.navbar-collapse', (e) => {
    const $this = $(e.target);

    if ($this.hasClass('navbar-collapse')) {
      $('body').removeClass('navbar-active');
    }
  });
  // Mobile menu dropdown
  $(document).on('show.bs.dropdown', '.navbar-collapse', (e) => {
    e.stopPropagation();
    const $this = $(e.currentTarget);

    $this.addClass('dropdown-active');
  });
  $(document).on('hide.bs.dropdown', '.navbar-collapse', (e) => {
    e.stopPropagation();
    const $this = $(e.currentTarget);

    $this.removeClass('dropdown-active');
  });
  $(document).on('click', '.navbar-collapse .dropdown-menu', (e) => {
    e.stopPropagation();
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
