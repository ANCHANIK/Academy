$(function(){
    $("#dark > label").bind({
        "mouseenter":function(){
            $("#start").css("display","block");
            $("#wait").css("display","none");
        },
        "mouseleave":function(){
            $("#start").css("display","none");
            $("#wait").css("display","block");
        },
        "click":function(){
            $("#dark").fadeOut();
        }
    });
    
    let $succes_count = 0; // 성공
    let $false_count = 5; // 실패

    $(".aw").click(function(){
        let $ct = $(this).index();
        $(".aw:eq("+ $ct +") > img").attr("src","./game/answer.gif");
        $succes_count++;
        
        if($succes_count == 5){
            setTimeout($.fn.alerts,500,1);
        }
    });

    //실패시 작동
    $("#ca_aw").click(function(){
        $false_count--;
        $("#picture_box_chance > img").attr("src","game/no_"+ $false_count +".png");
        if($false_count == 0){
            setTimeout($.fn.alerts,300,2);
        }
        else if($false_count < 0){
            $("#picture_box_chance > img").attr("src","game/no_0.png");
        }
    });
    
    $.fn.alerts = function(ct_part){
        if(ct_part == 1){
            alert("🥩오늘의 날씨는 '고기앞'입니다. 축하드립니다!🍖");
            $("#event_fm").css("display","block");
            // 게임 완료 후 입력 form으로 스크롤 이동
            $("html").scrollTop(9999);
        }
        else if(ct_part == 2){
            alert("☂오늘의 날씨는 '저기압'입니다. 아쉽지만 우산을 챙기세요!💧");
        }
    }

    // 우편번호 API 연동
    $("#addr_btn").postcodifyPopUp();
});


/*JavaScript*/
// 이벤트 경품 발송
function event_ck(){
    if(event_fm.e_name.value == ""){
        alert("고객명을 입력해주세요!");
    }
    else if(document.getElementById("e_tel1").value == "" || document.getElementById("e_tel2").value == "" || document.getElementById("e_tel2").value == "" ){
        alert("이벤트 당첨을 확인받을 연락처를 입력해 주세요!");
    }
    else if(event_fm.e_addr.value == "" || event_fm.e_dtc.value == ""){
        alert("배송받을 주소를 입력해 주세요!");
    }
    else if(event_fm.e_agree.checked == false){
        alert("개인정보수집 동의란에 체크해 주세요!");
    }
    else {
        // 실제 전화번호 확인
        phone_check();
    }
}

function phone_check(){
    let number1 = document.getElementById("e_tel1").value;
    if(number1 != "010" && number1 != "011" && number1 != "017" && number1 != "018"){
        alert("정상적인 휴대폰 번호가 아닙니다,");
    }
    else{
        let hp = document.getElementById("e_tel1").value + "" + document.getElementById("e_tel2").value + "" + document.getElementById("e_tel3").value;
        let hp_length = hp.length;
        if(hp_length < 10){
            alert("정상적인 휴대폰 번호가 아닙니다.");
        }
        else{
            document.getElementById("e_tel").value = hp;
            event_fm.submit();
        }
    }
};
