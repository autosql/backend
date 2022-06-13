const express = require('express');
const router = express.Router();
const Users = require('../models').users;
const Erds = require('../models').erds;
const SharedErds = require('../models').shared_erds;
const SharedUsers = require('../models').shared_users;
const mysql = require('mysql2');

const dbConfig = require("../config/config");

/* GET home page. */
router.get('/',function (req, res) {
  const connection = mysql.createConnection({
    host: dbConfig.production.host,
    user: dbConfig.production.username,
    password: dbConfig.production.password,
    database: dbConfig.production.database,
    port: 3306
  });

  let connection_status = "-"
  let connection_message = "-"

  connection.connect(error => {
    console.log("db connect function")
    if (error) {
      connection_status = "Failed."
      connection_message = "Database Connection Failed."
      res.render('index', { db_status: connection_status, db_message: connection_message, db_info: dbConfig});
    }

    connection_status = "Success!!"
    res.render('index', { db_status: connection_status, db_message: connection_message });
  });

  connection.end()
});

router.get('invite/:email/:userId/:sharedId', function (req, res) {
  const userId = req.params.userId;
  const sharedId = req.params.sharedId;
  SharedUsers.create({
    user_id: userId,
    shared_id: sharedId
  }).then(() => {
    res.redirect('https://autosql.co.kr');
  });
  // res.json({ email: email, userId: userId, sharedId: sharedId });
});

router.get('/landing/user', async function (req, res) {
  const count = await Users.count();
  res.json({ count });
});

router.get('/landing/erd', async function (req, res) {
  const count = await Erds.count();
  res.json({ count });
});

router.get('/landing/share', async function (req, res) {
  const count = await SharedErds.count();
  res.json({ count });
});


module.exports = router;
