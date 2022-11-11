export let agrees = function(){
    let agreeck1 = document.querySelector("#inbtn1").value;
    let agreeck2 = document.querySelector("#inbtn2").value;
    let agreeck3 = document.querySelector("#inbtn3").value;
    if(agreeck1 != "Y"){
        alert("이용약관에 동의해 주세요");
    }
    else if(agreeck2 != "Y"){
        alert("이메일 수신약관에 동의해 주세요");
    }
    else if(agreeck3 != "Y"){
        alert("SMS 수신약관에 동의해 주세요");
    }
    else {
        location.href = './m_member.html' + "?m_terms=" + agreeck1 + "&m_email=" + agreeck2 + "&m_sms=" + agreeck3;
    }
}

document.querySelector("#agree_complete").addEventListener("click",agrees);

// 이용약관
export let aterms1 = function(){
    let sright1 = 0;
    var bani1 = document.getElementById("inbtn1");
    if(bani1.style.right == "32px"){
        function aterms_in1(){
            sright1 -= 1;
            bani1.style.right = 32 + sright1 + "px";
            document.getElementById("agreebtn1").style.backgroundColor = "gray";
            if(sright1 >= -29){
                window.requestAnimationFrame(aterms_in1);
                bani1.value = "N";
            }
        }
        window.requestAnimationFrame(aterms_in1);
    }
    else {
        function aterms_in1(){
            sright1 += 1;
            bani1.style.right = sright1 + "px";
            document.getElementById("agreebtn1").style.backgroundColor = "yellowgreen";
            if(sright1 <= 31){
                window.requestAnimationFrame(aterms_in1);
                bani1.value = "Y";
            }
        }
        window.requestAnimationFrame(aterms_in1);
    }
}
document.querySelector("#agreebtn1").addEventListener("click",aterms1);

// 이메일 수신 약관
export let aterms2 = function(){
    let sright2 = 0;
    var bani2 = document.getElementById("inbtn2");
    if(bani2.style.right == "32px"){
        function aterms_in2(){
            sright2 -= 1;
            bani2.style.right = 32 + sright2 + "px";
            document.getElementById("agreebtn2").style.backgroundColor = "gray";
            if(sright2 >= -29){
                window.requestAnimationFrame(aterms_in2);
                bani2.value = "N";
            }
        }
        window.requestAnimationFrame(aterms_in2);
    }
    else {
        function aterms_in2(){
            sright2 += 1;
            bani2.style.right = sright2 + "px";
            document.getElementById("agreebtn2").style.backgroundColor = "yellowgreen";
            if(sright2 <= 31){
                window.requestAnimationFrame(aterms_in2);
                bani2.value = "Y";
            }
        }
        window.requestAnimationFrame(aterms_in2);
    }
}
document.querySelector("#agreebtn2").addEventListener("click",aterms2);

// SMS 수신 약관
export let aterms3 = function(){
    let sright3 = 0;
    var bani3 = document.getElementById("inbtn3");
    if(bani3.style.right == "32px"){
        function aterms_in3(){
            sright3 -= 1;
            bani3.style.right = 32 + sright3 + "px";
            document.getElementById("agreebtn3").style.backgroundColor = "gray";
            if(sright3 >= -29){
                window.requestAnimationFrame(aterms_in3);
                bani3.value = "N";
            }
        }
        window.requestAnimationFrame(aterms_in3);
    }
    else {
        function aterms_in3(){
            sright3 += 1;
            bani3.style.right = sright3 + "px";
            document.getElementById("agreebtn3").style.backgroundColor = "yellowgreen";
            if(sright3 <= 31){
                window.requestAnimationFrame(aterms_in3);
                bani3.value = "Y";
            }
        }
        window.requestAnimationFrame(aterms_in3);
    }
}
document.querySelector("#agreebtn3").addEventListener("click",aterms3);