$(function(){
   var $main_timer;
   let $bn_ea = $("#shop_banners_images>li").length;
   var $bn_node = 0;

   /* 메인 배너 자동으로 이동 */
   $.fn.main_auto = function(){
      $main_timer = setInterval(function(){
         $("#shop_banners_images>li").eq($bn_node).stop().fadeOut();
         $bn_node++;
         if($bn_node > $bn_ea-1){
            $bn_node = 0;
         }
         $("#shop_banners_images>li").eq($bn_node).stop().fadeIn();
      }, 8000);
   }
   $.fn.main_auto();


   /* 사이드 배너 자동으로 이동 */
   var $side_timer;
   let $sd_wd = $("#shop_side_banner>li").width();
   var $sd_node = 0;

   $.fn.side_auto = function(){
      $side_timer = setInterval(function(){
         $sd_node++;
         if($sd_node == 2){
            $sd_node = 0;
         }
         $("#shop_side_banner").stop().animate({
            "left":-($sd_wd * $sd_node)+"px"
         },1000);
      }, 10000);
   }
   $.fn.side_auto();
});

