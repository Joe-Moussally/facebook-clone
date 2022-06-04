<?php

include("connection.php");

$profile_id = $_POST["profile_id"];

$query = $mysqli->prepare("SELECT DISTINCT users.id, users.username, users.profile_picture as pic from users inner join friends on (friends.user_id1 = users.id and friends.user_id2 = ?) or (friends.user_id2 = users.id and friends.user_id1 = ?) where friends.status = 1");
$query->bind_param("ii", $profile_id,$profile_id);
$query->execute();
$array = $query->get_result();
$response = [];
while($toget = $array->fetch_assoc()){
    $response[] = $toget;
} 
$json = json_encode($response);
echo $json;


?>