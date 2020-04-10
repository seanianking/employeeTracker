let mysql = require('mysql');
let inquirer = require('inquirer');
const table = require('console.table');

//middleware functions
let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
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

//prompt to determine which table to add info into
function add() {
    console.log('Now adding information');
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'What would you like to add?',
        choices: [
            'Department',
            'Role',
            'Employee'
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
                console.log('Gotta pick something');
        }
    })
};

function addDep() {
    console.log('You are adding a department');
    inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'Please type the department name: '
    }]).then(function(response) {
        insertInfo('department', response);
    });
};

function addRole() {
    console.log('You are adding a role');
    inquirer.prompt([{
            type: 'input',
            name: 'title',
            message: 'Please input role title: '
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Please input role salary: '
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Please input department id: '
        }
    ]).then(function(response) {
        insertInfo('role', response);
    });
};

function addEmp() {
    console.log('You are adding an employee');
    inquirer.prompt([{
            type: 'input',
            name: 'first_name',
            message: 'Employee first name: '
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Employee last name: '
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Employee role id: '
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Employee manager id: '
        }
    ]).then(function(response) {
        insertInfo('employee', response);
    });
};

//prompts to pull which table to view
function view() {
    console.log('Now viewing information')
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'Which table would you like to view?',
        choices: [
            'Department',
            'Role',
            'Employee'
        ]
    }]).then(function(response) {
        switch (response.action) {
            case 'Department':
                return viewDep();
            case 'Role':
                return viewRole();
            case 'Employee':
                return viewEmp();
            default:
                console.log('Gotta pick something');
        }
    });
};

function viewDep() {
    viewInfo('department');
};

function viewRole() {
    viewInfo('role');
};

function viewEmp() {
    viewInfo('employee');
};

function update() {
    console.log('Now updating information')
    inquirer.prompt([{
            type: 'input',
            name: 'role_id',
            message: 'New Role id you wish to give employee: '
        },
        {
            type: 'input',
            name: 'first_name',
            message: 'Name of employee you wish to update to new role: '
        }
    ]).then(function(response) {
        var queryString = 'UPDATE employee SET role_id = ? WHERE first_name = ?';

        connection.query(queryString, [response.role_id, response.first_name], function(err, result) {
            if (err) throw err;

        });
        init();
    })
};

//initial function for input to determine action to take
function init() {
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'Tell me what you want to do',
        choices: [
            'Add information',
            'View information',
            'Update information',
            'End application'
        ]
    }]).then(function(response) {
        switch (response.action) {
            case 'Add information':
                return add();
            case 'View information':
                return view();
            case 'Update information':
                return update();
            case 'End application':
                return (console.log('Fare thee well!'))
            default:
                console.log('Gotta pick something');
        }
    })
};