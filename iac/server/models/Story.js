const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const storySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    data: { type: String, required: true }, // Could be text or URL for media
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date } // story expiration
});

module.exports = mongoose.model('Story', storySchema);