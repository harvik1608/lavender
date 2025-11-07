require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const User = require('./models/User');
const Fish = require('./models/Fish');

const app = express();
app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.log('MongoDB connection error:', err));

// API: Check if user exists by email
app.post('/api/check-user', async (req, res) => {
    // const passwordHash = await bcrypt.hash('fish@123', 10); // hash password
    // console.log(passwordHash);

    const { email, password } = req.body;
    if(!email) return res.status(400).json({ error: 'Email is required' });

    try {
        const admin = await User.findOne({ where: { email } });
        if(!admin) {
            return res.json({ success: false, message: "Email not found" });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Password does not match." });
        }

        return res.json({success: true, admin });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});
app.post('/api/load-fishes', async (req, res) => {
    try {
        // DataTables parameters
        const draw = req.body.draw;
        const start = parseInt(req.body.start) || 0;
        const length = parseInt(req.body.length) || 10;
        const searchValue = req.body.search?.value || "";

        const where = {};

        if (searchValue) {
          where.name = { [Op.like]: `%${searchValue}%` };
        }

        const totalRecords = await Fish.count();
        const filteredRecords = await Fish.count({ where });

        const fishes = await Fish.findAll({
          where,
          offset: start,
          limit: length,
          order: [["id", "DESC"]]
        });

        res.json({
          draw,
          recordsTotal: totalRecords,
          recordsFiltered: filteredRecords,
          data: fishes
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
      }
});

// to add fish in db
app.post('/api/add-fish', async (req, res) => {
    const { name, is_active } = req.body;
    if(!name) return res.status(400).json({ error: 'Name is required' });

    try {
        const newFish = await Fish.create({
            name: name,
            avatar: '',
            is_active: is_active ? 1 : 0,
            created_by: 1
        });
        return res.json({
            success: true, 
            message: "Fish added successfully",
        });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

// to get single fish
app.get('/api/fish/:id', async (req, res) => {
    const { id } = req.params;
    if(!id) return res.status(400).json({ error: 'Fish Id is required' });

    try {
        const fish = await Fish.findOne({ where: { id: id } });
        if(!fish) {
            return res.json({ success: false, message: "Fish not found" });
        }
        return res.json({success: true, data: fish });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

// to update fish
app.put("/api/update-fish/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Fish.update(req.body, { where: { id: id } });
    if (!updated)
      return res.json({ success: false, message: "Fish not found or not updated" });
    res.json({ success: true, message: "Fish updated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// to delete fish
app.delete('/api/delete-fish/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ success: false, message: 'Fish ID is required' });

    const deleted = await Fish.destroy({ where: { id: id } });

    if (!deleted) {
      return res.json({ success: false, message: 'Fish not found or already deleted' });
    }

    res.json({ success: true, message: 'Fish deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Vendor's Route
app.post('/api/load-vendors', async (req, res) => {
    try {
        // DataTables parameters
        const draw = req.body.draw;
        const start = parseInt(req.body.start) || 0;
        const length = parseInt(req.body.length) || 10;
        const searchValue = req.body.search?.value || "";

        const where = {role: req.body.role};

        if (searchValue) {
          where.name = { [Op.like]: `%${searchValue}%` };
        }

        const totalRecords = await User.count({ where });
        const filteredRecords = await User.count({ where });

        const fishes = await User.findAll({
          where,
          offset: start,
          limit: length,
          order: [["id", "DESC"]]
        });

        res.json({
          draw,
          recordsTotal: totalRecords,
          recordsFiltered: filteredRecords,
          data: fishes
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
      }
});

app.post('/api/add-vendor', async (req, res) => {
    const { name, email, phone, country, state, city, address, password, is_active,role } = req.body;
    if(!name) return res.status(400).json({ error: 'Name is required' });

    try {
        const vendor = await User.findOne({ where: { phone } });
        if(vendor) {
           return res.status(400).json({ error: 'Mobile no. is already added.' });
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const newFish = await User.create({
            name: name,
            email: email,
            phone: phone,
            country: country,
            state: state,
            city: city,
            address: address,
            password: passwordHash,
            is_active: is_active ? 1 : 0,
            role: role,
            created_by: 1
        });
        return res.json({
            success: true, 
            message: "Vendor added successfully",
        });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/vendor/:id', async (req, res) => {
    const { id } = req.params;
    if(!id) return res.status(400).json({ error: 'Vendor Id is required' });

    try {
        const vendor = await User.findOne({ where: { id: id } });
        if(!vendor) {
            return res.json({ success: false, message: "Vendor not found" });
        }
        return res.json({success: true, data: vendor });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/api/update-vendor/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { password, ...updateData } = req.body;

    if (password && password.trim() !== '') {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const [updated] = await User.update(updateData, { where: { id: id } });
    if (!updated)
      return res.json({ success: false, message: "Vendor not found or not updated" });

    res.json({ success: true, message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/delete-vendor/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ success: false, message: 'Vendor ID is required' });

    const deleted = await User.destroy({ where: { id: id } });

    if (!deleted) {
      return res.json({ success: false, message: 'Vendor not found or already deleted' });
    }

    res.json({ success: true, message: 'Vendor deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
