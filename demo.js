const cityEl = document.getElementById('city')
const zipcodeEl = document.getElementById('zipcode')
const countryEl = document.getElementById('country')
const continentEl = document.getElementById('continent')

var fillInPage = (function() {
  var updateLocationText = function(geoipResponse) {
    var cityName = geoipResponse.city.names.en || 'n/a'
    console.log(geoipResponse)
    const zipcode = geoipResponse.postal.code || 'n/a'
    const country = geoipResponse.country.names.en || 'n/a'
    const continent = geoipResponse.continent.names.en || 'n/a'
    cityEl.textContent = cityName
    zipcodeEl.textContent = zipcode
    continentEl.textContent = continent

    if (country === 'United States') {
      countryEl.textContent = 'the ' + country
    } else {
      countryEl.textContent = country
    }
  };

  var onSuccess = function(geoipResponse) {
    updateLocationText(geoipResponse);
  };

  var onError = function(error) {
    cityEl.textContent = 'an error!  Please try again later...'
    zipcodeEl.textContent = 'undetermined'
    countryEl.textContent = 'undetermined'
    continentEl.textContent = 'undetermined'
  };

  return function() {
    if (typeof geoip2 !== 'undefined') {
      geoip2.city(onSuccess, onError);
    } else {
      cityEl.textContent = 'a browser that blocks GeoIP2 requests'
      zipcodeEl.textContent = 'undetermined'
      countryEl.textContent = 'undetermined'
      continentEl.textContent = 'undetermined'
    }
  };
}());

window.addEventListener('load', fillInPage)

