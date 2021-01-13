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
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;

        // Log all results
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