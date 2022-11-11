function member(){  // cp, email, pw hp
    var msg ="회사명,이메일,비밀번호,휴대전화 번호"
    var m = msg.split(",");
    var pm = "";
    var cp = document.getElementById("cp");
    var email = document.getElementById("email");
    var pw = document.getElementById("pw");
    var hp = document.getElementById("hp");
    if(cp.value == ""){
        pm = m[0];
        
    }
    else if(email.value == ""){
        pm = m[1];
        
    }
    else if(pw.value == ""){
        pm = m[2];
        
    }
    else if(hp.value == ""){
        pm = m[3];
    }
    else{
        //이메일 상세검색
        var mail_check = email.value.match(/@/g);
        if(mail_check == null){
            alert("정확한 이메일을 입력해 주세요.");
        }
        else{
            alert("가입을 진심으로 축합니다!");
        }
    }
    if(pm != ""){
        alert(pm + "을 입력해 주세요.");
    }
}
//휴대폰 번호 자동 - 입력
    function telcheck(n){
        //console.log(n);
        var tn = n.length;
        //console.log(tn);
        if(tn==3){
            n = n + "-";
            document.getElementById("hp").value = n;
        }
        else if(tn > 6 && tn < 9){
            var nn = n.split("-");
            n = nn[0] + "-" + nn[1] + "-";
            document.getElementById("hp").value = n;
        }
        else if(tn > 12){   // 13~14 010-123-5671
            var nn = n.split("-");
            if(nn[2].length > 4){   //뒷자리 숫자가 4이상 010-123-12345
                var re = nn[0] + nn[1] + nn[2];
                // console.log(re) == 01020147446
                n = re.substr(0,3) + "-" + re.substr(3,4) + "-" + re.substr(7,4);
                document.getElementById("hp").value = n;
                //console.log(n);
            }
            else if(nn[2].length == 4){  //010-2014-7446
            n = nn[0] + "-" + nn[1] + "-" + nn[2];
        }
        document.getElementById("hp").value = n;
        }
}