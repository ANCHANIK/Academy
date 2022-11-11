<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <style type="text/css">
            body { background-color: #efefef;}
            body, tr, td {font-size:11pt; font-family:굴림,verdana; color:#433F37; line-height:19px;}
            table, img {border:none}

        </style>
        <link rel="stylesheet" href="../css/group.css" type="text/css">
        <script type="text/javascript">
            function cancelTid() {
                var form = document.frm;

                var win = window.open('', 'OnLine', 'scrollbars=no,status=no,toolbar=no,resizable=0,location=no,menu=no,width=600,height=400');
                win.focus();
                form.action = "http://walletpaydemo.inicis.com/stdpay/cancel/INIcancel_index.jsp";
                form.method = "post";
                form.target = "OnLine";
                form.submit();

            }
        </script>
    </head>
    <body bgcolor="#FFFFFF" text="#242424" leftmargin=0 topmargin=15 marginwidth=0 marginheight=0 bottommargin=0 rightmargin=0>
        <div style="padding:10px;width:100%;font-size:14px;color: #ffffff;background-color: #000000;text-align: center">
            이니시스 표준결제 인증결과 수신 / 승인요청, 승인결과 표시 샘플
        </div>
<?php
        require_once('./stdpay/libs/INIStdPayUtil.php');
        require_once('./stdpay/libs/HttpClient.php');

        $util = new INIStdPayUtil();

        try {

            //#############################
            // 인증결과 파라미터 일괄 수신
            //#############################
            //		$var = $_REQUEST["data"];

            //#####################
            // 인증이 성공일 경우만
            //#####################
            if (strcmp("0000", $_REQUEST["resultCode"]) == 0) {

                echo "####인증성공/승인요청####";
                echo "<br/>";

                //############################################
                // 1.전문 필드 값 설정(***가맹점 개발수정***)
                //############################################;

                $mid 			= $_REQUEST["mid"];     					// 가맹점 ID 수신 받은 데이터로 설정
                $signKey 		= "SU5JTElURV9UUklQTEVERVNfS0VZU1RS"; 		// 가맹점에 제공된 키(이니라이트키) (가맹점 수정후 고정) !!!절대!! 전문 데이터로 설정금지
                $timestamp 		= $util->getTimestamp();   					// util에 의해서 자동생성
                $charset 		= "UTF-8";        							// 리턴형식[UTF-8,EUC-KR](가맹점 수정후 고정)
                $format 		= "JSON";        							// 리턴형식[XML,JSON,NVP](가맹점 수정후 고정)

                $authToken 		= $_REQUEST["authToken"];   				// 취소 요청 tid에 따라서 유동적(가맹점 수정후 고정)
                $authUrl 		= $_REQUEST["authUrl"];    					// 승인요청 API url(수신 받은 값으로 설정, 임의 세팅 금지)
                $netCancel 		= $_REQUEST["netCancelUrl"];   				// 망취소 API url(수신 받은f값으로 설정, 임의 세팅 금지)

                $mKey 			= hash("sha256", $signKey);					// 가맹점 확인을 위한 signKey를 해시값으로 변경 (SHA-256방식 사용)

                //#####################
                // 2.signature 생성
                //#####################
                $signParam["authToken"] 	= $authToken;  	// 필수
                $signParam["timestamp"] 	= $timestamp;  	// 필수
                // signature 데이터 생성 (모듈에서 자동으로 signParam을 알파벳 순으로 정렬후 NVP 방식으로 나열해 hash)
                $signature = $util->makeSignature($signParam);


                //#####################
                // 3.API 요청 전문 생성
                //#####################
                $authMap["mid"] 			= $mid;   		// 필수
                $authMap["authToken"] 		= $authToken; 	// 필수
                $authMap["signature"] 		= $signature; 	// 필수
                $authMap["timestamp"] 		= $timestamp; 	// 필수
                $authMap["charset"] 		= $charset;  	// default=UTF-8
                $authMap["format"] 			= $format;  	// default=XML


                try {

                    $httpUtil = new HttpClient();

                    //#####################
                    // 4.API 통신 시작
                    //#####################

                    $authResultString = "";
                    
                    if ($httpUtil->processHTTP($authUrl, $authMap)) {
                        $authResultString = $httpUtil->body;
                        echo "<p><b>RESULT DATA :</b> $authResultString</p>";			//PRINT DATA
                    } else {
                        echo "Http Connect Error\n";
                        echo $httpUtil->errormsg;

                        throw new Exception("Http Connect Error");
                    }

                    //############################################################
                    //5.API 통신결과 처리(***가맹점 개발수정***)
                    //############################################################
                    echo "## 승인 API 결과 ##";

                    $resultMap = json_decode($authResultString, true);
					
                    echo "<pre>";
                    echo "<table width='565' border='0' cellspacing='0' cellpadding='0'>";
                    
                    /*************************  결제보안 추가 2016-05-18 START ****************************/ 
                    $secureMap["mid"]		= $mid;							//mid
                    $secureMap["tstamp"]	= $timestamp;					//timestemp
                    $secureMap["MOID"]		= $resultMap["MOID"];			//MOID
                    $secureMap["TotPrice"]	= $resultMap["TotPrice"];		//TotPrice
                    
                    // signature 데이터 생성 
                    $secureSignature = $util->makeSignatureAuth($secureMap);
                    /*************************  결제보안 추가 2016-05-18 END ****************************/

					if ((strcmp("0000", $resultMap["resultCode"]) == 0) && (strcmp($secureSignature, $resultMap["authSignature"]) == 0) ){	//결제보안 추가 2016-05-18
					   /*****************************************************************************
				       * 여기에 가맹점 내부 DB에 결제 결과를 반영하는 관련 프로그램 코드를 구현한다.  
					   
						 [중요!] 승인내용에 이상이 없음을 확인한 뒤 가맹점 DB에 해당건이 정상처리 되었음을 반영함
								처리중 에러 발생시 망취소를 한다.
				       ******************************************************************************/

                        echo "<tr><th class='td01'><p>거래 성공 여부</p></th>";
                        echo "<td class='td02'><p>성공</p></td></tr>";
					} else {
                        echo "<tr><th class='td01'><p>거래 성공 여부</p></th>";
                        echo "<td class='td02'><p>실패</p></td></tr>";
						echo "<tr><th class='line' colspan='2'><p></p></th></tr>
	                        <tr><th class='td01'><p>결과 코드</p></th>
	                        <td class='td02'><p>" . @(in_array($resultMap["resultCode"] , $resultMap) ? $resultMap["resultCode"] : "null" ) . "</p></td></tr>";
						
						//결제보안키가 다른 경우.
						if (strcmp($secureSignature, $resultMap["authSignature"]) != 0) {
							echo "<tr><th class='line' colspan='2'><p></p></th></tr>
								<tr><th class='td01'><p>결과 내용</p></th>
								<td class='td02'><p>" . "* 데이터 위변조 체크 실패" . "</p></td></tr>";

							//망취소
							if(strcmp("0000", $resultMap["resultCode"]) == 0) {
								throw new Exception("데이터 위변조 체크 실패");
							}
						} else {
							echo "<tr><th class='line' colspan='2'><p></p></th></tr>
								<tr><th class='td01'><p>결과 내용</p></th>
								<td class='td02'><p>" . @(in_array($resultMap["resultMsg"] , $resultMap) ? $resultMap["resultMsg"] : "null" ) . "</p></td></tr>";
						}
                        
                    }

                    //공통 부분만
                    echo
                            "<tr><th class='line' colspan='2'><p></p></th></tr>
                            <tr><th class='td01'><p>거래 번호</p></th>
                            <td class='td02'><p>" . @(in_array($resultMap["tid"] , $resultMap) ? $resultMap["tid"] : "null" ) . "</p></td></tr>
                            <tr><th class='line' colspan='2'><p></p></th></tr>
                            <tr><th class='td01'><p>결제방법(지불수단)</p></th>
                            <td class='td02'><p>" . @(in_array($resultMap["payMethod"] , $resultMap) ? $resultMap["payMethod"] : "null" ) . "</p></td></tr>
                            <tr><th class='line' colspan='2'><p></p></th></tr>
                            <tr><th class='td01'><p>결과 코드</p></th>
                            <td class='td02'><p>" . @(in_array($resultMap["resultCode"] , $resultMap) ? $resultMap["resultCode"] : "null" ) . "</p></td></tr>
                            <tr><th class='line' colspan='2'><p></p></th></tr>
                            <tr><th class='td01'><p>결과 내용</p></th>
                            <td class='td02'><p>" . @(in_array($resultMap["resultMsg"] , $resultMap) ? $resultMap["resultMsg"] : "null" ) . "</p></td></tr>
                            <tr><th class='line' colspan='2'><p></p></th></tr>
                            <tr><th class='td01'><p>결제완료금액</p></th>
                            <td class='td02'><p>" . @(in_array($resultMap["TotPrice"] , $resultMap) ? $resultMap["TotPrice"] : "null" ) . "원</p></td></tr>
                            <tr><th class='line' colspan='2'><p></p></th></tr>
                            <tr><th class='td01'><p>주문 번호</p></th>
                            <td class='td02'><p>" . @(in_array($resultMap["MOID"] , $resultMap) ? $resultMap["MOID"] : "null" )  . "</p></td></tr>
                            <tr><th class='line' colspan='2'><p></p></th></tr>
                            <tr><th class='td01'><p>승인날짜</p></th>
                            <td class='td02'><p>" . @(in_array($resultMap["applDate"] , $resultMap) ? $resultMap["applDate"] : "null" ) . "</p></td></tr>
                            <tr><th class='line' colspan='2'><p></p></th></tr>
                            <tr><th class='td01'><p>승인시간</p></th>
                            <td class='td02'><p>" . @(in_array($resultMap["applTime"] , $resultMap) ? $resultMap["applTime"] : "null" ) . "</p></td></tr>
                            <tr><th class='line' colspan='2'><p></p></th></tr>";

                    if (isset($resultMap["payMethod"]) && strcmp("VBank", $resultMap["payMethod"]) == 0) { //가상계좌
                        echo "<tr><th class='line' colspan='2'><p></p></th></tr>
                            <tr><th class='td01'><p>입금 계좌번호</p></th>
                            <td class='td02'><p>" . @(in_array($resultMap["VACT_Num"] , $resultMap) ? $resultMap["VACT_Num"] : "null" ) . "</p></td></tr>
                            <tr><th class='line' colspan='2'><p></p></th></tr>
                            <tr><th class='td01'><p>입금 은행코드</p></th>
                            <td class='td02'><p>" . @(in_array($resultMap["VACT_BankCode"] , $resultMap) ? $resultMap["VACT_BankCode"] : "null" ) . "</p></td></tr>
                            <tr><th class='line' colspan='2'><p></p></th></tr>
                            <tr><th class='td01'><p>입금 은행명</p></th>
                            <td class='td02'><p>" . @(in_array($resultMap["vactBankName"] , $resultMap) ? $resultMap["vactBankName"] : "null" ) . "</p></td></tr>
                            <tr><th class='line' colspan='2'><p></p></th></tr>
                            <tr><th class='td01'><p>예금주 명</p></th>
                            <td class='td02'><p>" . @(in_array($resultMap["VACT_Name"] , $resultMap) ? $resultMap["VACT_Name"] : "null" ) . "</p></td></tr>
                            <tr><th class='line' colspan='2'><p></p></th></tr>
                            <tr><th class='td01'><p>송금자 명</p></th>
                            <td class='td02'><p>" . @(in_array($resultMap["VACT_InputName"] , $resultMap) ? $resultMap["VACT_InputName"] : "null" ) . "</p></td></tr>
                            <tr><th class='line' colspan='2'><p></p></th></tr>
                            <tr><th class='td01'><p>송금 일자</p></th>
                            <td class='td02'><p>" . @(in_array($resultMap["VACT_Date"] , $resultMap) ? $resultMap["VACT_Date"] : "null" ) . "</p></td></tr>
                            <tr><th class='line' colspan='2'><p></p></th></tr>
                            <tr><th class='td01'><p>송금 시간</p></th>
                            <td class='td02'><p>" . @(in_array($resultMap["VACT_Time"] , $resultMap) ? $resultMap["VACT_Time"] : "null" ) . "</p></td></tr>
                            <tr><th class='line' colspan='2'><p></p></th></tr>";
                    } else if (isset($resultMap["payMethod"]) && strcmp("DirectBank", $resultMap["payMethod"]) == 0) { //실시간계좌이체
                        echo "<tr><th class='line' colspan='2'><p></p></th></tr>
                            <tr><th class='td01'><p>은행코드</p></th>
                            <td class='td02'><p>" . @(in_array($resultMap["ACCT_BankCode"] , $resultMap) ? $resultMap["ACCT_BankCode"] : "null" ) . "</p></td></tr>
                            <tr><th class='line' colspan='2'><p></p></th></tr>
                            <tr><th class='td01'><p>현금영수증 발급결과코드</p></th>
                            <td class='td02'><p>" . @(in_array($resultMap["CSHRResultCode"] , $resultMap) ? $resultMap["CSHRResultCode"] : "null" ) . "</p></td></tr>
                            <tr><th class='line' colspan='2'><p></p></th></tr>
                            <tr><th class='td01'><p>현금영수증 발급구분코드</p> <font color=red><b>(0 - 소득공제용, 1 - 지출증빙용)</b></font></th>
                            <td class='td02'><p>" . @(in_array($resultMap["CSHR_Type"] , $resultMap) ? $resultMap["CSHR_Type"] : "null" ) . "</p></td></tr>
                            <tr><th class='line' colspan='2'><p></p></th></tr>";
                    } else if (isset($resultMap["payMethod"]) && strcmp("HPP", $resultMap["payMethod"]) == 0) { //휴대폰
                        echo "<tr><th class='line' colspan='2'><p></p></th></tr>
                            <tr><th class='td01'><p>통신사</p></th>
                            <td class='td02'><p>" . @(in_array($resultMap["HPP_Corp"] , $resultMap) ? $resultMap["HPP_Corp"] : "null" ) . "</p></td></tr>
                            <tr><th class='line' colspan='2'><p></p></th></tr>
                            <tr><th class='td01'><p>결제장치</p></th>
                            <td class='td02'><p>" . @(in_array($resultMap["payDevice"] , $resultMap) ? $resultMap["payDevice"] : "null" ) . "</p></td></tr>
                            <tr><th class='line' colspan='2'><p></p></th></tr>
                            <tr><th class='td01'><p>휴대폰번호</p></th>
                            <td class='td02'><p>" . @(in_array($resultMap["HPP_Num"] , $resultMap) ? $resultMap["HPP_Num"] : "null" ) . "</p></td></tr>
                            <tr><th class='line' colspan='2'><p></p></th></tr>";
                    } else if (isset($resultMap["payMethod"]) && strcmp("KWPY", $resultMap["payMethod"]) == 0) { //뱅크월렛 카카오
                        echo "<tr><th class='td01'><p>휴대폰번호</p></th>
                            <td class='td02'><p>" . @(in_array($resultMap["KWPY_CellPhone"] , $resultMap) ? $resultMap["KWPY_CellPhone"] : "null" ) . "</p></td></tr>
                            <tr><th class='line' colspan='2'><p></p></th></tr>
                            <tr><th class='td01'><p>거래금액</p></th>
                            <td class='td02'><p>" . @(in_array($resultMap["KWPY_SalesAmount"] , $resultMap) ? $resultMap["KWPY_SalesAmount"] : "null" ) . "</p></td></tr>
                            <tr><th class='line' colspan='2'><p></p></th></tr>
                            <tr><th class='td01'><p>공급가액</p></th>
                            <td class='td02'><p>" . @(in_array($resultMap["KWPY_Amount"] , $resultMap) ? $resultMap["KWPY_Amount"] : "null" ) . "</p></td></tr>
                            <tr><th class='line' colspan='2'><p></p></th></tr>
                            <tr><th class='td01'><p>부가세</p></th>
                            <td class='td02'><p>" . @(in_array($resultMap["KWPY_Tax"] , $resultMap) ? $resultMap["KWPY_Tax"] : "null" ) . "</p></td></tr>
                            <tr><th class='line' colspan='2'><p></p></th></tr>
                            <tr><th class='td01'><p>봉사료</p></th>
                            <td class='td02'><p>" . @(in_array($resultMap["KWPY_ServiceFee"] , $resultMap) ? $resultMap["KWPY_ServiceFee"] : "null" ) . "</p></td></tr>
                            <tr><th class='line' colspan='2'><p></p></th></tr>";
                    } else if (isset($resultMap["payMethod"]) && strcmp("Culture", $resultMap["payMethod"]) == 0) { //문화상품권
                        echo "<tr><th class='line' colspan='2'><p></p></th></tr>
                            <tr><th class='td01'><p>문화상품권승인일자</p></th>
                            <td class='td02'><p>" . @(in_array($resultMap["applDate"] , $resultMap) ? $resultMap["applDate"] : "null" ) . "원</p></td></tr>
                            <tr><th class='line' colspan='2'><p></p></th></tr>
                            <tr><th class='td01'><p>문화상품권 승인시간</p></th>
                            <td class='td02'><p>" . @(in_array($resultMap["applTime"] , $resultMap) ? $resultMap["applTime"] : "null" ) . "</p></td></tr>
                            <tr><th class='line' colspan='2'><p></p></th></tr>
                            <tr><th class='td01'><p>문화상품권 승인번호</p></th>
                            <td class='td02'><p>" . @(in_array($resultMap["applNum"] , $resultMap) ? $resultMap["applNum"] : "null" ) . "</p></td></tr>
                            <tr><th class='line' colspan='2'><p></p></th></tr>";
					} else if (isset($resultMap["payMethod"]) && strcmp("DGCL", $resultMap["payMethod"]) == 0) { //게임문화상품권

                        echo "<tr><th class='line' colspan='2'><p></p></th></tr>
							<tr><th class='td01'><p>게임문화상품권승인금액</p></th>
							<td class='td02'><p>" . @(in_array($resultMap["GAMG_ApplPrice"] , $resultMap) ? $resultMap["GAMG_ApplPrice"] : "null" ) . "원</p></td></tr>
							<tr><th class='line' colspan='2'><p></p></th></tr>
							<tr><th class='td01'><p>사용한 카드수</p></th>
							<td class='td02'><p>" . @(in_array($resultMap["GAMG_Cnt"] , $resultMap) ? $resultMap["GAMG_Cnt"] : "null" ) . "</p></td></tr>
							<tr><th class='line' colspan='2'><p></p></th></tr>
							<tr><th class='td01'><p>사용한 카드번호</p></th>
							<td class='td02'><p>" . @(in_array($resultMap["GAMG_Num1"] , $resultMap) ? $resultMap["GAMG_Num1"] : "null" ) . "</p></td></tr>
							<tr><th class='line' colspan='2'><p></p></th></tr>
							<tr><th class='td01'><p>카드잔액</p></th>
							<td class='td02'><p>" . @(in_array($resultMap["GAMG_Price1"] , $resultMap) ? $resultMap["GAMG_Price1"] : "null" ) . "원</p></td></tr>";

                        if (!strcmp("", $resultMap["GAMG_Num2"]) == 0) {

                            echo "<tr><th class='line' colspan='2'><p></p></th></tr>
								<tr><th class='td01'><p>사용한 카드번호</p></th>
								<td class='td02'><p>" . @(in_array($resultMap["GAMG_Num2"] , $resultMap) ? $resultMap["GAMG_Num2"] : "null" ) . "</p></td></tr>
								<tr><th class='line' colspan='2'><p></p></th></tr>
								<tr><th class='td01'><p>카드잔액</p></th>
								<td class='td02'><p>" . @(in_array($resultMap["GAMG_Price2"] , $resultMap) ? $resultMap["GAMG_Price2"] : "null" ) . "원</p></td></tr>";
                        }
                        if (!strcmp("", $resultMap["GAMG_Num3"]) == 0) {

                            echo "<tr><th class='line' colspan='2'><p></p></th></tr>
								<tr><th class='td01'><p>사용한 카드번호</p></th>
								<td class='td02'><p>" . @(in_array($resultMap["GAMG_Num3"] , $resultMap) ? $resultMap["GAMG_Num3"] : "null" ) . "</p></td></tr>
								<tr><th class='line' colspan='2'><p></p></th></tr>
								<tr><th class='td01'><p>카드잔액</p></th>
								<td class='td02'><p>" . @(in_array($resultMap["GAMG_Price3"] , $resultMap) ? $resultMap["GAMG_Price3"] : "null" ) . "원</p></td></tr>";
                        }
                        if (!strcmp("", $resultMap["GAMG_Num4"]) == 0) {

                            echo "<tr><th class='line' colspan='2'><p></p></th></tr>
								<tr><th class='td01'><p>사용한 카드번호</p></th>
								<td class='td02'><p>" . @(in_array($resultMap["GAMG_Num4"] , $resultMap) ? $resultMap["GAMG_Num4"] : "null" ) . "</p></td></tr>
								<tr><th class='line' colspan='2'><p></p></th></tr>
								<tr><th class='td01'><p>카드잔액</p></th>
								<td class='td02'><p>" . @(in_array($resultMap["GAMG_Price4"] , $resultMap) ? $resultMap["GAMG_Price4"] : "null" ) . "원</p></td></tr>";
                        }
                        if (!strcmp("", $resultMap["GAMG_Num5"]) == 0) {

                            echo "<tr><th class='line' colspan='2'><p></p></th></tr>
								<tr><th class='td01'><p>사용한 카드번호</p></th>
								<td class='td02'><p>" . @(in_array($resultMap["GAMG_Num5"] , $resultMap) ? $resultMap["GAMG_Num5"] : "null" ) . "</p></td></tr>
								<tr><th class='line' colspan='2'><p></p></th></tr>
								<tr><th class='td01'><p>카드잔액</p></th>
								<td class='td02'><p>" . @(in_array($resultMap["GAMG_Price5"] , $resultMap) ? $resultMap["GAMG_Price5"] : "null" ) . "원</p></td></tr>";
                        }
                        if (!strcmp("", $resultMap["GAMG_Num6"]) == 0) {

                            echo "<tr><th class='line' colspan='2'><p></p></th></tr>
		                        <tr><th class='td01'><p>사용한 카드번호</p></th>
		                        <td class='td02'><p>" . @(in_array($resultMap["GAMG_Num6"] , $resultMap) ? $resultMap["GAMG_Num6"] : "null" ) . "</p></td></tr>
		                        <tr><th class='line' colspan='2'><p></p></th></tr>
		                        <tr><th class='td01'><p>카드잔액</p></th>
		                        <td class='td02'><p>" . @(in_array($resultMap["GAMG_Price6"] , $resultMap) ? $resultMap["GAMG_Price6"] : "null" ) . "원</p></td></tr>";
                        }

                        echo "<tr><th class='line' colspan='2'><p></p></th></tr>";
                    } else if (isset($resultMap["payMethod"]) && strcmp("OCBPoint", $resultMap["payMethod"]) == 0) { //오케이 캐쉬백
                        echo "<tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>지불구분</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["PayOption"] , $resultMap) ? $resultMap["PayOption"] : "null" ) . "</p></td></tr>
		                    <tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>결제완료금액</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["applPrice"] , $resultMap) ? $resultMap["applPrice"] : "null" ) . "원</p></td></tr>
		                    <tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>OCB 카드번호</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["OCB_Num"] , $resultMap) ? $resultMap["OCB_Num"] : "null" ) . "</p></td></tr>
		                    <tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>적립 승인번호</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["OCB_SaveApplNum"] , $resultMap) ? $resultMap["OCB_SaveApplNum"] : "null" ) . "</p></td></tr>
		                    <tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>사용 승인번호</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["OCB_PayApplNum"] , $resultMap) ? $resultMap["OCB_PayApplNum"] : "null" ) . "</p></td></tr>
		                    <tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>OCB 지불 금액</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["OCB_PayPrice"] , $resultMap) ? $resultMap["OCB_PayPrice"] : "null" ) . "</p></td></tr>
		                    <tr><th class='line' colspan='2'><p></p></th></tr>";
                    } else if (isset($resultMap["payMethod"]) && (strcmp("GSPT", $resultMap["payMethod"]) == 0)) { //GSPoint
                        echo "<tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>지불구분</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["PayOption"] , $resultMap) ? $resultMap["PayOption"] : "null" ) . "</p></td></tr>
		                    <tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>GS 포인트 승인금액</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["GSPT_ApplPrice"] , $resultMap) ? $resultMap["GSPT_ApplPrice"] : "null" ) . "원</p></td></tr>
		                    <tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>GS 포인트 적립금액</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["GSPT_SavePrice"] , $resultMap) ? $resultMap["GSPT_SavePrice"] : "null" ) . "원</p></td></tr>
		                    <tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>GS 포인트 지불금액</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["GSPT_PayPrice"] , $resultMap) ? $resultMap["GSPT_PayPrice"] : "null" ) . "원</p></td></tr>
		                    <tr><th class='line' colspan='2'><p></p></th></tr>";
                    } else if (isset($resultMap["payMethod"]) && strcmp("UPNT", $resultMap["payMethod"]) == 0) {  //U-포인트
                        echo "<tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>U포인트 카드번호</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["UPoint_Num"] , $resultMap) ? $resultMap["UPoint_Num"] : "null" ) . "</p></td></tr>
		                    <tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>가용포인트</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["UPoint_usablePoint"] , $resultMap) ? $resultMap["UPoint_usablePoint"] : "null" ) . "</p></td></tr>
		                    <tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>포인트지불금액</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["UPoint_ApplPrice"] , $resultMap) ? $resultMap["UPoint_ApplPrice"] : "null" ) . "</p></td></tr>
		                    <tr><th class='line' colspan='2'><p></p></th></tr>";
                    } else if (isset($resultMap["payMethod"]) && strcmp("KWPY", $resultMap["payMethod"]) == 0) {  //뱅크월렛 카카오
                        echo "<tr><th class='td01'><p>결제방법</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["payMethod"] , $resultMap) ? $resultMap["payMethod"] : "null" ) . "</p></td></tr>
		                    <tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>결과 코드</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["resultCode"] , $resultMap) ? $resultMap["resultCode"] : "null" ) . "</p></td></tr>
		                    <tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>결과 내용</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["resultMsg"] , $resultMap) ? $resultMap["resultMsg"] : "null" ) . "</p></td></tr>
		                    <tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>거래 번호</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["tid"] , $resultMap) ? $resultMap["tid"] : "null" ) . "</p></td></tr>
		                    <tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>주문 번호</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["MOID"] , $resultMap) ? $resultMap["MOID"] : "null" ) . "</p></td></tr>
		                    <tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>결제완료금액</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["price"] , $resultMap) ? $resultMap["price"] : "null" ) . "원</p></td></tr>
		                    <tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>사용일자</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["applDate"] , $resultMap) ? $resultMap["applDate"] : "null" ) . "</p></td></tr>
		                    <tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>사용시간</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["applTime"] , $resultMap) ? $resultMap["applTime"] : "null" ) . "</p></td></tr>
		                    <tr><th class='line' colspan='2'><p></p></th></tr>";
                    } else if (isset($resultMap["payMethod"]) && strcmp("YPAY", $resultMap["payMethod"]) == 0) { //엘로우 페이
                        //별도 응답 필드 없음
                    } else if (isset($resultMap["payMethod"]) && strcmp("TEEN", $resultMap["payMethod"]) == 0) { //틴캐시
                        echo "<tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>틴캐시 승인번호</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["TEEN_ApplNum"] , $resultMap) ? $resultMap["TEEN_ApplNum"] : "null" ) . "</p></td></tr>
		                    <tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>틴캐시아이디</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["TEEN_UserID"] , $resultMap) ? $resultMap["TEEN_UserID"] : "null" ) . "</p></td></tr>
		                    <tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>틴캐시승인금액</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["TEEN_ApplPrice"] , $resultMap) ? $resultMap["TEEN_ApplPrice"] : "null" ) . "원</p></td></tr>";
                    } else if (isset($resultMap["payMethod"]) && strcmp("Bookcash", $resultMap["payMethod"]) == 0) { //도서문화상품권
                        echo "<tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>도서상품권 승인번호</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["BCSH_ApplNum"] , $resultMap) ? $resultMap["BCSH_ApplNum"] : "null" ) . "</p></td></tr>
		                    <tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>도서상품권 사용자ID</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["BCSH_UserID"] , $resultMap) ? $resultMap["BCSH_UserID"] : "null" ) . "</p></td></tr>
		                    <tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>도서상품권 승인금액</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["BCSH_ApplPrice"] , $resultMap) ? $resultMap["BCSH_ApplPrice"] : "null" ) . "원</p></td></tr>";
                    } else if (isset($resultMap["payMethod"]) && strcmp("PhoneBill", $resultMap["payMethod"]) == 0) { //폰빌전화결제
                        echo "<tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>승인전화번호</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["PHNB_Num"] , $resultMap) ? $resultMap["PHNB_Num"] : "null" ) . "</p></td></tr>
		                    <tr><th class='line' colspan='2'><p></p></th></tr>";
                    } else if (isset($resultMap["payMethod"]) && strcmp("Bill", $resultMap["payMethod"]) == 0) { //빌링결제
                        echo "<tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>빌링키</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["CARD_BillKey"] , $resultMap) ? $resultMap["CARD_BillKey"] : "null" ) . "</p></td></tr>";
                    }else if (isset($resultMap["payMethod"]) && strcmp("Auth", $resultMap["payMethod"]) == 0){//빌링결제
                        echo "<tr><th class='line' colspan='2'><p></p></th></tr>
                        		<tr><th class='td01'><p>빌링키</p></th>";
                        if (isset($resultMap["payMethodDetail"]) && strcmp("BILL_CARD", $resultMap["payMethodDetail"]) == 0) {
                        	echo "<td class='td02'><p>" . @(in_array($resultMap["CARD_BillKey"] , $resultMap) ? $resultMap["CARD_BillKey"] : "null" ) . "</p></td></tr>";
                        } else  if (isset($resultMap["payMethodDetail"]) && strcmp("BILL_HPP", $resultMap["payMethodDetail"]) == 0) {
                        	echo "<td class='td02'><p>" . @(in_array($resultMap["HPP_BillKey"] , $resultMap) ? $resultMap["HPP_BillKey"] : "null" ) . "</p></td></tr>
                        			<tr><th class='line' colspan='2'><p></p></th></tr>
                        			<tr><th class='line' colspan='2'><p></p></th></tr>
                        			<tr><th class='td01'><p>통신사</p></th>
                        			<td class='td02'><p>" . @(in_array($resultMap["HPP_Corp"] , $resultMap) ? $resultMap["HPP_Corp"] : "null" ) . "</p></td></tr>
                        			<tr><th class='line' colspan='2'><p></p></th></tr>
                        			<tr><th class='td01'><p>결제장치</p></th>
                        			<td class='td02'><p>" . @(in_array($resultMap["payDevice"] , $resultMap) ? $resultMap["payDevice"] : "null" ) . "</p></td></tr>
                        			<tr><th class='line' colspan='2'><p></p></th></tr>
                        			<tr><th class='td01'><p>휴대폰번호</p></th>
                        			<td class='td02'><p>" . @(in_array($resultMap["HPP_Num"] , $resultMap) ? $resultMap["HPP_Num"] : "null" ) . "</p></td></tr>
                        			<tr><th class='line' colspan='2'><p></p></th></tr>
                        			<tr><th class='td01'><p>상품명</p></th>
                        			<td class='td02'><p>" . @(in_array($resultMap["goodName"] , $resultMap) ? $resultMap["goodName"] : "null" ) . "</p></td></tr>";
                        }
                    } else { //카드
                        if (isset($resultMap["EventCode"]) && !is_null($resultMap["EventCode"])) {

                            echo "<tr><th class='line' colspan='2'><p></p></th></tr>
		                        <tr><th class='td01'><p>이벤트 코드</p></th>
		                        <td class='td02'><p>" . @(in_array($resultMap["EventCode"] , $resultMap) ? $resultMap["EventCode"] : "null" ) . "</p></td></tr>";
                        }

                        echo "<tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>카드번호</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["CARD_Num"] , $resultMap) ? $resultMap["CARD_Num"] : "null" ) . "</p></td></tr>
		                    <tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>할부기간</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["CARD_Quota"] , $resultMap) ? $resultMap["CARD_Quota"] : "null" ) . "</p></td></tr>
		                    <tr><th class='line' colspan='2'><p></p></th></tr>";

                        if (isset($resultMap["EventCode"]) && isset($resultMap["CARD_Interest"]) && (strcmp("1", $resultMap["CARD_Interest"]) == 0 || strcmp("1", $resultMap["EventCode"]) == 0 )) {

                            echo "<tr><th class='td01'><p>할부 유형</p></th>
                        		<td class='td02'><p>무이자</p></td></tr>";
                        } else if (isset($resultMap["CARD_Interest"]) && !strcmp("1", $resultMap["CARD_Interest"]) == 0) {

                            echo "<tr><th class='td01'><p>할부 유형</p></th>
                        		<td class='td02'><p>유이자 <font color='red'> *유이자로 표시되더라도 EventCode 및 EDI에 따라 무이자 처리가 될 수 있습니다.</font></p></td></tr>";
                        }

                        if (isset($resultMap["point"]) && strcmp("1", $resultMap["point"]) == 0) {

                            echo "<td class='td02'><p></p></td></tr>
		                        <tr><th class='td01'><p>포인트 사용 여부</p></th>
		                        <td class='td02'><p>사용</p></td></tr>";
                        } else {

                            echo "<td class='td02'><p></p></td></tr>
		                        <tr><th class='td01'><p>포인트 사용 여부</p></th>
		                        <td class='td02'><p>미사용</p></td></tr>";
                        }

                        echo "<tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>카드 종류</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["CARD_Code"] , $resultMap) ? $resultMap["CARD_Code"] : "null" ) . "</p></td></tr>
		                    <tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>카드 발급사</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["CARD_BankCode"] , $resultMap) ? $resultMap["CARD_BankCode"] : "null" ) . "</p></td></tr>
		
		                    <tr><th class='td01'><p>부분취소 가능여부</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["CARD_PRTC_CODE"] , $resultMap) ? $resultMap["CARD_PRTC_CODE"] : "null" ) . "</p></td></tr>
		                    <tr><th class='line' colspan='2'><p></p></th></tr>
		                    <tr><th class='td01'><p>체크카드 여부</p></th>
		                    <td class='td02'><p>" . @(in_array($resultMap["CARD_CheckFlag"] , $resultMap) ? $resultMap["CARD_CheckFlag"] : "null" ) . "</p></td></tr>";

                        if (isset($resultMap["OCB_Num"]) && !is_null($resultMap["OCB_Num"]) && !empty($resultMap["OCB_Num"])) {

                            echo "<tr><th class='line' colspan='2'><p></p></th></tr>
		                        <tr><th class='td01'><p>OK CASHBAG 카드번호</p></th>
		                        <td class='td02'><p>" . @(in_array($resultMap["OCB_Num"] , $resultMap) ? $resultMap["OCB_Num"] : "null" ) . "</p></td></tr>
		                        <tr><th class='line' colspan='2'><p></p></th></tr>
		                        <tr><th class='td01'><p>OK CASHBAG 적립 승인번호</p></th>
		                        <td class='td02'><p>" . @(in_array($resultMap["OCB_SaveApplNum"] , $resultMap) ? $resultMap["OCB_SaveApplNum"] : "null" ) . "</p></td></tr>
		                        <tr><th class='line' colspan='2'><p></p></th></tr>
		                        <tr><th class='td01'><p>OK CASHBAG 포인트지불금액</p></th>
		                        <td class='td02'><p>" . @(in_array($resultMap["OCB_PayPrice"] , $resultMap) ? $resultMap["OCB_PayPrice"] : "null" ) . "</p></td></tr>";
                        }
                        if (isset($resultMap["GSPT_Num"]) && !is_null($resultMap["GSPT_Num"]) && !empty($resultMap["GSPT_Num"])) {

                            echo "<tr><th class='line' colspan='2'><p></p></th></tr>
		                        <tr><th class='td01'><p>GS&Point 카드번호</p></th>
		                        <td class='td02'><p>" . @(in_array($resultMap["GSPT_Num"] , $resultMap) ? $resultMap["GSPT_Num"] : "null" ) . "</p></td></tr>
		
		                        <tr><th class='line' colspan='2'><p></p></th></tr>
		                        <tr><th class='td01'><p>GS&Point 잔여한도</p></th>
		                        <td class='td02'><p>" . @(in_array($resultMap["GSPT_Remains"] , $resultMap) ? $resultMap["GSPT_Remains"] : "null" ) . "</p></td></tr>
		
		                        <tr><th class='line' colspan='2'><p></p></th></tr>
		                        <tr><th class='td01'><p>GS&Point 승인금액</p></th>
		                        <td class='td02'><p>" . @(in_array($resultMap["GSPT_ApplPrice"] , $resultMap) ? $resultMap["GSPT_ApplPrice"] : "null" ) . "</p></td></tr>";
                        }

                        if (isset($resultMap["UNPT_CardNum"]) && !is_null($resultMap["UNPT_CardNum"]) && !empty($resultMap["UNPT_CardNum"])) {

                            echo "<tr><th class='line' colspan='2'><p></p></th></tr>
		                        <tr><th class='td01'><p>U-Point 카드번호</p></th>
		                        <td class='td02'><p>" . @(in_array($resultMap["UNPT_CardNum"] , $resultMap) ? $resultMap["UNPT_CardNum"] : "null" ) . "</p></td></tr>
		
		                        <tr><th class='line' colspan='2'><p></p></th></tr>
		                        <tr><th class='td01'><p>U-Point 가용포인트</p></th>
		                        <td class='td02'><p>" . @(in_array($resultMap["UPNT_UsablePoint"] , $resultMap) ? $resultMap["UPNT_UsablePoint"] : "null" ) . "</p></td></tr>
		
		                        <tr><th class='line' colspan='2'><p></p></th></tr>
		                        <tr><th class='td01'><p>U-Point 포인트지불금액</p></th>
		                        <td class='td02'><p>" . @(in_array($resultMap["UPNT_PayPrice"] , $resultMap) ? $resultMap["UPNT_PayPrice"] : "null" ) . "</p></td></tr>";
                        }
                    }

                    echo "</table>
						<span style='padding-left : 100px;'></span>
						<form name='frm' method='post'> 
							<input type='hidden' name='tid' value='" . @(in_array($resultMap["tid"] , $resultMap) ? $resultMap["tid"] : "null" ) . "'/>
						</form>				
						</pre>";

                    // 수신결과를 파싱후 resultCode가 "0000"이면 승인성공 이외 실패
                    // 가맹점에서 스스로 파싱후 내부 DB 처리 후 화면에 결과 표시
                    // payViewType을 popup으로 해서 결제를 하셨을 경우
                    // 내부처리후 스크립트를 이용해 opener의 화면 전환처리를 하세요
                    //throw new Exception("강제 Exception");
                } catch (Exception $e) {
                    // $s = $e->getMessage() . ' (오류코드:' . $e->getCode() . ')';
                    //####################################
                    // 실패시 처리(***가맹점 개발수정***)
                    //####################################
                    //---- db 저장 실패시 등 예외처리----//
                    $s = $e->getMessage() . ' (오류코드:' . $e->getCode() . ')';
                    echo $s;

                    //#####################
                    // 망취소 API
                    //#####################

                    $netcancelResultString = ""; // 망취소 요청 API url(고정, 임의 세팅 금지)
                    
                    if ($httpUtil->processHTTP($netCancel, $authMap)) {
                        $netcancelResultString = $httpUtil->body;
                    } else {
                        echo "Http Connect Error\n";
                        echo $httpUtil->errormsg;

                        throw new Exception("Http Connect Error");
                    }

					echo "<br/>## 망취소 API 결과 ##<br/>";
					
					/*##XML output##*/
					//$netcancelResultString = str_replace("<", "&lt;", $$netcancelResultString);
					//$netcancelResultString = str_replace(">", "&gt;", $$netcancelResultString);
					
                    // 취소 결과 확인
                    echo "<p>". $netcancelResultString . "</p>";
                }
            } else {

                //#############
                // 인증 실패시
                //#############
                echo "<br/>";
                echo "####인증실패####";

                echo "<pre>" . var_dump($_REQUEST) . "</pre>";
            }
        } catch (Exception $e) {
            $s = $e->getMessage() . ' (오류코드:' . $e->getCode() . ')';
            echo $s;
        }
?>
</body>
</html>