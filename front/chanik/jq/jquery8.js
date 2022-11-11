$(function(){
    
    $.ajax({
        url:"../../ajax/banner.json",
        cache: false,
        type:"GET",
        dataType:"JSON",
        success:function($data){
            console.log($data);
        },
        error:function(){
            console.log("DATA ERROR");
        }
    });

});