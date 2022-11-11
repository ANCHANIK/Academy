function mjoin(){
    if(!mfrm.mname.value){
        alert("받으실 분의 이름을 입력하세요");
        mfrm.mname.focus();
        return false;
    }
    else if(!mfrm.memail.value){
        alert("아이디 및 E-mail을 입력하세요");
        mfrm.memail.focus();
        return false;
    }
    else if(!mfrm.marea.value){
        alert("아이디 및 E-mail을 입력하세요");
        mfrm.marea.focus();
        return false;
    }
    else {
        mfrm.submit();
    }
}