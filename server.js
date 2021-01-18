// const util = require("util");
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "58153027",
    database: "emp_trackerDB"
});

connection.connect(function (err) {
    if (err) throw err;
    readData();
});

// connection.query = util.promisify(connection.query)

function readData() {
    connection.query("SELECT A.id, A.first_name, A.last_name, title, department.name as department, salary, CONCAT(B.first_name, ' ', B.last_name) as manager FROM emp_trackerDB.employee A LEFT JOIN emp_trackerDB.employee B ON A.manager_id = B.id INNER JOIN role ON A.role_id = role.id INNER JOIN department ON department.id = department_id", function (err, res) {
        if (err) throw err;

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

// function getroleId() {
//     return connection.query("SELECT id, title FROM emp_trackerDB.role", function (error, results) {
//         if (error) throw error;
//         // console.log(results);
//     });
// }


function addEmp() {
    // let roleId = await getroleId();
    // console.log(roleId);
    // let mgrId = connection.query("SELECT CONCAT(first_name, ' ', last_name) as manager FROM emp_trackerDB.employee")
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
                    {
                        name: "Marketing Specialist", value: 11
                    },
                    {
                        name: "Sales Manager", value: 13
                    },
                    {
                        name: "Software Engineer", value: 14
                    }
                ]
                // Write code to convert to role id #
            },
            {
                name: 'mgr',
                type: 'list',
                message: 'New employee manager?',
                choices: [
                    { name: "Brad Pitt", value: 21 },
                    { name: "Beyonce Knowles", value: 22 }
                ]
                // Write code to convert to manager id #
            },
        ])
        .then(function (answer) {
            console.log(answer);
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
    connection.query("SELECT id as value, CONCAT(first_name, ' ', last_name) as name FROM emp_trackerDB.employee", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt({
                name: "name",
                type: "list",
                message: "Which employee would you like to remove?",
                choices: res
            })
            .then(function (answer) {
                connection.query(
                    "DELETE FROM employee WHERE ?",
                    {
                        id: answer.name,

                    },
                    function (err) {
                        if (err) throw err;
                        console.log("The employee was deleted successfully!");
                        updateData();
                    }
                );
            })
    })

}