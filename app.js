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

// functions are needed to add employees to the 
// database, view employees currently in the 
// database, and change information that is already
// present in the database. inquirer function
// is used to determine which of those functions is
// called.

//function to add information
function insertInfo(table, response){
    let queryString = 'INSERT INTO ?? SET ?';
    connection.query(queryString, [table, response], function(err, result){
        if (err) throw err;
        console.log('info added')
    })
    init();
};

//inquirer function to determine which table to add to


//pull information to view
function viewInfo(table){
    let queryString = 'SELECT * FROM ??';
    connection.query(queryString, [table], function(err, result){
        if (err) throw err;
        console.log('Viewing ' + table)
        console.log(result);
    });
    init();
};

//inquirer function to determine which table to view





