$(function(){
    let $effect = eff;
    $.get("./admin/admin_banner.json?v="+nos,function(badata){
    })
    .done(function($badata){
        // F : fade, R : rolling
        if($effect == "F"){
            $(".shop_banner_aside_Fade").css("display","block");
            $.fn.fadeins($badata);
        }
        else {
            $(".shop_banner_aside_Rolling").css("display","block");
            $.fn.rollings($badata);
        }
    })
    .fail(function(error){
        console.log("DATA ERROR");
    })
    
    // ----------------------------------------- Fade In / Out -------------------------------------- 
    $.fn.fadeins = function($blist){
        for(let $bea in $blist){
            let $bimg = "<img src="+ $blist[$bea]["bimg"] +">";
            let $li = "<li title='"+ $blist[$bea]["bname"] +"'>"+ $bimg +"</li>";
            let $disc_li = "<li></li>";
            $("#fade_banner").append($li);
            $("#fade_banner_disc").append($disc_li);
        }
        $("#fade_banner > li").eq(0).stop().fadeIn(500);
        var $ftimer;
        let $f_count = 0;
        let $banner_ea = $("#fade_banner > li").length;  // banner ea : 3
        
        $.fn.fade = function(){
            $ftimer = setInterval(function(){
                $("#fade_banner_disc > li").css("background-color","black");
                $("#fade_banner > li").eq($f_count).stop().fadeOut(700);
                // console.log($f_count)
                $f_count++;
                if($f_count >= $banner_ea){
                    $f_count = 0;
                }
                $("#fade_banner > li").eq($f_count).stop().fadeIn(1400);
                $("#fade_banner_disc > li").eq($f_count).css("background-color","crimson");
            },6000)
        }
        $ftimer = setTimeout($.fn.fade,1000);
// ----------------------------- mouse enter / leave -------------------------------
        $(".shop_banner_aside_Fade").bind({
            "mouseenter":function(){
                clearInterval($ftimer);
                $(".main_banner_fade_button > span").eq(0).stop().animate({
                    "margin-left":"7%",
                    "opacity":"1"
                },600);
                $(".main_banner_fade_button > span").eq(1).stop().animate({
                    "margin-right":"7%",
                    "opacity":"1"
                },600);
            },
            "mouseleave":function(){
                setTimeout($.fn.fade,1000);
                $(".main_banner_fade_button > span").eq(0).stop().animate({
                    "margin-left":"4%",
                    "opacity":"0"
                },600);
                $(".main_banner_fade_button > span").eq(1).stop().animate({
                    "margin-right":"4%",
                    "opacity":"0"
                },600);
            }
        });
// ---------------------------- click (좌 - 우) & disc -------------------------------
            // left button
        $(".main_banner_fade_button > span").eq(0).click(function(){
            clearInterval($ftimer);
            $("#fade_banner > li").eq($f_count).fadeOut();
            $("#fade_banner_disc > li").css("background-color","black");
            $f_count--;
            if($f_count < 0){       
                $f_count = $banner_ea-1;
            }
            $("#fade_banner > li").eq($f_count).fadeIn();
            $("#fade_banner_disc > li").eq($f_count).css("background-color","crimson");
        });
            // right button
        $(".main_banner_fade_button > span").eq(1).click(function(){
            clearInterval($ftimer);
            $("#fade_banner > li").eq($f_count).fadeOut();
            $("#fade_banner_disc > li").css("background-color","black");
            $f_count++;
            if($f_count >= $banner_ea){       
                $f_count = 0;
            }
            $("#fade_banner > li").eq($f_count).fadeIn();
            $("#fade_banner_disc > li").eq($f_count).css("background-color","crimson");
        });
            // disc 버튼
        $("#fade_banner_disc > li").click(function(){
            let $disc_node = $(this).index();
            clearInterval($ftimer);
            $("#fade_banner > li").fadeOut();
            $("#fade_banner_disc > li").css("background-color","black");
            $("#fade_banner > li").eq($disc_node).fadeIn();
            $("#fade_banner_disc > li").eq($disc_node).css("background-color","crimson");
        });
    };

    // -------------------------------------------------- Rolling Banner ---------------------------------------------------
    $.fn.rollings = function($blist){
        for(let $bea in $blist){
            let $bimg = "<img src="+ $blist[$bea]["bimg"] +">";
            let $li = "<li title='"+ $blist[$bea]["bname"] +"'>"+ $bimg +"</li>";
            let $disc_li = "<li></li>";
            $("#rolling").append($li);
            $(".main_banner_rolling_disc_ul").append($disc_li);
        }

        $(".main_banner_rolling_disc_ul > li").eq(0).css("height","32px");

        let $r_count = 0;
        let $rbanner_h = $("#rolling > li").height();
        let $rbanner_ea = $("#rolling > li").length;
        let $rtimer;

        $.fn.roll = function(){
            $rtimer = setInterval(function(){
                if($r_count < $rbanner_ea){
                    $("#rolling").stop().animate({
                        "top": -($rbanner_h * $r_count)
                    },700);
                    switch ($r_count){
                        case 0:
                            $(".main_banner_rolling_disc_ul > li").eq($r_count+2).stop().animate({
                                "height":"8px"
                            },700);
                            $(".main_banner_rolling_disc_ul > li").eq($r_count).stop().animate({
                                "height": "32px"
                            },700);
                        break;
                        case 1:
                            $(".main_banner_rolling_disc_ul > li").eq($r_count-1).stop().animate({
                                "height": "8px"
                            },700);
                            $(".main_banner_rolling_disc_ul > li").eq($r_count).stop().animate({
                                "height": "32px"
                            },700);
                            $(".main_banner_rolling_disc_ul > li").eq($r_count+2).stop().animate({
                                "height": "8px"
                            },700);
                        break;
                        case 2:
                            $(".main_banner_rolling_disc_ul > li").eq($r_count-1).stop().animate({
                                "height": "8px"
                            },700);
                            $(".main_banner_rolling_disc_ul > li").eq($r_count).stop().animate({
                                "height": "32px"
                            },700);
                        break;
                    }
                }
                $r_count++
                if($r_count >= $rbanner_ea){
                    $r_count = 0;
                }
            },8000);
        }
        $rtimer = setTimeout($.fn.roll,1000);

        $(".shop_banner_aside_Rolling").bind({
            "mouseenter":function(){
                clearTimeout($rtimer);
                $rtimer = 0;
                $("#roll_button").eq(0).stop().animate({
                    "opacity":"1",
                    "left":"15px"
                },300);
                // $("#roll_button").eq(1).stop().animate({
                //     "opacity":"1",
                //     "bottom":"80px"
                // },600);
            },
            "mouseleave":function(){
                setTimeout($.fn.roll);
                $("#roll_button").eq(0).stop().animate({
                    "left":"0px",
                    "opacity":"0"
                },300);
                // $("#roll_button").eq(1).stop().animate({
                //     "bottom":"40px",
                //     "opacity":"0"
                // },600);
            }
        });
    // //---------------------- click (좌 - 우) & disc --------------------------
    //         // left button
        $("#roll_button > li").eq(0).click(function(){
            clearTimeout($rtimer);
            $rtimer = "";
            $r_count--;
            if($r_count < 0){       
                $r_count = $rbanner_ea-1;
            }
            $(".main_banner_rolling_disc_ul > li").eq($r_count).stop().animate({
                "height": "32px",
            },700);
            $(".main_banner_rolling_disc_ul > li").eq($r_count-1).stop().animate({
                "height": "8px"
            },700);
            $(".main_banner_rolling_disc_ul > li").eq($r_count-2).stop().animate({
                "height": "8px"
            },700);
            $("#rolling").stop().animate({
                "top": -($rbanner_h * $r_count)
            },700);
        });
        // right button
        $("#roll_button > li").eq(1).click(function(){
            clearTimeout($rtimer);
            $rtimer = "";
            $r_count++;
            if($r_count > $rbanner_ea-1){       
                $r_count = 0;
            }
            $(".main_banner_rolling_disc_ul > li").eq($r_count).stop().animate({
                "height": "32px",
            },700);
            $(".main_banner_rolling_disc_ul > li").eq($r_count-1).stop().animate({
                "height": "8px"
            },700);
            $(".main_banner_rolling_disc_ul > li").eq($r_count-2).stop().animate({
                "height": "8px"
            },700);
            $("#rolling").stop().animate({
                "top": -($rbanner_h * $r_count)
            },700);
        });
        // disc button
        $(".main_banner_rolling_disc_ul > li").click(function(){
            clearTimeout($rtimer);
            $rtimer = "";
            let $r_node = $(this).index();
            switch ($r_node){
                case 0:
                    $(".main_banner_rolling_disc_ul > li").eq($r_node).stop().animate({
                        "height": "32px",
                    },700);
                    $(".main_banner_rolling_disc_ul > li").eq($r_node+1).stop().animate({
                        "height": "8px"
                    },700);
                    $(".main_banner_rolling_disc_ul > li").eq($r_node+2).stop().animate({
                        "height": "8px"
                    },700);
                    $("#rolling").stop().animate({
                        "top": -($rbanner_h * $r_node)
                    },700);
                break;
                case 1:
                    $(".main_banner_rolling_disc_ul > li").eq($r_node-1).stop().animate({
                        "height": "8px"
                    },700);
                    $(".main_banner_rolling_disc_ul > li").eq($r_node).stop().animate({
                        "height": "32px"
                    },700);
                    $(".main_banner_rolling_disc_ul > li").eq($r_node+1).stop().animate({
                        "height": "8px"
                    },700);
                    $("#rolling").stop().animate({
                        "top": -($rbanner_h * $r_node)
                    },700);
                break;
                case 2:
                    $(".main_banner_rolling_disc_ul > li").eq($r_node-1).stop().animate({
                        "height": "8px"
                    },700);
                    $(".main_banner_rolling_disc_ul > li").eq($r_node-2).stop().animate({
                        "height": "8px"
                    },700);
                    $(".main_banner_rolling_disc_ul > li").eq($r_node).stop().animate({
                        "height": "32px"
                    },700);
                    $("#rolling").stop().animate({
                        "top": -($rbanner_h * $r_node)
                    },700);
                break;
            }
        });
    }
});
