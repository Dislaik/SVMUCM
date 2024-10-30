const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Headquarter = require('./headquarter');
const Faculty = require('./faculty');

const Career = sequelize.define('career', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  label: { type: DataTypes.STRING, allowNull: false },
  id_headquarter: { type: DataTypes.INTEGER, allowNull: false, references: { model: Headquarter, key: 'id' } },
  id_faculty: { type: DataTypes.INTEGER, allowNull: false, references: { model: Faculty, key: 'id' } }
});

Career.belongsTo(Faculty, { foreignKey: 'id_faculty'});
Career.belongsTo(Headquarter, { foreignKey: 'id_headquarter'});

module.exports = Career;