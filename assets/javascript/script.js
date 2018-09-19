///////// INPUT VARIABLES
var $train_name = $("#train-name");
var $train_origin = $("#train_origin"); // Not yet defined in the HTML
var $destination = $("#destination");
var $depart_time = $("#depart_time");
var travel_time = $("#travel_time"); // not yet defined in the HTML
var $frequency = $("#frequency");

////////// OUTPUT VARIABLES
// defined in the loop that writes new table rows on form submit (see below)

///// DATABASE VARIABLES
var trains = []; // an array of train objects based on constructor
var database = firebase.database();

/////////// TRAIN CONSTRUCTOR
function train(name, origin, destination, depart_time, travel_time, frequency) {
    this.name = name;
    this.origin = origin;
    this.destination = destination;
    this.depart_time = depart_time;
    this.travel_time = travel_time;
    this.frequency = frequency;

    calculateArrivalTime = function () {
        return this.depart_time + this.travel_time;
    };

    calculateMinutesAway = function () {
        
    };

}

/////////// HELPER FUNCTIONS
function checkForDuplicateTrain(newTrain) {
    if (trainArray.contains(newtrain)) { // the key thing I want to check is if the origin and destination are same
        alert("That route already exists")
    } else {trains.push(newTrain)} // Add the new train to the trains array
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
            trainName = "<td>" + snapshot.val()[i].trainName + "</td>";
            trainDestination = "<td>" + snapshot.val()[i].trainDestination + "</td>";
            trainFrequency = "<td>" + snapshot.val()[i].trainFrequency + "</td>";
            trainArrival = "<td>" + snapshot.val()[i].trainArrival + "</td>";
            trainMinAway = "<td>" + snapshot.val()[i].trainMinAway + "</td>";

            $("#train_schedule").append(newRow).html(trainName + trainDestination + trainFrequency + trainArrival + trainMinAway);
        }
    }
    // Else Firebase doesn't have a Train, so use the initial local values.
    else {} // write in the state for only local info shown
}

$("#submit").on("click", function(e) {  
    e.preventDefault();

    var trainName = $("#train_name").val().trim();
    var trainDestination = $("#destination").val().trim();
    var trainFrequency = $("frequency").val().trim();
    var trainDepartTime = $("#depart_time").val().trim();

    database.ref().set({
        name: trainName,
        destination: trainDestination,
        depart_time: trainDepartTime,
        frequency: trainFrequency,
        next_arrival: depart_time + travel_time //undefined values
    })
})