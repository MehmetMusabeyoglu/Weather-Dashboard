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


$('#submit').on('click', function (event) {
    event.preventDefault();

    var locationEntry = locationSearch.val().toUpperCase().trim();

    searchedCities = JSON.parse(localStorage.getItem("searchedCitiesStringify"));
    if (locationEntry === '') { 
        alert('Invalid city input!');
    }
    else {
        if (!searchedCities.includes(locationEntry)) {
            searchedCities.push(locationEntry);
            console.log(searchedCities);
            localStorage.setItem("searchedCitiesStringify", JSON.stringify(searchedCities));
            console.log(searchedCities);
        }
    }

    locationSearch.val("");
});



$('#clear').on('click', function (event) {
    event.preventDefault();
    localStorage.clear();
    searchedCities = [];
    if (localStorage.getItem("searchedCitiesStringify") === null) {
        localStorage.setItem("searchedCitiesStringify", JSON.stringify(searchedCities));
    }
});
