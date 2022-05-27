<?php
//works with records table (creating instances of Records class, calls class methods)
require "Records.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $result = $_POST["number"];
    $name = $_POST["name"];

    if ($result) { //JS likeAGame()
        $user = new Records($name, $result);
        $user->registerRecord();
    } else { //JS myStat()
        echo '<div class="left stat">';
        Records::topRec($name);
        echo '</div>
        <div class="left stat">';
        Records::bottomRec($name);
        echo '</div>
        <div class="left stat">';
        Records::mediocre($name);
        echo '</div>';
    }
}

?>