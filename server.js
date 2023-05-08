const { prompt } = require("inquirer");
const inquirer = require("inquirer");
const mysql = require('mysql2');
require("console.table");

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '4444',
        database: 'employees_db'
    },
    console.log(`connected to the employee_db database.`)
);

db.connect((err) => {
    if (err) throw err;
    console.log('connected as id ' + db.threadId);
    init();
});

function init() {
    prompt([
        {
            type: "list",
            message: "Please choose what you would like to do",
            name: "firstPrompt",
            choices: [
                'View all departments',
                'View all roles',
                'View all employees', 
                'Add a department', 
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Nothing'
            ]
        }
    ]).then(ans => {
        switch (ans.firstPrompt) {
            case 'View all departments':
                viewDept();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmp();
                break;
            case 'Add a department':
                addDept();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmp()
                addManager();
                break;
            case 'Update an employee role':
                updateEmp();
                break;
            case 'Nothing':
                console.log('Okay then.');
                process.exit();
        }
    }).catch(err => console.error(err));
}

const viewDept = () => {
    db.query(`SELECT * FROM departments`, (err, results) => {
        if (err) {
            console.error(err)
        } else {
            console.table(results);
            init();
}
    })
}

const viewRoles = () => {
    db.query(`SELECT * FROM roles`, (err, results) =>{
        err ? console.error(err) : console.table(results);
        init();
    })
}

const viewEmp = () => {
    db.query(`SELECT * FROM employees`, (err, results) =>{
        err ? console.error(err) : console.table(results);
        init();
    })
}
//--------------------------------------------------------------//
//Addition prompts
const addDept = () => {
    inquirer
    .prompt([
        {
            type:"input",
            message:"Please choose a new department name you would like to add",
            name:"addDept"
        }
    ]).then(ans => {
        db.query(`INSERT INTO departments(department_name) VALUES(?)`, [ans.addDept], (err,results) =>{
            if(err){
                console.error(err)
            } else {
                db.query('SELECT * FROM departments', (err, results) => {
                    err ? console.error(err) : console.table(results);
                    init();
                })
            }
        })
    })
};

const addRole = async () => {
    const deptChoices = async () => {
    const rows = await db.promise().query( `SELECT * FROM departments`);
    
    let deptNames = rows[0].map(obj => obj.department_name);
    console.log(deptNames);
    return deptNames;
    };

    const choices = await deptChoices();
    console.log(choices);
    inquirer
    .prompt([
        {
            type:"input",
            message:"Please choose a new role name you would like to add",
            name:"addRoleTitle"
        },
        {
            type:"input",
            message:"Please choose a salary for this role",
            name:"addRoleSalary"
        },
        {
            type:"list",
            message:"Please choose which department this new role is in",
            name:"addDept",
            choices: choices //we get from using our promise up above
        }
    ]).then(ans => {
        db.promise().query(`SELECT id FROM departments WHERE department_name = ?`, ans.addDept).then(answer =>{
            let mapId = answer[0].map(obj => obj.id);
            return mapId[0]
        })
        .then((mapId) =>{
            db.promise().query(`INSERT INTO roles(title, salary, department_id) VALUES(?,?,?)`, [ans.addRoleTitle, ans.addRoleSalary, mapId]);
            init();
        })
    })
};


const addEmp = async () => {
        const roleChoices = async () => {
        const roles = await db.promise().query( `SELECT * FROM roles`);

        let roleNames = roles[0].map(obj => obj.title);
        return roleNames;
    };
        const managerChoices = async () => {
        const manager = await db.promise().query( `SELECT * FROM employees`);

        let managerNames = manager[0].map(obj => obj.first_name + ' '+ obj.last_name);
        return managerNames;
        }
    const choices1 = await roleChoices();
    const choices2 = await managerChoices();
    
    inquirer
    .prompt([
        {
            type:"input",
            message:"What is the employee's first name?",
            name:"addFirst"
        },
        {
            type:"input",
            message:"What is employee's last name?",
            name:"addLast"
        },
        {
            type:"list",
            message:"Please assign a role",
            name:"addRole",
            choices: choices1 // from the promise up above
        },
        {
            type:"input",
            message:"What is the employee's department?",
            name:"addDepartment"
          },
        {
            type:"list",
            message:"Please assign a manager",
            name:"addManager",
            choices: choices2 // from the promise up above
    }
    ]).then(async ans => {
        const roleIdQuery = await db.promise().query(`SELECT id FROM roles WHERE title = ?`, ans.addRole);
        const roleId = roleIdQuery[0][0].id;
        
        const managerIdQuery = await db.promise().query(`SELECT id FROM employees WHERE CONCAT(first_name, ' ', last_name) = ?`, ans.addManager);
        const managerId = managerIdQuery[0][0].id;
        
        await db.promise().query(`INSERT INTO employees(first_name, last_name, role_id, department, manager_id) VALUES(?,?,?,?,?)`, [ans.addFirst, ans.addLast, roleId, ans.addDepartment, managerId], (err,results) => {
            if (err){
                console.error(err)
            } else {
                db.query(`SELECT * FROM employees`, (err, results) => {
                    err ? console.error(err) : console.table(results);
                    init();
                })
            }
        })
    })
};



const updateEmp = async () => {
    const employeeChoices = async () => await db.promise().query( `SELECT * FROM employees`).then((rows) =>{
        let empNames = rows[0].map(obj => obj.first_name)
        return empNames;
    })

    const roleChoices = async () => await db.promise().query( `SELECT id FROM roles`).then((rows) =>{
            let roleNames = rows[0].map(obj => ({ name: obj.title, value:obj.id }))
            return roleNames;
    })

        const updateEmp = await employeeChoices();
        const updateRole = await roleChoices();

    inquirer
    .prompt([
        {
            type:"list",
            message:"Which employee would you like to update?",
            name:"addEmp",
            choices: employeeChoices //promise above
        }, 
        {
            type:"list",
            message:"Which role are you assigning them?",
            name:"addRole",
            choices: roleChoices //promise above
        }
    ]).then(async ans =>{
        await db.promise().query(`UPDATE employees SET role_id = ? WHERE first_name = ?`, [ans.addRole, ans.addEmp]);

        db.promise().query(`SELECT * FROM employees`).then((rows) => {
          console.table(rows[0]);
          console.log("Employee role updated!");
          init();
        }).catch(errpr => {
            console.log(error)
        })
    })
};


