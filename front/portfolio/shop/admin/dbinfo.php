<meta charset='UTF-8'>
<?php
$host = "localhost";
$user = "cksdlr7446"; 
$pwd = "q1w2e3r4!";
$dbname = "cksdlr7446";

$connect = mysqli_connect($host,$user,$pwd) or die("데이터베이스 접속오류!!");
mysqli_select_db($connect,$dbname);
?>