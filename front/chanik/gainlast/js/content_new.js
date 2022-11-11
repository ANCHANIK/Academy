$(function(){
    let $newtime = 0;
    $("#new_title").stop().fadeIn(400);
    setInterval(function(){
        if($newtime%2 == 1){
            $("#new_pd_titles").stop().fadeOut(400);
        }
        else if($newtime%2 == 0){
            $("#new_pd_titles").stop().fadeIn(400);
        }
        $newtime++;
    },10000);
});

let ndata_ea = "";
let newpro = new Vue({
    el:"#new",
    data:{
        narray:[],
        nimg1:"./img/arrow1.png",
        nimg2:"./img/arrow2.png",
    },
    methods:{

    },
    components:{
        
    },
    computed:{
        newproduct(){
            fetch("./new.json").then((nd)=>{
                return nd.json();
            }).then((ndata) => {
                this.narray = ndata.new_product;
                ndata_ea = ndata.new_product.length;
                $.fn.newproll(ndata_ea);
            })
            .catch((error) => {
                console.log("DATA ERROR");
            })
        }
    }
});

$(function(){
    // new_p rolling
    let $nroll;
    let $nrollcount = 0;
    let $nbanner_width;
    let $nbanner_ea = $("#newdisc > li").length; // 4
    $("#newdisc > li").eq(0).css("background-color","#628dc8");
    $.fn.newproll = function(ea){
        let $np_ea = Math.ceil(ea/2); // 4
        $nbanner_width = $("#new_outline").width(); // 360
        $nroll = setInterval(function(){
            $("#new_products").stop().animate({
                "left": -$nbanner_width + 10 + "px"
            },1400,function(){
                var $newclone1 = $("#new_products > #new_products_ul").eq(0).clone();
                var $newclone2 = $("#new_products > #new_products_ul").eq(1).clone();
                $("#new_products_ul").eq(0).remove();
                $("#new_products_ul").eq(0).remove();
                $("#new_products").css("left","0px");
                $("#new_products").append($newclone1);
                $("#new_products").append($newclone2);
            })
            $nrollcount++;
            if($nrollcount >= $np_ea){
                $nrollcount = 0;
            }
            $("#newdisc > li").css("background-color","#ff8679");
            $("#newdisc > li").eq($nrollcount).css("background-color","#628dc8");
        },10000);
    }

    // right button
    $("#nrbtn").click(function(){
        $nbanner_width = $("#new_outline").width(); // 360
        clearInterval($nroll);
        $nrollcount++;
        if($nrollcount >= $nbanner_ea){
            $nrollcount = 0;
        }
        $("#newdisc > li").css("background-color","#ff8679");
        $("#newdisc > li").eq($nrollcount).css("background-color","#628dc8");

        $("#new_products").stop().animate({
            "left": -$nbanner_width + "px"
        },1150,function(){
            var $newclone1 = $("#new_products > #new_products_ul").eq(0).clone();
            var $newclone2 = $("#new_products > #new_products_ul").eq(1).clone();
            $("#new_products").append($newclone1);
            $("#new_products").append($newclone2);
            $("#new_products_ul").eq(0).remove();
            $("#new_products_ul").eq(0).remove();
            $("#new_products").css("left","0px");
        })
        setTimeout($.fn.newproll,10000);
    });

    // left button
    $("#nlbtn").click(function(){
        $nbanner_width = $("#new_outline").width(); // 360
        clearInterval($nroll);
        $nrollcount--;
        if($nrollcount < 0){
            $nrollcount = $nbanner_ea - 1;
        }
        $("#newdisc > li").css("background-color","#ff8679");
        $("#newdisc > li").eq($nrollcount).css("background-color","#628dc8");

        var $newclone1 = $("#new_products > #new_products_ul").eq(7).clone();
        $("#new_products_ul").eq(7).remove();
        var $newclone2 = $("#new_products > #new_products_ul").eq(6).clone();
        $("#new_products_ul").eq(6).remove();
        $("#new_products").css("left",-$nbanner_width + "px");
        $("#new_products").prepend($newclone1);
        $("#new_products").prepend($newclone2);
        $("#new_products").stop().animate({
            "left": "0px"
        },1150)
        setTimeout($.fn.newproll,10000);
    });
});