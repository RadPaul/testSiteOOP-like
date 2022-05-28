<?php
require "data.php";

class User {
    function connect(){
        global $servername, $username, $password;
        $dbName = "classTestDB";
        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbName);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
        return $conn;
    }

    function __construct ($login, $pass){
        $this->login = $this->safeData($login);
        $this->pass = $this->safeData($pass);
    }

    function login() {
        $tableName = "testSiteUsers";
        $conn = $this->connect();
        $sql = "SELECT * FROM $tableName WHERE nickname = '$this->login'";
        $data = $conn->query($sql);
        if ($data->num_rows == 0) {
            echo("Wrong login!");
        } else {
            $sql = "SELECT * FROM $tableName WHERE password = '$this->pass'";
            $data = $conn->query($sql);
            if($data->num_rows == 0) {
                echo ("Wrong password");
            } else { echo ("OK" . $this->login); }
        }
        $conn->close();
    }

    function registration() {
        $tableName = "testSiteUsers";
        $conn = $this->connect();
        $sql = "SELECT * FROM $tableName WHERE nickname = '$this->login'";
        $data = $conn->query($sql);
        if ($data->num_rows == 0) {
            $sql = "INSERT INTO $tableName (nickname, password) VALUES ('$this->login', '$this->pass');";
            $data = $conn->query($sql);
            if ($data === TRUE) { echo ("OK" . $this->login);;
            } else { echo "Error: $sql $conn->error";};
        } else {echo "This nickname is reserved";}
        $conn->close();
    }

    function safeData($data) {
        $this->data = $data;
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }
}
?>