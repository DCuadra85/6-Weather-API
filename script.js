$(document).ready(function () {

    var APIKey = "38ce9d2bdb41501b21e8be2d27c623c6&units=imperial&units=imperial";
    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&appid=" + APIKey;
    
    
        $('search-button').on('click', function() {
            console.log(this)
            var citySearch = $('#search-value').val();
            $('#search-value').val('')
        
        })
     
        // function weatherSearch(citySearch) {}
    
        $.ajax({
            url: queryURL,
            method: "GET"
    
        }).then(function(response) {
            console.log(response);
            
        })
            //create classes that auto append based on city searched
            var newCard = $('<div>').addClass('card')
            //icon somehow
            var temperature = $('<p>').addClass('card-text').text ('Temperature: ' response.main.temp)
            var humidity = $('<p>').addClass('card-text').text ('Humidity: ' + response.main.humidity)
            var wind = $('<p>').addClass('card-text').text ('Wind' + response.wind.speed + 'mph')
    
    })


    // Come up with card system to fully show case

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city


// html base shape has search results on left, right side will be segmented into 2 rows.
// row 1 has main card with today
// row 2 shows future forecasts, research how to pull the dates. Maybe a loop that counts up?
// how do I add icons for rain or shine?