// Here is where we import modules
// We begin by loading Express
const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
const express = require("express");
const mongoose = require("mongoose"); // require package
const methodOverride = require("method-override"); // new
const morgan = require("morgan"); //new
const path = require("path");

const app = express();

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Import the Fruit model
const Fruit = require("./models/fruit.js");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new

app.use(express.static(path.join(__dirname, "public")));


const fruitsCtrl = require("./controllers/fruits");

// server.js

// // GET /
// app.get("/", async (req, res) => {
//     res.send("hello, friend!");
// });

// server.js

// GET /
// app.get("/", async (req, res) => {
//     res.render("index.ejs");
// });

app.get("/", fruitsCtrl.index);

// GET /fruits
app.get("/fruits", async (req, res) => {
    const allFruits = await Fruit.find();
    console.log(allFruits); // log the fruits!
    // res.send("Welcome to the index page!");
    res.render("fruits/index.ejs", { fruits: allFruits });
});

// server.js

// GET /fruits/new
app.get("/fruits/new", (req, res) => {
    // res.send("This route sends the user a form page!");
    res.render("fruits/new.ejs");
});

app.get("/fruits/:fruitId", fruitsCtrl.show);

// server.js

// POST /fruits
app.post("/fruits", async (req, res) => {
    //   console.log(req.body);
    //   res.redirect("/fruits/new");
    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
    } else {
        req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    // res.redirect("/fruits/new");
    res.redirect("/fruits"); // redirect to index fruits
});

app.delete("/fruits/:fruitId", fruitsCtrl.destroy);

app.get("/fruits/:fruitId/edit", fruitsCtrl.edit);

// server.js

app.put("/fruits/:fruitId", fruitsCtrl.update);

app.listen(3000, () => {
    console.log("Listening on port 3000");
});