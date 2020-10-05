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

  // popup styling
  const markerHeight = 55;
  const markerRadius = 55;
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

  // setting marker html
  const markerHtml = [];
  markerHtml[0] = document.createElement('div');
  markerHtml[0].className = 'mapbox-marker';
  markerHtml[0].innerHTML = '<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="white-area" fill-rule="evenodd" clip-rule="evenodd" d="M32.32 25.92C40.7221 17.518 52.1177 12.7977 64 12.7977C75.8823 12.7977 87.278 17.518 95.68 25.92C104.082 34.3221 108.802 45.7177 108.802 57.6C108.802 69.4823 104.082 80.878 95.68 89.28L64 120.96L32.32 89.28C28.1595 85.1199 24.8591 80.181 22.6074 74.7453C20.3557 69.3096 19.1968 63.4836 19.1968 57.6C19.1968 51.7164 20.3557 45.8904 22.6074 40.4547C24.8591 35.0191 28.1595 30.0801 32.32 25.92ZM64 70.4C67.3948 70.4 70.6505 69.0514 73.051 66.651C75.4514 64.2505 76.8 60.9948 76.8 57.6C76.8 54.2052 75.4514 50.9495 73.051 48.549C70.6505 46.1486 67.3948 44.8 64 44.8C60.6052 44.8 57.3495 46.1486 54.949 48.549C52.5486 50.9495 51.2 54.2052 51.2 57.6C51.2 60.9948 52.5486 64.2505 54.949 66.651C57.3495 69.0514 60.6052 70.4 64 70.4Z" fill="white"/><path d="M80 58.6667C80 67.5032 72.8366 74.6667 64 74.6667C55.1635 74.6667 48 67.5032 48 58.6667C48 49.8301 55.1635 42.6667 64 42.6667C72.8366 42.6667 80 49.8301 80 58.6667Z" fill="white"/><circle cx="64" cy="56" r="36" fill="#0085FF"/><path d="M77.0909 50H72.1818V44H49.2727C47.4645 44 46 45.3425 46 47V63.5H49.2727C49.2727 65.9825 51.4736 68 54.1818 68C56.89 68 59.0909 65.9825 59.0909 63.5H68.9091C68.9091 65.9825 71.11 68 73.8182 68C76.5264 68 78.7273 65.9825 78.7273 63.5H82V56L77.0909 50ZM54.1818 65.75C52.8236 65.75 51.7273 64.745 51.7273 63.5C51.7273 62.255 52.8236 61.25 54.1818 61.25C55.54 61.25 56.6364 62.255 56.6364 63.5C56.6364 64.745 55.54 65.75 54.1818 65.75ZM76.2727 52.25L79.4882 56H72.1818V52.25H76.2727ZM73.8182 65.75C72.46 65.75 71.3636 64.745 71.3636 63.5C71.3636 62.255 72.46 61.25 73.8182 61.25C75.1764 61.25 76.2727 62.255 76.2727 63.5C76.2727 64.745 75.1764 65.75 73.8182 65.75Z" fill="white"/></svg>';

  markerHtml[1] = document.createElement('div');
  markerHtml[1].className = 'mapbox-marker';
  markerHtml[1].innerHTML = '<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="white-area" fill-rule="evenodd" clip-rule="evenodd" d="M32.32 25.92C40.7221 17.518 52.1177 12.7977 64 12.7977C75.8823 12.7977 87.278 17.518 95.68 25.92C104.082 34.3221 108.802 45.7177 108.802 57.6C108.802 69.4823 104.082 80.878 95.68 89.28L64 120.96L32.32 89.28C28.1595 85.1199 24.8591 80.181 22.6074 74.7453C20.3557 69.3096 19.1968 63.4836 19.1968 57.6C19.1968 51.7164 20.3557 45.8904 22.6074 40.4547C24.8591 35.0191 28.1595 30.0801 32.32 25.92ZM64 70.4C67.3948 70.4 70.6505 69.0514 73.051 66.651C75.4514 64.2505 76.8 60.9948 76.8 57.6C76.8 54.2052 75.4514 50.9495 73.051 48.549C70.6505 46.1486 67.3948 44.8 64 44.8C60.6052 44.8 57.3495 46.1486 54.949 48.549C52.5486 50.9495 51.2 54.2052 51.2 57.6C51.2 60.9948 52.5486 64.2505 54.949 66.651C57.3495 69.0514 60.6052 70.4 64 70.4Z" fill="white"/><path d="M80 58.6667C80 67.5032 72.8366 74.6667 64 74.6667C55.1635 74.6667 48 67.5032 48 58.6667C48 49.8301 55.1635 42.6667 64 42.6667C72.8366 42.6667 80 49.8301 80 58.6667Z" fill="white"/><circle cx="64" cy="56" r="36" fill="#0085FF"/><path d="M77.0909 50H72.1818V44H49.2727C47.4645 44 46 45.3425 46 47V63.5H49.2727C49.2727 65.9825 51.4736 68 54.1818 68C56.89 68 59.0909 65.9825 59.0909 63.5H68.9091C68.9091 65.9825 71.11 68 73.8182 68C76.5264 68 78.7273 65.9825 78.7273 63.5H82V56L77.0909 50ZM54.1818 65.75C52.8236 65.75 51.7273 64.745 51.7273 63.5C51.7273 62.255 52.8236 61.25 54.1818 61.25C55.54 61.25 56.6364 62.255 56.6364 63.5C56.6364 64.745 55.54 65.75 54.1818 65.75ZM76.2727 52.25L79.4882 56H72.1818V52.25H76.2727ZM73.8182 65.75C72.46 65.75 71.3636 64.745 71.3636 63.5C71.3636 62.255 72.46 61.25 73.8182 61.25C75.1764 61.25 76.2727 62.255 76.2727 63.5C76.2727 64.745 75.1764 65.75 73.8182 65.75Z" fill="white"/></svg>';

  // setting popup html
  const popupHtml = [];
  popupHtml[0] = document.getElementById('popup-1').innerHTML;
  popupHtml[1] = document.getElementById('popup-1').innerHTML;

  // mapping popup html
  const popups = popupHtml.map((val) => new mapboxgl.Popup({ anchor: 'left', offset: popupOffsets, className: 'mapbox-popup' }).setHTML(val));

  // mapping marker html
  const markers = markerHtml.map((val) => new mapboxgl.Marker({ element: val }));

  // output markers on map
  const coords = [[-74.5, 40], [-74.7, 40.1]];
  markers.forEach((e, index) => {
    e.setLngLat(coords[index])
      .setPopup(popups[index].setMaxWidth('465px')) // add popups
      .addTo(map);
  });

  // popup event
  popups.forEach((e) => {
    e.on('open', () => {
      $('body').addClass('popup-active');
    });
    e.on('close', () => {
      $('body').removeClass('popup-active');
    });
  });

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
