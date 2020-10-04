import $ from 'jquery';
// import 'popper.js';
import './scss/style.scss';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';

$('.initial-loader').hide();
$(() => {
  // Declare local storage
  if (localStorage.getItem('selectedMode') === null) {
    localStorage.setItem('selectedMode', 0);
  }
  // Presist Dark/light mode
  if (localStorage.selectedMode === '0') {
    $('body').removeClass('dark-mode');
  } else if (localStorage.selectedMode === '1') {
    $('body').addClass('dark-mode');
  }

  // Mapbox
  const lightDarkMode = ['mapbox://styles/sstankov/ckbfigelz17r81jo0saovsd7b', 'mapbox://styles/sstankov/ckbfim3tw45vo1imp2uc5rtyq'];
  mapboxgl.accessToken = 'pk.eyJ1Ijoic3N0YW5rb3YiLCJhIjoiY2tmZjJ0dnp2MDZkcjJxbGRuNHBkYmUwdyJ9.4s5pHSx2DyuhJJOKChZjDA';

  const map = new mapboxgl.Map({
    container: 'map-wrapper',
    style: `${lightDarkMode[localStorage.selectedMode]}?optimize=true`, // stylesheet location by default
    attributionControl: false,
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9, // starting zoom
  });

  const markerHeight = 60;
  const markerRadius = 60;
  const linearOffset = 0;
  const popupOffsets = {
    top: [0, 0],
    'top-left': [0, 0],
    'top-right': [0, 0],
    bottom: [0, -markerHeight],
    'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
    'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
    left: [markerRadius, (markerHeight - markerRadius) * -1],
    right: [-markerRadius, (markerHeight - markerRadius) * -1],
  };
  const popup = new mapboxgl.Popup({ anchor: 'left', offset: popupOffsets, className: 'mapbox-popup' })
    .setHTML('Popup setup!')
    .setMaxWidth('465px');

  // create a HTML element for map marker
  const el = document.createElement('div');
  el.className = 'mapbox-marker';
  el.innerHTML = '<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="white-area" fill-rule="evenodd" clip-rule="evenodd" d="M32.32 25.9199C40.7221 17.5178 52.1177 12.7976 64 12.7976C75.8823 12.7976 87.278 17.5178 95.68 25.9199C104.082 34.322 108.802 45.7176 108.802 57.5999C108.802 69.4822 104.082 80.8778 95.68 89.2799L64 120.96L32.32 89.2799C28.1595 85.1198 24.8591 80.1808 22.6074 74.7452C20.3557 69.3095 19.1968 63.4835 19.1968 57.5999C19.1968 51.7163 20.3557 45.8903 22.6074 40.4546C24.8591 35.0189 28.1595 30.08 32.32 25.9199ZM64 70.3999C67.3948 70.3999 70.6505 69.0513 73.051 66.6509C75.4514 64.2504 76.8 60.9947 76.8 57.5999C76.8 54.2051 75.4514 50.9494 73.051 48.5489C70.6505 46.1485 67.3948 44.7999 64 44.7999C60.6052 44.7999 57.3495 46.1485 54.949 48.5489C52.5486 50.9494 51.2 54.2051 51.2 57.5999C51.2 60.9947 52.5486 64.2504 54.949 66.6509C57.3495 69.0513 60.6052 70.3999 64 70.3999Z" fill="white"/><path d="M80 58.6666C80 67.5031 72.8366 74.6666 64 74.6666C55.1635 74.6666 48 67.5031 48 58.6666C48 49.83 55.1635 42.6666 64 42.6666C72.8366 42.6666 80 49.83 80 58.6666Z" fill="white"/><circle cx="64" cy="56" r="36" fill="#0085FF"/><path d="M77.0909 50H72.1818V44H49.2727C47.4645 44 46 45.3425 46 47V63.5H49.2727C49.2727 65.9825 51.4736 68 54.1818 68C56.89 68 59.0909 65.9825 59.0909 63.5H68.9091C68.9091 65.9825 71.11 68 73.8182 68C76.5264 68 78.7273 65.9825 78.7273 63.5H82V56L77.0909 50ZM54.1818 65.75C52.8236 65.75 51.7273 64.745 51.7273 63.5C51.7273 62.255 52.8236 61.25 54.1818 61.25C55.54 61.25 56.6364 62.255 56.6364 63.5C56.6364 64.745 55.54 65.75 54.1818 65.75ZM76.2727 52.25L79.4882 56H72.1818V52.25H76.2727ZM73.8182 65.75C72.46 65.75 71.3636 64.745 71.3636 63.5C71.3636 62.255 72.46 61.25 73.8182 61.25C75.1764 61.25 76.2727 62.255 76.2727 63.5C76.2727 64.745 75.1764 65.75 73.8182 65.75Z" fill="white"/></svg>';

  // integrate map marker in map
  const marker = new mapboxgl.Marker({
    element: el,
  }).setLngLat([-74.5, 40])
    .setPopup(popup) // add popups
    .addTo(map);

  // Toggle dark mode
  $('[data-toggle-dark-mode]').on('click', () => {
    $('body').toggleClass('dark-mode');

    // update local storage and map style
    if ($('body').hasClass('dark-mode')) {
      localStorage.setItem('selectedMode', 1);
      map.setStyle(lightDarkMode[localStorage.selectedMode]);
    } else {
      localStorage.setItem('selectedMode', 0);
      map.setStyle(lightDarkMode[localStorage.selectedMode]);
    }
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
