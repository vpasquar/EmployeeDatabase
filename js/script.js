$(document).ready(function() {
  // Initialize Firebase
   var config = {
        apiKey: "AIzaSyBD3C7KmjHoEvVw1JTmG3CQ85tiKU-znwk",
        authDomain: "employee-db-cf999.firebaseapp.com",
        databaseURL: "https://employee-db-cf999.firebaseio.com",
        projectId: "employee-db-cf999",
        storageBucket: "employee-db-cf999.appspot.com",
        messagingSenderId: "372460899606"
   };

   firebase.initializeApp(config);

    var database = firebase.database();

    var name = "";
    var role = "";
    var start = "";
    var startTemp = "";
    var rate = "";
    var displayDate = "";
    var billed = "";




    $("#submit").on('click', function(e) {
        e.preventDefault();
        name = $("#input-employee").val().trim();
        role = $("#input-role").val().trim();
        start = moment($("#input-start-date").val().trim(), "DD/MM/YY").format("X");
        
        rate = $("#input-rate").val().trim();     
        console.log(name, role, start, rate);

        var newEmp = {
          empName: name,
          empRole: role,
          empStart:start,
          empRate : rate  
        };




        database.ref().push(newEmp);

        $("#input-employee").val("");
        $("#input-role").val("");
        $("#input-start-date").val("");
        $("#input-rate").val("");



    });

    database.ref().orderByChild("name").on("child_added", function(childSnapshot){

        console.log(childSnapshot.val());

        var empName = childSnapshot.val().empName;
        var empRole = childSnapshot.val().empRole;
        var empStart = childSnapshot.val().empStart;
        var empRate  = childSnapshot.val().empRate;

       

        var empStartFormatted = moment.unix(empStart).format("MM/DD/YY");
        var empMonths = moment().diff(moment.unix(empStart,"X"), "months"); 
        console.log("emp months"+ empMonths);
        var empBilled = empMonths * empRate;
        console.log("total billed" + empBilled);

        $("#t-body").append("<tr>" + "<td id='t-name'>" + empName + "</td>" +
            "<td id='t-role'>" + empRole + "</td>" + "<td id='t-start'>" +  
            empStartFormatted + "</td>" + "<td id='t-worked'>" + 
            empMonths + "</td>" + "<td id='t-rate'>" + empRate + 
            "</td>" + "<td id='t-billed'>" + empBilled + "</td></tr>");

    }, function(err){
        console.log("hurr durr dis da errur" + err);
    });

    

});