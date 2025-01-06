// Import required modules
import inquirer from 'inquirer';
import pkg from 'pg';
const { Pool } = pkg;

// PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'wrk_db',
  password: '4522',
  port: 5432,
});

// Main menu options
const mainMenu = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Choose an action:',
      choices: ['Add Employee', 'View All Employees', 'Update Employee Role', 'View All Roles', 'View All Departments', 'Add Role', 'Add Department', 'Quit'],
    },
  ]);

  switch (action) {
    case 'View All Departments':
      return viewDepartments();
    case 'Add Department':
      return addDepartment();
    case 'View All Roles':
      return viewRoles();
    case 'Add Role':
      return addRole();
    case 'View All Employees':
      return viewEmployees();
    case 'Add Employee':
      return addEmployee();
    case 'Update Employee Role':
      return updateEmployeeRole();
    case 'Quit':
      console.log('Goodbye!');
      pool.end();
      process.exit();
  }
};

// View all departments
const viewDepartments = async () => {
  try {
    const res = await pool.query('SELECT * FROM department');
    console.table(res.rows);
  } catch (err) {
    console.error(err);
  } finally {
    mainMenu();
  }
};

// Add a new department
const addDepartment = async () => {
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter department name:',
    },
  ]);

  try {
    await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
    console.log(`Department "${name}" added successfully.`);
  } catch (err) {
    console.error(err);
  } finally {
    mainMenu();
  }
};

// View all roles
const viewRoles = async () => {
  try {
    const res = await pool.query("SELECT role.id, role.title, role.salary, department.name FROM role LEFT JOIN department ON role.department_id = department.id");
    console.table(res.rows);
  } catch (err) {
    console.error(err);
  } finally {
    mainMenu();
  }
};

// Add a new role
const addRole = async () => {
  const departments = await pool.query('SELECT * FROM department');
  const { title, salary, department_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter role title:',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter role salary:',
    },
    {
      type: 'list',
      name: 'department_id',
      message: 'Select department:',
      choices: departments.rows.map((dept) => ({ name: dept.name, value: dept.id })),
    },
  ]);

  try {
    await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
    console.log(`Role "${title}" added successfully.`);
  } catch (err) {
    console.error(err);
  } finally {
    mainMenu();
  }
};

// View all employees
const viewEmployees = async () => {
  try {
    const res = await pool.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, employee.manager_id FROM employee LEFT JOIN role ON employee.role_id = role.id");
    console.table(res.rows);
  } catch (err) {
    console.error(err);
  } finally {
    mainMenu();
  }
};

// Add a new employee
const addEmployee = async () => {
  const roles = await pool.query('SELECT * FROM role');
  const employees = await pool.query('SELECT * FROM employee');
  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter first name:',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter last name:',
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Select role:',
      choices: roles.rows.map((role) => ({ name: role.title, value: role.id })),
    },
    {
      type: 'list',
      name: 'manager_id',
      message: 'Select manager:',
      choices: [{ name: 'None', value: null }].concat(
        employees.rows.map((emp) => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
      ),
    },
  ]);

  try {
    await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [
      first_name,
      last_name,
      role_id,
      manager_id,
    ]);
    console.log(`Employee "${first_name} ${last_name}" added successfully.`);
  } catch (err) {
    console.error(err);
  } finally {
    mainMenu();
  }
};

// Update an employee's role
const updateEmployeeRole = async () => {
  const employees = await pool.query('SELECT * FROM employee');
  const roles = await pool.query('SELECT * FROM role');

  const { employee_id, role_id } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employee_id',
      message: 'Select employee to update:',
      choices: employees.rows.map((emp) => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id })),
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Select new role:',
      choices: roles.rows.map((role) => ({ name: role.title, value: role.id })),
    },
  ]);

  try {
    await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
    console.log('Employee role updated successfully.');
  } catch (err) {
    console.error(err);
  } finally {
    mainMenu();
  }
};

// Start the application
mainMenu();
