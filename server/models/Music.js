const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const musicSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    url: { type: String, required: true }, // storage URL for full music
    clipUrl: { type: String, required: true }, // partial clip URL for preview
    public: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Music', musicSchema);