<?php

include("connection.php");


$base64 = $_POST['base64'];
$user_id = $_POST['user_id'];
$description = $_POST['description'];

$query = $mysqli->prepare("INSERT INTO posts (photo,description,user_id) VALUE (?,?,?)");
$query->bind_param("ssi", $base64,$description,$user_id);
$query->execute();
?>