$(function(){
   /* 로고 누르면 홈페이지로 이동 */
   $("#top_logo").click(function(){
      location.href = "./index.html";
   });

   /* 클릭하면 그 링크 이동 */
   $("#top_links>li").click(function(){
      var $links = $(this).attr("links");
      if($links == "service"){
         alert("서비스 준비 중입니다.");
      }
      else{
         location.href = $links;
      }
   });
   
   /* 공지사항 말 줄임표 */
   $.ajax({
      url:"./json/notice.json",
      cache:"false",
      type:"GET",
      dataType:"JSON",
      success:function($data){
         let $i=0;
         while($i<4){
            let $info_txt = $data[$i].notice_data;
            let $notice = $info_txt.substr(0,16)+'...';
            $("#top_right_view>li").eq($i).text($notice);
            $("#shop_banners_infos>li").eq($i).text($notice);
            $i++;
         }
      },
      error:function(){
         console("DATA ERROR");
      }
   });

   /* 세로 롤링 */
   var $info_timer;
   var $info_hgt = $("#top_right_view>li").height();
   var $info_ea = $("#top_right_view>li").length;
   $.fn.info = function(){
      $info_timer = setInterval(function(){
         $("#top_right_view").stop().animate({
            "top" : -$info_hgt+"px"
         },700,function(){
            var $clone = $("#top_right_view>li").eq(0).clone();
            $("#top_right_view>li").eq(0).remove();
            $("#top_right_view").css("top", "0px");
            $("#top_right_view").append($clone);
         });
      },5000);
   };
   setTimeout($.fn.info,100);

   /* 버튼 클릭 시, 시간 및 노드 초기화 */
   $("#prev_btn").click(function(){
      clearInterval($info_timer);
      $("#top_right_view").stop().animate({
         "top":-($info_hgt)+"px"
      },500,function(){
         var $clone = $("#top_right_view>li").eq(0).clone();
         $("#top_right_view>li").eq(0).remove();
         $("#top_right_view").css("top","0px");
         $("#top_right_view").append($clone);
      });
   });
   $("#next_btn").click(function(){
      clearInterval($info_timer);
      var $info_ea = $("#top_right_view>li").length;
      var $clone = $("#top_right_view>li").eq($info_ea-1).clone();
      $("#top_right_view>li").eq($info_ea-1).remove();
      $("#top_right_view").prepend($clone);
      $("#top_right_view").css("top",-$info_hgt+"px");
      $("#top_right_view").stop().animate({
         "top":"0px"
      },500)
   });
   // 버튼 호버시 타이머 정지
   $("#noti_btn").bind({
      mouseenter:function(){
        clearTimeout($info_timer);
      },
      mouseleave:function(){
        setTimeout($.fn.info,5000)
      }
   });

   /* footer */
   $("#pop_cpno").click(function(){
      let $sano = "119-86-91245"
      var $sano_val = $sano.replace(/[-]/g, "");
      let $urls = "http://www.ftc.go.kr/bizCommPop.do?wrkr_no=" + $sano_val;
      window.open($urls, "biz", "width=700, height=500,scrollbars=auto");
   });
});