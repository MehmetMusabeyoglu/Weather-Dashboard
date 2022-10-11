//Function leveraging moment.js to show current time
let currentTimeShown = function () {
    let currentTime = moment().format("Do MMM YYYY, ddd / HH:mm:ss");
    $("#currentTime").text('Today is a '+ currentTime);
};

//Shown time updated every second
setInterval(currentTimeShown, 1000);