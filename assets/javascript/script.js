var config = {
    apiKey: "AIzaSyAw5JWcODtCGZnUIhNjwTg7CiaX8470R-Y",
    authDomain: "train-scheduler-f78e0.firebaseapp.com",
    databaseURL: "https://train-scheduler-f78e0.firebaseio.com",
    projectId: "train-scheduler-f78e0",
    storageBucket: "train-scheduler-f78e0.appspot.com",
    messagingSenderId: "335881857413"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function (e) {
    e.preventDefault();

    ///////// GRAB INPUT VARIABLES
    var $train_name = $("#train_name").val().trim();
    var $train_origin = $("#origin").val().trim();
    var $destination = $("#destination").val().trim();
    var $depart_time = $("#depart_time").val().trim();
    var $travel_time = $("#travel_time").val().trim();
    var $frequency = $("#frequency").val().trim();

    database.ref().push({
        name: $train_name,
        origin: $train_origin,
        destination: $destination,
        depart_time: $depart_time,
        travel_time: $travel_time,
        frequency: $frequency
    })

    alert("train added");

    // CLEAR THE INPUTS
    $("#train-name").val("");
    $("#origin").val("");
    $("#destination").val("");
    $("#depart_time").val("");
    $("#travel_time").val("");
    $("#frequency").val("");
})

database.ref().on("child_added", function (snapshot) {
    console.log(snapshot.val());

    ///////// GRAB INPUT VARIABLES
    var fbtrain_name = snapshot.val().name;
    var fbtrain_origin = snapshot.val().origin;
    var fbdestination = snapshot.val().destination;
    var fbdepart_time = snapshot.val().depart_time;
    var fbtravel_time = snapshot.val().travel_time;
    var fbfrequency = snapshot.val().frequency;

    var newRow = $("<tr>").append(
        $("<td>").text(fbtrain_name),
        $("<td>").text(fbtrain_origin),
        $("<td>").text(fbdestination),
        $("<td>").text(fbdepart_time),
        $("<td>").text(fbtravel_time),
        $("<td>").text(fbfrequency),
    )

    $("#train_schedule > tbody").append(newRow);
})


// ////////// OUTPUT VARIABLES
// // defined in the loop that writes new table rows on form submit (see below)

// ///// DATABASE VARIABLES
// var trains = []; // an array of train objects based on constructor
// var database = firebase.database().ref();

// /////////// TRAIN CONSTRUCTOR
// function train(name, origin, destination, depart_time, travel_time, frequency) {
//     this.name = name;
//     this.origin = origin;
//     this.destination = destination;
//     this.depart_time = depart_time;
//     this.travel_time = travel_time;
//     this.frequency = frequency;

//     calculateArrivalTime = function () {
//         return this.depart_time + this.travel_time;
//     };

//     calculateMinutesAway = function () {
//         return this.arrivalTime - currentTime; // inser Date object return here
//     };
// }

// /////////// HELPER FUNCTIONS
// function checkForDuplicateTrain(newTrain) {
//     if (trainArray.contains(newtrain)) { // the key thing I want to check is if the origin and destination are same
//         alert("That route already exists")
//     } else { trains.push(newTrain) } // Add the new train to the trains array
// }


// // when a train's start time passes, a new instance begins to time down its 'minutes away'
// // so a train has its leave interval, one new created each XX minutes, take the current time stamp and add travel time
// // so when a train is added to the schedule, I need to store a train instance along with all of the parameters
// // and functions needed to update its time stamps. 

// // perhaps very useful for unique IDs when pushing to firebase DB https://www.tutorialspoint.com/firebase/firebase_write_list_data.htm

// database.ref().on("value", function (snapshot) { // YET TO BE EDITED, THE CONDITION MIGHT NOT BE NECESSARY IS CHECKED IN THE SUBMIT EVENT BELOW
//     if (snapshot.child("trainReference").exists()) {
//         // Set the local variables for train properties equal to the stored values in firebase.
//         var trainName = $train_name;
//         var trainDestination = $destination;
//         var trainFrequency = $frequency;
//         var trainArrival;
//         var trainMinAway;

//         // change the HTML to reflect the newly updated local values (most recent information from firebase)

//         // need to loop through the firebaseDB to populate the #train_schedule table, preferably in order of arrival times
//         var newRow = $("<tr>");
//         var newColumn = $("<td>");

//         for (let i = 0; i < trainArray.length; i++) {
//             trainName = "<td>" + snapshot.val()[i].trainName + "</td>";
//             trainDestination = "<td>" + snapshot.val()[i].trainDestination + "</td>";
//             trainFrequency = "<td>" + snapshot.val()[i].trainFrequency + "</td>";
//             trainArrival = "<td>" + snapshot.val()[i].trainArrival + "</td>";
//             trainMinAway = "<td>" + snapshot.val()[i].trainMinAway + "</td>";

//             $("#train_schedule").append(newRow).html(trainName + trainDestination + trainFrequency + trainArrival + trainMinAway);
//         }
//     }
//     // Else Firebase doesn't have a Train, so use the initial local values.
//     else { } // write in the state for only local info shown
// }
// )
// $("#submit").on("click", function (e) {
//     e.preventDefault();

//     var trainName = $("#train_name").val().trim();
//     var trainDestination = $("#destination").val().trim();
//     var trainFrequency = $("frequency").val().trim();
//     var trainDepartTime = $("#depart_time").val().trim();


//     if (checkForDuplicateTrain()) { } // THIS CONSITION BEFORE THE DATABASE CHANGE THAT TRIGGERS THE "VALUE" EVENT
//     database.ref().set({
//         name: trainName,
//         destination: trainDestination,
//         depart_time: trainDepartTime,
//         frequency: trainFrequency,
//         next_arrival: depart_time + travel_time //undefined values
//     })
// })