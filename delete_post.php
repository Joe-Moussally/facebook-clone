<?php

include("connection.php");

$post_id = $_POST['post_id'];

$query = $mysqli->prepare("DELETE FROM posts WHERE posts.id = ?");
$query->bind_param("i", $post_id);
$query->execute();
$query = $mysqli->prepare("DELETE FROM comments WHERE comments.post_id = ?");
$query->bind_param("i", $post_id);
$query->execute();
?>