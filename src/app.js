import $ from 'jquery';
// import 'popper.js';
import './scss/style.scss';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/toast';

setTimeout(() => {
  $('.initial-loader').fadeOut("slow");
}, 500);
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

  markerHtml[2] = document.createElement('div');
  markerHtml[2].className = 'mapbox-marker';
  markerHtml[2].innerHTML = '<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="white-area" fill-rule="evenodd" clip-rule="evenodd" d="M32.32 25.92C40.7221 17.518 52.1177 12.7977 64 12.7977C75.8823 12.7977 87.278 17.518 95.68 25.92C104.082 34.3221 108.802 45.7177 108.802 57.6C108.802 69.4823 104.082 80.878 95.68 89.28L64 120.96L32.32 89.28C28.1595 85.1199 24.8591 80.181 22.6074 74.7453C20.3557 69.3096 19.1968 63.4836 19.1968 57.6C19.1968 51.7164 20.3557 45.8904 22.6074 40.4547C24.8591 35.0191 28.1595 30.0801 32.32 25.92ZM64 70.4C67.3948 70.4 70.6505 69.0514 73.051 66.651C75.4514 64.2505 76.8 60.9948 76.8 57.6C76.8 54.2052 75.4514 50.9495 73.051 48.549C70.6505 46.1486 67.3948 44.8 64 44.8C60.6052 44.8 57.3495 46.1486 54.949 48.549C52.5486 50.9495 51.2 54.2052 51.2 57.6C51.2 60.9948 52.5486 64.2505 54.949 66.651C57.3495 69.0514 60.6052 70.4 64 70.4Z" fill="white"/><path d="M80 58.6667C80 67.5032 72.8366 74.6667 64 74.6667C55.1635 74.6667 48 67.5032 48 58.6667C48 49.8301 55.1635 42.6667 64 42.6667C72.8366 42.6667 80 49.8301 80 58.6667Z" fill="white"/><circle cx="64" cy="56" r="36" fill="#0085FF"/><path d="M77.0909 50H72.1818V44H49.2727C47.4645 44 46 45.3425 46 47V63.5H49.2727C49.2727 65.9825 51.4736 68 54.1818 68C56.89 68 59.0909 65.9825 59.0909 63.5H68.9091C68.9091 65.9825 71.11 68 73.8182 68C76.5264 68 78.7273 65.9825 78.7273 63.5H82V56L77.0909 50ZM54.1818 65.75C52.8236 65.75 51.7273 64.745 51.7273 63.5C51.7273 62.255 52.8236 61.25 54.1818 61.25C55.54 61.25 56.6364 62.255 56.6364 63.5C56.6364 64.745 55.54 65.75 54.1818 65.75ZM76.2727 52.25L79.4882 56H72.1818V52.25H76.2727ZM73.8182 65.75C72.46 65.75 71.3636 64.745 71.3636 63.5C71.3636 62.255 72.46 61.25 73.8182 61.25C75.1764 61.25 76.2727 62.255 76.2727 63.5C76.2727 64.745 75.1764 65.75 73.8182 65.75Z" fill="white"/></svg>';

  markerHtml[3] = document.createElement('div');
  markerHtml[3].className = 'mapbox-marker';
  markerHtml[3].innerHTML = '<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="white-area" fill-rule="evenodd" clip-rule="evenodd" d="M32.32 25.92C40.7221 17.518 52.1177 12.7977 64 12.7977C75.8823 12.7977 87.278 17.518 95.68 25.92C104.082 34.3221 108.802 45.7177 108.802 57.6C108.802 69.4823 104.082 80.878 95.68 89.28L64 120.96L32.32 89.28C28.1595 85.1199 24.8591 80.181 22.6074 74.7453C20.3557 69.3096 19.1968 63.4836 19.1968 57.6C19.1968 51.7164 20.3557 45.8904 22.6074 40.4547C24.8591 35.0191 28.1595 30.0801 32.32 25.92ZM64 70.4C67.3948 70.4 70.6505 69.0514 73.051 66.651C75.4514 64.2505 76.8 60.9948 76.8 57.6C76.8 54.2052 75.4514 50.9495 73.051 48.549C70.6505 46.1486 67.3948 44.8 64 44.8C60.6052 44.8 57.3495 46.1486 54.949 48.549C52.5486 50.9495 51.2 54.2052 51.2 57.6C51.2 60.9948 52.5486 64.2505 54.949 66.651C57.3495 69.0514 60.6052 70.4 64 70.4Z" fill="white"/><path d="M80 58.6667C80 67.5032 72.8366 74.6667 64 74.6667C55.1635 74.6667 48 67.5032 48 58.6667C48 49.8301 55.1635 42.6667 64 42.6667C72.8366 42.6667 80 49.8301 80 58.6667Z" fill="white"/><circle cx="64" cy="56" r="32" fill="#0085FF"/><path fill-rule="evenodd" clip-rule="evenodd" d="M64.0001 40C61.8784 40 59.8436 40.8429 58.3433 42.3431C56.843 43.8434 56.0001 45.8783 56.0001 48V50H54.0001C53.5078 50 53.0327 50.1816 52.6659 50.51C52.2991 50.8384 52.0663 51.2906 52.0121 51.78L50.0121 69.78C49.9812 70.0595 50.0096 70.3424 50.0954 70.6102C50.1812 70.878 50.3225 71.1247 50.5101 71.3342C50.6977 71.5437 50.9274 71.7113 51.1841 71.826C51.4409 71.9407 51.7189 72 52.0001 72H76.0001C76.2814 72 76.5594 71.9407 76.8162 71.826C77.0729 71.7113 77.3026 71.5437 77.4902 71.3342C77.6778 71.1247 77.8191 70.878 77.9049 70.6102C77.9907 70.3424 78.0191 70.0595 77.9881 69.78L75.9881 51.78C75.934 51.2906 75.7012 50.8384 75.3344 50.51C74.9676 50.1816 74.4925 50 74.0001 50H72.0001V48C72.0001 45.8783 71.1573 43.8434 69.657 42.3431C68.1567 40.8429 66.1219 40 64.0001 40ZM68.0001 50V48C68.0001 46.9391 67.5787 45.9217 66.8286 45.1716C66.0784 44.4214 65.061 44 64.0001 44C62.9393 44 61.9219 44.4214 61.1717 45.1716C60.4216 45.9217 60.0001 46.9391 60.0001 48V50H68.0001ZM56.0001 56C56.0001 55.4696 56.2109 54.9609 56.5859 54.5858C56.961 54.2107 57.4697 54 58.0001 54C58.5306 54 59.0393 54.2107 59.4143 54.5858C59.7894 54.9609 60.0001 55.4696 60.0001 56C60.0001 56.5304 59.7894 57.0391 59.4143 57.4142C59.0393 57.7893 58.5306 58 58.0001 58C57.4697 58 56.961 57.7893 56.5859 57.4142C56.2109 57.0391 56.0001 56.5304 56.0001 56ZM70.0001 54C69.4697 54 68.961 54.2107 68.5859 54.5858C68.2108 54.9609 68.0001 55.4696 68.0001 56C68.0001 56.5304 68.2108 57.0391 68.5859 57.4142C68.961 57.7893 69.4697 58 70.0001 58C70.5306 58 71.0393 57.7893 71.4143 57.4142C71.7894 57.0391 72.0001 56.5304 72.0001 56C72.0001 55.4696 71.7894 54.9609 71.4143 54.5858C71.0393 54.2107 70.5306 54 70.0001 54Z" fill="white"/></svg>';

  // setting popup html
  const popupHtml = markerHtml.map((val, index) => (
    document.getElementById(`popup-${index + 1}`)?.innerHTML
      ? document.getElementById(`popup-${index + 1}`).innerHTML
      : '<div class="card-body">No popup found..</div>'
  ));

  // mapping popup html
  const popups = popupHtml.map((val) => new mapboxgl.Popup({ anchor: 'left', offset: popupOffsets, className: 'mapbox-popup' }).setHTML(val));

  // mapping marker html
  const markers = markerHtml.map((val) => new mapboxgl.Marker({ element: val }));

  // output markers on map
  const coords = [[-74.5, 40], [-74.7, 40.1], [-74.5, 40.2], [-74.3, 40.1]];
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
  if(window.matchMedia("(min-width: 768px)").matches){
    $('[data-close-others]').on('show.bs.collapse', (e) => {
      e.stopPropagation();
      const $this = $(e.currentTarget);

      if(!$this.closest('.block').hasClass('active')){
        $('.blocks-wrapper > .block').removeClass('active');
        $('.blocks-wrapper > .block [data-close-others]').collapse('hide');
        $this.closest('.block').addClass('active');
      }
    });
    $('[data-close-others]').on('hide.bs.collapse', (e) => {
      e.stopPropagation();
      const $this = $(e.currentTarget);
      
      $this.closest('.block').removeClass('active');
    });
  }

  // Notify
  $('.notification-wrapper').on('click', (e) => {
    e.stopPropagation();
    const $this = $(e.currentTarget);

    $this.toggleClass('active');

    // For Mobile
    if (window.matchMedia('(max-width: 768px)') && $this.hasClass('active')) {
      $('html, body').animate({
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

  // Mobile scrolling
  $('[data-scroll-to]').on('click', (e) => {
    const $this = $(e.currentTarget);
    
    $('html, body').animate({
      scrollTop: $($this.attr("data-scroll-to")).offset().top
    });
  })
  // Fix stick to bottom relative to top
  $(document).on('scroll', (e) => {
    const $this = $(e.currentTarget);
    
    // sticky header and footer of cards
    $('.stick-to-top').each(function(){
      const $footerDiv = $(this).closest(".card").find('.stick-to-bottom');

      if($this.scrollTop() >= ($(this).closest(".card").offset().top - 2)) {
        $footerDiv.addClass("active");
      } else {
        $footerDiv.removeClass("active");
      }
    });

    // elastic scroll hack
    if($(".ios-elastic-scroll-hack").length > 0)
      $(".ios-elastic-scroll-hack").css("top", $(".left-column").offset().top - $this.scrollTop());
  });
  // trigger on load (elastic scroll hack)
  if($(".ios-elastic-scroll-hack").length > 0)
    $(".ios-elastic-scroll-hack").css("top", $(".left-column").offset().top - $(document).scrollTop());
  $(window).on('resize', () => {
    // trigger on resize (elastic scroll hack)
    if($(".ios-elastic-scroll-hack").length > 0)
      $(".ios-elastic-scroll-hack").css("top", $(".left-column").offset().top - $(document).scrollTop());
  }); 

  // scroll to active card on mobile
  if(window.matchMedia('(max-width: 768px)')){

    if($(".main-container > .left-column .blocks-wrapper > .block.active").length > 0){
      $('html, body').animate({
        scrollTop: $(".main-container > .left-column .blocks-wrapper > .block.active").offset().top
      });
    }
  }

  // Remember me
  $('#remember-me-block .close-btn, #remember-me-btn, #remember-me-not-btn').on('click', (e) => {
    const $this = $(e.currentTarget);
    
    $('#remember-me-block').hide();
  })

  // Mobile Policy, Terms and services
  $('[data-open-dropdown]').on('click', (e) => {
    const $this = $(e.currentTarget);
    const $targetEl = $($this.attr("href"));

    $targetEl.children(".dropdown-toggle").dropdown('show');
    return false;
  })
  
  // Form validation -- Bootstrap way
  // Loop over them and prevent submission
  $('.tracking-order-form').submit(function(event) {
    event.preventDefault();
    event.stopPropagation();

    const isvalidate = $(this)[0].checkValidity();

    $(this).addClass('was-validated');

    if (isvalidate) {
      $(".tracking-order-form-wrapper").fadeOut(function(){
        $(".tracking-order-animation-wrapper").fadeIn(function(){
          setTimeout(() => {
            $("#tracking-order").fadeOut(function(){
              $("#multiple-shipments").css("display", "flex").hide().fadeIn();
            })
          }, 8000);
        });
      });
    }
  });

  // show modals on page load
  $('.modal[data-show="true"]').modal();

  // Initialize toast if available
  setTimeout(() => {
    if($('.toast').length > 0)
      $('.toast').toast('show');
  }, 500);
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

var rem = function rem() {
  var html = document.getElementsByTagName('html')[0];

  return function () {
      return parseInt(window.getComputedStyle(html)['fontSize']);
  }
}();

function toRem(length) {
  return (parseInt(length) / rem());
}