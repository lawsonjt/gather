const mongoose = require('mongoose');

module.exports = mongoose.model(
    'Item',
    // Define  model schema:
    mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
    })
);
