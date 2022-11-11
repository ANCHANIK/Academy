<?php
require_once('../libs/INIStdPayUtil.php');
$SignatureUtil = new INIStdPayUtil();
/*
  //*** 위변조 방지체크를 signature 생성 ***

  oid, price, timestamp 3개의 키와 값을

  key=value 형식으로 하여 '&'로 연결한 하여 SHA-256 Hash로 생성 된값

  ex) oid=INIpayTest_1432813606995&price=819000&timestamp=2012-02-01 09:19:04.004


 * key기준 알파벳 정렬

 * timestamp는 반드시 signature생성에 사용한 timestamp 값을 timestamp input에 그대로 사용하여야함
 */

//############################################
// 1.전문 필드 값 설정(***가맹점 개발수정***)
//############################################
// 여기에 설정된 값은 Form 필드에 동일한 값으로 설정
$mid = "INIpayTest";  // 가맹점 ID(가맹점 수정후 고정)					
//인증
$signKey = "SU5JTElURV9UUklQTEVERVNfS0VZU1RS"; // 가맹점에 제공된 웹 표준 사인키(가맹점 수정후 고정)
$timestamp = $SignatureUtil->getTimestamp();   // util에 의해서 자동생성

$orderNumber = $mid . "_" . $SignatureUtil->getTimestamp(); // 가맹점 주문번호(가맹점에서 직접 설정)
$price = "1000";        // 상품가격(특수기호 제외, 가맹점에서 직접 설정)

$cardNoInterestQuota = "11-2:3:,34-5:12,14-6:12:24,12-12:36,06-9:12,01-3:4";  // 카드 무이자 여부 설정(가맹점에서 직접 설정)
$cardQuotaBase = "2:3:4:5:6:11:12:24:36";  // 가맹점에서 사용할 할부 개월수 설정
//###################################
// 2. 가맹점 확인을 위한 signKey를 해시값으로 변경 (SHA-256방식 사용)
//###################################
$mKey = $SignatureUtil->makeHash($signKey, "sha256");

$params = array(
    "oid" => $orderNumber,
    "price" => $price,
    "timestamp" => $timestamp
);
$sign = $SignatureUtil->makeSignature($params, "sha256");

