const firebird = require('node-firebird');
const express = require('express');
const app = express();
const port = 3000;

const options = {
  host: '206.81.13.145',  // Reemplaza con la IP de tu Droplet en DigitalOcean
  port: 3050,
  database:'/var/lib/firebird/3.0/data/DELFA BOS.FDB',  // Ruta a tu base de datos
  user: 'SYSDBA',
  password: 'masterkey',  // Reemplaza con la contraseña de SYSDBA
  role: null,    // Puedes dejarlo como null si no usas roles
  pageSize: 4096 // Ajusta según la configuración de tu base de datos
};

app.get('/get-empleados', (req, res) => {
    firebird.attach(options, (err, db) => {
      if (err) {
        res.status(500).send('Error connecting to the database: ' + err.message);
        return;
      }
  
      const query = 'SELECT * FROM empleados';
  
      db.query(query, (err, result) => {
        if (err) {
          res.status(500).send('Query error: ' + err.message);
        } else {
          res.json(result);
        }
        db.detach();
      });
    });
  });

app.listen(port, () => {
  console.log(`Server running at http://138.197.17.205:${port}/`);
});
