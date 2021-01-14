const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "58153027",
    database: "emp_trackerDB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    readData();
});

function readData() {
    connection.query("SELECT employee.id, first_name, last_name, title, department.name as department, salary, manager_id as manager FROM emp_trackerDB.employee LEFT JOIN role ON role_id = role.id INNER JOIN department ON department.id = department_id", function (err, res) {
        if (err) throw err;

        // Write code to convert manager id to full name!!!
        console.log("\nHERE IS YOUR CURRENT EMPLOYEE DATABASE:\n")
        console.table(res);
        updateData();
    });
}

function updateData() {
    inquirer
        .prompt({
            name: "updateData",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "Add Employee",
                "Remove Employee",
                "Update Emplyee Role",
                "View All Roles",
                "Add Role",
                "Remove Role",
                "View All Departments",
                "Add Department",
                "Remove Department",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.updateData) {
                case "View All Employees":
                    readData();
                    break;

                case "Add Employee":
                    addEmp();
                    break;

                case "Remove Employee":
                    removeEmp();
                    break;

                case "Update Emplyee Role":
                    updateEmp();
                    break;

                case "View All Roles":
                    viewRoles();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "Remove Role":
                    removeRole();
                    break;

                case "View All Departments":
                    viewDep();
                    break;

                case "Add Department":
                    addDep();
                    break;

                case "Remove Department":
                    removeDep();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
}

function addEmp() {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "New employee first name?"
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'New employee last name?'
            },
            {
                name: 'role',
                type: 'list',
                message: 'New employee role',
                choices: [
                    "Marketing Specialist",
                    "Sales Manager",
                    "Software Engineer"
                ]
                // Write code to convert to role id #
            },
            {
                name: 'mgr',
                type: 'list',
                message: 'New employee manager?',
                choices: [
                    "Brad Pitt",
                    "Beyonce Knowles"
                ]
                // Write code to convert to manager id #
            },
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.role,
                    manager_id: answer.mgr
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your new employee was added successfully!");
                    updateData();
                }
            );
        })

}

function removeEmp() {
    inquirer
        .prompt({
            name: "name",
            type: "list",
            message: "Which employee would you like to remove?",
            choices: [connection.query("SELECT first_name, last_name FROM employee")
            ]
        })
        .then(function (answer) {
            connection.query(
                "DELETE FROM employee WHERE ?",
                {
                    first_name: answer.choice,

                },
                function (err) {
                    if (err) throw err;
                    console.log("The employee was deleted successfully!");
                    updateData();
                }
            );
        })

}