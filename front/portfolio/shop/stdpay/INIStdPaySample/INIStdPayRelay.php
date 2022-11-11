<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript">
        	function Submit_me(){
        		frm.target="INIpayStd_Return";
	        	frm.submit();
	       		self.close();
	        }
        </script>
    </head>

    <body bgcolor="#FFFFFF" text="#242424" leftmargin=0 topmargin=15 marginwidth=0 marginheight=0 bottommargin=0 rightmargin=0 onload="Submit_me()">

	<form name='frm' method='post' action='INIStdPayReturn.php'>
<?php
		//#############################
		// 인증결과 파라미터 일괄 수신
		//#############################
		//if ($_POST) {
		if (!empty($_REQUEST)) {
			$key_arr = array_keys($_REQUEST);
			foreach ($key_arr as $key) {
			    $value = $_REQUEST[$key];

				if(is_array($value)) {
					foreach ($value as $val) {
						echo "<input type='hidden' name='" . $key . "[]' value='" . $val . "'>" . "\n";
					}
				} else {
					echo "<input type='hidden' name='" . $key . "' value='" . $value . "'>" . "\n";
				}
				
			}   //foreach

		} //if
?>
		</form>
    </body>
</html>