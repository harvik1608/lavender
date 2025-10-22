require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// API: Check if user exists by email
app.get('/api/check-user', async (req, res) => {
    // const email = req.query.email;
    // if(!email) return res.status(400).json({ error: 'Email is required' });

    try {
        const users = await User.find();
        res.json({ exists: users.length > 0, user: users });
        // const user = await User.find();
        // if(user) {
        //     res.json({ exists: true, user });
        // } else {
        //     res.json({ exists: false });
        // }
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
