<?php

include("connection.php");

$id = $_POST['id'];

$query = $mysqli->prepare("SELECT id, photo, description, likes, created_at from posts where user_id = ?");
$query->bind_param("i", $id);
$query->execute();
$array = $query->get_result();
$response = [];
while($toget = $array->fetch_assoc()){
    $response[] = $toget;
} 
$json = json_encode($response);
echo $json;

?>