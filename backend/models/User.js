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
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  is_active: {
    type: DataTypes.TINYINT,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    createdAt: 'created_at', // 👈 map to your DB column
    updatedAt: 'updated_at'
  },
  role: {
    type: DataTypes.TINYINT,
    allowNull: false
  },
}, {
  tableName: "users",   // your MySQL table name
  timestamps: true,
  paranoid: true,
  deletedAt: "deletedAt"
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
