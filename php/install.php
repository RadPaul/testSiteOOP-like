<?php
require "data.php";

function createDB() {
    global $servername, $username, $password;
    $conn = new mysqli($servername, $username, $password);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    //creating site's database
    $sql = "CREATE DATABASE classTestDB";
    if ($conn->query($sql) === TRUE) {
        echo "Database classTestDB created successfully";
    } else {
        echo "Error creating database: " . $conn->error;
    }
    $conn->close();
}

function createTables() {
    global $servername, $username, $password;
    $dbName = "classTestDB";
    $conn = new mysqli($servername, $username, $password, $dbName);
    // Check connection
    if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    }
    //creating table of users
    $sql = "CREATE TABLE testSiteUsers (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nickname VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL)";
    if ($conn->query($sql) === TRUE) {
        echo "Table testSiteUsers created successfully";
    } else {
        echo "Error creating table: " . $conn->error;
    }
    
    //creating table of records
    $sql = "CREATE TABLE records (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nickname VARCHAR(20) NOT NULL,
    points INT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)";
    if ($conn->query($sql) === TRUE) {
        echo "Table records created successfully";
    } else {
        echo "Error creating table: " . $conn->error;
    }

    $conn->close();
}

createDB();
createTables();
?>