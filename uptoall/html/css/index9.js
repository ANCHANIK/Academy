var sign = "no";
function member_ship(){
    var id = document.getElementById("t_id").value;
    var pw = document.getElementById("t_pw").value;
    var pw2 = document.getElementById("t_pw2").value;
    var tel = document.getElementById("t_tel").value;
    var mail = document.getElementById("t_mail").value;
    var ss = document.getElementById("overlep").value;
    var check = document.getElementById("ck").children;
    var ea = check.length;
    var w = 1;
    while(w < ea){
        var aaa = "a" + w;
        var r_check = document.getElementById(aaa).checked;
        if(r_check == true){
            sign = "yes";
        }
        w++;
    }

    if(id == ""){
        alert("아이디를 입력해라");
    }
    else if(pw == ""){
        alert("패스워드를 입력해라");
    }
    else if(pw2 == ""){
        alert("패스워드 확인 입력해라");
    }
    else if(pw != pw2){
        alert("동일한 패스워드를 입력해라");
    }
    else if(tel == ""){
        alert("핸드폰 번호를 입력해라");
    }
    else if(mail == ""){
        alert("E-mail을 입력해라");
    }
    else if(sign == "no"){
        alert("구매 소프트웨어 체크해라");
    }
    else if(ss=="no"){
        alert("")
    }
    else if(tel != ""){
        tel(tel);  // 함수 이동시 조건문은 마지막에 사용해야
                   // 정상적으로 모든 조건을 사용할 수 있다.
    }
    else{
        alert("수고했다.");
    }
}

function tel(n){
    var j = n.length;
    if(j < 10){
        alert("올바를 전화번호를 입력해라");
    }
    else{
        var m = n.match(/[!@#$%^&*()-_=+|.~`'"/?]/g);
        if(m!=null){
            alert("특수문자 또는 '-'를 사용할 수 없다");
        }
        else{
            alert("회원가입 진행한다");
        }
    }
}

function id_ck(){
    var aa = document.getElementById("t_id");
    var ff = document.getElementById("overlep");
    if(aa.value==""){
        alert("아이디를 입력해야만 중복체크가 가능하다");
    }
    else{
        if(aa.value=="admin"){
            alert("관리자 아이디는 사용할 수 없다");
        }
        else{
            alert("올 ㅋ 사용할 수 있는 아뒤");
            ff.value = "yes";
            aa.readOnly = true;
        }
    }
}