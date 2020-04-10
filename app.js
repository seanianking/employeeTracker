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

connection.connect(function(err) {
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
function insertInfo(table, response) {
    let queryString = 'INSERT INTO ?? SET ?';
    connection.query(queryString, [table, response], function(err, result) {
        if (err) throw err;
        console.log('info added')
    })
    init();
};



//pull information to view
function viewInfo(table) {
    let queryString = 'SELECT * FROM ??';
    connection.query(queryString, [table], function(err, result) {
        if (err) throw err;
        console.log('Viewing ' + table)
        console.log(result);
    });
    init();
};


function add() {
    console.log("Now adding information");
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'What would you like to add?',
        choices: [
            'Department',
            'Role',
            'Employees'
        ]
    }]).then(function(response) {
        switch (response.action) {
            case 'Department':
                return addDep();
            case 'Role':
                return addRole();
            case 'Employee':
                return addEmp();
            default:
                console.log("Gotta pick something");
        }
    })
};

function addDep() {
    console.log("You chose to add a department");
    inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: "Please type the department name: "
    }]).then(function(response) {
        insertInto("department", response);
    });
};

function addRole() {
    console.log("You chose to add a Role");
    inquirer.prompt([{
            type: 'input',
            name: 'title',
            message: "Please input role title: "
        },
        {
            type: 'input',
            name: 'salary',
            message: "Please input role salary: "
        },
        {
            type: 'input',
            name: 'department_id',
            message: "Please input department id: "
        }
    ]).then(function(response) {
        insertInto("role", response);
    });
};

function addEmp() {
    console.log("You chose to add a Employee");
    inquirer.prompt([{
            type: 'input',
            name: 'first_name',
            message: "Employee first name: "
        },
        {
            type: 'input',
            name: 'last_name',
            message: "Employee last name: "
        },
        {
            type: 'input',
            name: 'role_id',
            message: "Employee role id: "
        },
        {
            type: 'input',
            name: 'manager_id',
            message: "Employee manager id: "
        }
    ]).then(function(response) {
        insertInto("employee", response);
    });
};