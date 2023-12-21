const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const projectSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    photoUrls: {
        type: [String],
        required: true
    },
    public: {
        type: Boolean,
        required: true,
        default: true
    }
    
    }, {
      timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
