var locationSearch = $("#searchBox");

var searchedCities = [];
if (localStorage.getItem("searchedCitiesStringify") === null) {
    localStorage.setItem("searchedCitiesStringify", JSON.stringify(searchedCities));
} else {
    searchedCities = JSON.parse(localStorage.getItem("searchedCitiesStringify"));
    for (var i = 0; i < searchedCities.length; i++) {
        console.log(i);
        $("#enteredCity").append("<button>" + searchedCities[i] + "</button>");
        $("#enteredCity").children().attr("class", "row btn btn-primary m-1 mb-2 w-100");
    }
}

//Function leveraging moment.js to show current time
let currentTimeShown = function () {
    let currentTime = moment().format("Do MMM YYYY, ddd / HH:mm:ss");
    $("#currentTime").text('Today is a ' + currentTime);
};

//Shown time updated every second
setInterval(currentTimeShown, 1000);


// function searchSubmit(event) {
//     event.preventDefault();

//     searchedCities = JSON.parse(localStorage.getItem("searchedCitiesStringify"));
//     searchedCities.push(locationSearch.trim());
//     console.log(searchedCities);
//     localStorage.setItem("searchedCitiesStringify", JSON.stringify(searchedCities));
//     console.log(searchedCities);

// }


var geocodingLat = [];
var geocodingLon = [];

var weatherTodayUrl;
var weatherForecastUrl;
var geocodingUrl;
var geocodingObject;


var locationEntry;


