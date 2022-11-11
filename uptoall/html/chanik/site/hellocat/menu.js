$(function(){
    $("#main_menu>li").mouseenter(function(){
       var $node = $(this).index();
       $("#main_menu>li:eq("+$node+")>ol").stop().slideDown();
    });
    $("#main_menu>li").mouseleave(function(){
        var $node = $(this).index();
        $("#main_menu>li:eq("+$node+")>ol").stop().slideUp();
     });
});