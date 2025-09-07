const firebird = require('node-firebird');
const express = require('express');
const app = express();
const port = 3000;

const options = {
  host: '206.81.13.145', //IP SERVIDOR
  port: 3050,
  database:'/var/lib/firebird/3.0/data/DELFA BOS.FDB', 
  user: 'SYSDBA',
  password: '',
  role: null,
  pageSize: 4096
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

