$(document).ready(function(){
    let $no=0;
    let $timer;
    
    var $banner_ea = $("#mainbanner>li").length; 
    //console.log($banner_ea); 4개인걸 확인했지

    $.fn.times = function(){
            $timer = setTimeout(function(){
                console.log($no)
                    $("#mainbanner>li").eq($no).fadeOut();
                    $no++;
                    if($no >= $banner_ea){       
                        $no=0;
                    }
                    $("#mainbanner>li").eq($no).fadeIn();
                },5000);
                $timer = setTimeout($.fn.times,5000);
        }
        $.fn.times();


    $("#right").click(function(){
            //clearTimeout($timer)
            $("#mainbanner>li").eq($no).fadeOut();
                    $no++;
                    if($no >= $banner_ea){
                        $no=0;
                    }
                    $("#mainbanner>li").eq($no).fadeIn();
        });

    $("#left").click(function(){
        //clearTimeout($timer)
        $("#mainbanner>li").eq($no).fadeOut();
                $no--;                  
                if($no < 0){           
                    $no = $banner_ea-1; 
                }
                $("#mainbanner>li").eq($no).fadeIn();
    });
    
});