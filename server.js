const express = require('express');
const { default: inquirer } = require('inquirer');
const mysql = require('mysql2');
const questions = require('./questions.js');
const runOptions = require('./runOptions.js')

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
function startQuestions() {
    inquirer
    .prompt(questions)
    .then((response => {
        runOptions(response)
    }))
    .catch(err => {
        console.log(err)
    })
};

//Default response for any other request (NOT FOUND)
app.use((req, res)=>{
res.status(404).end();
});

app.listen( PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});