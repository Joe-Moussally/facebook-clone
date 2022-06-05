<?php

include("connection.php");

$id = $_POST['user_id'];

$query = $mysqli->prepare("SELECT role from users where id = ?");
$query->bind_param("i", $id);
$query->execute();
$array = $query->store_result();

$response['admin'] = $array;
 
$json = json_encode($response);
echo $json;

?>