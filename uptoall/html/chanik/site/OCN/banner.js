$(function(){
    $.ajax({
        url:"./json/banner.json",
        cache:false,
        type:"GET",
        dataType:"JSON",
        success:function($banner){
            console.log($banner);
            $.fn.ban($banner);
        },
        error:function(){
            console.log("data error");
        }
    });

    let $banner_ea =0;

    $.fn.ban = function($array){

    $($array["banners"]).each(function($node,$name){
    $banner_ea = $array["banners"].length;
    console.log($name)      
    $("#bannerol").append("<li><img src='"+ $name[0] +"'></li>");
    $("#disc").append("<li></li> ");
    }); 

    //디스크 클릭 부분
    $("#disc>li").bind({
        "mouseenter":function(){
        clearTimeout($timer);
        },
    "click":function(){
    $("#disc>li").css("background-color","black");
    $("#bannerol>li").eq($no).fadeOut();
    $no = $(this).index();
    $("#bannerol>li").eq($no).fadeIn();
    $("#disc>li").eq($no).css("background-color","red");

    }
});
}
    //배너 애니매이션 (5초에 한번씩 작동)
    let $timer;
            let $no=0;

            $.fn.times = function(){
                $timer = setTimeout(function(){
                        $("#bannerol>li").eq($no).fadeOut();
                        $("#disc>li").css("background-color","black");
                        $no++;
                        if($no >= $banner_ea){       
                            $no=0;
                        }
                        $("#bannerol>li").eq($no).fadeIn();
                        $("#disc>li").eq($no).css("background-color","red");
                    },8000);
                    $timer = setTimeout($.fn.times,8000);
            }
            $.fn.times();
            
    //사이드 배너 버튼
    $("#bannerdiv").bind({
        "mouseenter":function(){
            $("#left").fadeIn();
            $("#right").fadeIn();
            clearTimeout($timer);
        },
        "mouseleave":function(){
            $("#left").fadeOut();
            $("#right").fadeOut();
        }
    });
    
    //배너 오른쪽 버튼클릭
    $("#right").click(function(){
        clearTimeout($timer)
        $("#bannerol>li").eq($no).fadeOut();
                $("#disc>li").css("background-color","black");
                $no++;
                if($no >= $banner_ea){
                    $no=0;
                }
                $("#bannerol>li").eq($no).fadeIn();
                $("#disc>li").eq($no).css("background-color","red");
    });

    //배너 왼쪽 버튼 클릭
    $("#left").click(function(){
        clearTimeout($timer)
        $("#bannerol>li").eq($no).fadeOut();
                $("#disc>li").css("background-color","black");
                $no--;                  
                if($no < 0){            
                    $no = $banner_ea-1;
                }
                $("#bannerol>li").eq($no).fadeIn();
                $("#disc>li").eq($no).css("background-color","red");
    });
    $("#bodylabel").mouseleave(function(){
        $timer = setTimeout($.fn.times,8000);
    });
    
    

});
