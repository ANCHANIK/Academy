$(function(){
   $.ajax({
      url:"./json/hello_product.json",
      cache:false,
      type:"GET",
      dataType:"JSON",
      success:function($data){
         $.fn.product_add($data["pet_product"]);
         // console.log($data)
      },
      error:function(){
         console.log("DATA ERROR");
      }
   });

   $.fn.product_add = function($pd){
      let $htmls = "";
      for(let $pl in $pd){
         let $pd_img = $pd[$pl]["product_img"];
         let $pd_dc = $pd[$pl]["product_dc"];
         let $pd_info = $pd[$pl]["product_sample"];
         let $pd_price = $pd[$pl]["product_money"];
         let $pd_sale = $pd[$pl]["product_sales"];
         let $pd_name = $pd[$pl]["product_nm"];

         $htmls += `
         <li id="product_li">
            <dl class="shop_product" id="shop_product0">
               <dt>
                  <img src="`+ $pd_img +`">
               </dt>
               <dd class="pd_name" id="pd_name0">`+ $pd_name +`</dd>
               <dd class="pd_info" id="pd_info0">`+ $pd_info +`</dd>
               <dd class="pd_price" id="pd_price0">
                  <span>`+ $pd_price +` 원</span>
                  <!-- label -->
               </dd>
            </dl> 
         </li>
         `;
      }
      $("#shop_product_list").append($htmls)
   }

   let $pli;
   let $pli_ea;
   let $pnode = 0;
   $("#left_btn").click(function(){
      $pli = $("#shop_product_list > li").width();
      $pli_ea = $("#shop_product_list > li").length;
      $("#shop_product_list").stop().animate({
         "left": -$pli - 20 + "px"
      },900,function(){
         let $pli_cl = $("#shop_product_list > li").eq(0).clone();
         $("#shop_product_list").eq(0).append($pli_cl);
         $("#shop_product_list").css("left","0px");
         $("#shop_product_list > li").eq(0).remove();
      });
      $pnode++;
      if($pnode >= $pli_ea){
         $pnode = 0;
      }
   });

   $("#right_btn").click(function(){
      $pli_ea = $("#shop_product_list > li").length;
      $pli = $("#shop_product_list > li").width();
      $pnode++;
      if($pnode >= $pli_ea){
         $pnode = 0;
      }
      let $pli_cl = $("#shop_product_list > li").eq($pli_ea-1).clone();
      $("#shop_product_list > li").eq($pli_ea-1).remove();
      $("#shop_product_list").css("left",-$pli+"px");
      $("#shop_product_list").prepend($pli_cl);
      $("#shop_product_list").stop().animate({
         "left": "0px"
      },900);
   });
});
