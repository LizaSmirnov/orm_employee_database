const cTable = require('console.table');
const { default: inquirer } = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 4004;
const app = express();

app.use=(express.urlencoded({ extended: false}));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '4444',
        database: 'employees_db'
    },
    console.log(`connected to the employee_db database.`)
);

//initialize questions 
const init = () =>{
    inquirer
    .prompt([
        {
        type:"list",
        message: "Please choose what you would like to do",
        name:"firstPrompt",
        choices:[
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
    switch (ans.initialize){
        case 'View all departments' : viewDept();
            break;
        case 'View all roles' : viewRoles();
            break;
        case 'View all employees' : viewEmp();
            break;
        case 'Add a department' : addDept();
            break;
        case 'Add a role' : addRole();
            break;
        case 'Add an employee' : addEmp();
            break;
        case 'Update an employee role' : updateRole();
            break;
        case 'Nothing' : console.log('Okay then.');
            process.exit();
    }
}).catch(err => console.error(err));
}

init();

//create const to query select table and then display using the cTable
const viewDept = () => {
    db.query(`SELECT * FROM departments`, (err, results) =>{
        err ? console.error(err) : console.table(results);
        init();
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
        db.query(`INSERT INTO departments(name) VALUES(?)`, ans.addDept, (err,results) =>{
            if(err){
                console.log(errroooooorrrrrr)
            } else {
                db.query('SELECT * FROM departments', (err, results) => {
                    err ? console.error(err) : console.table(results);
                    init();
                })
            }
        })
    })
};

const addRole = () => {
    const deptChoices = () => db.promise().query( `SELECT * FROM deprtments`).then((rows) =>{
        let a
    })
}



//Default response for any other request (NOT FOUND)
app.use((req, res)=>{
res.status(404).end();
});

app.listen( PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});