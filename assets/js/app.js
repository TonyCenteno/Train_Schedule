// Initialize Firebase
var config = {
apiKey: "AIzaSyA4mf4qN6BSGpl0ex1uFa2kUQkW2-i_Z9E",
authDomain: "traintime-6ed7a.firebaseapp.com",
databaseURL: "https://traintime-6ed7a.firebaseio.com",
projectId: "traintime-6ed7a",
storageBucket: "traintime-6ed7a.appspot.com",
messagingSenderId: "819404729850"
};
firebase.initializeApp(config);

//create variables
var dataRef = firebase.database();

// var tname = "";
// var destination = "";
// var startTime = "";
// var frequency = "";




//capture button click
$(".isubmit").on("click", function(event) {
    event.preventDefault();

    tname = $(".itname").val().trim();
    destination = $(".idestination").val().trim();
    startTime = moment($(".istartTime").val().trim(), "HH:mm").format("");
    frequency = $(".ifrequency").val().trim();

    dataRef.ref().push({

        tname: tname,
        destination: destination,
        startTime: startTime,
        frequency: frequency,
    });
    // document.getElementById("theform").reset();
    $("#theform")[0].reset();

});

dataRef.ref().on("child_added", function(childSnapshot, prevChildKey) {

    var tname = childSnapshot.val().tname;
	var destination = childSnapshot.val().destination;
	var startTime = childSnapshot.val().startTime;
	var frequency = childSnapshot.val().frequency;

    // var firstTimeConverted = moment(startTime, "HH:mm").subtract(1, "years");
	// // console.log(firstTimeConverted);

	// //current time
	// var currentTime = moment();
	// // console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

	// //difference between the times
	// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	// // console.log("DIFFERENCE IN TIME: " + diffTime);

	// //time apart (remainder)
	// var tRemainder = diffTime % frequency;
	// // console.log(tRemainder);

	// //minute until train
	// var tMinutesTillTrain = frequency - tRemainder;
	// // console.log("MINUTES TIL TRAIN: " + tMinutesTillTrain);

	// //next train
	// var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // var nextTrainConverted = moment(nextTrain).format("hh:mm a");
    
// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(startTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % frequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = frequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
var nextTrainConverted = moment(nextTrain).format("hh:mm");
console.log(nextTrainConverted);
    
    $(".schedule").append("<div class='infoRow'><div class='displayTrainName'><h3> " + childSnapshot.val().tname +
        " </h3></div><div class='displayDestination'><h3> " + childSnapshot.val().destination +
        " </h3></div><div class='displayFrequency'><h3> " + "every " + childSnapshot.val().frequency + " minutes" +
        " </h3></div><div class='displayNextArrival'><h3> " + nextTrainConverted + 
        " </h3></div><div class='displayMinutesAway'><h3> " + tMinutesTillTrain + " </div></div>");
});

