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

// CALCULATE THE TIME DIFFERENCES USING MOMENT.JS, OUTPUT VALUE FOR TIME UNTIL NEXT TRAIN
function nextTrainCalc(depart, frequency) {
    var now = moment();
    var firstTime = depart;
    // console.group("nextTrain function");
    // console.log(depart);
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    // console.log(firstTimeConverted);
    // console.log("CURRENT TIME: " + moment(now).format("hh:mm"));
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);
    var tRemainder = diffTime % frequency;
    // console.log(tRemainder);
    var tMinutesTillTrain = frequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    // console.groupEnd();
    // return moment(nextTrain).format("hh:mm a");
    return tMinutesTillTrain;
}


$("#my-form").on("submit", function (e) {
    e.preventDefault();

    ///////// GRAB INPUT VARIABLES
    var $train_name = $("#train_name").val().trim();
    var $train_origin = $("#origin").val().trim();
    var $destination = $("#destination").val().trim();
    var $depart_time = $("#depart_time").val().trim();
    var $frequency = $("#frequency").val().trim();
    var $nextTrain = nextTrainCalc($depart_time, $frequency);

    database.ref('/trains').push({
        name: $train_name,
        origin: $train_origin,
        destination: $destination,
        depart_time: $depart_time,
        frequency: $frequency,
        nextTrain: $nextTrain
    })

    // CLOSE MODAL WINDOW, RESET DEFAULTS TO ALLOW OPENING AGAIN
    $("#modelId").removeClass();
    $("#modelId").addClass('modal fade');
    $(".modal-backdrop").removeClass('in');

    alert("train added");

    // CLEAR THE INPUTS
    $("#train-name").val("");
    $("#origin").val("");
    $("#destination").val("");
    $("#depart_time").val("");
    $("#frequency").val("");

})

// 
database.ref('/trains').orderByChild("nextTrain").on("child_added", function (snapshot) {
    console.log(snapshot.val());

    ///////// GRAB INPUT VARIABLES
    var fbtrain_name = snapshot.val().name;
    var fbtrain_origin = snapshot.val().origin;
    var fbdestination = snapshot.val().destination;
    var fbdepart_time = snapshot.val().depart_time;
    var fbfrequency = snapshot.val().frequency;
    var fbNextTrain = nextTrainCalc(fbdepart_time, fbfrequency);

    // UPDATE DOM TABLE WITH VALUE RETURNS
    var newRow = $("<tr>").append(
        $("<td>").text(fbtrain_name),
        $("<td>").text(fbtrain_origin),
        $("<td>").text(fbdestination),
        $("<td>").text(moment(fbdepart_time, "hhmma").format("hh:mm a")),
        $("<td>").text(fbfrequency + " minutes"),
        $("<td>").text(fbNextTrain + " minutes")
    )
    $("#train_schedule > tbody").append(newRow);
})