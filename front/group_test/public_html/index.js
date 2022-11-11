$(function(){
    $(window).scroll(function(){
        var $sct =$(this).scrollTop();
        //console.log($sct);
        $("#float_b").stop().animate({"top": $sct+300+"px"},800); 
    });
});