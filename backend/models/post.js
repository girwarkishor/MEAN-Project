const mongoose =  require('mongoose');

//its just a blue print of data
const postSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: { type: String, required: true },
    imagePath: { type: String, required: true }
});

//now we have to use it so we need it to export

module.exports = mongoose.model('Post', postSchema);