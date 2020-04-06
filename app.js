let mysql = require('mysql');
let inquirer = require('inquirer');
const table = require('console.table');

//middleware functions
let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.PASSWORD,
    database: 'tracker_db'
});

connection.connect(function(err){
    if (err) throw err;
    console.log('Connected as id ' + connection.threadId);
    init();
});