$('#submit').on('click', function (event) {
    event.preventDefault();

    searchedCities = JSON.parse(localStorage.getItem("searchedCitiesStringify"));

    locationEntry = locationSearch.val().toUpperCase().trim();

    geocodingUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + locationEntry + '&limit=1&appid=3cbcebba60d585a203f6e51f482d9176';

    fetch(geocodingUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                if (data.length === 0) {
                    alert("Invalid city input!");
                }
                else {
                    // console.log(data[0].lon + "   " + data[0].country );
                    weatherTodayUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + data[0].lat + '&lon=' + data[0].lon + "&units=imperial" + "&appid=3cbcebba60d585a203f6e51f482d9176";
                    weatherForecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + data[0].lat + '&lon=' + data[0].lon + "&units=imperial" + "&appid=3cbcebba60d585a203f6e51f482d9176";
                    // console.log(weatherUrl);

                    fetch(weatherTodayUrl).then(function (response) {
                        if (response.ok) {
                            response.json().then(function (data) {
                                //console.log(data.main.temp);
                                $('#dayCard0').children().eq(0).html(data.name + " (" + moment().format("YYYY-MM-DD") + ")");
                                $('#dayCard0').children().eq(2).children().eq(1).attr('src', 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png');
                                $('#dayCard0').children().eq(2).children().eq(2).html('Temperature: ' + data.main.temp + '°F');
                                $('#dayCard0').children().eq(2).children().eq(3).html('Wind Speed: ' + data.wind.speed + ' mph');
                                $('#dayCard0').children().eq(2).children().eq(4).html('Humidity: ' + data.main.humidity + '%');
                            });
                        } else {
                            alert("404, not found!");
                        }
                    });

                    fetch(weatherForecastUrl).then(function (response) {
                        if (response.ok) {
                            response.json().then(function (data) {
                                //    console.log(data.list[6].wind);
                                for (var i = 0; i < 5; i++) {
                                    //console.log("temp at" + data.list[2+(i*8)].dt_txt + "is" + data.list[2+(i*8)].main.temp);
                                    // console.log($('#dayCard'+(i+1)).children().eq(0).html());
                                    $('#dayCard' + (i + 1)).children().eq(0).html(data.list[2 + (i * 8)].dt_txt.split(" ")[0]);
                                    console.log(data.list[2 + (i * 8)].weather[0].icon);
                                    $('#dayCard' + (i + 1)).children().eq(1).children().eq(1).attr('src', 'http://openweathermap.org/img/wn/' + data.list[3 + (i * 8)].weather[0].icon + '@2x.png');
                                    $('#dayCard' + (i + 1)).children().eq(1).children().eq(2).html('Temperature: ' + data.list[3 + (i * 8)].main.temp + '°F');
                                    $('#dayCard' + (i + 1)).children().eq(1).children().eq(3).html('Wind Speed: ' + data.list[3 + (i * 8)].wind.speed + ' mph');
                                    $('#dayCard' + (i + 1)).children().eq(1).children().eq(4).html('Humidity: ' + data.list[3 + (i * 8)].main.humidity + '%');
                                }
                            });
                        } else {
                            alert("404, not found!");
                        }
                    });

                    if (!searchedCities.includes(locationEntry)) {
                        var currentCityIndex = searchedCities.length;
                        searchedCities.push(locationEntry);
                        // console.log(searchedCities);
                        localStorage.setItem("searchedCitiesStringify", JSON.stringify(searchedCities));
                        // console.log(searchedCities);

                        $("#enteredCity").append("<button>" + locationEntry + "</button>");
                        $("#enteredCity").children().attr("class", "row btn btn-primary m-1 mb-2 w-100");
                        console.log($("#enteredCity").children());
                        console.log($("#enteredCity").children().eq(currentCityIndex)[0]);

                        ($("#enteredCity").children().eq(currentCityIndex)[0]).click(function (event) {
                            event.preventDefault();

                            // event.target = this.init[i];
                            console.log("I am clicked + I am the city" + $("#enteredCity").children().eq(currentCityIndex)[0]);

                            fetch(geocodingUrl).then(function (response) {
                                if (response.ok) {
                                    response.json().then(function (data) {

                                        // console.log(data[0].lon + "   " + data[0].country );
                                        weatherTodayUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + data[0].lat + '&lon=' + data[0].lon + "&units=imperial" + "&appid=3cbcebba60d585a203f6e51f482d9176";
                                        weatherForecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + data[0].lat + '&lon=' + data[0].lon + "&units=imperial" + "&appid=3cbcebba60d585a203f6e51f482d9176";
                                        // console.log(weatherUrl);

                                        fetch(weatherTodayUrl).then(function (response) {
                                            if (response.ok) {
                                                response.json().then(function (data) {
                                                    //console.log(data.main.temp);
                                                    $('#dayCard0').children().eq(0).html(data.name + " (" + moment().format("YYYY-MM-DD") + ")");
                                                    $('#dayCard0').children().eq(2).children().eq(1).attr('src', 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png');
                                                    $('#dayCard0').children().eq(2).children().eq(2).html('Temperature: ' + data.main.temp + '°F');
                                                    $('#dayCard0').children().eq(2).children().eq(3).html('Wind Speed: ' + data.wind.speed + ' mph');
                                                    $('#dayCard0').children().eq(2).children().eq(4).html('Humidity: ' + data.main.humidity + '%');
                                                });
                                            } else {
                                                alert("Something went wrong!");
                                            }
                                        });

                                        fetch(weatherForecastUrl).then(function (response) {
                                            if (response.ok) {
                                                response.json().then(function (data) {
                                                    //    console.log(data.list[6].wind);
                                                    for (var i = 0; i < 5; i++) {
                                                        //console.log("temp at" + data.list[2+(i*8)].dt_txt + "is" + data.list[2+(i*8)].main.temp);
                                                        // console.log($('#dayCard'+(i+1)).children().eq(0).html());
                                                        $('#dayCard' + (i + 1)).children().eq(0).html(data.list[2 + (i * 8)].dt_txt.split(" ")[0]);
                                                        console.log(data.list[2 + (i * 8)].weather[0].icon);
                                                        $('#dayCard' + (i + 1)).children().eq(1).children().eq(1).attr('src', 'http://openweathermap.org/img/wn/' + data.list[3 + (i * 8)].weather[0].icon + '@2x.png');
                                                        $('#dayCard' + (i + 1)).children().eq(1).children().eq(2).html('Temperature: ' + data.list[3 + (i * 8)].main.temp + '°F');
                                                        $('#dayCard' + (i + 1)).children().eq(1).children().eq(3).html('Wind Speed: ' + data.list[3 + (i * 8)].wind.speed + ' mph');
                                                        $('#dayCard' + (i + 1)).children().eq(1).children().eq(4).html('Humidity: ' + data.list[3 + (i * 8)].main.humidity + '%');
                                                    }
                                                });
                                            } else {
                                                alert("Something went wrong!");
                                            }
                                        });

                                    });
                                } else {
                                    alert("Something went wrong!");
                                }
                            });


                        });
                    }
                    //geocodingObject = data[0];
                }
            });
        } else {
            alert("Invalid city input!");
        }
    });

    // console.log(geocodingObject.lon + " ");

    // if (locationEntry === '') {
    //     alert('Invalid city input!');
    // }
    // else {
    //     if (!searchedCities.includes(locationEntry)) {
    //         searchedCities.push(locationEntry);
    //         // console.log(searchedCities);
    //         localStorage.setItem("searchedCitiesStringify", JSON.stringify(searchedCities));
    //         // console.log(searchedCities);

    //         $("#enteredCity").append("<button>" + locationEntry + "</button>");
    //         $("#enteredCity").children().attr("class", "row btn btn-primary m-1 mb-2 w-100");

    //     }
    // }

    locationSearch.val("");

});



$('#clear').on('click', function (event) {
    event.preventDefault();
    localStorage.clear();
    searchedCities = [];
    if (localStorage.getItem("searchedCitiesStringify") === null) {
        localStorage.setItem("searchedCitiesStringify", JSON.stringify(searchedCities));

        // $("#enteredCity").remove();
        $("#searchBox").val('');
        $("#enteredCity").empty();
    }
});

