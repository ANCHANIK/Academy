$(function(){
//------------------------------- 회원 로그인 -------------------------------------
    // 로그인 close 버튼
    $("#member_close").click(function(){
        $("#mem_login").fadeOut(650);
    });

    $("#nomember").click(function(){
        $("#mem_login").fadeOut(650);
        $("#pop_nonmember_bg_outline").fadeIn(650);
    });
});

function loginck(){
    var enck = m_frm.user_nm.value.match(/[a-zA-Z]/g);
    if(!m_frm.user_nm.value){
        alert("아이디를 입력하세요");
        m_frm.user_nm.focus();
        return false;
    }
    else if(enck == null){
        alert("영어로만 입력하세요");
        m_frm.user_nm.value = "";
        m_frm.user_nm.focus();
        return false;
    }
    else if(!m_frm.user_pw.value){
        alert("비밀번호를 입력하세요");
        m_frm.user_pw.focus();
        return false;
    }
    else {
        let user_nm = "user_nm=" + m_frm.user_nm.value;
        let user_pw = "&user_pw=" + m_frm.user_pw.value;
        const login_post = encodeURI(user_nm) + encodeURI(user_pw);
        ajaxpost(login_post);
    }
}

function ajaxpost(lodata){
    let loginpost;
    function windowck(){
        if(window.XMLHttpRequest){
            return new XMLHttpRequest();
        }
    }
    function filepost(){
        if(loginpost.readyState == XMLHttpRequest.DONE && loginpost.status == 200){
            check_sign(this.response);
        }
    }
    loginpost = windowck();
    loginpost.onreadystatechange = filepost;
    loginpost.open("POST","./m_login.php",true);
    loginpost.setRequestHeader("content-type","application/x-www-form-urlencoded");
    loginpost.send(lodata);
}

function check_sign(cksign){
    switch(cksign){
        case "cancel":
            alert("해당 고객님은 가입이 되지 않으셨습니다.");
        break;
        case "ok":
            alert("고객님 로그인 하셨습니다.");
            location.href = './index.html';
        break;
    }
}


//------------------------------- 비회원 로그인 -------------------------------------
$(function(){
        $("#nomem_close").click(function(){
            $("#pop_nonmember_bg_outline").css("display","none");
        });
    
        $("#nonmems > li").eq(0).stop().fadeIn(300);
        $.fn.nomemfade = function(){
            let $nomtimer;
            let $nopnum = 0;
            let $nom_ea = $("#nonmems > li").length;
            $nomtimer = setInterval(function(){
                $("#nonmems > li").eq($nopnum).stop().fadeOut(300);
                $nopnum++;
                if($nopnum >= $nom_ea){
                    $nopnum = 0;
                }
                $("#nonmems > li").eq($nopnum).stop().fadeIn(300);
            },5000)
        }
        setTimeout($.fn.nomemfade);
})

function nonbtn(){
    var ornum1 = document.getElementById("d_mno_num1");
    var ornum2 = document.getElementById("d_mno_num2");
    if(!non_memform.order_name.value){
        alert("주문자 이름을 입력하세요");
        non_memform.order_name.focus();
        return false;
    }
    else if(isNaN(non_memform.order_name.value) == false){
        alert("문자만 입력하세요");
        non_memform.order_name.value = "";
        non_memform.order_name.focus();
        return false;
    }
    else{
        if(ornum1.value == "" || isNaN(ornum1.value) == true || ornum1.value.length < 6){
            alert("정확한 주문번호를 입력하세요");
            ornum1.value = "";
            ornum1.focus();
            return false;
        }
        else{
            if(ornum2.value == "" || isNaN(ornum2.value) == true || ornum2.value.length < 7){
                alert("정확한 주문번호를 입력하세요");
                ornum2.value = "";
                ornum2.focus();
                return false;
            }
            else{
                if(!non_memform.order_pass.value){
                    alert("비밀번호를 입력하세요");
                    non_memform.order_pass.focus();
                    return false;
                }
                else {
                    non_memform.order_number.value = Number(ornum1.value) + "" + Number(ornum2.value);
                    let order_name = "order_name=" + non_memform.order_name.value;
                    let order_number = "&order_number=" + non_memform.order_number.value;
                    let order_pass = "&order_pass=" + non_memform.order_pass.value;
                    const non_post = order_name + order_number + order_pass;
                    nonajax(non_post);
                }
            }
        }
    }
}

function nonajax(nodata){
    let noor;
    function windowck(){
        if(window.XMLHttpRequest){
            return new XMLHttpRequest();
        }
    }
    function noload(){
        if(noor.readyState == XMLHttpRequest.DONE && noor.status == 200){
            nomemload(this.response);
        }
    }
    noor = windowck();
    noor.onreadystatechange = noload;
    noor.open("POST","./m_order.php",true);
    noor.setRequestHeader("content-type","application/x-www-form-urlencoded");
    noor.send(nodata);
}

function nomemload(nojoin){
    switch(nojoin){
        case "ok":
            alert("잠시만 기다려 주세요! 출력 중입니다");
        break;
        case "no":
            alert("해당 정보는 확인 되지 않습니다");
        break;
    }
}