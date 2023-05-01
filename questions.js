// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 


const questions = [{
    type:"list",
    message: "Please choose what you would like to do",
    name:"firstPrompt",
    choices:['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
},
{ //ADD DEPARTMENT
    type:"input",
    message:"Please choose which department you would like to add",
    name:"addDepartment",
    when: (answers) => {
        if (answers.firstPrompt === 'View all departments'){
            return true;
        }
    }

},
{ // ADD ROLE
    type:"input",
    message:"Please enter the name, salary, and department for the new role",
    name:"addRole",
    when: (answers) => {
        if (answers.firstPrompt === 'Add a role'){
            return true;
        }
    }
}, 
{ //ADD EMPLOYEE
    type:"input",
    message:"Please enter the employee’s first name, last name, role, and manager,",
    name:"addEmployee",
    when: (answers) => {
        if (answers.firstPrompt === 'Add an employee'){
            return true;
        }
    }
},
{ //UPDATE EMPLOYEE ROLE
    type:"choice",
    message:"Please choose which employee you want to update",
    name:"updateEmployee",
    when: (answers) => {
        if (answers.addPrompt === 'Add an employee'){
            return true;
        }
    }
}
]


module.exports = questions