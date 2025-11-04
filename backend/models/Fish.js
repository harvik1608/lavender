const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Fish = sequelize.define("Fish", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: false
  },
  is_active: {
    type: DataTypes.TINYINT,
    allowNull: false
  },
  created_by: {
      type: DataTypes.INTEGER,
      allowNull: true
  },
  updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true
  },
}, {
  tableName: "fishes",
  timestamps: true,
  paranoid: true,
  deletedAt: "deletedAt"
});
module.exports = Fish;
