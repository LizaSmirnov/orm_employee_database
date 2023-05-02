const db = require('../server.js')

function addDepartment






//CREATE NEW DEPARTMENT
//WHEN I choose to add a department
//THEN I am prompted to enter the name of the department and that department is added to the database
app.post('/api/new-department', ({ body }, res) => {
    const sql = `INSERT INTO departments (department_name)
        VALUES (?)`;
    const params = [body.department_name];

    db.query(sql, params ,( err, result) =>{
        if (err){
            res.status(400).json( { error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: body
        })
    })
})


//CREATE NEW ROLE
//WHEN I choose to add a role
//THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
app.post('/api/new-role', ({ body }, res) => {
    const sql = `INSERT INTO roles (job_title, department, salary) 
    VALUES (?)`;
    const params1 = [body.job_title];
    const params2 = [body.department];
    const params3 = [body.salary];
})