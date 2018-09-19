$(function () {
    $("#test").html("<h1>FARTS</h1>");
});

var database = firebase.database();

var $train_name = $("#train-name")
var $destination = $("#destination")
var $depart_time = $("#depart_time")
var $frequency = $("#frequency")
var idCounter;

// trains stored in object structure like so
var trainDatabase = {
    train01: {
        name: train_name,
        destination: destination,
        depart_time: depart_time,
        frequency: frequency
        next_arrival: depart_time + travel_time,
    },
    train02: {
        name: train_name,
        destination: destination,
        depart_time: depart_time,
        frequency: frequency
    },
    train03: {
        name: train_name,
        destination: destination,
        depart_time: depart_time,
        frequency: frequency
    }
}

function train(idCounter, name, destination, depart_time, frequency) {
    this.id = idCounter;
    this.name = name;
    this.destination = destination;
    this.depart_time = depart_time;
    this.frequency = frequency;

    calculateArrivalTime = function () { };

    calculateMinutesAway = function () { };

}

// when a train's start time passes, a new instance begins to time down its 'minutes away'
// so a train has its leave interval, one new created each XX minutes, take the current time stamp and add travel time
// so when a train is added to the schedule, I need to store a train instance along with all of the parameters
// and functions needed to update its time stamps. 

database.ref().on("value", function (snapshot) {
    if (snapshot.child("trainReference").exists()) {
        // Set the local variables for train properties equal to the stored values in firebase.
        var trainName = $train_name;
        var trainDestination = $destination;
        var trainFrequency = $frequency;
        var trainArrival;
        var trainMinAway;

        // change the HTML to reflect the newly updated local values (most recent information from firebase)

        // need to loop through the firebaseDB to populate the #train_schedule table, preferably in order of arrival times
        var newRow = $("<tr>");
        var newColumn = $("<td>");
                
        for (let i = 0; i < trainArray.length; i++) {
            var trainName = "<td>" + snapshot.val()[i].trainName + "</td>";
            var trainDestination = "<td>" + snapshot.val()[i].trainDestination + "</td>";
            var trainFrequency = "<td>" + snapshot.val()[i].trainFrequency + "</td>";
            var trainArrival = "<td>" + snapshot.val()[i].trainArrival + "</td>";
            var trainMinAway = "<td>" + snapshot.val()[i].trainMinAway + "</td>";

            $("#train_schedule").append(newRow).html(trainName + trainDestination + trainFrequency + trainArrival + trainMinAway);

        }
    }
}