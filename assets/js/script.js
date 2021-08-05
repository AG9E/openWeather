var cityInput = document.querySelector('#city');
var userFormEl = document.querySelector('#user-form')
var cityList = document.querySelector("#city-list");
var cityCountSpan = document.querySelector('#todo-count');

// $.getScript('localStorage.js');

var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = cityInput.value.trim();

    if (city) {
      weatherBalloon(city);
      cityInput.value = '';
    }

};

function weatherBalloon( cityID ) {
    var key = '8426d948b8d4bb92ef346cda32941a6d';
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityID + '&appid=' + key)  
    .then(function(resp) { return resp.json() })
    .then(function(data) {
      console.log(data);
    })
    .catch(function() {
    });
}

function drawWeather( d ) {
    var celcius = Math.round(parseFloat(d.main.temp)-273.15);
	var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
	
	document.getElementById('description').innerHTML = d.weather[0].description;
	document.getElementById('temp').innerHTML = celcius + '&deg;';
	document.getElementById('location').innerHTML = d.name;
}

function weatherBalloon( cityID ) {
	var key = '8426d948b8d4bb92ef346cda32941a6d';
	fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityID+ '&appid=' + key)  
	.then(function(resp) { return resp.json() }) 
	.then(function(data) {
		drawWeather(data);
	})
	.catch(function() {
	});
}

function drawWeather( d ) {
	var celcius = Math.round(parseFloat(d.main.temp)-273.15);
	var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
	var description = d.weather[0].description;
	
	document.getElementById('description').innerHTML = description;
	document.getElementById('temp').innerHTML = celcius + '&deg;';
	document.getElementById('location').innerHTML = d.name;
	
    if( description.indexOf('rain') > 0 ) {
        document.getElementById('weatherConditions').classList.add('rainy');
    } else if( description.indexOf('cloud') > 0 ) {
        document.getElementById('weatherConditions').classList.add('cloudy');
    } else if( description.indexOf('sunny') > 0 ) {
        document.getElementById('weatherConditions').classList.add('sunny');
    } else {
        document.getElementById('weatherConditions').classList.add('clear');
    }
  }

userFormEl.addEventListener('submit', formSubmitHandler);