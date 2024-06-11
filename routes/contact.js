var express = require("express");
router = express.Router();

module.exports = function (app) {
    app.get("/contact", (req, res) => {
        res.render("contact");
    });
};