$(document).ready(function () {

    var APIKey = "38ce9d2bdb41501b21e8be2d27c623c6&units=imperial&units=imperial";
    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=" + APIKey;
    var fiveDay = "api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=" + APIKey;
    var indexUV = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey;
        
        //main search when clicked
        $('#search-button').on('click', function() {
            console.log(this)
            // event.preventDefault();
            var citySearch = $('#search-value').val();
            $('#search-value').val('')
            var search = JSON.parse(localStorage.getItem("citySearch")) || []
            search.push(citySearch)
            localStorage.setItem('citySearch', JSON.stringify(search))

        })

        //
        
        // -- this is for when I implement localstorage
        //
        // function weatherSearch(citySearch) {}

        //main ajax to run the weather and record results
        $.ajax({
            url: queryURL,
            method: "GET"
    
        }).then(function(response) {
            console.log(response);
            var weatherIcons = 'http://openweathermap.org/img/w/' + response.list[0].weather[0].icon + '.png';
            $('#city').text(response.name);
            // $('#icon').attr('src', icon); this is going to be pulled from response.weather[0] array.
            $('#icon').attr('src', weatherIcons)
            $('#temperature').text(response.main.temp);
            $('#humidity').text(response.main.humidity);
            $('#windspeed').text(response.wind.speed);
            // $('#UV').text(response.) need lat / long to make this work
            //possible to use Return of lat / long

            var latitude = response.city.coord.lat
            var longitude = response.city.coord.lon
            var valueUV = indexUV + '&lat' + latitude + '$lon=' + longitude
            //catch block for errors

            //UV index calculation

            // function calcUV(queryURL){
            //     $.ajax({
            //         url: queryURL,
            //         method: "GET",

            //     }).then(function(uvValue){
            //         var UV = uvValue.value

            //         if (UV <2 ){
            //             $('#UV').text(UV).addClass('low');
            //         }
            //         else if (UV > 5){
            //             $('#UV').text(UV).addClass('high');
            //         }
            //         else {
            //             ${'#UV'}.text(UV).addClass('med');
            //         }
            //     })
            // }
        
        

        calcUV(valueUV);


        //create future 5 day cards for forecast

        for (var i=0; i < 40; i+=8){
            var weatherIcons = 'http://openweathermap.org/img/w/' + response.list[0].weather[0].icon + '.png';

            var newCard = $('<div>').addClass('card text-white bg-info');
            var cardMainBody = $('<div>').addClass('card-body');
            var cardTitle = $('<div>').addClass('card-title').text(response.list[i].dt_txt);
            var cardIcon = $('<img>').attr('src', weatherIcons);
            var temperature = $('<p>').addClass('card-text').text ('Temperature: ' response.main.temp 'F')
            var humidity = $('<p>').addClass('card-text').text ('Humidity: ' + response.main.humidity + '%')
            var wind = $('<p>').addClass('card-text').text ('Wind: ' + response.wind.speed + 'mph')

            newCard.append()
            card
            $('#forecast').append(newCard)
        
        }

    })

}             
        //global variable - holds value of current city and if user enters same name, stop request
        //
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