<?php

include("connection.php");

$id = $_POST['id'];//post ID

$query = $mysqli->prepare("SELECT comments.user_id, users.username, comments.text, comments.post_id FROM comments INNER JOIN users ON users.id = comments.user_id WHERE post_id = ?");
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