const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Answer'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: {
        type: [String]
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Question', questionSchema);