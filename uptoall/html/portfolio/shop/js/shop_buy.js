
// 결제수단 선택
// target
function payment(paymethod){
    switch(paymethod){
        case 0:  // 일반결제
            document.querySelectorAll("#pay_choice")[paymethod+1].style.display = "none";
            document.querySelectorAll("#pay_choice")[paymethod].style.display = "block";
            document.querySelectorAll("#pay_choice")[paymethod+2].style.display = "none";

        break;
        case 1:  // 신용카드 결제
            document.querySelectorAll("#pay_choice")[paymethod-1].style.display = "none";
            document.querySelectorAll("#pay_choice")[paymethod].style.display = "none";
            document.querySelectorAll("#pay_choice")[paymethod+1].style.display = "none";
        break;
        case 2:  // 휴대폰 결제
            alert("서비스 준비중입니다.");
            document.querySelectorAll("#pay_choice")[paymethod-1].style.display = "none";
            document.querySelectorAll("#pay_choice")[paymethod].style.display = "none";
            document.querySelectorAll("#pay_choice")[paymethod+1].style.display = "none";
        break;
    }

}

// 세금계산서
function cash_receipt(bill){
    if(bill == 2){
        document.getElementById("bill_open").style.display = "block";
    }
    else {
        document.getElementById("bill_open").style.display = "none";
    }
}

// 배송지 확인
function delivery(delnum){
    if(delnum == 2){
        document.getElementById("receiver_name").value = "";
        document.getElementById("receiver_post").value = "";
        document.getElementById("receiver_addr").value = "";
        document.getElementById("receiver_addr2").value = "";
        document.getElementById("receiver_tel").value = "";
        document.getElementById("receiver_hp").value = "";
    }
    else if(delnum == 3){
        document.getElementById("receiver_name").value = document.getElementById("buyername").value;
        document.getElementById("receiver_post").value = document.getElementById("order_post").value;
        document.getElementById("receiver_addr").value = document.getElementById("order_addr1").value;
        document.getElementById("receiver_addr2").value = document.getElementById("order_addr2").value;
        document.getElementById("receiver_tel").value = document.getElementById("buy_tel").value;
        document.getElementById("receiver_hp").value = document.getElementById("buy_hp").value;
    }

}

$(function(){
    // 주소 검색
    $("#addr_btn").postcodifyPopUp();

    // 상품 이미지
    let $imgsrc = $("#product_img").val();
    $("#order_img > img").attr("src",$imgsrc);  // 상품 이미지

    $("#order_pnm").text($("#goodname").val());  // 상품명
    $("#order_option").text($("#product_option").val());  // 상품옵션 정보
    $("#order_ea").text($("#goodea").val()); // 상품 갯수
    $("#order_price").text(($("#price").val()-2500).toLocaleString() + " 원");  // 상품금액
    $("#order_total_price").text(($("#price").val()-2500).toLocaleString() + " 원");  // 상품금액
    $("#total__price").text(($("#price").val()-2500).toLocaleString() + " 원");  // 상품금액
    
    let $all_price = Number($("#price").val());
    
    $("#last_total_price").text($all_price.toLocaleString() + " 원");  // 최종 결제 금액 확인

    $("#total_all_price").text($all_price.toLocaleString() + " 원"); // 최종금액
    $("#price").val($all_price);


    // 이메일 선택
    $("#email_select").change(function(){
        var $mail_sel = $(this).val();
        $("#buyeremail").val($mail_sel);
    });

});



function pay_btn(){
    let match_lang = /^(?=.*[a-zA-Z가-힣])/g;
    let match = /^(?=.*[!@#$%^&*+-=`.,?"])/;

    if(!orders.buyername.value){
        alert("주문자명을 입력하세요");
        orders.buyername.focus();
    }
    else if(!orders.order_post.value){
        alert("우편번호를 입력하세요");
        orders.order_post.focus();
    }
    else if(!orders.order_addr1.value){
        alert("주소를 입력하세요");
        orders.order_addr1.focus();
    }
    else if(!orders.order_addr2.value){
        alert("상세 주소를 입력하세요");
        orders.order_addr2.focus();
    }
    else if(!orders.buyertel.value){
        alert("휴대폰 번호를 입력하세요");
        orders.buyertel.focus();
    }
    else if(!orders.buyeremail.value){
        alert("이메일을 입력하세요");
        orders.buyertel.focus();
    }
    else if(!orders.receiver_name.value){
        alert("수령자명을 입력하세요");
        orders.receiver_name.focus();
    }
    else if(!orders.receiver_post.value){
        alert("우편번호를 입력하세요");
        orders.receiver_name.focus();
    }
    else if(!orders.receiver_addr2.value){
        alert("상세주소를 입력하세요");
        orders.receiver_addr2.focus();
    }
    else if(!orders.receiver_hp.value){
        alert("휴대폰 번호를 입력하세요");
        orders.receiver_hp.focus();
    }
    else if(orders.ordercheck.checked == false){
        alert("구매동의를 체크하세요");
    }
    else{
        orders.action = "./shop_pay.html";
        orders.submit();
    }
}