<?php

include("connection.php");


$request_from_id = $_POST['request_from_id'];

$request_to_id = $_POST['request_to_id'];

$query = $mysqli->prepare("SELECT friends.user_id1, friends.user_id2 from friends where (friends.user_id1 = ? and friends.user_id2 = ?) or (friends.user_id2 = ? and friends.user_id1 = ?) and friends.status = 1");
$query->bind_param("iiii", $request_from_id, $request_to_id, $request_from_id, $request_to_id);
$query->execute();
$query->store_result();
$num_rows = $query->num_rows;
$query->fetch();
$response = [];

if($num_rows == 0){
    //INSERT INTO `friends` (`user_id1`, `user_id2`, `status`, `source`, `destination`) VALUES ('26', '32', '0', '32', '26');
    $query = $mysqli->prepare("INSERT INTO `friends` (`user_id1`, `user_id2`, `status`, `source`, `destination`) VALUES (?, ?, '0', ?, ?);");
    $query->bind_param("iiii", $request_from_id, $request_to_id, $request_from_id, $request_to_id);
    $query->execute();
}else{
    $response['response'] = 'already friends';
    echo json_encode($response['response']);
}

?>