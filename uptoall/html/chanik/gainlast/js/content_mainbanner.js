// 배너 롤링
$(function(){
    let $rb = 0;
    let $rbtimer = 0;
    let $mbanner_ea = $("#c_mbanul > li").length;
    let $mbanner_width = $("#c_mbanul > li").width();
    $.fn.mainroll = function(){
        $rbtimer = setInterval(function(){
            $("#c_mbanul").stop().animate({
                "left":-$mbanner_width
            },1000,function(){
                var $liclone = $("#c_mbanul > li").eq(0).clone();
                $("#c_mbanul > li").eq(0).remove();
                $("#c_mbanul").css("left","0px");
                $("#c_mbanul").append($liclone);
            });
            if($rb >= $mbanner_ea){
                $rb = 0;
            }
            $rb++;
        },5000)
    }
    setTimeout($.fn.mainroll);

    $("#c_mbanul").bind({
        "swiperight":function(){
            clearTimeout($rbtimer);
            var $liclone = $("#c_mbanul > li").eq($mbanner_ea-1).clone();
            $("#c_mbanul > li").eq($mbanner_ea-1).remove();
            $("#c_mbanul").css("left",-$mbanner_width + "px");
            $("#c_mbanul").prepend($liclone);
            $("#c_mbanul").stop().animate({
                "left": "0px"
            },1000);
            setTimeout($.fn.mainroll,5000);
        },
        "swipeleft":function(){
            clearTimeout($rbtimer);
            $("#c_mbanul").stop().animate({
                "left":-$mbanner_width
            },1000,function(){
                var $liclone = $("#c_mbanul > li").eq(0).clone();
                $("#c_mbanul > li").eq(0).remove();
                $("#c_mbanul").css("left","0px");
                $("#c_mbanul").append($liclone);
            });
            setTimeout($.fn.mainroll,5000);
        }
    })
});