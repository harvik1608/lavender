const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    createdAt: 'created_at', // 👈 map to your DB column
    updatedAt: 'updated_at'
  }
}, {
  tableName: "users",   // your MySQL table name
  timestamps: true       // adds createdAt and updatedAt
});

module.exports = User;

// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String, // ✅ must include
//     role: String
// },{ collection: 'admin' });

// module.exports = mongoose.model('User', userSchema);
