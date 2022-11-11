function agree_all(){
    var chuse = document.getElementById("allagree").checked;
    var onoff = null;
    if(chuse == true){
        onoff = true;
    }
    else{
        onoff = false;
    }
    var fr = 1;
    while (fr < 3){
        document.getElementById("agree"+fr).checked = onoff;
        fr++;
    }
}

function agree_ne(){
    var fr = 1;
    while (fr < 3){
        var ckoff = document.getElementById("agree"+fr).checked;
        if(ckoff == false){
            document.getElementById("allagree").checked = false;
        }
        fr++;
    }
}

function agree_btn(){
    var fr = 1;
    var agree_use = "ok";
    while (fr < 3){
        var ckoff = document.getElementById("agree"+fr).checked;
        if(ckoff == false){
            document.getElementById("allagree").checked = false;
            agree_use = "no"
        }
        fr++;
    }
    if(agree_use == "no"){
        alert("약관에 모두 동의해야 회원가입이 진행됩니다.")
    }
    else{
        member_agree.method = "POST"
        member_agree.action = "./member_join.html";
        member_agree.submit();
    }
}

function agree_text(){
    var agree_text1 = new XMLHttpRequest();
    var agree_text2 = new XMLHttpRequest();
    agree_text1.open("GET","./agree/provision.txt?v=1",true);
    agree_text1.onload = function(){
        document.getElementById("agree_txt1").innerText = agree_text1.responseText;
    }
    agree_text2.open("GET","./agree/privacy.txt?v=1",true);
    agree_text2.onload = function(){
        document.getElementById("agree_txt2").innerText = agree_text2.responseText;
    }
    agree_text1.send();
    agree_text2.send();
}