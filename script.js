$(document).ready(function () {

var APIKey = "38ce9d2bdb41501b21e8be2d27c623c6&units=imperial&units=imperial";

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&appid=" + APIKey;


    $('search-button').on('click', function() {
        console.log(this)
        var citySearch = $('#search-value').val();
        $('#search-value').val('')
    
    })


    function weatherSearch(citySearch) {

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function(response) {
        console.log(response);
        
    })
        var newCard = $('<div>').addClass('card')

        var wind = $('<p>').addClass('card-text').text ('Wind' + DataCue.wind.speed + 'mph')
    }



})