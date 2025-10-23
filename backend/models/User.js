const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String, // ✅ must include
    role: String
},{ collection: 'admin' });

module.exports = mongoose.model('User', userSchema);
