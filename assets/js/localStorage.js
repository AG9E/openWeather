var cityInput = document.querySelector('#city');
var userFormEl = document.querySelector('#user-form')
var cityList = document.querySelector("#city-list");
var cityCountSpan = document.querySelector('#todo-count');

var cities = [];

function renderHistory() {
  cityList.innerHTML = "";
  cityCountSpan.textContent = cities.length;

  for (var i = 0; i < cities.length; i++) {
      var city1 = cities[i];

      var li = document.createElement('li');
      li.textContent = city1;
      li.setAttribute('data-index', i);
      
      cityList.appendChild(li);
  }

  if (cities.length > 0){
    var button = document.createElement('button');
    button.classList.add('btn');
    button.classList.add('city-btn');
    button.textContent = 'Clear';
  
    cityList.appendChild(button);
  }

}

function init() {
  var storedCities = JSON.parse(localStorage.getItem('cities'));

  if (storedCities != null) {
      cities = storedCities;
  }

  renderHistory();
}

function storeCities() {
  localStorage.setItem('cities', JSON.stringify(cities));
}

userFormEl.addEventListener('submit', function(event) {
  event.preventDefault();

  var cityText = cityInput.value.trim();

  if (cityText === '') {
      return;
  } 

  cities.push(cityText);
  cityInput.value = '';

  storeCities();
  renderHistory();
});

cityList.addEventListener('click', function(event) {
  var element = event.target;

  if (element.matches('.city-btn') === true) {
      var index = element.parentElement.getAttribute('data-index'); 
      cities.splice(index, cities.length);

      storeCities();
      renderHistory();
  }
});

init();
