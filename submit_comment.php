<?php

include("connection.php");

$user_id = $_POST['user_id'];
$post_id = $_POST['post_id'];
$comment = $_POST['comment'];

$query = $mysqli->prepare("INSERT INTO comments ( text, user_id, post_id) VALUES (?, ?, ?);");
$query->bind_param("sii", $comment , $user_id,$post_id);
$query->execute();

?>