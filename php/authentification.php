<?php
//works with testSuteUsers table (creating instances of User class, calls class methods)
require "User.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $log = $_POST['login'];
    $pass = $_POST['password'];
    $todo = $_POST['todo'];
    if ($log && $pass) {
        switch ($todo) {
            case "registration": //JS newUser()
                $user = new User($log, $pass);
                $user->registration();
                break;
            case "login": //JS oldUser()
                $user = new User($log, $pass);
                $user->login();
                break;
            default:
                echo "Invalid input was given";
        }
    }
}
?>