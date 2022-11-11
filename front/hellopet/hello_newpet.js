$(function(){
   $.ajax({
      url:"./json/hello_newpet.json",
      cache:false,
      type:"GET",
      dataType:"JSON",
      success:function($data){
         $.fn.newpets($data);
      },
      error:function(){
         alert("DATA ERROR")
      }
   });

   $.fn.newpets = function($pets){
      let $html = "";
      $($pets).each(function($n, $v){
         let $pname = $pets[$n]["pet_title"];
         let $pinfo = $pets[$n]["pet_explanation"];
         let $pimg = $pets[$n]["pet_img"];

         $html = '<div class="new_pet_pic" id="new_pet_pic">\
                     <img src='+$pimg+'>\
                     <div class="new_pet_black" id="new_pet_black'+$n+'">\
                        <span id="pet_title">'+$pname+'</span>\
                        <span id="pet_info">'+$pinfo+'</span>\
                        <label><img src="./newpets/screen.svg"></label>\
                        <label><img src="./newpets/heart.svg"></label>\
                        <label><img src="./newpets/bag.svg"></label>\
                     </div></div>';
         $("#new_pets_list>li").eq($n).append($html);
      });

      /* 마우스 오버 시, 블랙스크린 */
      $("#new_pets_list>li").bind({
         mouseover : function(){
            let $node = $(this).index();
            $("#new_pet_black"+$node).css("display", "block");
         },
         mouseleave : function(){
            let $node = $(this).index();
            $("#new_pet_black"+ $node).css("display", "none");
         }
      });
   }

   /* 마우스 오버 시 메뉴 변화 */
   $("#hello_newpets_menu>ul>li").bind({
      mouseover : function(){
         let $node = $(this).index();
         $("#hello_newpets_menu>ul>li").eq($node).css({
            "background-color" : "coral",
            "color" : "white"
         });
      },
      mouseleave : function(){
         let $node = $(this).index();
         $("#hello_newpets_menu>ul>li").eq($node).css({
            "background-color" : "",
            "color" : ""
         });
      }
   });
});