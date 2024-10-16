const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const CourseCategory = require('./courseCategory');

const Course = sequelize.define('Course', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false, unique: true },
  id_category: { type: DataTypes.INTEGER, allowNull: true, references: { model: CourseCategory, key: 'id' } },
});

Course.belongsTo(CourseCategory, { foreignKey: 'id_category'});

module.exports = Course;