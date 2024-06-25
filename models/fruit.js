// models/fruit.js

const mongoose = require("mongoose");

// Schema blueprint:
  // const <model name (singular noun form)>Schema = new mongoose.Schema({
    // {
    // <key>: <value (data) type (Singular Capitalized noun form)>,
    // },
    // {
    // <options object> Properties: https://mongoosejs.com/docs/api/schema.html#Schema()
    // }
  // }); 
const fruitSchema = new mongoose.Schema({
  name: String,
  isReadyToEat: Boolean,
  emoji: String,
  // codepoints &#x<unicode after 'U+'>
});

const Fruit = mongoose.model("Fruit", fruitSchema); // create model

module.exports = Fruit;