<?php

include("connection.php");

$post_id = $_POST['post_id'];

//$query = $mysqli->prepare("SELECT COUNT(*) FROM LIKES WHERE POST_ID = ? AND USER_ID = ?;")

$query = $mysqli->prepare("UPDATE posts SET posts.likes = posts.likes + 1 WHERE posts.id = ?;");
$query->bind_param("i", $post_id);
$query->execute();
?>