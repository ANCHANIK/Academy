
function member_btn(num){
    switch(num){
        case 1:
            location.href = 'http://cksdlr7446.dothome.co.kr/portfolio/shop/member_ship.html';
        break;
        case 2:
            alert("서비스 준비중입니다.");
        break;
        case 3:
            alert("서비스 준비중입니다.");
        break;
    }
}

function memlogin(){
    if(!lofrm.shop_id.value){
        alert("아이디를 입력하세요");
        lofrm.shop_id.focus();
        return false;
    }
    else if(!lofrm.shop_pw.value){
        alert("패스워드를 입력하세요");
        lofrm.shop_pw.focus();
        return false;
    }
    else{
        encodeURI(lofrm.shop_pw.value);
        encodeURI(lofrm.shop_id.value);
        lofrm.method = "POST";
        lofrm.action = "shop_loginok.php";
        lofrm.enctype = "application/x-www-form-urlencoded";
        return true;
    }
}

function nomemlogin(){
    if(!nofrm.nomember_id.value){
        alert("주문자명을 입력하세요");
        nofrm.nomember_id.focus();
        return false;
    }
    else if(!nofrm.nomember_no.value){
        alert("주문번호를 입력하세요");
        nofrm.nomember_no.focus();
        return false;
    }
    else{
        if(isNaN(nofrm.nomember_no.value) == true){
            alert("숫자만 입력하세요");
            nofrm.nomember_no.value = "";
            nofrm.nomember_no.focus();
            return false;
        }
        else if(nofrm.nomember_no.length < 8){
            alert("주문번호는 8자리입니다.");
            nofrm.nomember_no.value = "";
            nofrm.nomember_no.focus();
            return false;
        }
        else{
            encodeURI(nofrm.nomember_id.value);
            encodeURI(nofrm.nomember_no.value);
            lofrm.method = "POST";
            lofrm.action = "shop_loginok.php";
            lofrm.enctype = "application/x-www-form-urlencoded";
            return true;
        }
    }
}