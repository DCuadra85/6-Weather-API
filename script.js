var APIKey = "38ce9d2bdb41501b21e8be2d27c623c6&units=imperial&units=kelvin";

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&appid=" + APIKey;

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);

})