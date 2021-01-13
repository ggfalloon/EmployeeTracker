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
    start();
});

function start() {
    inquirer
        .prompt({
            name: "addData",
            type: "list",
            message: "What would you like to do?",
            choices: ["Add Department?", "Add Role?", "Add employee?"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.addData === "POST") {
                postAuction();
            }
            else if (answer.postOrBid === "BID") {
                bidAuction();
            } else {
                connection.end();
            }
        });
}