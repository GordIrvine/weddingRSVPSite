var $form = $('.rsvp-form'),
    url = 'https://script.google.com/macros/s/AKfycbzHoTADRXZvoG7PuReI9ExAQ7P_pXCz6_-lGv_isqIEyWZdNeZQ/exec';

$('.rsvp-submit').on('click', function(e) {
  e.preventDefault();
  var attending = $('#yesRadio')[0].checked;
  var valid = validateRSVP(attending);
  clearUnusedQuestions(attending);

  if(valid){
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
  var partnerNamed = $('.rsvp-form input:text[name=additionalguest1]')[0].value;
  var coachAnswered = $('#noDundee')[0].checked || $('#yesDundee')[0].checked;
  var isBringingPartner = $('#yesPartner')[0].checked;
  var valid = true;
  $('.rsvp-form input[name=name]').siblings('.invalid-feedback').addClass('hidden');
  $('.rsvp-form input[name=email]').siblings('.invalid-feedback').addClass('hidden');
  $('.rsvp-form input[name=additionalguest1]').siblings('.invalid-feedback').addClass('hidden');
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
  if(!partnerNamed && isBringingPartner){
    $('.rsvp-form input[name=additionalguest1]').siblings('.invalid-feedback').removeClass('hidden');
    valid=false;
    firstInvalidElement = document.getElementById("additionalguest1");
  }
  if(!valid){
    firstInvalidElement.scrollIntoView();
  }
  return valid;
}

function showPartnerNameQuestion(isBringingPartner){
  var addguest1 = $('.rsvp-form input:text[name=additionalguest1]').parent();

  if(isBringingPartner) {
    addguest1.slideDown();
  } else if (! isBringingPartner) {
    addguest1.slideUp();
  }
}


function clearUnusedQuestions(attending){
  if(! attending) {
    $('.rsvp-form textarea[name=dietary_requirements]')[0].value = "-";
    $('#noDundee')[0].checked = "true";
  }
}

$( document ).ready(function() {
  pinFooterToggle();

  $('.rsvp-form input[name=attending]').change(function(){
    var notAttending = $('#noRadio')[0].checked;
    if(notAttending){
      $("#extendedForm").slideUp();
    } else {
      $("#extendedForm").slideDown();
    }
  });

  $('.rsvp-form input[name=partner]').change(function(){
    var isBringingPartner = $('#yesPartner')[0].checked;
    showPartnerNameQuestion(isBringingPartner);
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
