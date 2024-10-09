const express = require('express');
const router = require('./router/router');
const { syncDatabase } = require('./config/db');
const Role = require('./model/role');
const cors = require ('cors');
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

  const [role, created] = await Role.findOrCreate({
    where: { name: 'community' },
    defaults: { label: 'Comunidad' }
  });
}