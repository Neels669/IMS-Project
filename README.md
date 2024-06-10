# IMS-Project

**Inventory Management System**

**Introduction**

The Inventory Management System (IMS-Project) is designed to streamline the management of products, stock levels, and orders within an organization. It provides a command-line interface (CLI) for users to interact with various components of the inventory. The application synchronizes data with a MySQL database, ensuring data integrity and consistency.

**Features**

* User Login: Secure login system for users.

* Product Management: Create, read, update, and delete products.

* Category Management: Create, read, update, and delete categories.

* Order Management: Create and read orders, with stock adjustments.

* Stock Movements: Track changes in stock levels.

**Technologies Used**

Node.js: Backend runtime environment.

Sequelize: ORM for database interactions.

MySQL: Relational database management system.

Inquirer: Library for creating CLI prompts.

**Architecture**

Backend Application: Node.js application with Sequelize for ORM.

Database: MySQL database for storing all data.

Command-Line Interface: Interact with the system through CLI.

**Setup and Installation**

Node.js: Ensure Node.js is installed on your machine.

MySQL: Ensure MySQL server is running.

Clone the Repository.

Install Dependencies.

Configure MySQL - 'mysql_username'@'localhost' IDENTIFIED BY 'root' / CREATE DATABASE inventory_management_system;

Run migrations and seed the database

Start App with npm start.


