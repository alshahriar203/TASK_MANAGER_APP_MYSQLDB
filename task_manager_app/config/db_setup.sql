-- Create database
CREATE DATABASE IF NOT EXISTS task_manager_db;

-- Switch to the newly created database
USE task_manager_db;

-- Create users table
CREATE TABLE users (
    username VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user'
);


-- Create tasks table
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('To Do', 'Completed', 'In Progress') DEFAULT 'To Do',
    username VARCHAR(255),
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
);

-- Create a new user and grant privileges
CREATE USER IF NOT EXISTS 'mahir'@'localhost' IDENTIFIED BY 'mahir_password';
GRANT ALL PRIVILEGES ON task_manager_db.* TO 'mahir'@'localhost';
FLUSH PRIVILEGES;

