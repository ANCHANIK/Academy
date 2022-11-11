//배너 json 파일가져오기
$(function(){
    $.ajax({
       url:"../json/hello_banner.json",
       cache:false,
       type:"GET",
       dataType:"JSON",
       success:function($data){
             console.log($data);
             $.fn.html_make($data);
       },
       error:function(){
             console.log("data error");
       }
    });
 
    //배너 확장함수 부분
    let $banner_ea =0; 
    $.fn.html_make = function($array){
       
       $($array["banners"]).each(function($node,$name){
             $banner_ea = $array["banners"].length;
             //console.log($banner_ea);//콘솔출력 4개
             //console.log($name)       
             $("#top_menu_banner").append("<li><img src='"+ $name[0] +"'></li>");
             $("#disc").append("<li></li> ");
             console.log($name)
             
       });
             //디스크 클릭 부분
             $("#disc>li").bind({
                "mouseenter":function(){
                   clearTimeout($timer);
                },
                "click":function(){
                   $("#disc>li").css("background-color","black");
                   $("#top_menu_banner>li").eq($no).fadeOut();
                   $no = $(this).index();
                   $("#top_menu_banner>li").eq($no).fadeIn();
                   $("#disc>li").eq($no).css("background-color","red");
                }
          });
    }
    
    //배너 애니매이션 (5초에 한번씩 작동)
    let $timer;
    let $no=0;
 
    $.fn.times = function(){
       $timer = setTimeout(function(){
          //console.log($no)
                $("#top_menu_banner>li").eq($no).fadeOut();
                $("#disc>li").css("background-color","black");
                $no++;
                if($no >= $banner_ea){       
                   $no=0;
                }
                $("#top_menu_banner>li").eq($no).fadeIn();
                $("#disc>li").eq($no).css("background-color","red");
             },3000);
             $timer = setTimeout($.fn.times,3000);
    }
    $.fn.times();

    //로고타이머
    let $logo_timer;
    var $logo_no = 1;

    $.fn.logos = function(){
       $logo_timer = setInterval(function(){
          if($logo_no > 1){
             $logo_no = 0;
            }
            $("#top_logo_ul>li").fadeOut(500);
            $("#top_logo_ul>li").eq($logo_no).fadeIn(500);
            
            $logo_no += 1;
            //console.log($logo_no)

       },10000);
    }
    setTimeout($.fn.logos);
 
    //배너 버튼  
    $("#top_menu_body").bind({
       "mouseenter":function(){
             $("#left").fadeIn();
             $("#right").fadeIn();
             clearTimeout($timer);
       },
       "mouseleave":function(){
             $("#left").fadeOut();
             $("#right").fadeOut();
       }
    });
 
    //배너 오른쪽 버튼클릭
    $("#right").click(function(){
       clearTimeout($timer)
       $("#top_menu_banner>li").eq($no).fadeOut();
                $("#disc>li").css("background-color","black");
                $no++;
                if($no >= $banner_ea){
                   $no=0;
                }
                $("#top_menu_banner>li").eq($no).fadeIn();
                $("#disc>li").eq($no).css("background-color","red");
    });
 
    //배너 왼쪽 버튼 클릭
    $("#left").click(function(){
       clearTimeout($timer)
       $("#top_menu_banner>li").eq($no).fadeOut();
                $("#disc>li").css("background-color","black");
                $no--;                  
                if($no < 0){            
                   $no = $banner_ea-1; 
                }
                $("#top_menu_banner>li").eq($no).fadeIn();
                $("#disc>li").eq($no).css("background-color","red");
    });
 
    $("#top_menu_body").mouseleave(function(){
       //console.log("test") 
       $timer = setTimeout($.fn.times,5000);
    });
 
     $("#black_close").click(function(){
       //console.log("test")
       $("#black").css("display","none");       
     });
     $("#hamburger").click(function(){
       //console.log("test")
       $("#black").css("display","inline-block");       
     });
 });
 