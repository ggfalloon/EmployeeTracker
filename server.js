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
        console.log("HERE IS YOUR CURRENT EMPLOYEE DATA")
        console.log(res);
        addData();
    });
}

function addData() {
    inquirer
        .prompt({
            name: "addData",
            type: "list",
            message: "What would you like to do?",
            choices: ["Add Department?", "Add Role?", "Add employee?"]
        })
        .then(function (answer) {

            if (answer.addData === "Add Department?") {
                addDepartment();
            }
            else if (answer.postOrBid === "Add Role?") {
                addRole();
            }
            else if (answer.addData === "Add employee?") {
                addRole();
            } else {
                connection.end();
            }
        });
}