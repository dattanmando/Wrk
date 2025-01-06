INSERT INTO department (name)
VALUES ('Design'),
       ('Marketing'), 
       ('Legal'), 
       ('HR'), 
       ('Sales'),
       ('Admin');

INSERT INTO role (title, salary, department_id)
VALUES ('Designer', 50000, 1),
       ('Marketing Manager', 80000, 2),
       ('Legal Counsel', 100000, 3),
       ('HR Manager', 75000, 4),
       ('Sales Manager', 90000, 5),
       ('Admin', 120000, 6);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Alice', 'Smith', 1, NULL),
       ('Bob', 'Jones', 2, 1),
       ('Charlie', 'Brown', 3, 2),
       ('David', 'White', 4, 3),
       ('Eve', 'Black', 5, 4),
       ('Frank', 'Green', 6, 5);

