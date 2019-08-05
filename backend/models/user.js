const mongoose =  require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

//its just a blue print of data
const userSchema = mongoose.Schema({
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

//now we have to use it so we need it to export

module.exports = mongoose.model('User', userSchema);