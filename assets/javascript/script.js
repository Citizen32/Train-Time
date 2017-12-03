// alert("Hello");

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCm2VIvpAOsE828FN2DT2lD3GgJUCA4Sjk",
  authDomain: "train-time-de0ef.firebaseapp.com",
  databaseURL: "https://train-time-de0ef.firebaseio.com",
  projectId: "train-time-de0ef",
  storageBucket: "train-time-de0ef.appspot.com",
  messagingSenderId: "531524944388"
};

firebase.initializeApp(config);

var database = firebase.database();
var trainName = ""
var destination = ""
var trainTime = ""
var frequency = ""

$("#submit-button").on("click", function (event) {
    event.preventDefault();
    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    trainTime = $("#trainTime").val().trim();
    frequency = $("#frequency").val().trim();

    database.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency
    });
});

database.ref().on("child_added", function(data){
    var trainFreq = data.val().frequency;
    var Tfirst = data.val().trainTime

    var timeConverted = moment(Tfirst, "HH:mm");
    var diff = moment().diff(moment(Tfirst), "minutes");
    var timeremain = diff % trainFreq;
    var timeLeft = trainFreq - timeremain;
    var trainNext = moment().add(timeLeft, "minutes");
    var tNext = moment(trainNext).format("HH:mm");

    var createRow = $("<tr>")

    createRow.html(
        "<td>" + data.val().trainName + "</td>" +
        "<td>" + data.val().destination + "</td>" +
        "<td>" + data.val().frequency + "</td>" +
        "<td>" + tNext + "</td>" +
        "<td>" + timeLeft + "</td>" );

    $("#trainTable").append(createRow)
});
