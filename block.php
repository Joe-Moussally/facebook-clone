<?php
include("connection.php");

$user_id = $_POST["user_id"];
$profile_id = $_POST["profile_id"];

$query = $mysqli->prepare("SELECT friends.user_id1, friends.user_id2 from friends where ((friends.user_id1 = ? and friends.user_id2 = ?) or (friends.user_id2 = ? and friends.user_id1 = ?))");
$query->bind_param("iiii", $user_id,$profile_id ,$user_id,$profile_id);
$query->execute();
$query->store_result();
$num_rows = $query->num_rows;
$response = [];

if($num_rows == 0){
    $query = $mysqli->prepare("INSERT INTO `friends` (`user_id1`, `user_id2`, `status`, `source`, `destination`) VALUES (?, ?, '-1', ?, ?);");
    $query->bind_param("iiii", $user_id,$profile_id ,$user_id,$profile_id);
    $query->execute();
}else{
    $response["response"] = "success";
}

echo json_encode($response);
?>