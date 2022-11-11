$(function(){
    $.ajax({
        url:"./json/notice.json",
        cache:false,
        data:"GET",
        dataType:"JSON",
        success:function($data){
            $.fn.noticelist($data);
            // console.log($data)
        },
        error:function(){
            console.log("DATA ERROR");
        }
    });

    $.fn.noticelist = function($list){
        const $noticedata = $list;
        // console.log($noticedata["notice"]);

        var $height = $("#ocn_notice_ul > li").height();  // 높이 30
        // console.log($height);
        var $list_length = $noticedata["notice"].length;
        // console.log($list_length);  // 5개

        let $notice_li;
        $.each($noticedata["notice"],function($nd,$dt){
            // console.log($noticedata["notice"][$nd][0])

            $notice_li = "<li>"+ $noticedata["notice"][$nd][0] +"</li>";
            $("#ocn_notice_ul").append($notice_li);
            
        });
    }

    var $height = $("#ocn_notice_ul").height();
    let $timer;
    $.fn.list = function(){
        $timer = setInterval(function(){

            $("#ocn_notice_ul").stop().animate({
                "top": -$height + "px"
            },700,function(){
                var $list_clone = $("#ocn_notice_ul > li").eq(0).clone();
                $("#ocn_notice_ul").append($list_clone);
                $("#ocn_notice_ul > li").eq(0).remove();
                $("#ocn_notice_ul").css("top","0px");
            })
        },10000)
    };
    setTimeout($.fn.list,1000);

    // select part
    $("#span_brand").click(function(){
        $("#sel_brand").slideToggle();
    });
    $("#span_ic").click(function(){
        $("#sel_ic").slideToggle();
    });
    $("#sel_brand > li")
});

let brand_list;
function windowck(){
    if(window.XMLHttpRequest){
        return new XMLHttpRequest();
    }
}
function brandselect(){
    if(brand_list.readyState == XMLHttpRequest.DONE && brand_list.status == 200){
        brandlist(this);
    }
}
brand_list = windowck();
brand_list.onreadystatechange = brandselect;
brand_list.open("GET","./json/pullmenu.json",true);
brand_list.send();

function brandlist(data){
    const b_list = JSON.parse(data.responseText);
    console.log(b_list[0]);
    console.log(b_list[0]["brand"]);
    console.log(b_list[0]["subsidi"]);
    // Brand Select
    Object.keys(b_list[0]["brand"]).forEach(function(da1,nd1){
        console.log(b_list[0]["brand"][da1]);
        var sel_brand = document.getElementById("sel_brand");
        var sel_brand_op = document.createElement("li");
        sel_brand_op.innerText = b_list[0]["brand"][da1];
        sel_brand_op.setAttribute("value",b_list[0]["brand"][da1]);
        sel_brand.append(sel_brand_op);
    });
    // ic Select
    Object.keys(b_list[0]["subsidi"]).forEach(function(da1,nd1){
        console.log(b_list[0]["subsidi"][da1]);
        var sel_brand = document.getElementById("sel_ic");
        var sel_brand_op = document.createElement("li");
        sel_brand_op.innerText = b_list[0]["subsidi"][da1];
        sel_brand_op.setAttribute("value",b_list[0]["subsidi"][da1]);
        sel_brand.append(sel_brand_op);
    });
}