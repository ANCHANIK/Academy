<meta charset="UTF-8">
<?php
    $m = $_POST['memo'];

    if($m==""){
        echo ("<script>alert('데이터가 올바르지 않습니다.'); history.go(-1);</script>");
    }
    else{
        echo $m;
        echo ("<script>alert('정상적으로 댓글이 저장 되었습니다.'); history.go(-1);</script>");
    }
?>