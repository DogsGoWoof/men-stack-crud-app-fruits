// controllers/fruits.js
/*

const Fruit = require('../models/fruit');

// controllers/fruits.js

const index = async (req, res) => {
    // logic to show all fruits
    const foundFruits = await Fruit.find();
    res.render('fruits/index.ejs', { fruits: foundFruits });
};

module.exports = {
    index,
    // add each of your controller function names here
};

*/

// controller/fruits.js

const Fruit = require("../models/fruit");

const home = async (req, res) => {
    res.render('index.ejs');
};

const define = (req, res) => {
    res.render('fruits/new.ejs');
};

const create = async (req, res) => {
    req.body.isReadyToEat = req.body.isReadyToEat === 'on';
    await Fruit.create(req.body);
    res.redirect('/fruits');
};

// Display all fruits
const index = async (req, res) => {
    const foundFruits = await Fruit.find();
    res.render('fruits/index.ejs', { fruits: foundFruits });
};

// ...continue for other routes
const show = async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/show.ejs", {
        fruit: foundFruit
    });
    // res.send(
    //     `This route renders the show page for fruit id: ${req.params.fruitId}!`
    // );
};

const destroy = async (req, res) => {
    await Fruit.findByIdAndDelete(req.params.fruitId);
    res.redirect("/fruits");
    // res.send("This is the delete route");
}

const edit = async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/edit.ejs", {
        fruit: foundFruit,
    });
    // console.log(foundFruit);
    // res.send(`This is the edit route for ${foundFruit.name}`);
}

const update = async (req, res) => {
    // Handle the 'isReadyToEat' checkbox data
    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
    } else {
        req.body.isReadyToEat = false;
    }

    // Update the fruit in the database
    await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);

    // Redirect to the fruit's show page to see the updates
    res.redirect(`/fruits/${req.params.fruitId}`);
}

module.exports = {
    home,
    define,
    create,
    index,
    // export other functions
    show,
    destroy,
    edit,
    update,
};
