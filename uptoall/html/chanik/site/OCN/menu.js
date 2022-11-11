$(function(){
    
    let $html1; 
    let $html2;
    let $link;
    $.ajax({
        url:"./json/menu.json", 
        cache:false,
        type:"GET",
        dataType:"JSON", 
        success:function($menu){ 
            $.fn.$menubar($menu)
        },error:function(){
            console.log("Data Error")
        }
    });
    $.fn.$menubar =function($menu){
        let $html = "<ul class='menu_list' id='menu_list'></ul>"
        $("#menu_bar").append($html);
        $.map($menu,function($menu_d,$menu_n){
            $html1 = "<li>"+$menu_d["main_menu"]+"<ol class='sub_list' id='sub_list'></ol></li>";
            $("#menu_list").append($html1);
            $.map($menu[$menu_n]["menu_list"],function($d,$n){
                //console.log($d);
                $html2 ="<li link=''>"+$d+"</li>";
                $("#menu_list>li:eq("+$menu_n+")>ol").append($html2);
            });
            $.map($menu[$menu_n]["menu_link"],function($dt,$nd){
              //  console.log($dt);
               $("#menu_list>li:eq("+$menu_n+")>ol>li:eq("+$nd+")").attr("link",$dt);
            });
            
        });
        //소메뉴 에니메이션
        $("#menu_list>li").mouseenter(function(){
           var $node = $(this).index();
           $("#menu_list>li:eq("+$node+")>ol").stop().slideDown();
        });
        $("#menu_list>li").mouseleave(function(){
            var $node = $(this).index();
            $("#menu_list>li:eq("+$node+")>ol").stop().slideUp();
         });

         //소메뉴 사이트 이동
         $("#menu_list>li>ol>li").click(function(){
             //$node = $(this).index();
             $link = $(this).attr("link")
             //console.log($link);
             location.href=$link;
         });
    };

    //BI 클릭시 사이트 이동
    $("#ocn_logo").click(function(){
        location.href="http://ocn.tving.com";
    });
    
});
