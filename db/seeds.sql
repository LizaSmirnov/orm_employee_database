INSERT INTO departments (department_name)
VALUES ('Management'),
       ('Janitorial'),
       ('Accounting'),
       ('Office');
INSERT INTO roles (title, department_id, salary)
VALUES ('CEO', 1, 2000000),
       ('Janitor', 2, 24),
       ('Manger', 1, 1000000),
       ('Accountant', 3, 400425),
       ('Secretary', 4, 22);
INSERT INTO employees (first_name, last_name, department, role_id, manager_id)
VALUES ('Beth', 'Day', 'CEO', 0 , NULL),
       ('Jane', 'Smith', 'Management', 1 , 1),
       ('James', 'Pull', 'Janitorial', 2 , 2),
       ('Igor', 'Stein', 'Secretary', 3, 2),
       ('Elliot', 'Smith', 'Accounting', 4, 2);




       