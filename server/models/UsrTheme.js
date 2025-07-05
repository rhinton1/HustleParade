const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userThemeSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    theme: { type: String, default: 'light' }, // Light, dark, custom etc
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserTheme', userThemeSchema);