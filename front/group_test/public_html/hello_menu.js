$(function(){
    let $ul,$li1,$li2;
    $.ajax({
        url:"./json/hello_menu.json",
        cache:false,
        type:"GET",
        dataType:"JSON",
        success:function($menu){
            $.fn.$mainmenu($menu)
        },error:function(){
            console.log("DATA ERROR")
        }
    });
    $.fn.$mainmenu = function($menu){
        $ul = "<ul id='main_menu'></ul>"
        $("#menubar").append($ul);
        $.map($menu,function($m_data,$m_node){
            //console.log($menu[$m_node]);
            
            $li1 ="<li link=''>"+$m_data["menus"]+"<ol class='sub_menu'></ol></li>"
            $("#main_menu").append($li1);
            if($menu[$m_node]["cate"]==""){
            $("#main_menu>li:eq("+$m_node+")").attr("link",$menu[$m_node]["cate_link"][0])
        }
            $.map($menu[$m_node]["cate"],function($d,$n){
                
                if($d!=""){
                $li2 ="<li link=''>"+$d+"</li>";
                $("#main_menu>li:eq("+$m_node+")>ol").append($li2);
                }
            });
            $.map($menu[$m_node]["cate_link"],function($dt,$nd){
                  
                 $("#main_menu>li:eq("+$m_node+")>ol>li:eq("+$nd+")").attr("link",$dt);
            
              });
            });
            /*서브 메뉴 슬라이드 */
                $("#main_menu>li").mouseenter(function(){
                   var $node = $(this).index();
                   $("#main_menu>li:eq("+$node+")>ol").stop().slideDown();
                });
                $("#main_menu>li").mouseleave(function(){
                    var $node = $(this).index();
                    $("#main_menu>li:eq("+$node+")>ol").stop().slideUp();
                 });
            /*메뉴 링크 연결 */
            $("#main_menu>li").click(function(){
                    
                var $link = $(this).attr("link")
                if($link!=""){
                location.href=$link;
            }
            });
                 $("#main_menu>li>ol>li").click(function(){
                    
                    var $link = $(this).attr("link")
                    location.href=$link;
                });
        
    }
});