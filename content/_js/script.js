var $form = $('.rsvp-form'),
    url = 'https://script.google.com/macros/s/AKfycbzHoTADRXZvoG7PuReI9ExAQ7P_pXCz6_-lGv_isqIEyWZdNeZQ/exec'

$('.rsvp-submit').on('click', function(e) {
  e.preventDefault();
  var valid = validateRSVP();
  var attending = $('#yesRadio')[0].checked;
  clearUnusedQuestions(attending);
  var numGuests = $('.rsvp-form select[name=guests]')[0].value;
  clearUnusedGuestsNames(numGuests);

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
})

function successCallback(response){
    window.open("confirmation.htm", "_parent");
}
function errorCallback(error){
  //gergre
    window.open("error.htm", "_parent");
}

function validateRSVP(){
  var name = $('.rsvp-form input[name=name]')[0].value;
  var email = $('.rsvp-form input[name=email]')[0].value;
  var valid = true;
  $('.rsvp-form input[name=name]').siblings('.invalid-feedback').addClass('hidden');
  $('.rsvp-form input[name=email]').siblings('.invalid-feedback').addClass('hidden');

  if(!name){
    $('.rsvp-form input[name=name]').siblings('.invalid-feedback').removeClass('hidden');
    valid=false;
  }
  if(!email || ! /^(.+)@(.+){2,}\.(.+){2,}$/.test(email)){
    $('.rsvp-form input[name=email]').siblings('.invalid-feedback').removeClass('hidden');
    valid=false;
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
var guestCount = $('.rsvp-form select[name=guests]');

$('.rsvp-form input[name=attending]').change(function(){
  var notAttending = $('#noRadio')[0].checked;
  if(notAttending){
    $(".attendeeQuestions").addClass("hidden");
  } else {
    $(".attendeeQuestions").removeClass("hidden");
    showAdditionalGuestsQuestions(guestCount[0].value);
  }
});

guestCount.change(function(){
  var value = this.value;
  showAdditionalGuestsQuestions(value);
})

});
