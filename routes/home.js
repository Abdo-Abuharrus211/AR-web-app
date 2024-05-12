var express = require("express");
router = express.Router();

module.exports = function (app) {
    app.get("/", (req, res) => {

        res.render("home");
    });
};