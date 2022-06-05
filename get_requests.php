<?php

include("connection.php");


$user_id = $_POST['user_id'];

$query = $mysqli->prepare("SELECT friends.source, users.username, users.profile_picture FROM friends INNER JOIN users on users.id = friends.source WHERE (friends.destination = ?) AND friends.status = 0");
$query->bind_param("i", $user_id);
$query->execute();
$array = $query->get_result();
$num_rows = $query->num_rows;

$response = [];

while($toget = $array->fetch_assoc()){
    $response[] = $toget;
} 

echo json_encode($response);

?>