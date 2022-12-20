const firebaseConfig = {
  apiKey: "AIzaSyDsA1Dk10zl-Asu1uMf6UU_QGkHJZGPMsU",
  authDomain: "codecamp-dcf6d.firebaseapp.com",
  databaseURL: "https://codecamp-dcf6d-default-rtdb.firebaseio.com",
  projectId: "codecamp-dcf6d",
  storageBucket: "codecamp-dcf6d.appspot.com",
  messagingSenderId: "143876513813",
  appId: "1:143876513813:web:bb9938a10354f6357e2e1c",
  measurementId: "G-27RSEL21Q1"
};

firebase.initializeApp(firebaseConfig);
database = firebase.database();


function sendMsg(){
    let date = new Date();
    let msg = $("#message").val();
    database.ref("msgs/"+date.getTime()).set(msg);
    $("#message").val("");
}

function loadMsgs(){
    database.ref("msgs").on("value", callback);
    function callback(snapshot){
        $("#chatlist").html("");
        console.log(snapshot);
        snapshot.forEach(function(child){
             $("#chatlist").append("<div>"+child.val()+"</div>");
        });
        $("#chatlist").scrollTop(15000);
    }
}
