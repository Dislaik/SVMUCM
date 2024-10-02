const express = require('express');
const router = require('./router/router');
const { syncDatabase } = require('./config/db');
const cors = require ('cors');
const Role = require('./model/role');
const port = 8080;
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

syncDatabase();
initDataTable();

app.listen(port, () => {
  console.log('Server listening on Port:', port);
})


async function initDataTable() {
  const [role, created] = await Role.findOrCreate({
    where: { name: 'community' },
    defaults: { label: 'Comunidad' }
  });

}

// 36864 - 73728