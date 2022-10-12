var locationSearch = $("#searchBox");

var searchedCities = [];
if (localStorage.getItem("searchedCitiesStringify") === null) {
    localStorage.setItem("searchedCitiesStringify", JSON.stringify(searchedCities));
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

var weatherUrl;
var geocodingUrl;
var geocodingObject ;


var locationEntry;


$('#submit').on('click', function (event) {
    event.preventDefault();

    searchedCities = JSON.parse(localStorage.getItem("searchedCitiesStringify"));

    locationEntry = locationSearch.val().toUpperCase().trim();

    geocodingUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + locationEntry + '&limit=1&appid=3cbcebba60d585a203f6e51f482d9176';

    fetch(geocodingUrl).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            if(data.length===0){
                alert("Invalid city input!");    
            }
            else{
                console.log(data[0].lon + "   " + data[0].country );
                // weatherUrl = '' + data[0].lon + data[0].lat + "";
                if (!searchedCities.includes(locationEntry)) {
                    searchedCities.push(locationEntry);
                    // console.log(searchedCities);
                    localStorage.setItem("searchedCitiesStringify", JSON.stringify(searchedCities));
                    // console.log(searchedCities);
        
                    $("#enteredCity").append("<button>" + locationEntry + "</button>");
                    $("#enteredCity").children().attr("class", "row btn btn-primary m-1 mb-2 w-100");
        
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

// $("enteredCity").click(function (event) {
//     event.preventDefault();
// });

geocodingUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + locationEntry + '&limit=1&appid=3cbcebba60d585a203f6e51f482d9176';
console.log(locationEntry); 
