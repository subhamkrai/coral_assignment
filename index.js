const  express = require('express')
const app = express()
const morgan = require("morgan")
const mysql = require("mysql")
const moment = require("moment")
const http = require('http');


const bodyParser = require("body-parser")



app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('./public'))

app.use(morgan('short'))

app.post("/user_create", (req, res) => {
  console.log("trying to create a new user...")
  
  
  var con = mysql.createConnection({
    host     : 'db-intern.ciupl0p5utwk.us-east-1.rds.amazonaws.com',
    port     :  '3306',
    user     : 'dummyUser',
    password : 'dummyUser01',
    database : 'db_intern'
    
    });

    con.connect(function(err) {
    if (err) throw err;
    //console.log("Connected!");
    //console.log("first name: " + req.body.name)
    //console.log("email: " + req.body.email)
    //console.log("first name: " + req.body.phone_number)
    //console.log("email: " + req.body.password)
    var dateTime = moment().format("YYYY-MM-DD HH:mm:ss")
    
    var sql="SELECT * from userData where emailId='"+req.body.email+"'";

      con.query(sql, function(err,result){
        console.log(Object.keys(result).length )
        
        if (Object.keys(result).length == 1 )
        {
          console.log("No")
          console.log(result)
        res.send("Email Id already exists... Enter new email ID")
      }
        else {
          //console.log(result)
          var sql = "INSERT INTO userData (userName, emailId, phoneNo, password, dateTime) VALUES('"+req.body.name+"', '"+req.body.email+"', "+req.body.phone_number+", '"+req.body.password+"','"+dateTime+"')";
          con.query(sql, function (error, results, fields) {
          if (err) throw err;
          console.log("Data Inserted Successfully");
          res.send("Data Inserted Successfully");
          
        });
        }
       });
      
      
      });
    });
  

  app.post("/user_email", (req, res) => {
    console.log("trying to create a new user...")
    
    
    var con = mysql.createConnection({
      host     : 'db-intern.ciupl0p5utwk.us-east-1.rds.amazonaws.com',
      port     :  '3306',
      user     : 'dummyUser',
      password : 'dummyUser01',
      database : 'db_intern'
      
      });
      
      con.connect(function(err) {
      if (err) throw err;
      var sql = "SELECT * FROM userData WHERE emailId = '" + req.body.email + "'";
      con.query(sql, function (err, result) {
        if (err) throw err;
        function isEmpty(result) {
          return !Object.keys(result).length > 0;
        }
        if (isEmpty(result)){
          console.log("No data found ")
          res.end("NO data to display");
        }
        else {
          console.log("yes")
          console.log(result)
        res.writeHead(200, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify(result));
        res.end();
        }

        
       
        
        });
      });

    })

  

app.listen(3006,() => {
  console.log("server is up and running on 3006...")
 })
