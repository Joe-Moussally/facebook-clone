<?php

include("connection.php");

$id = $_POST["id"];

$query = $mysqli->prepare("SELECT id, username, email, profile_picture from users where id = ?");

$query->bind_param("i", $id);
$query->execute();
$array = $query->get_result();
$response[] = $array->fetch_assoc();

$json = json_encode($response);
echo $json;

?>
