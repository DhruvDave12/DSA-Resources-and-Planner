const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    answer: {
        type: String,
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }, 
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    upvotes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    downvotes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Answer', answerSchema);