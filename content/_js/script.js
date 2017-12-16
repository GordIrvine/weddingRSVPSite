var $form = $('.rsvp-form'),
    url = 'https://script.google.com/macros/s/AKfycbzHoTADRXZvoG7PuReI9ExAQ7P_pXCz6_-lGv_isqIEyWZdNeZQ/exec';

$('.rsvp-submit').on('click', function(e) {
  e.preventDefault();
  var attending = $('#yesRadio')[0].checked;
  var valid = validateRSVP(attending);
  clearUnusedQuestions(attending);
  var numGuests = $('.rsvp-form select[name=guests]')[0].value;
  clearUnusedGuestsNames(numGuests);

  if(!valid){
//    location.hash = '#ewForm';
  } else if(valid){
  var jqxhr = $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: $form.serializeObject()
  }).then(successCallback, errorCallback);
  console.log(jqxhr);
  //window.open("index.htm", "_parent");
}
});

function successCallback(response){
    window.open("confirmation.htm", "_parent");
}
function errorCallback(error){
    window.open("error.htm", "_parent");
}

function validateRSVP(attending){
  var name = $('.rsvp-form input[name=name]')[0].value;
  var email = $('.rsvp-form input[name=email]')[0].value;
  var coachAnswered = $('#noDundee')[0].checked || $('#yesDundee')[0].checked;
  var valid = true;
  $('.rsvp-form input[name=name]').siblings('.invalid-feedback').addClass('hidden');
  $('.rsvp-form input[name=email]').siblings('.invalid-feedback').addClass('hidden');
  $('.rsvp-form .radio').siblings('.invalid-feedback').addClass('hidden');

  var firstInvalidElement;

  if(attending && !coachAnswered){
    $('.rsvp-form .radio').siblings('.invalid-feedback').removeClass('hidden');
    valid=false;
    firstInvalidElement = document.getElementById("dundeeQuestion");
  }
  if(!email || ! /^(.+)@(.+){2,}\.(.+){2,}$/.test(email)){
    $('.rsvp-form input[name=email]').siblings('.invalid-feedback').removeClass('hidden');
    valid=false;
    firstInvalidElement = document.getElementById("emailQuestion");
  }
  if(!name){
    $('.rsvp-form input[name=name]').siblings('.invalid-feedback').removeClass('hidden');
    valid=false;
    firstInvalidElement = document.getElementById("nameQuestion");
  }
  if(!valid){
    firstInvalidElement.scrollIntoView();
  }
  return valid;
}

function showAdditionalGuestsQuestions(numAdditionalGuests){
  var addguest1 = $('.rsvp-form input:text[name=additionalguest1]').parent();
  var addguest2 = $('.rsvp-form input:text[name=additionalguest2]').parent();
  var addguest3 = $('.rsvp-form input:text[name=additionalguest3]').parent();
  addguest1.addClass('hidden');
  addguest2.addClass('hidden');
  addguest3.addClass('hidden');

  if(numAdditionalGuests == 1) {
    addguest1.removeClass('hidden');
  } else if (numAdditionalGuests == 2) {
    addguest1.removeClass('hidden');
    addguest2.removeClass('hidden');
  } else if (numAdditionalGuests == 3) {
    addguest1.removeClass('hidden');
    addguest2.removeClass('hidden');
    addguest3.removeClass('hidden');
  }
}


function clearUnusedQuestions(attending){
  if(! attending) {
    $('.rsvp-form select[name=guests]')[0].value = 0;
    $('.rsvp-form textarea[name=dietary_requirements]')[0].value = "-";
    $('#noDundee')[0].checked = "true";
  }
}

function clearUnusedGuestsNames(numAdditionalGuests){
  if(numAdditionalGuests == 0) {
    $('.rsvp-form input:text[name=additionalguest1]')[0].value = "-";
    $('.rsvp-form input:text[name=additionalguest2]')[0].value = "-";
    $('.rsvp-form input:text[name=additionalguest3]')[0].value = "-";
  } else if(numAdditionalGuests == 1) {
    $('.rsvp-form input:text[name=additionalguest2]')[0].value = "-";
    $('.rsvp-form input:text[name=additionalguest3]')[0].value = "-";
  } else if (numAdditionalGuests == 2) {
    $('.rsvp-form input:text[name=additionalguest3]')[0].value = "-";
  } else {
    console.log("Error... num additional guests: "+numAdditionalGuests);
  }
}

$( document ).ready(function() {
  pinFooterToggle();
  var guestCount = $('.rsvp-form select[name=guests]');

  $('.rsvp-form input[name=attending]').change(function(){
    var notAttending = $('#noRadio')[0].checked;
    if(notAttending){
      $("#extendedForm").slideUp();
    } else {
      $("#extendedForm").slideDown();
      showAdditionalGuestsQuestions(guestCount[0].value);
    }
  });

  guestCount.change(function(){
    var value = this.value;
    showAdditionalGuestsQuestions(value);
  });

});

$(window).resize(function() {
  pinFooterToggle()
});

function pinFooterToggle() {
  var windowHeight = $(window).height();
  var footer = $("footer");
  var totalContentHeight = $("body").outerHeight(true) + footer.outerHeight(true);

  if (totalContentHeight < windowHeight && !footer.hasClass("footerLargeResolution")) {
    footer.addClass("footerLargeResolution");

  } else if (totalContentHeight >= windowHeight && footer.hasClass("footerLargeResolution")) {
    footer.removeClass("footerLargeResolution");
  }
}


$('.navbar-toggle').on('click', function(e) {
  var collapsed = $('.navbar-toggle').hasClass("collapsed");
  var bgImage = $('.imghead-index');
  var navbar = $('.navbar-default');
  var navrsvp = $('.navbar-rsvp');
  var navbarnav = $('.navbar-nav');
  var navbarbrand = $('.navbar-brand');
  if(collapsed === true) {
    bgImage.addClass('navbar-expanded');
    navbar.addClass('navbar-sm');
    navrsvp.removeClass('navbar-rsvp');
    navbarbrand.css('color', 'black');
  };
  if (collapsed === false) {
    navbar.removeClass('navbar-sm');
    bgImage.removeClass('navbar-expanded');
    navrsvp.addClass('navbar-rsvp');
    navbarbrand.removeClass('navbar-list-sm');
    navbarbrand.css('color', 'gold');
  };
});
