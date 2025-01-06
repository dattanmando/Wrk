# WrkFrmHm PostgreSQL Inquirer CLI Application

This Node.js application provides a command-line interface for managing a PostgreSQL database for an organizational structure. It uses `inquirer` for user interaction and `pg` for database operations.

## Features

- **Add Employee**: Add a new employee to the database.
- **View All Employees**: Display all employees in the database.
- **Update Employee Role**: Update an employee's role.
- **View All Roles**: Display all roles in the database.
- **View All Departments**: Display all departments in the database.
- **Add Role**: Add a new role to the database.
- **Add Department**: Add a new department to the database.
- **Quit**: Exit the application.

## Database Schema

The application uses the following schema:

```sql
DROP DATABASE IF EXISTS wrk_db;

CREATE DATABASE wrk_db;

\c wrk_db;

CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department (id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    FOREIGN KEY (role_id)
    REFERENCES role (id)
    ON DELETE SET NULL,
    manager_id INTEGER,
    FOREIGN KEY (manager_id)
    REFERENCES employee (id)
    ON DELETE SET NULL
);
```

## Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Ensure PostgreSQL is installed and running on your system. Update the connection pool configuration in the code with your PostgreSQL credentials:
   ```javascript
   const pool = new Pool({
     user: 'your_username',
     host: 'localhost',
     database: 'wrk_db',
     password: 'your_password',
     port: 5432,
   });
   ```

4. Set up the database schema by running the SQL commands provided above in your PostgreSQL client.

## Usage

1. Start the application:
   ```bash
   npm start
   ```

2. Follow the on-screen prompts to interact with the database.

## Dependencies

- [inquirer](https://www.npmjs.com/package/inquirer): For CLI prompts.
- [pg](https://www.npmjs.com/package/pg): For PostgreSQL integration.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Tests

To ensure the application works as expected, you can run the following tests:

1. **Test Database Connection**:
   Verify that the PostgreSQL database connection is successful by running:
   ```bash
   node -e "require('./script.js')"
   ```
   If the connection is successful, you should see the main menu options.

2. **Test Individual Features**:
   - Add a test department, role, and employee to verify the insertion functionality.
   - View departments, roles, and employees to confirm data retrieval.
   - Update an employee's role to ensure the update functionality works.

3. **Mock Testing** (Optional):
   Use tools like [Jest](https://jestjs.io/) to mock database queries and validate function logic.

   Example setup for Jest:
   ```bash
   npm install --save-dev jest
   ```

   Create a test file (e.g., `script.test.js`) and mock the `pg` module to simulate database operations.

   Run tests with:
   ```bash
   npx jest
   ```

## Contributions
Contributions are welcome!
Github https://github.com/dattanmando/wrkfrmhm
Walkthrough video https://drive.google.com/file/d/1AgD6BlOW2oEVKK_YOZfPXWHQif7iUOI1/view
