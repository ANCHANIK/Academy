$(function(){
   $.ajax({
      url:"./json/hello_product.json",
      cache:false,
      type:"GET",
      dataType:"JSON",
      success:function($data){
         $.fn.product_add($data["pet_product"]);
      },
      error:function(){
         alert("DATA ERROR");
      }
   });

   $.fn.product_add = function($pd){
/* 
<dl class="shop_product">
   <!-- span -->
   <dt>
      <!-- img -->
   </dt>
   <dd class="pd_name"></dd>
   <dd class="pd_info"></dd>
   <dd class="pd_price">
      <span></span>
      <!-- label -->
   </dd>
</dl> 
*/
      $($pd).each(function($n, $v){
         let $pd_img = $pd[$n]["product_img"];
         let $pd_dc = $pd[$n]["product_dc"];
         let $pd_info = $pd[$n]["product_sample"];
         let $pd_price = $pd[$n]["product_money"];
         let $pd_sale = $pd[$n]["product_sales"];
         let $pd_name = $pd[$n]["product_nm"];

         $("#shop_product"+$n).append()
         $("#pd_name"+$n).val();
         $("#pd_info"+$n).val();
         $("#pd_price"+$n).val();
      });
   }
});
/* 
$html = '
<dl class="shop_product" id="shop_product">\
<dt><img src='+$pd[$n]["product_img"]+'>\
<span>'+$pd[$n]["product_dc"]+'</span></dt>\
<dd class="product_name" id="product_name">'+$pd[$n]["product_nm"]+'</dd>\
<dd class="product_info" id="product_info">'+$pd[$n]["product_sample"]+'</dd>\
<dd><span class="sale_price" id="sale_price"><s>'+$pd[$n]["product_money"]+'</s></span>\
<span class="price" id="price">'+$pd[$n]["product_sales"]+'</span></dd></dl>';
*/

/* 

"product_nm":"펫케어 춤추는생선 캣닢향<br>고양이 쿠션 장난감",
"product_img":"./product/product4.jpg",
"product_sample":"교체용 커버사용",
"product_money":"20,000",
"product_sales":"16,000",
"product_dc":"20%"

*/