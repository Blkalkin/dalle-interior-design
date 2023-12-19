const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    body: {
        type: String,
        required: true
    }
    }, {
      timestamps: true
});


module.exports = mongoose.model('Comment', commentSchema);
