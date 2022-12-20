const functions = require("firebase-functions");
let admin = require("firebase-admin");
const cors = require("cors")({origin:true});
let axios = require("axios");
let FormData = require("form-data");
// Fetch the service account key JSON file contents
let serviceAccount = require("./test-databse2202-firebase-adminsdk-v79vq-7d7bb0a1ec.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-databse2202-default-rtdb.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
let db = admin.database();

exports.helloWorld = functions.https.onRequest((request, response) => {
 cors(request, response, ()=>{

   db.ref("msgs").on("value",(snapshot)=>{
     response.send(snapshot.val());
   });
  })
});

exports.ceocamp = functions.https.onRequest((request, response) => {
  let byul = {
    name : "장신혜",
    age : 35,
    height : 171
  }

  response.send(byul);
});


exports.login = functions.https.onRequest((request, response) => {
 cors(request, response, ()=>{

   let id = request.body.id;
   let pwd = request.body.pwd;
   db.ref("members/"+id).on("value",(snapshot)=>{
     if(snapshot.val()){
        if(snapshot.val() == pwd){
          response.send({"result":"로그인 되었습니다."});
        }else{
          response.send({"result":"비밀번호가 일치하지 않습니다."});
        }

     }else{
       response.send({"result":"가입되지 않은 회원입니다."});
     }

   });
 });
});

exports.join = functions.https.onRequest((request, response) => {
  cors(request, response, ()=>{
    let id = request.body.id;
    let pwd = request.body.pwd;
    db.ref("members/"+id).set(pwd);
  });
});

exports.sendSMS = functions.https.onRequest((request, response) => {
  cors(request, response, ()=>{

    let phone = request.body.phone;

    let data = new FormData();
    data.append("remote_id", "sinhea819");
    data.append("remote_pass", "729wkd1126@");
    data.append("remote_num", "1");
    data.append("remote_phone", phone);
    data.append("remote_callback", "01076496149");
    data.append("remote_msg", "승진을 축하드립니다!");

    axios({
      method:"post",
      url:"http://www.munja123.com/Remote/RemoteMms.html",
      headers: {
        ...data.getHeaders()
      },
      data: data
    }).then((res)=>{
      response.send({"result_code":"1", "result":"환영합니다!"});
    });

  });
});
