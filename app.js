const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

//require("./util.js");

//Set up stuff...
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static("public"));

//connecting to our MongoDB Atlas cluster...
// mongoose.connect("mongodb://0.0.0.0:27017/<db_name_here>");



// app.get("/", function(req, res){
//   res.send("Hello");
// });

// These import the individual pages and 'require' when app is launched
require("./routes/index")(app);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 9000;
}
app.listen(port, function(){
  console.log(`Server started on port ${port}`);
});
