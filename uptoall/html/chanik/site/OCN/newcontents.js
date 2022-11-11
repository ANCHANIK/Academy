$(function(){
   $.ajax({
      url:"./json/new_program.json",
      cache:false,
      type:"GET",
      dataType:"JSON",
      success:function($data){
         /* 배열 구조  → node : {new_pg : "제목", new_thumb : "이미지"} x 16 */
         $.thumbs($data);
      },
      error:function(){
         console.log("DATA ERROR");
      }
   });
   let $glo_data;          // $data를 전역변수화 시킨다
   let $more_ck = "N";     // $click시 더보기 여부를 묻는다

   $.extend({
      thumbs : function($data){
         $glo_data = $data;
         $($data).each(function($n, $v){
            var $keys = Object.keys($data[$n]);
            var $vod_name = $keys[0];
            var $vod_tmb = $keys[1];
            if($more_ck == "N"){
               // console.log($more_ck);
               $(".main_new_vod_list>li:eq("+$n+")>img").attr("src", $v[$vod_tmb]);
               $(".main_new_vod_list>li:eq("+$n+")>span").text($v[$vod_name]);
            } else if($more_ck == "Y"){
               if($n >= 8){
                  $(".main_new_vod_list>li:eq("+($n-8)+")>img").attr("src", $v[$vod_tmb]);
                  $(".main_new_vod_list>li:eq("+($n-8)+")>span").text($v[$vod_name]);
               } 
            }
         });
      }
   });
   
   /* 핸들링 함수 */
   $("#new_more").click(function(){
      if($more_ck == "N"){
         $more_ck = "Y";
      } else {
         $more_ck = "N";
      }
      // console.log($more_ck);
      $.thumbs($glo_data);
   });

   $("#main_top_contents>li").bind({
      mouseenter : function(){
         var $num = $(this).index();
         $("#main_top_contents>li:eq("+$num+")>label").stop().fadeIn(500);
      },
      mouseleave : function(){
         var $num = $(this).index();
         $("#main_top_contents>li:eq("+$num+")>label").stop().fadeOut();
      }
   });

   $("#main_new_vod_list>li").bind({
      mouseenter : function(){
         var $num = $(this).index();
         $("#main_new_vod_list>li:eq("+$num+")>span").stop().fadeIn(500);
      },
      mouseleave : function(){
         var $num = $(this).index();
         $("#main_new_vod_list>li:eq("+$num+")>span").stop().fadeOut();
      }
   });

   $("#main_bot_list_pics>li").bind({
      mouseenter : function(){
         var $num = $(this).index();
         $("#main_bot_list_pics>li:eq("+$num+")>img").attr("src", "./contents/mini"+($num+1)+"-color.png");
      },
      mouseleave : function(){
         var $num = $(this).index();
         $("#main_bot_list_pics>li:eq("+$num+")>img").attr("src", "./contents/mini"+($num+1)+"-black.png");
      }
   });
});