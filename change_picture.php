<?php

include("connection.php");


$user_id = $_POST['user_id'];
$base64 = $_POST['base64'];

$query = $mysqli->prepare("UPDATE users SET users.profile_picture = ? WHERE users.id = ?;");
$query->bind_param("si", $base64,$user_id);
$query->execute();
?>