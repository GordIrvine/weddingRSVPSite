var $form = $('.rsvp-form'),
    url = 'https://script.google.com/macros/s/AKfycbzHoTADRXZvoG7PuReI9ExAQ7P_pXCz6_-lGv_isqIEyWZdNeZQ/exec'

$('.rsvp-submit').on('click', function(e) {
  e.preventDefault();

  var jqxhr = $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: $form.serializeObject()
  }).then(successCallback, errorCallback);
  console.log(jqxhr);
  //window.open("index.htm", "_parent");
})

function successCallback(response){
    window.open("confirmation.htm", "_parent");
}
function errorCallback(error){
    window.open("error.htm", "_parent");
}
