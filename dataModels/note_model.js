const mongoose = require('mongoose'); //1M (gzip: 288.5K)
const Schema = mongoose.Schema;

//Note data structure
const NoteSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength : 16,
    },
    author: {
        type: String,
        required: true,
        default: "Anon",
        maxlength: 16,
    },
    body: {
        type: String,
        required: true,
        maxlength: 150,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});

// conversion into model for actual use.
const Note = mongoose.model('Note', NoteSchema);

module.exports =  Note;