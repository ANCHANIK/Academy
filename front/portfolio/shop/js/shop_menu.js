$(function(){
    let $node_num = 0;
    $(".main_menu_title > span").bind({
        "mouseenter":function(){
            let $menu_node = $(this).index();
            $(".main_menu_title > span > ul").eq($menu_node).css("display","block");
        },
        "mouseleave":function(){
            $(".main_menu_title > span > ul").css("display","none");
        }
    });

    while($node_num < 6){
        $("#main_menu_hover"+ $node_num +" > li").bind({
            "mouseenter":function(){
                let $hover_node = $(this).index();
                $(this).css("background-color","rgba(0,0,0,0.82)");
                $(this).css("color","yellow");
            },
            "mouseleave":function(){
                $(this).css("background-color","rgba(0,0,0,0.6)");
                $(this).css("color","white");
            },
        });
        $node_num++;
    }

    $("#main_menu_QNA").click(function(){
        alert("서비스 준비중입니다.");
    })
});