<?php
include("connection.php");

$name = $_POST["name"];


$query = $mysqli->prepare("SELECT users.id, users.username, users.profile_picture FROM users where users.username LIKE concat('%',?,'%')");

$query->bind_param("s", $name);
$query->execute();
$array = $query->get_result();
$response = [];
while($toget = $array->fetch_assoc()){
    $response[] = $toget;
} 
$json = json_encode($response);
echo $json;

?>