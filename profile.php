<?php

include("connection.php");

$id = $_POST["id"];

$query = $mysqli->prepare("SELECT users.id, users.username, users.email, users.profile_picture, COUNT(friends.user_id2) AS friends from users INNER JOIN friends ON users.id = friends.user_id1 OR users.id = friends.user_id2 where users.id = ?");
//SELECT users.id, users.username, users.email, users.profile_picture, COUNT(friends.user_id2) AS friends from users INNER JOIN friends ON users.id = friends.user_id1 where users.id = ?
//query V2: SELECT users.id, users.username, users.email, users.profile_picture, COUNT(friends.user_id2) AS friends from users INNER JOIN friends ON users.id = friends.user_id1 where users.id = ?

$query->bind_param("i", $id);
$query->execute();
$array = $query->get_result();
$response[] = $array->fetch_assoc();

$json = json_encode($response);
echo $json;

?>
