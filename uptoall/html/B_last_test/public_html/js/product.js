let p_vue = new Vue({
   el:"#shop_product",
   data:{
   array:[],
   array2:[]
   },
   methods:{
      product_list(data){
         this.array = data["best_product"];
         var ea = data["best_product"].length;
         document.getElementById("p_list").style.width=(210 + 30)*ea +"px"
      },
      left(){
         $.fn.left();
      },
      right(){
         $.fn.right();
      },
      product_list2(data2){
         let p;
         for(p in data2.week){
            if(data2.week[p]["sale_money"]==0){
                  data2.week[p]["sale_money"]=data2.week[p]["product_money"];
                  data2.week[p]["product_money"]=""
                  this.array2.push({
                     p_nm:data2.week[p]["product_nm"],
                     p_img:data2.week[p]["product_img"],
                     p_sample:data2.week[p]["product_sample"],
                     p_money:data2.week[p]["product_money"].toLocaleString(),
                     p_sale:data2.week[p]["sale_money"].toLocaleString()
                  });
            }
            else{
               this.array2.push({
                  p_nm:data2.week[p]["product_nm"],
                  p_img:data2.week[p]["product_img"],
                  p_sample:data2.week[p]["product_sample"],
                  p_money:data2.week[p]["product_money"].toLocaleString()+"원",
                  p_sale:data2.week[p]["sale_money"].toLocaleString()
               });
            }
         }
      }
   },
   components:{

   },
   computed:{
      products(){
         fetch("./json/best_product.json").then(function(response){
            return response.json()
         }).then((data)=>{
            p_vue.product_list(data)
         }).catch(function(error){
            console.log("data error")
         })
      },
      products2(){
         fetch("./json/week_product.json").then(function(response2){
            return response2.json()
         }).then((data2)=>{
            p_vue.product_list2(data2);
   
         }).catch(function(error2){
            console.log("data error")
         })
      }
   }
})

$(function(){
     //best롤링
var $b_timer=0; 
$.fn.best = function(){
   var $b_width = $("#p_list>li").width();
    $b_timer=0; //setIntetval을 새롭게 적용하기 위해서 초기화 시킴
$b_timer = setInterval(function(){
   $("#p_list").stop().animate({"left":-($b_width+15)+"px"},800,function(){
      var $b_clone = $("#p_list>li").eq(0).clone();
      $("#p_list>li").eq(0).remove();
      $("#p_list").css("left","0px");
      $("#p_list").append($b_clone);
   })
   },5000);
}
setTimeout($.fn.best,1000);

 $("#btnl").bind({
    mouseenter:function(){
      clearTimeout($b_timer);
    },
    mouseleave:function(){
      setTimeout($.fn.best,5000)
    }
 });
 $("#btnr").bind({
   mouseenter:function(){
     clearTimeout($b_timer);
   },
   mouseleave:function(){
      setTimeout($.fn.best,5000)
   }
})


   $.fn.left=function(){
      var $width = $("#p_list>li").width();
      var $ea = $("#p_list>li").length;
      var $clone = $("#p_list>li").eq($ea-1).clone();
      $("#p_list>li").eq($ea-1).remove();
      $("#p_list").prepend($clone);
      $("#p_list").css("left",-($width+15)+"px");
      $("#p_list").stop().animate({"left":"3px"},800)
 }
 $.fn.right=function(){
     var $width = $("#p_list>li").width();
      $("#p_list").stop().animate({"left":-($width+15)+"px"},800,function(){
     var $clone = $("#p_list>li").eq(0).clone();
     $("#p_list>li").eq(0).remove();
     $("#p_list").css("left","0px");
     $("#p_list").append($clone);
  })
  }
  //insta 롤링

var $timer; 
var $p_width = $("#p_insta_ul>li").width();
$.fn.auto = function(){
    $timer=0; //setIntetval을 새롭게 적용하기 위해서 초기화 시킴
$timer = setInterval(function(){
    $("#p_insta_ul").stop().animate({"left":-($p_width+30)+"px"},800,function(){
        var $cp = $("#p_insta_ul>li").eq(0).clone();
        $("#p_insta_ul>li").eq(0).remove();
        $("#p_insta_ul").append($cp);
        $("#p_insta_ul").css("left","0px");
    });
   },8000);
}
setTimeout($.fn.auto,500);
});