<?php

include("connection.php");

$id = $_POST['id'];

$query = $mysqli->prepare("SELECT posts.id as post_id, posts.photo, posts.description, posts.likes, posts.created_at, users.id as user_id, users.username, users.profile_picture from posts inner join users on users.id=posts.user_id where users.id = ?");
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