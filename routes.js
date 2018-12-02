const express = require('express');
const {
  Client
} = require('pg');

// DB connect string
const connectionString = process.env.DATABASE_URL;

const router = express.Router();

router.get('/', function (req, res) {

  const client = new Client({
    connectionString: connectionString
  });
  client.connect();

  client.query('SELECT * FROM recipes', (err, result) => {
    if (err) {
      return console.error('Client error', err);
    } else {
      // console.log('Client response', result.rows);
      res.render('index', {
        recipes: result.rows
      });
      client.end();
    }
  });
});

router.post('/add', function (req, res) {
  const client = new Client({
    connectionString: connectionString
  });
  client.connect();

  client.query('INSERT INTO recipes(name, ingredients, directions) VALUES($1, $2, $3)', [
    req.body.name,
    req.body.ingredients,
    req.body.directions
  ]);

  res.redirect('/');
  // done();

});

router.delete('/delete/:id', function (req, res) {
  const client = new Client({
    connectionString: connectionString
  });
  client.connect();

  client.query('DELETE FROM recipes WHERE id = $1', [
    req.params.id
  ]);

  // done();
  res.sendStatus(200)
  // res.redirect('/');
});

router.post('/edit', function (req, res) {
  const client = new Client({
    connectionString: connectionString
  });
  client.connect();

  client.query('UPDATE recipes SET name=$1, ingredients=$2, directions=$3 WHERE id=$4', [
    req.body.name,
    req.body.ingredients,
    req.body.directions,
    req.body.id
  ]);

  // done();
  res.redirect('/');
});

module.exports = router;