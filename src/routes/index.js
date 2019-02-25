'use strict';

const express = require('express');
const router = express.Router();

const hdb = require('hdb');

var client = hdb.createClient({
    host: 'hxehost',
    port: 39015,
    user: 'system',
    password: 'SapAbap1'
});

const varTitle = process.env.TITLE || 'NodeJS running on Cloud Foundry';
const varMessage = process.env.MESSAGE || 'Hello world!';

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: varTitle, message: varMessage });
});

/* GET home page. */
router.get('/hana', (req, res, next) => {
  client.on('error', function (err) {
      console.error('Network connection error', err);
  });

  client.connect(function (err) {
      if (err) {
          return console.error('Connect error', err);
      }
      client.exec('select * from DUMMY', function (err, rows) {
          client.end();
          if (err) {
              return console.error('Execute error:', err);
          }
          res.send(rows);
          console.log('Results:', rows);
      });
  });
});

module.exports = router;
