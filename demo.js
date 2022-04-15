var fillInPage = (function() {
  var updateCityText = function(geoipResponse) {

    /*
     * It's possible that we won't have any names for this city.
     * For language codes with a special character such as pt-BR,
     * replace names.en with names['pt-BR'].
    */
    var cityName = geoipResponse.city.names.en || 'your city';
    console.log('in here')
    console.log(geoipResponse)
    const zipcode = geoipResponse.postal.code
    document.getElementById('city').innerHTML = cityName
    document.getElementById('zipcode').textContent = zipcode
  };

  var onSuccess = function(geoipResponse) {
    updateCityText(geoipResponse);
  };

  // If we get an error, we will display an error message
  var onError = function(error) {
    document.getElementById('city').innerHTML = 'an error!  Please try again..'
    document.getElementById('zipcode').textContent = 'undetermined.'
  };

  return function() {
    if (typeof geoip2 !== 'undefined') {
      geoip2.city(onSuccess, onError);
    } else {
      document.getElementById('city').innerHTML = 'a browser that blocks GeoIP2 requests'
      document.getElementById('zipcode').textContent = 'undetermined.'
    }
  };
}());

fillInPage();
