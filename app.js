const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Study web development","Play LOL","Listen to music"];
let workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function (req, res) {
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    let day = today.toLocaleDateString("en-US", options);
    // if (today.getDay() === 1) {
    //     day = "Monday";
    // } else if (today.getDay() === 2) {
    //     day = "Tuesday";
    // } else if (today.getDay() === 3) {
    //     day = "Wednesday";
    // } else if (today.getDay() === 4) {
    //     day = "Thursday";
    // } else if (today.getDay() === 5) {
    //     day = "Friday";
    // } else if (today.getDay() === 6) {
    //     day = "Saturday";
    // } else {
    //     day = "Sunday"
    // }
    // switch (today.getDay()) {
    //     case 0:
    //         day = "Sunday";
    //         break;
    //     case 1:
    //         day = "Monday";
    //         break;
    //     case 2:
    //         day = "Tuesday";
    //         break;
    //     case 3:
    //         day = "Wednesday";
    //         break;
    //     case 4:
    //         day = "Thursday";
    //         break;
    //     case 5:
    //         day = "Friday";
    //         break;
    //     case 6:
    //         day = "Saturday";
    //         break;
    //     default:
    //         console.log("Error: current day is equal to: " + today.getDay());
    // }
    res.render("list", {listTitle: day, newListItems: items})
});

app.post("/", function (req, res) {
    let item = req.body.newItem;
    if (req.body.list === "Work List") {
        workItems.push(item)
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }


})

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
})

app.post("/work", function (req, res) {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})

app.get("/about", function(req,res) {
    res.render("about");
})

app.listen(3000, function () {
    console.log("Server up and running on port 3000");
});