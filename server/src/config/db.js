const { Sequelize } = require('sequelize');
const config = require('../../config.json')
const sequelize = new Sequelize(config.database, config.username, config.password, config.databaseOptions);

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
    await sequelize.sync(); 
    console.log('Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

module.exports = { sequelize, syncDatabase };