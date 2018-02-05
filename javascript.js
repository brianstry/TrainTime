// Initialize Firebase
var config = {
    apiKey: "AIzaSyByIOl8a0yYQsOmmHVs6JmoS1VjC7MT6Oc",
    authDomain: "something-96af1.firebaseapp.com",
    databaseURL: "https://something-96af1.firebaseio.com",
    projectId: "something-96af1",
    storageBucket: "something-96af1.appspot.com",
    messagingSenderId: "806025065118"
  };
  firebase.initializeApp(config);


// Create a variable to reference the database
var database = firebase.database();

$(document).ready(function() {
    $("#submit").on("click", function () {
        event.preventDefault();
        console.log("submit click")
    
        var trainName = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrain = $("#first-train").val().trim();
        var frequency = $("#frequency").val().trim();   

        console.log(trainName);
        console.log(destination);
        console.log(firstTrain);
        console.log(frequency);

        database.ref().push({
            dataTrain: trainName,
            dataDestination: destination,
            dataFirstTrain: firstTrain,
            dataFrequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    });
    
    database.ref().orderByChild("dateAdded").on("child_added", function (snapshot) {
        // storing the snapshot.val() in a variable for convenience
        var sv = snapshot.val();
        var firstTimeConverted = moment(sv.dataFirstTrain, "hh:mm").subtract(1, "years");
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var remainder = diffTime % sv.dataFrequency;
        
        var minTillTrain = sv.dataFrequency - remainder;
        var nextTrain = moment().add(minTillTrain, "minutes");
        
        // Change the HTML to reflect
        $("#table").append("<tr><th>" + sv.dataTrain + "</th> <th>" + sv.dataDestination + "</th> <th>" + sv.dataFrequency + "</th><th>" + moment(nextTrain).format("hh:mm") + "</th><th>" + minTillTrain + "</tr>");
    
        // Handle the errors
    });
})
