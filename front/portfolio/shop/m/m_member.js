
export let mpass = function(){
    document.querySelector(".mpass_span").style.display="block";
}
document.querySelector("#mpass").addEventListener("click",mpass);

export let mpass_btn = function(){
    document.querySelector(".mpass_span").style.display="none";
}
document.querySelector("#mpass_btn").addEventListener("click",mpass_btn);

export let parameter = function(){
    var pa = location.search;
    var pa_1 = pa.split("m_terms=");
    var pa_1_1 = pa_1[1].split("&");
    var pa_1_2 =pa_1_1[0]; 
    
    var pa_2 = pa.split("m_email=");
    var pa_2_1 = pa_2[1].split("&");
    var pa_2_2 = pa_2_1[0];
    
    var pa_3 = pa.split("m_sms=");
    var pa_3_1 = pa_3[1].split("&");
    var pa_3_2 = pa_3_1[0];

    document.getElementById("mcerti").value=pa_1_2;
    document.getElementById("magree1").value=pa_2_2;
    document.getElementById("magree2").value=pa_3_2;
}


export let post = function(){
    if(document.getElementById("mid").value==""){
        alert("아이디를 입력하세요");
        frm.mid.focus();
    }
    else if(document.getElementById("mpass").value==""){
        alert("패스워드를 입력하세요");
        frm.mpass.focus();
    }
    else if(document.getElementById("mname").value==""){
        alert("고객명을 입력하세요");
        frm.mname.focus();
    }
    else if(document.getElementById("memail").value==""){
        alert("이메일을 입력하세요");
        frm.memail.focus();
    }
    else if(document.getElementById("mhp").value==""){
        alert("연락처를 입력하세요");
        frm.mhp.focus();
    }
    else if(document.getElementById("mnick").value==""){
        alert("닉네임을 입력하세요");
        frm.mnick.focus();
    }
    else{
        frm.submit();
    }
}
document.querySelector("#btn").addEventListener("click",post);


const array = ["1","2","3","4","5","6","7","8","9","0","!","*","_","-","."];
var index="";
var node = document.querySelectorAll(".mpass_keybox > label");

export let passkey = function(key){
    index += [].indexOf.call(node, key.target);
    document.getElementById("mpass").value = index;

}
document.querySelector(".mpass_keybox").addEventListener("click",passkey)
