const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Role = require('./role');
const UserStatus = require('./userStatus');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  address: {type: DataTypes.STRING, allowNull: true },
  phone: { type: DataTypes.STRING, allowNull: true },
  image: { type: DataTypes.STRING, allowNull: false },
  id_role: { type: DataTypes.INTEGER, allowNull: false, references: { model: Role, key: 'id' } },
  id_user_status: { type: DataTypes.INTEGER, allowNull: false, references: { model: UserStatus, key: 'id' } },
  created_at: { type: DataTypes.DATE,  allowNull: false }
});

User.belongsTo(Role, { foreignKey: 'id_role'});
User.belongsTo(UserStatus, { foreignKey: 'id_user_status'});


module.exports = User;