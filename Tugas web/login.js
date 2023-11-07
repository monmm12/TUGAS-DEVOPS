const mysql = require("mysql");
const express = require("express");
const bodyParser =require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
app.use("/public",express.static("public"));

const connection = mysql.createConnection({
  host: "db4free.net",
  user: "terryhartanto",
  password: "Terry=123",
  database: "schooltery"
});

connection.connect(function(error) {
  if (error) throw error
  else console.log("connect to the database successfully")
})

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/",encoder,function(req,res) {
  var username = req.body.username;
  var password = req.body.password;
  connection.query("select * from loginuser where user_name = ? and user_pass = ?",[username,password],function(error,results,fields) {
    if (results.length > 0) {
      res.redirect('http://localhost:3000');
    } else {
      res.redirect("/");
    }
    res.end();
  })
})

// app.get("/welcome",function(req,res) {
//   res.sendFile(__dirname + "/welcome.html")
// })

//set app port
app.listen(8000, () => {
  console.log("server ready...")
})