<?php

include("connection.php");

$username = $_POST['username'];
$email = $_POST["email"];
$password = hash("sha256", $_POST["password"]);

$query = $mysqli->prepare("Select id from users where username = ? OR email = ?");
$query->bind_param("ss",$username, $email);
$query->execute();
$query->store_result();
$num_rows = $query->num_rows;
$query->fetch();
$response = [];


if($num_rows == 1){
    echo "used";
}else{
    $query = $mysqli->prepare("INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, 0)");
    $query->bind_param("sss",$username, $password, $email);
    $query->execute();
    echo  "ok";  
}

?>