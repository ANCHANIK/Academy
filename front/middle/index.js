// review JSON
let roll_data;
function ajax_review(){
    function windowck(){
        if(window.XMLHttpRequest){
            return new XMLHttpRequest();
        }
    }
    function fileopen(){
        if(roll_data.readyState == XMLHttpRequest.DONE && roll_data.status == 200){
            review(roll_data);
        }
    }
    roll_data = windowck();
    roll_data.onreadystatechange = fileopen;
    roll_data.open("GET","./json/review.json",true);
    roll_data.send();
}
ajax_review();

// pet_product JSON
let p_data;
function ajax_product(){
    function windowck(){
        if(window.XMLHttpRequest){
            return new XMLHttpRequest();
        }
    }
    function fileopen(){
        if(p_data.readyState == XMLHttpRequest.DONE && p_data.status == 200){
            product(p_data);
        }
    }
    p_data = windowck();
    p_data.onreadystatechange = fileopen;
    p_data.open("GET","./json/best_product.json",true);
    p_data.send();
}
ajax_product();

// pet_list JSON
let p_list;
function ajax_pet_list(){
    function windowck(){
        if(window.XMLHttpRequest){
            return new XMLHttpRequest();
        }
    }
    function fileopen(){
        if(p_list.readyState == XMLHttpRequest.DONE && p_list.status == 200){
            new_pet(p_list);
        }
    }
    p_list = windowck();
    p_list.onreadystatechange = fileopen;
    p_list.open("GET","./json/new_pet.json",true);
    p_list.send();
}
ajax_pet_list();

// Question_list Json
let q_list;
function ajax_q_list(){
    function windowck(){
        if(window.XMLHttpRequest){
            return new XMLHttpRequest();
        }
    }
    function fileopen(){
        if(q_list.readyState == XMLHttpRequest.DONE && q_list.status == 200){
            que_list(q_list);
        }
    }
    q_list = windowck();
    q_list.onreadystatechange = fileopen;
    q_list.open("GET","./json/qanda.json",true);
    q_list.send();
}
ajax_q_list();

// 리뷰 출력
function review(data){
    const review_data = JSON.parse(data.responseText);
    review_data["reviews"].forEach(function(d1,d2,d3){
        let data_text = d1[0].substring(0,17) + "...";
        var review_li = document.createElement("li");
        review_li.append(data_text);
        document.getElementById("review_ul").append(review_li);
    });
}

// 상품 출력
function product(data){
    const product_data = JSON.parse(data.responseText);
    product_data["best_product"].forEach(function(d1,d2,d3){
        var label1 = "<label>"+ d1['product_nm'] +"</label>";
        var label2 = "<label>"+ d1['product_sample'] +"</label>";
        var label3 = "<label>"+ d1['product_money'] +"</label>";
        var span_label = "<span>"+ label1 + label2 + label3 +"</span>";
        var span_img = "<span><img src="+ d1['product_img']  +"></span>";
        var product_div = "<div>"+ span_img + span_label +"</div>";
        document.getElementById("pet_product").innerHTML += product_div;
    });
}

// new_pet 출력
function new_pet(data){
    const new_pet_data = JSON.parse(data.responseText);
    new_pet_data.forEach(function(d1,d2,d3){
        let new_pet_img = "<div><img src='"+ d1["pet_img"] +"'></div>";
        let new_pet_title = "<div>"+ d1["pet_title"] +"</div>";
        let new_pet_li = "<li>"+ new_pet_img + new_pet_title +"</li>";
        document.getElementById("product_ea").innerHTML += new_pet_li;
    });
}

// Question_list 출력
function que_list(data){
    const que_list_data = JSON.parse(data.responseText);
    que_list_data.forEach(function(d1,d2,d3){
        let q_string = "<span>"+ d1["q_subject"].substring(0,15) + "...</span>";
        let q_date = "<span>["+ d1["q_date"].substring(0,10) +"]</span>";
        let q_li = "<li>"+ q_string + q_date +"</li>";
        document.getElementById("q_list").innerHTML += q_li;
    });
}

$(function(){
    let $a = 1;
    // 검색파트
    $("#search_btn").click(function(){
        if($a == 1){
            $("#search").fadeIn(300);
            $("#search").css("display","flex");
            $a++;
        }
        else{
            $("#search").fadeOut(300);
            $a--;
        }
    });

    // 배너 롤링
    let $timer;
    let $node = 0;
    $.fn.banner = function(){
        $timer = setInterval(function(){
            $("#section_banner > div").eq($node).fadeOut(300);
            $node+=1;
            if($node == 3){
                $node = 0;
            }
            $("#section_banner > div").eq($node).fadeIn(300);
        },5000);
    }
    setTimeout($.fn.banner,1000);
    
    // 플로팅 배너
    $(window).scroll(function(){
        let $top_up = $(window).scrollTop();
        let $top_scroll = $("#top_scroll").offset().top;
        $("#top_scroll").stop().animate({
            "top": $top_up + 400 + "px"
        },700);
    });
    // 플로팅 배너 button
    $("#top_scroll").click(function(){
        $(window).scrollTop(0);
    });
    

    // pet list
    let $product_li_length = $("#product_ea > li").length;
    $("#leftbtn").click(function(){
        $("#dtc").stop().animate({
            "left":"-120px"
        },500,function(){
            var $product_ea = $("#product_ea > li").eq(0).clone();
            $("#product_ea > li").eq(0).remove();
            $("#product_ea").append($product_ea);
            $("#dtc").css("left","0px");
        });
    });
    $("#rightbtn").click(function(){
        let $product_ea = $("#product_ea > li").eq($product_li_length - 1).clone();
        $("#product_ea > li").eq($product_li_length - 1).remove();
        $("#dtc").css("left","-120px");
        $("#product_ea").prepend($product_ea);
        $("#dtc").stop().animate({
            "left":"0px"
        },500);
    });
    
    // review rolling
    let $roll_time;
    let $roll_banner_length = $("#review_ul > li").length;
    let $roll_banner_height = $("#review_ul > li").height();
    $roll_time = 0;
    $.fn.rolling = function(){
        $roll_time = setInterval(function(){
            $("#review_ul").stop().animate({
                "top":-$roll_banner_height + "px"
            },700,function(){
                var $cp = $("#review_ul > li").eq(0).clone();
                $("#review_ul > li").eq(0).remove();
                $("#review_ul").append($cp);
                $("#review_ul").css("top","0px");
            });
        },3000);
    }
    setTimeout($.fn.rolling,1000);

    // blackscreen
    let $bs = 0;
    $("#ham_btn").click(function(){
        if($bs==0){
            $("#section_menu").css("display","block");
            $("#black").css("display","block");
            $("#section_menu").stop().animate({
                "width":"90%"
            },500,function(){
                $bs++;
            });
        }
        else{
            $("#section_menu").stop().animate({
                "width":"0px"
            },500,function(){
                $("#section_menu").css("display","none");
                $("#black").css("display","none");
                $bs--;
            });
        }
    });
});