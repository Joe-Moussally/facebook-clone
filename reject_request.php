<?php

include("connection.php");

$user_id = $_POST['user_id'];
$profile_id = $_POST['profile_id'];

$query = $mysqli->prepare("UPDATE friends SET friends.status = -1 WHERE ((friends.user_id1 = ? and friends.user_id2 = ?)or(friends.user_id2 = ? and friends.user_id1 = ?));");
$query->bind_param("iiii", $profile_id,$user_id, $profile_id,$user_id);
$query->execute();
?>