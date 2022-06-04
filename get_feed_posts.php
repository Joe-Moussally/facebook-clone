<?php

include("connection.php");

$user_id = $_POST['user_id'];

$query = $mysqli->prepare("SELECT posts.id as post_id, posts.photo, posts.description, posts.likes, posts.created_at, users.id as user_id, users.username, users.profile_picture from posts inner join users on posts.user_id = users.id inner join friends on (users.id = friends.user_id1 and friends.user_id2 = ?) or (users.id = friends.user_id2 and friends.user_id1 = ?) where users.id != ? ORDER BY posts.created_at DESC");
$query->bind_param("iii", $user_id, $user_id, $user_id);
$query->execute();
$array = $query->get_result();
$response = [];
while($toget = $array->fetch_assoc()){
    $response[] = $toget;
} 
$json = json_encode($response);
echo $json;

?>