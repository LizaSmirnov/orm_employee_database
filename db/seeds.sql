INSERT INTO employees (first_name, last_name, job_title, department, salary, reporting_manager)
VALUES ('Elliot', 'Smith', 'Accounting', '$400,425.25', 'Jane Smith'),
       ('Jane', 'Smith', 'Management', '$1,000,000.01', 'Beth Day'),
       ('Beth', 'Day', 'CEO', '$2,000,000', 'none'),
       ('James', 'Pull', 'Janitorial', '$24.21/hr', 'Jane Smith'),
       ('Igor', 'Stein', 'Secretary', '22.25/hr', 'Jane Smith');

       INSERT INTO roles (job_title, department, salary)
VALUES ('CEO', 'Management', '2,000,000'),
       ('Janitor', 'Janitorial', '$24.21/hr'),
       ('Manger', 'Mangement', '$1,000,000.01'),
       ('Accountant', 'Accounting','$400,425.25'),
       ('Secretary', 'Office','22.25/hr');


       INSERT INTO departments (department_name)
VALUES ('Management'),
       ('Janitorial'),
       ('Mangement'),
       ('Accounting'),
       ('Office');

       