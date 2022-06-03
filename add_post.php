<?php

include("connection.php");

$img_name = $_FILES['photo']['name'];
$img_size = $_FILES['photo']['size'];
$tmp_name = $_FILES['photo']['tmp_name'];




$targetpath = 'http://facebook/db/posts/'.$_FILES['photo']['name'];
move_uploaded_file($_FILES['photo']['tmp_name'], $targetpath);

$user_id = $_POST['user_id'];
$description = $_POST['description'];
$file = $_FILES['photo'];

$query = $mysqli->prepare("INSERT INTO posts (photo,description,user_id) VALUE (?,?,?)");
$query->bind_param("ssi", $targetpath,$description,$user_id);
$query->execute();

$json = json_encode($file);

echo $json
?>