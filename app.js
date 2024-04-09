const express = require("express");
const app = express();


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static("public"));


require("./routes/index")(app);

let port = process.env.PORT;  
if (port == null || port == "") {
  port = 9000;
}
app.listen(port, function(){
  console.log(`Server started on port ${port}`);
});
