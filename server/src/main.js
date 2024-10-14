const express = require('express');
const router = require('./router/router');
const { syncDatabase } = require('./config/db');
const Role = require('./model/role');
const cors = require ('cors');
const Headquarter = require('./model/headquarter');
const CourseDuration = require('./model/courseDuration');
const CourseMode = require('./model/courseMode');
const port = 8080;
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

syncDatabase(initTable);



app.listen(port, () => {
  console.log('Server listening on Port:', port);
})

async function initTable() {
  await Role.findOrCreate({ where: {name: 'community'}, defaults: {label: 'Comunidad'} });
  await Headquarter.findOrCreate({ where: {name: 'ucm1'}, defaults: {label: 'Campus San Miguel'} });
  await Headquarter.findOrCreate({ where: {name: 'ucm2'}, defaults: {label: 'Campus Nuestra Señora del Carmen'} });
  await Headquarter.findOrCreate({ where: {name: 'ucm3'}, defaults: {label: 'Campus San Isidro'} });
  await CourseDuration.findOrCreate({ where: {name: '1hour'}, defaults: {label: '1 Hora'} });
  await CourseDuration.findOrCreate({ where: {name: '2hour'}, defaults: {label: '2 Horas'} });
  await CourseDuration.findOrCreate({ where: {name: '3hour'}, defaults: {label: '3 Horas'} });
  await CourseMode.findOrCreate({ where: {name: 'presential'}, defaults: {label: 'Presencial'} });
  await CourseMode.findOrCreate({ where: {name: 'remote'}, defaults: {label: 'Remoto'} });
  await CourseMode.findOrCreate({ where: {name: 'hybrid'}, defaults: {label: 'Híbrida'} });
}