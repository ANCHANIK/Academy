$(function(){

    $.ajax({
        url:"./product.json",
        cache:false,
        data:"GET",
        dataType:"json",
        success:function($data){
            $.products($data);
        },
        error:function(){
            console.log("DATA ERROR");
        }
    });


    $.extend({
        products:function($data){
            // console.log($data["product"].length); // 배열 갯수 : 4개
            
            let $html = "";
            $.map($data["product"],function($name,$node){
                console.log($name)
                $html = '<div link='+ $data["product"][$node]["p_link"] +'>\
                <label>\
                    <span>Reviews  '+ $data["product"][$node]["p_review"] +'</span>\
                    <img src="'+ $data["product"][$node]["p_img"] +'">\
                </label>\
                <label>\
                    <span>'+ $data["product"][$node]["p_name"] +'</span>\
                    <span>'+ $data["product"][$node]["p_info"] +'</span>\
                    <span><s>'+ $data["product"][$node]["p_price"] +'</s></span>\
                    <span>'+ $data["product"][$node]["p_sales"] +'</span>\
                    <span>'+ $data["product"][$node]["p_percent"] +'</span>\
                </label>\
                </div>';
                $("#scss").append($html);

                $("#scss > div").click(function(){
                    location.href = $(this).attr("link");
                });
                // 확장함수 extend를 썼기 때문에 이 함수 안에 넣어야 작동된다.


                // console.log(Object.keys($data["product"][0]).length);
                // 내부 key 값 : 8개. key 값이 있을 때 [Object.keys] 사용 중요
                // {}에 있는 키 개수를 구할 때 사용
                // console.log($name["p_name"]);
                // console.log($name);  // array
                // console.log($node);  // node
                /*
                $html = "<div><label></label></div>";
                $("#scss").append($html);

                $.map($data["product"][$node],function($na,$nd){
                    console.log($na); // data
                    console.log($nd); // key
                    console.log($data["product"][$node]["p_review"]);
                    if($nd == "p_review"){
                        $nd = "p_img";
                    }
                    else if($nd == "p_img"){
                        $nd = "p_review"
                    }
                    switch($nd){
                        case "p_name":
                        break;

                        case "p_info":

                        break;

                        case "p_price":
                        break;

                        case "p_salse":
                        break;

                        case "p_percent":

                        break;

                        case "p_img":
                            $html += "<img src='"+ $data["product"][$node]["p_img"] +"'>";
                        break;

                        case "p_review":
                            $html += "<span>"+ $data["product"][$node]["p_review"] +"</span>";
                        break;

                        case "p_link":

                        break;
                    }
                });
                // $html += "</label></div>";
                $("#scss>div>label:eq("+ $node +")").append($html);
                */
            });
        }
    });
});


