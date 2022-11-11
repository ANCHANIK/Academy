<meta charset="UTF-8">
<?php		
	$toEmail 	= $_POST['myemail'];	
	$fromEmail = $_POST['peremail'];
    $telmsg = $_POST['pertel'];
    $pernm = $_POST['pernm'];

    $subject="포트폴리오 문의 메일입니다.";
	$content = "담당자 연락처 : ". $telmsg ."<br>";
    $content .= "담당자 이름 : ". $pernm ."<br>";
    $content .= "문의내용 : ". $_POST['pertext'];

    if($fromEmail == "" || $content==""){
        echo ("<script>alert('메일서버에 문제가 발생 하였습니다. 죄송합니다.'); history.go(-1);</script>");
    }
    else{
	$subject = "=?UTF-8?B?".base64_encode($subject)."?=";
	$headers .= 'From:'. $fromEmail . "\r\n";  
	$headers .= 'Organization: Sender Organization ' . "\r\n";
	$headers .= 'MIME-Version: 1.0 ' . "\r\n";
	$headers .= 'Content-type: text/html; charset=utf-8 ' . "\r\n";
	$headers .= 'X-Priority: 3 ' ."\r\n" ;
	$headers .= 'X-Mailer: PHP". phpversion() ' ."\r\n" ;

	$mailResult = mail($toEmail, $subject, $content, $headers);

	if($mailResult) {
	    echo ("<script>alert('정상적으로 문의가 등록 되었습니다. 감사합니다.'); history.go(-1);</script>");
	}else{
		echo ("<script>alert('메일서버에 문제가 발생 하였습니다. 죄송합니다.'); history.go(-1);</script>");
	}
    }
?>
