const cors = require('cors');
const express = require('express');
const ejs = require('ejs');
const routes = require('./routes/home');

const app = express();

//Set up stuff...
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static("public"));

app.use(cors({
  origin: 'http://localhost:5000'  //TODO: Replace with the origin when hosted
}));

// These import the individual pages and 'require' when app is launched
routes(app);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 9000;
}
app.listen(port, function(){
  console.log(`Server started on port ${port}`);
});