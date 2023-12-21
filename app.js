const express = require('express');
const bodyParser = require('body-parser'); // Make sure to include this line
const { getDate } = require('./date');
const Date = require(__dirname + "/date.js");

const app = express();

let items = ["Buy Food","Cook Food", "Eat Food"];
let workItems = [];
// Use bodyParser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    let day = getDate();
    // Move the render statement inside the app.get callback
    res.render("list", { ListTitle: day, newListItems: items });
});
app.post("/", function(req, res) {
    let item = req.body.newItem;
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }

});
app.get("/work", function(req,res) {
    res.render("list", {ListTitle: "Work List", newListItems: workItems});
});
app.post("/work", function(req,res) {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});
app.listen(3000, function() {
    console.log("Server started on port 3000");
});
