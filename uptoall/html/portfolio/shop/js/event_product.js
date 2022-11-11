$(function(){
    $.fn.eventB = function(){
        let $etitme;
        let $e_count = 0;
        let $e_banner_ea = $("#event_banner > li").length;
        let $e_banner_width = $("#event_banner > li").width();
        $etitme = setInterval(function(){
            $e_count++;
            if($e_count >= $e_banner_ea){
                $e_count = 0;
            }
            $("#event_banner").stop().animate({
                "left":-($e_banner_width * $e_count)
            },1300)
        },6000)
    }
    setTimeout($.fn.eventB,0);

    $("#goyoutube").click(function(){
        window.open("https://www.youtube.com/watch?v=CmBce7ZTMuo","","width=600 height=500");
    });
});

function gotube(){
    window.open("https://www.youtube.com/watch?v=C1osQlfEwfo","","width=600 height=500");
}