import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import './scss/style.scss';

$(() => {
  // Toggle dark mode
  $('[data-toggle-dark-mode]').on('click', () => {
    $('body').toggleClass('dark-mode');
  });
});
