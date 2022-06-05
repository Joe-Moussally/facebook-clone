<?php

include("connection.php");

$query = $mysqli->prepare("SELECT posts.id as post_id, posts.photo, posts.description, posts.likes, posts.created_at, users.id as user_id, users.username, users.profile_picture from posts inner join users on posts.user_id = users.id ORDER BY posts.created_at DESC");
$query->execute();
$array = $query->get_result();
$response = [];
while($toget = $array->fetch_assoc()){
    $response[] = $toget;
} 
$json = json_encode($response);
echo $json;

?>