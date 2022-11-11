$(function(){
    let $weektime = 0;
    $("#a_mwtitle").stop().fadeIn(400);
    setInterval(function(){
        if($weektime%2 == 1){
            $("#pd_titles").stop().fadeOut(400);
        }
        else if($weektime%2 == 0){
            $("#pd_titles").stop().fadeIn(400);
        }
        $weektime++;
    },10000);


});
let wdata_ea = "";

let weekpro = new Vue({
    el:"#week",
    data:{
        warray:[],
        wimg1:"./img/arrow1.png",
        wimg2:"./img/arrow2.png"

    },
    methods:{

    },
    components:{
        
    },
    computed:{
        weekproduct(){
            fetch("./best.json").then((wd)=>{
                return wd.json();
            }).then((wdata) => {
                this.warray = wdata.best_product;
                wdata_ea = wdata.best_product.length;
                $.fn.weekproll(wdata_ea);
            })
            .catch((error) => {
                console.log("DATA ERROR");
            })
        }
    }
});

$(function(){
    // week_p rolling
    let $wroll;
    let $wrollcount = 0;
    let $wbanner_width;
    let $wbanner_ea = $("#weekdisc > li").length; // 4
    $("#weekdisc > li").eq(0).css("background-color","#628dc8");
    $.fn.weekproll = function(ea){
        $wbanner_width = $("#productoutline").width(); // 360
        let $wp_ea = Math.ceil(ea/2); // 4
        $wroll = setInterval(function(){
            $("#products").stop().animate({
                "left": -$wbanner_width + 10 + "px"
            },1400,function(){
                var $weekclone1 = $("#products > #products_ul").eq(0).clone();
                var $weekclone2 = $("#products > #products_ul").eq(1).clone();
                $("#products_ul").eq(0).remove();
                $("#products_ul").eq(0).remove();
                $("#products").css("left","0px");
                $("#products").append($weekclone1);
                $("#products").append($weekclone2);
            });
            $wrollcount++;
            if($wrollcount >= $wp_ea){
                $wrollcount = 0;
            }
            $("#weekdisc > li").css("background-color","#ff8679");
            $("#weekdisc > li").eq($wrollcount).css("background-color","#628dc8");
        },10000);
    }
    
    // right button
    $("#wrbtn").click(function(){
        $wbanner_width = $("#productoutline").width(); // 360
        clearInterval($wroll);
        $wrollcount++;
        if($wrollcount >= $wbanner_ea){
            $wrollcount = 0;
        }
        $("#weekdisc > li").css("background-color","#ff8679");
        $("#weekdisc > li").eq($wrollcount).css("background-color","#628dc8");

        $("#products").stop().animate({
            "left": -$wbanner_width + "px"
        },1150,function(){
            var $weekclone1 = $("#products > #products_ul").eq(0).clone();
            var $weekclone2 = $("#products > #products_ul").eq(1).clone();
            $("#products").append($weekclone1);
            $("#products").append($weekclone2);
            $("#products_ul").eq(0).remove();
            $("#products_ul").eq(0).remove();
            $("#products").css("left","0px");
        })
        setTimeout($.fn.weekproll,10000);
    });

    // left button
    $("#wlbtn").click(function(){
        $wbanner_width = $("#productoutline").width();
        clearInterval($wroll);
        $wrollcount--;
        if($wrollcount < 0){
            $wrollcount = $wbanner_ea - 1;
        }
        $("#weekdisc > li").css("background-color","#ff8679");
        $("#weekdisc > li").eq($wrollcount).css("background-color","#628dc8");

        var $weekclone1 = $("#products > #products_ul").eq(7).clone();
        $("#products_ul").eq(7).remove();
        var $weekclone2 = $("#products > #products_ul").eq(6).clone();
        $("#products_ul").eq(6).remove();
        $("#products").css("left",-$wbanner_width + "px");
        $("#products").prepend($weekclone1);
        $("#products").prepend($weekclone2);
        $("#products").stop().animate({
            "left": "0px"
        },1150)
        setTimeout($.fn.weekproll,10000);
    });
});