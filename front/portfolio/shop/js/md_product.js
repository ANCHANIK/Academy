$(function(){

    var $md_timer;
    let $mdpro_width = $("#mdpick_product_img_ul > li").width();
    $.fn.mdpro = function(){
        $("#mdpick_product_img_ul").stop().animate({
            "left": - $mdpro_width + "px"
        },600,function(){
            var $an_li = $("#mdpick_product_img_ul > li").eq(0).clone();
            $("#mdpick_product_img_ul").append($an_li);
            $("#mdpick_product_img_ul > li").eq(0).remove();
            $("#mdpick_product_img_ul").css("left","0px");
        });
        $md_timer = setTimeout($.fn.mdpro,5000);
    }
    $md_timer = setTimeout($.fn.mdpro,5000);

    $("#top_logo_search_ad").bind({
        "mouseleave":function(){
            $md_timer = setTimeout($.fn.mdpro,5000);
        },
        "mouseenter":function(){
            clearTimeout($md_timer);
        }
    });

    $("#l_btn").bind({
        "click":function(){
            var $node = $("#mdpick_product_img_ul > li").length;
            var $an_li = $("#mdpick_product_img_ul > li").eq($node-1).clone();
            $("#mdpick_product_img_ul").css("left",- $mdpro_width +"px");
            $("#mdpick_product_img_ul").prepend($an_li);
                $("#mdpick_product_img_ul > li").eq($node).remove();
            $("#mdpick_product_img_ul").stop().animate({
                "left":"0px"
            },600);
        }
    });

    $("#r_btn").bind({
        "click":function(){
            $("#mdpick_product_img_ul").stop().animate({
                "left":-$mdpro_width + "px"
            },600,function(){
                var $an_li = $("#mdpick_product_img_ul > li").eq(0).clone();
                $("#mdpick_product_img_ul").append($an_li);
                $("#mdpick_product_img_ul > li").eq(0).remove();
                $("#mdpick_product_img_ul").css("left","0px");
            });
        }
    });
});