const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const CourseCategory = sequelize.define('course_category', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  label: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Course;