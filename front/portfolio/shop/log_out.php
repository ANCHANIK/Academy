<meta charset="UTF-8">
<?php
    session_start();
    session_destroy();
    echo ("<script>alert('정상적으로 로그아웃 되셨습니다.'); location.href='./index.html';</script>");
?>