<?php
require "data.php";

class Records {
    function __construct ($name, $result){
        $this->name = $name;
        $this->result = $result;
    }

    //connects to the database
    public static function connect(){
        global $servername, $username, $password, $dbName;
        $conn = new mysqli($servername, $username, $password, $dbName);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
        return $conn;
    }

    //adds records to database
    function registerRecord() {
        $tableName = "records";
        $conn = self::connect();
        $sql = "INSERT INTO $tableName (nickname, points) VALUES ('$this->name', '$this->result');";
        $data = $conn->query($sql);
        if ($data === TRUE) {
            echo($this->result);
        } else {
            echo("Error: $sql $conn->error");
        }
        $conn->close();
    }

    //shows top-10 results (if there's already >=10 for a current user)
    public static function topRec($nickname) {
        $tableName = "records";
        $conn = self::connect();
        if ($nickname=="null") {
            $sql = "SELECT points, nickname FROM $tableName 
            ORDER BY points DESC LIMIT 10;";
        } else {
            $sql = "SELECT points, nickname FROM $tableName 
            WHERE nickname='$nickname'
            ORDER BY points DESC LIMIT 10;";
        }
        $data = $conn->query($sql);
        if ($data->num_rows > 0) {
            $rn = 1;
            echo "<table><caption>Top-10 results</caption><tr><th>#</th><th>Points</th><th>Username</th></tr>";
            while($row = $data->fetch_assoc()) {
                echo "<tr><td>" . $rn . "</td><td>" . $row["points"] . "</td><td>" . $row["nickname"] . "</td>";
                $rn++;
            }
            echo "</table>";
        } else {
        echo "0 results";
        }
        $conn->close();
    }

    //shows bottom 10 results (if there's already >=10 for a current user)
    public static function bottomRec($nickname) {
        $tableName = "records";
        $conn = self::connect();
        if ($nickname=="null") {
            $sql = "SELECT points, nickname FROM $tableName 
            ORDER BY points ASC LIMIT 10;";
        } else {
            $sql = "SELECT points, nickname FROM $tableName 
            WHERE nickname='$nickname'
            ORDER BY points ASC LIMIT 10;";
        }
        $data = $conn->query($sql);
        if ($data->num_rows > 0) {
            $rn = 1;
            echo "<table><caption>Bottom 10 results</caption><tr><th>#</th><th>Points</th><th>Username</th></tr>";
            while($row = $data->fetch_assoc()) {
                echo "<tr><td>" . $rn . "</td><td>" . $row["points"] . "</td><td>" . $row["nickname"] . "</td>";
                $rn++;
            }
            echo "</table>";
        } else {
        echo "0 results";
        }
        $conn->close();
    }

    //shows number of games played and average score
    public static function mediocre($nickname) {
        $tableName = "records";
        $conn = self::connect();
        if ($nickname=="null") { //shows overall statistics
            $sql = "SELECT AVG(points) FROM $tableName;";
            $data = $conn->query($sql);
                while($row = $data->fetch_array()){
                echo "Average points :". round($row['AVG(points)']);
                echo "<br/>";
                }
            $sql = "SELECT MAX(id) FROM $tableName;";
            $data = $conn->query($sql);
            while($row = $data->fetch_array()){
                echo "Games played:". $row['MAX(id)'];
                echo "<br/>";
            }
        } else {
            //shows player's statistics
            $sql = "SELECT COUNT(id) FROM $tableName
            WHERE nickname='$nickname';";
            $data = $conn->query($sql);
            while($row = $data->fetch_array()){
                echo "Games played: ". $row['COUNT(id)'];
                echo "<br/>";
            }
            $sql = "SELECT AVG(points) FROM $tableName
            WHERE nickname='$nickname';";
            $data = $conn->query($sql);
            while($row = $data->fetch_array()){
                echo "Average score: ". round($row['AVG(points)']);
                echo "<br/>";
            }
        }
        $conn->close();
    }
}
?>