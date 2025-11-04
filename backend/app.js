require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const cors = require('cors');
const User = require('./models/User');


const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.log('MongoDB connection error:', err));

// API: Check if user exists by email
app.post('/api/check-user', async (req, res) => {
    // const passwordHash = await bcrypt.hash('lavenderlook@123', 10); // hash password

    const { email, password } = req.body;
    if(!email) return res.status(400).json({ error: 'Email is required' });

    try {
        const admin = await User.findOne({ email: email });
        if(!admin) {
            return res.json({ success: false, message: "Email not found" });
        }
        const md5Password = crypto.createHash("md5").update(password).digest("hex");
        if (md5Password !== admin.password) {
            return res.json({ success: false, message: "Password does not match." });
        }

        return res.json({success: true, admin });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
