$(function(){
    var $ck=0;
    
    $("#sidebanner_label").click(function(){
        $ck++;
            $("#sidebanner_label").stop().animate({
                "width":"230px"
            },1000);
            
            $("#sidebanner_divcass").stop().animate({
                "width":"200px"
            },1000);
    
        if($ck==2){
            $("#sidebanner_label").stop().animate({
                "width":"30px"
            },1000);
            
            $("#sidebanner_divcass").stop().animate({
                "width":"0"
            },1000);
            
            $ck=0;
        }console.log($ck)
    });
    
    var $sidebanner;
    var $html="";
    
    for($sidebanner=0; $sidebanner<27; $sidebanner++){
        $html+= "<span></span>";
    } 
    $("#sidebanner_divcass").append($html);
    });