const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Role = require('./role');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  id_role: { type: DataTypes.INTEGER, allowNull: false, references: { model: Role, key: 'id',} },
  created_at: { type: DataTypes.DATE,  allowNull: false }
});

module.exports = User;