/* 기타 */
$siteDomain = "http://reduck.dothome.co.kr/portfolio/shop/stdpay/INIStdPaySample"; //가맹점 도메인 입력
// 페이지 URL에서 고정된 부분을 적는다. 
// Ex) returnURL이 http://localhost:8082/demo/INIpayStdSample/INIStdPayReturn.jsp 라면
//                 http://localhost:8082/demo/INIpayStdSample 까지만 기입한다.
?>
<!DOCTYPE html>
<html>
    <head>
        <script>
            function myFunction()
            {
                alert("I am an alert box!"); // this is the message in ""
            }
        </script>

        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <style type="text/css">
            body { background-color: #efefef;}
            body, tr, td {font-size:9pt; font-family:굴림,verdana; color:#433F37; line-height:19px;}
            table, img {border:none}
        </style>

        <!-- 이니시스 표준결제 js -->
        <script language="javascript" type="text/javascript" src="https://stgstdpay.inicis.com/stdjs/INIStdPay.js" charset="UTF-8"></script>
        <!-- <script language="javascript" type="text/javascript" src="https://stdpay.inicis.com/stdjs/INIStdPay.js" charset="UTF-8"></script> -->

        <script type="text/javascript">
            function pay() {
                INIStdPay.pay('SendPayForm_id');
            }
        </script>

    </head>
    <body bgcolor="#FFFFFF" text="#242424" leftmargin=0 topmargin=15 marginwidth=0 marginheight=0 bottommargin=0 rightmargin=0>
        <div style="padding:10px;background-color:#f3f3f3;width:100%;font-size:13px;color: #ffffff;background-color: #000000;text-align: center">
            이니시스 표준결제 결제요청 샘플
        </div>
        <table width="650" border="0" cellspacing="0" cellpadding="0" style="padding:10px;" align="center">
            <tr>
                <td bgcolor="6095BC" align="center" style="padding:10px">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#FFFFFF" style="padding:20px">

                        <tr>
                            <td>
                                이 페이지는 INIpay Standard 결제요청을 위한 예시입니다.<br/>
                                <br/>
                                결제처리를 위한 action등의 모든 동작은 Import 된 스크립트에 의해 자동처리됩니다.<br/>

                                <br/>
                                Form에 설정된 모든 필드의 name은 대소문자 구분하며,<br/>
                                이 Sample은 결제를 위해서 설정된 Form은 테스트 / 이해돕기를 위해서 모두 type="text"로 설정되어 있습니다.<br/>
                                운영에 적용시에는 일부 가맹점에서 필요에 의해 사용자가 변경하는 경우를 제외하고<br/>
                                모두 type="hidden"으로 변경하여 사용하시기 바랍니다.<br/>

                                <br/>
                                <font color="#336699"><strong>함께 제공되는 매뉴얼을 참조하여 작성 개발하시기 바랍니다.</strong></font>
                                <br/><br/>
                            </td>
                        </tr>
                        <tr>
                            <td >
                                <button onclick="pay()" style="padding:10px">결제요청</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table>
                                    <tr>
                                        <td style="text-align:left;">
                                            <form id="SendPayForm_id" name="" method="POST">

                                                <!-- 필수 -->
                                                <br/><b>***** 필 수 *****</b>
                                                <div style="border:2px #dddddd double;padding:10px;background-color:#f3f3f3;">

                                                    <br/><b>version</b> :
                                                    <br/><input  style="width:100%;" name="version" value="1.0" >


                                                    <br/><b>mid</b> :
                                                    <br/><input  style="width:100%;" name="mid" value="<?php echo $mid ?>" >

                                                    <br/><b>goodname</b> :
                                                    <br/><input  style="width:100%;" name="goodname" value="테스트" >

                                                    <br/><b>oid</b> :
                                                    <br/><input  style="width:100%;" name="oid" value="<?php echo $orderNumber ?>" >

                                                    <br/><b>price</b> :
                                                    <br/><input  style="width:100%;" name="price" value="<?php echo $price ?>" >

                                                    <br/><b>currency</b> :
                                                    <br/>[WON|USD]
                                                    <br/><input  style="width:100%;" name="currency" value="WON" >

                                                    <br/><b>buyername</b> :
                                                    <br/><input  style="width:100%;" name="buyername" value="홍길동" >

                                                    <br/><b>buyertel</b> :
                                                    <br/><input  style="width:100%;" name="buyertel" value="010-1234-5678" >

                                                    <br/><b>buyeremail</b> :
                                                    <br/><input  style="width:100%;" name="buyeremail" value="test@inicis.com" >



                                                    <!-- <br/><b>timestamp</b> : -->
                                                    <input type="text"  style="width:100%;" name="timestamp" value="<?php echo $timestamp ?>" >


                                                    <!-- <br/><b>signature</b> : -->
                                                    <input type="hidden" style="width:100%;" name="signature" value="<?php echo $sign ?>" >


                                                    <br/><b>returnUrl</b> :
                                                    <br/><input  style="width:100%;" name="returnUrl" value="<?php echo $siteDomain ?>/INIStdPayReturn.php" >

                                                    <input type="hidden"  name="mKey" value="<?php echo $mKey ?>" >
                                                </div>

                                                <br/><br/>
                                                <b>***** 기본 옵션 *****</b>
                                                <div style="border:2px #dddddd double;padding:10px;background-color:#f3f3f3;">
                                                    <b>gopaymethod</b> : 결제 수단 선택
                                                    <br/>ex) Card (계약 결제 수단이 존재하지 않을 경우 에러로 리턴)
                                                    <br/>사용 가능한 입력 값
                                                    <br/>Card,DirectBank,HPP,Vbank,kpay,Swallet,Paypin,EasyPay,PhoneBill,GiftCard,EWallet
                                                    <br/>onlypoint,onlyocb,onyocbplus,onlygspt,onlygsptplus,onlyupnt,onlyupntplus
                                                    <br/><input  style="width:100%;" name="gopaymethod" value="Card" >
                                                    <br/><br/>

                                                    <br/>
                                                    <b>offerPeriod</b> : 제공기간
                                                    <br/>ex)20150101-20150331, [Y2:년단위결제, M2:월단위결제, yyyyMMdd-yyyyMMdd : 시작일-종료일]
                                                    <br/><input  style="width:100%;" name="offerPeriod" value="2015010120150331" >
                                                    <br/><br/>

                                                    <br/><b>acceptmethod</b> : acceptmethod
                                                    <br/>acceptmethod  ex) CARDPOINT:SLIMQUOTA(코드-개월:개월):no_receipt:va_receipt:vbanknoreg(0):vbank(20150425):va_ckprice:vbanknoreg: 
                                                    <br/>KWPY_TYPE(0):KWPY_VAT(10|0) 기타 옵션 정보 및 설명은 연동정의보 참조 구분자 ":"
                                                    <br/>
                                                    <!--
                                                    <input style="width:100%;" name="acceptmethod" value="HPP(1):no_receipt:va_receipt:vbanknoreg(0):below1000" >
        -->
                                                </div>

                                                <br/><br/>
                                                <b>***** 표시 옵션 *****</b>
                                                <div style="border:2px #dddddd double;padding:10px;background-color:#f3f3f3;">
                                                    <br/><b>languageView</b> : 초기 표시 언어
                                                    <br/>[ko|en] (default:ko)
                                                    <br/><input style="width:100%;" name="languageView" value="" >

                                                    <br/><b>charset</b> : 리턴 인코딩
                                                    <br/>[UTF-8|EUC-KR] (default:UTF-8)
                                                    <br/><input style="width:100%;" name="charset" value="" >

                                                    <br/><b>payViewType</b> : 결제창 표시방법
                                                    <br/>[overlay] (default:overlay)
                                                    <br/><input style="width:100%;" name="payViewType" value="" >

                                                    <br/><b>closeUrl</b> : payViewType='overlay','popup'시 취소버튼 클릭시 창닥기 처리 URL(가맹점에 맞게 설정)
                                                    <br/>close.jsp 샘플사용(생략가능, 미설정시 사용자에 의해 취소 버튼 클릭시 인증결과 페이지로 취소 결과를 보냅니다.)
                                                    <br/><input style="width:100%;" name="closeUrl" value="<?php echo $siteDomain ?>/close.php" >

                                                    <br/><b>popupUrl</b> : payViewType='popup'시 팝업을 띄울수 있도록 처리해주는 URL(가맹점에 맞게 설정)
                                                    <br/>popup.jsp 샘플사용(생략가능,payViewType='popup'으로 사용시에는 반드시 설정)
                                                    <br/><input style="width:100%;" name="popupUrl" value="<?php echo $siteDomain ?>/popup.php" >

                                                </div>

                                                <b>***** 결제 수단별 옵션 *****</b>
                                                <br/>
                                                <b>-- 카드(간편결제도 사용) --</b>
                                                <div style="border:2px #cccccc solid;padding:10px;background-color:#f3f3f3;">
                                                    <br/><b>nointerest</b> : 무이자 할부 개월
                                                    <br/>ex) 11-2:3:4,04-2:3:4
                                                    <br/><input  style="width:100%;" name="nointerest" value="<?php echo $cardNoInterestQuota ?>" >

                                                    <br/><b>quotabase</b> : 할부 개월
                                                    <br/>ex) 2:3:4
                                                    <br/><input  style="width:100%;" name="quotabase" value="<?php echo $cardQuotaBase ?>" >	

                                                </div>

                                                <b>-- 가상계좌 --</b>
                                                <div style="border:2px #cccccc solid;padding:10px;background-color:#f3f3f3;">
                                                    <br/><b>INIregno</b> : 주민번호 설정 기능
                                                    <br/>13자리(주민번호),10자리(사업자번호),미입력시(화면에서입력가능)
                                                    <br/><input  style="width:100%;" name="INIregno" value="" >
                                                </div>

                                                <br/><br/>
                                                <b>***** 추가 옵션 *****</b>
                                                <div style="border:2px #dddddd double;padding:10px;background-color:#f3f3f3;">
                                                    <br/><b>merchantData</b> : 가맹점 관리데이터(1000byte)
                                                    <br/>인증결과 리턴시 함께 전달됨
                                                    <br/><input  style="width:100%;" name="merchantData" value="" >
                                                </div>
                                            </form>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>