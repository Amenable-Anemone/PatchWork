const express = require('express');
const app = express();
const morgan = require ('morgan');
const dotenv = require ('dotenv');
const path = require('path');
const pg = require('pg');
const cors = require('cors');

const port = 3000;

app.use(morgan('dev'));
app.use(cores())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect to the DB
const client = new pg.Client(process.env.DB);
client.connect(function (err) {
  if (err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function (err, result) {
    if (err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    // >> output: 2018-08-23T14:02:57.117Z
    client.end();
  });
});


app.get('/', (req, res)=>{
  res.status(200).send('welcome')
})

app.listen(port, ()=>{
  console.log(`Server is listening on port ${port} `)
})
