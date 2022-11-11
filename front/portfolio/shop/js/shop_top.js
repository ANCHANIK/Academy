$(function(){
    
    $.get("./admin/admin_notice.json?v="+nos,function(notice_data){
    })
    .done(function(notice_data){ // 파일로드
        for(let $n in notice_data){
            let $nrli = "<li>• "+ notice_data[$n]["subject"] +"</li>";
            $("#notice_box").append($nrli);
            let $nli = "<li link="+ notice_data[$n]["sidx"] +" title='"+ notice_data[$n]["subject"].replace(/ /g,'') +"'>[공지사항]  "+ notice_data[$n]["subject"] +"</li>";
            if(notice_data[$n]["subject"].length > 14){
                $nli = "<li link="+ notice_data[$n]["sidx"] +" title='"+ notice_data[$n]["subject"].replace(/ /g,'') +"'>[공지사항]  "+ notice_data[$n]["subject"].substring(0,16) + "..." + "</li>";
                $("#notice_ul").append($nli);
            }
            else{
                $nli = "<li link="+ notice_data[$n]["sidx"] +" title='"+ notice_data[$n]["subject"].replace(/ /g,'') +"'>[공지사항]  "+ notice_data[$n]["subject"] +"</li>";
                $("#notice_ul").append($nli);
            }
        }
        // 공지사항 내용 확인
        $("#notice_ul > li").click(function(){
            // var $sidx = $(this).index();
            // console.log($sidx)
            let $liks = $("#notice_ul > li").attr("link");
            location.href = './shop_notice.html?sidx=' + $liks;
        });
        
    })
    .fail(function(notice_data){ // 에러
        console.log("json_error")
    });
    

    var $n_timer;
    $.fn.notice = function(){
        $("#notice_ul").stop().animate({
            "top":"-35px"
        },1000,function(){
            var $an_li = $("#notice_ul > li").eq(0).clone();
            $("#notice_ul").append($an_li);
            $("#notice_ul > li").eq(0).remove();
            $("#notice_ul").css("top","0px");
        });
        $n_timer = setTimeout($.fn.notice,5000);
    }
    $n_timer = setTimeout($.fn.notice,5000);

    $("#top_logo_search_ad").bind({
        "mouseleave":function(){
            $n_timer = setTimeout($.fn.notice,5000);
        },
        "mouseenter":function(){
            clearTimeout($n_timer);
        }
    });

    $("#notice_next").bind({
        "click":function(){
            var $node = $("#notice_ul > li").length;
            var $an_li = $("#notice_ul > li").eq($node-1).clone();
            $("#notice_ul").css("top","-30px");
            $("#notice_ul").prepend($an_li);
                $("#notice_ul > li").eq($node).remove();
            $("#notice_ul").stop().animate({
                "top":"0px"
            },1000);
        }
    });

    $("#notice_prev").bind({
        "click":function(){
            $("#notice_ul").stop().animate({
                "top":"-35px"
            },1000,function(){
                var $an_li = $("#notice_ul > li").eq(0).clone();
                $("#notice_ul").append($an_li);
                $("#notice_ul > li").eq(0).remove();
                $("#notice_ul").css("top","0px");
            });
        }
    });

    let $point = 0;
    setInterval(function(){
        if($point%2==0){
            $("#point_move").stop().animate({
                "top":"25px"
            },100);
        }
        else{
            $("#point_move").stop().animate({
                "top":"28px"
            },100);
        }
        $point++;
    },400);

    // 즐겨찾기
    $("#mysearch").click(function(){
        alert("서비스 준비중 입니다.");
    });

    // 마이페이지
    $("#mypage").click(function(){
        alert("서비스 준비중 입니다.");
    });

    // 장바구니
    $("#mycart").click(function(){
        alert("서비스 준비중 입니다.");
    });

    // 회원가입 페이지 이동
    $("#membership_join").click(function(){
        location.href = './member_ship.html';
    });

    // 로그인 페이지 이동
    $("#gologin").click(function(){
        location.href = './shop_login.html';
    })

    $("#logout").click(function(){
        location.href = 'log_out.php';

    })
});