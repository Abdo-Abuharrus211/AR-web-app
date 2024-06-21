var express = require('express')
router = express.Router();

module.exports = function (app) {
    app.get("/about", (req, res) => {
        res.render("about");
    });
};