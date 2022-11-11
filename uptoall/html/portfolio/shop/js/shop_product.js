$(function(){
    let $pdata = product_info;
    var $total_money;
    var $main_pic = $pdata[0]["product_img"].replace("../","./");
    var $serve_pic1 = $pdata[0]["product_simg1"].replace("../","./");
    var $serve_pic2 = $pdata[0]["product_simg2"].replace("../","./");
    var $serve_pic3 = $pdata[0]["product_simg3"].replace("../","./");
    $("#main_img").attr("src",$main_pic);
    $("#serve_img0").attr("src",$main_pic);
    $("#serve_img1").attr("src",$serve_pic1);
    $("#serve_img2").attr("src",$serve_pic2);
    $("#serve_img3").attr("src",$serve_pic3);
    $("#product_img").val($main_pic);
    $("#product_nm").text($pdata[0]["productnm"]);
    $("#product_code").text($pdata[0]["goodsno"]);
    $("#product_nmdtc").text($pdata[0]["productnm_dtc"]);
    $("#product_ea").text($pdata[0]["product_ea"]+" EA");
    $("#goodsno").val($pdata[0]["goodsno"]);
    $("#goodname").val($pdata[0]["productnm"]);
    let $product_temp = product_info[0]["product_contents1"].replaceAll('height:3278px','');

    if($pdata[0]["product_sales"] == 0){
        $("#product_money").text($pdata[0]["product_money"].toLocaleString()+" 원");
        $("#protext_ul > li").eq(4).css("display","none");
        $total_money = Number($pdata[0]["product_money"]) + Number($pdata[0]["product_product_delivery"])
        $("#total_money").text($total_money.toLocaleString()+" 원");
        $("#price").attr("value",$total_money);
    }
    else {
        $("#product_money").html("<font color='gray'><s>"+$pdata[0]["product_money"].toLocaleString()+" 원</s></font>");
        $("#product_sales").text($pdata[0]["product_sales"].toLocaleString() + " 원");
        $total_money = Number($pdata[0]["product_sales"]) + Number($pdata[0]["product_product_delivery"]);
        $("#total_money").text($total_money.toLocaleString()+" 원");
        $("#price").attr("value",$total_money);
    }

    $("#product_delivery").text($pdata[0]["product_product_delivery"].toLocaleString() + " 원");

    for(let p=1;p<4;p++){
    $("#opmenu"+ p).text($pdata[0]["product_option"+p]);
    $("#opmenu"+ p).attr("value",$pdata[0]["product_option"+p]);
    }

    $("#goods_buy").keyup(function(){
        var $gea = $(this).val();
        if($pdata[0]["product_sales"] == 0){
            $total_money = ($gea * Number($pdata[0]["product_money"])) + Number($pdata[0]["product_product_delivery"])
            $("#total_money").text($total_money.toLocaleString()+" 원");
            $("#price").attr("value",$total_money);
        }
        else{
            $total_money = ($gea * Number($pdata[0]["product_sales"])) + Number($pdata[0]["product_product_delivery"]);
            $("#total_money").text($total_money.toLocaleString()+" 원");
            $("#price").attr("value",$total_money);
        }
        $("#goodea").val($gea)
    });
    
    // 메인 이미지 교체
    
    $("#simg_click > li").click(function(){
        let $snode = $(this).index();
        $("#main_img").attr("src",$("#serve_img"+$snode).attr("src"));
        
    });


    $("#buy_btn").click(function(){
        if($("#opsel").val() == ""){
            alert("옵션을 선택하세요");
        }
        else if($("#goods_buy").val() == ""){
            alert("구매 수량을 입력하세요");
        }
        else if(isNaN($("#goods_buy").val()) == true){
            alert("숫자만 입력하세요");
        }
        else{
            $("#order").attr("action","./shop_buy.html");
            $("#order").submit();
        }
    });

    $("#cart_btn").click(function(){
        if(confirm("장바구니에 추가하시겠습니까?")){
            alert("장바구니에 담겼습니다");
        };
    });

    $("#wish_btn").click(function(){
        alert("서비스 준비중 입니다.");
    });

    //상세페이지 출력
    $("#change_page_all > span").eq(0).css("border-bottom","none");
    $("#change_page_all > span").eq(1).css("border-bottom","1px solid rgb(167, 167, 167)");
    $("#change_page_all > span").eq(2).css("border-bottom","1px solid rgb(167, 167, 167)");
    $("#change_page_all > span").eq(3).css("border-bottom","1px solid rgb(167, 167, 167)");
    $("#change_page_all > span").eq(0).css("border-top","1px solid rgb(167, 167, 167)");
    $("#change_page_all > span").eq(0).css("border-left","1px solid rgb(167, 167, 167)");
    $("#change_page_all > span").eq(0).css("border-right","1px solid rgb(167, 167, 167)");
    $("#change_page_all > span").eq(0).css("background-color","white");
    $("#pd_infoview").css("display","block");
    $("#change_page_all > span").click(function(){
        let $dpp = $(this).index();
        // 상세페이지 메뉴
        $("#change_page_all > span").css("border-bottom","1px solid rgb(167, 167, 167)");
        $("#change_page_all > span").css("background-color","rgb(228, 228, 228)");
        $("#change_page_all > span").eq($dpp).css("background-color","white");
        $("#change_page_all > span").eq($dpp).css("border-bottom","none");
        $("#change_page_all > span").eq($dpp).css("border-top","1px solid rgb(167, 167, 167)");
        $("#change_page_all > span").eq($dpp).css("border-left","1px solid rgb(167, 167, 167)");
        $("#change_page_all > span").eq($dpp).css("border-right","1px solid rgb(167, 167, 167)");

        // 상세페이지 change
        $("#change_page_list1_all > span").css("display","none")
        $("#change_page_list1_all > span").eq($dpp).css("display","block")
    });


});

