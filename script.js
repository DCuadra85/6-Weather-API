$(document).ready(function () {

    var APIKey = "38ce9d2bdb41501b21e8be2d27c623c6";
    var citySearch = "";
    var queryMainURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
    var indexUV = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey;
        //main search when clicked

  
        //main ajax to run the weather and record results
  
        function weatherSearch(queryURL){
        $.ajax({
            url: queryURL,
            method: "GET"
    
        }).then(function(response) {
            console.log(response);
            var weatherIcons = 'http://openweathermap.org/img/w/' + response.list[0].weather[0].icon + '.png';
            $('#city').text(citySearch + " " + moment().subtract(10, 'days').calendar());            
            $('#icon').attr('src', weatherIcons)
            $('#temperature').text("Temperature: " + parseInt((response.list[0].main.temp - 273.15) * 1.80 + 32) + "F");
            $('#humidity').text("Humidity: " + response.list[0].main.humidity + "%");
            $('#wind').text("Wind: " + response.list[0].wind.speed + "m/s");
            
            //possible to use Return of lat / long
  
            var latitude = response.city.coord.lat
            var longitude = response.city.coord.lon
            var uv = indexUV + '&lat' + latitude + '$lon=' + longitude
            // // catch block for errors
  
            //UV index calculation
            
            function calcUV(queryURL){
                $.ajax({
                    url: queryURL,
                    method: "GET",
  
                }).then(function(uvData){
                    var uv = uvData.value
  
                    if (uv <2 ){
                        $('#uv').text('UV Index: ' + uv).addClass('btn-success');
                    }
                    else if (uv > 5){
                        $('#uv').text('UV Index: ' + uv).addClass('btn-danger');
                    }
                    else {
                        $('#uv').text('UV Index: ' + uv).addClass('btn-warning');
                    }
                })
            }
  
                calcUV(uv);
            // $('#UV').text("UV:" + UV);
  
        //create future 5 day cards for forecast, for loop pulls deeper array
  
        for (var i=0; i < 40; i+=8){
            var weatherIcons = 'http://openweathermap.org/img/w/' + response.list[0].weather[0].icon + '.png';
  
            var newCard = $('<div>').addClass('card text-white bg-info col-2');
            var cardMainBody = $('<div>').addClass('card-body');
            var cardTitle = $('<div>').addClass('card-title').text(response.list[i].dt_txt);
            var cardCity = $('<p>').addClass('card-city').text(response.city.name);
            var cardIcon = $('<img>').attr('src', weatherIcons);
            var temperature = $('<p>').addClass('card-text').text ('Temperature: ' + parseInt((response.list[0].main.temp - 273.15) * 1.80 + 32) + 'F')
            var humidity = $('<p>').addClass('card-text').text ('Humidity: ' + response.list[0].main.humidity + '%')
            // var wind = $('<p>').addClass('card-text').text ('Wind: ' + response.wind.speed + 'mph')
  
            
            newCard.append(cardTitle, cardCity , cardMainBody)
            cardMainBody.append(cardIcon, temperature, humidity)
            $('#forecast').append(newCard)
        
            }
  
        })
    
    }

    //primary click function
    $('#search-button').on('click', function() {
        // console.log(this)
        // event.preventDefault();
        $('current-forecast').empty();
        $('#forecast').empty();
        citySearch = $('#searchValue').val().trim();
        var search = JSON.parse(localStorage.getItem('cityValue')) || [];
        search.push(citySearch);
        localStorage.setItem('cityValue', JSON.stringify(search));

        var mainSearch = queryMainURL + citySearch + "&appid=" + APIKey

        weatherSearch(mainSearch);
        addCity();
    })


    //adds button to city history
    function addCity() {
        var search = JSON.parse(localStorage.getItem('cityValue')) || [];
        $('#forecast-history').empty();
        for (var i = 0; i < search.length; i++){
            var searchList = search[i];
            var cityDiv = $('<button>').text(searchList).addClass('well btn btn-secondary btn-block').attr('city-data', searchList).attr('type', 'button')
            $('#forecast-history').append(cityDiv)
        }
    }

    $(".well").on("click", function(){
        console.log(this);
        var newURL = queryURLBase + "&q=" + this.val();
        console.log("newURL", newURL);
    
        weatherSearch(newURL);
    })

  })            
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