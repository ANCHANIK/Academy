$(function(){
    
    $.get("./admin/admin_product.json?v="+nos,function(product){
    })
    .done(function(product){ // 파일로드
        let $wkdata_ea = product.length;
        let $wdslice = product.slice(0,9);
        for(let $we in $wdslice){
            var $img_mo = product[$we]["product_img"];
            var $img_sub = $img_mo.substring(1,50);
            var $smoney = product[$we]["product_salse"];
            var $money = product[$we]["product_money"];
            if(product[$we]["product_sales"] == 0){
                product[$we]["product_sales"] = product[$we]["product_money"].toLocaleString();
                product[$we]["product_money"] = "";
            }
            else {
                product[$we]["product_money"] = product[$we]["product_money"].toLocaleString() + "원";
            }
            let $wkprodata = `
            <div class="week_product_div">
                <span id="black`+ $we +`" pidx="`+ product[$we]["pidx"] +`" goodsno="`+ product[$we]["goodsno"] +`">
                    <div>
                        <img src="`+ $img_sub +`">
                    </div>
                    <div class="blackscreen" id="blackscreen`+ $we +`">
                        <span>
                            <ol id="lovepro`+ $we +`">
                                <li>
                                    <img src="./ico/icon_heart.png" id="loveemp`+ $we +`">
                                    <img src="./image/outline_favorite_white_48dp.png" id="lovefull`+ $we +`">
                                </li>
                                <li>찜하기</li>
                            </ol>
                            <ol id="cartin`+ $we +`">
                                <li>
                                    <img src="./ico/icon_cart.png">
                                </li>
                                <li>장바구니</li>
                            </ol>
                        </span>
                    </div>
                </span>
                <span id="blackcl`+ $we +`">
                    <div>`+ product[$we]["productnm"] +`</div>
                    <div>`+ product[$we]["productnm_dtc"] +`</div>
                    <div><s>`+ product[$we]["product_money"] +`</s></div>
                    <div>`+ product[$we]["product_sales"].toLocaleString() +`원</div>
                </span>
            </div>
            `;
            $("#week_product_aside").append($wkprodata);

            // 찜하기 , 장바구니
            $("#black"+$we).bind({
                "mouseenter":function(){
                    $("#blackscreen"+$we).css("display","block");
                },
                "mouseleave":function(){
                    $("#blackscreen"+$we).css("display","none");
                }
            });

            $("#lovepro"+$we).click(function(){
                if($("#lovefull" + $we).css("display") == "none"){
                    if(confirm("해당 상품을 찜하시겠어요?")){
                        $("#loveemp" + $we).css("display","none");
                        $("#lovefull" + $we).css("display","block");
                    }
                }
                else {
                    if(confirm("찜하기를 해제하시면 상품을 찾기 어려워요\n그래도 해당 상품의 찜하기를 해제 하시겠어요?")){
                        $("#loveemp" + $we).css("display","block");
                        $("#lovefull" + $we).css("display","none");
                    }
                }
            });

            $("#cartin"+$we).click(function(){
                if(confirm("해당 상품을 장바구니에 담으시겠어요?")){
                    alert("장바구니에 담겼습니다");
                }
            });

            // 상품 클릭
            $("#blackcl"+$we).click(function(){
                var $th = $(this).index();
                var $goodsno = $("#black"+ $we).attr("goodsno");
                var $pidx = $("#black"+ $we).attr("pidx");
                location.href = './shop_product.html?pidx='+$pidx+'&goodsno='+$goodsno ;
                console.log($pidx)
            });
        }
    })
    .fail(function(product){ // 에러
        console.log("json_error")
    });
});

/*
<div class="week_product_div" id="blackcl`+ $we +`">
    <span>
        <ul>
            <li id="black`+ $we +`" pidx="`+ product[$we]["pidx"] +`" goodsno="`+ product[$we]["goodsno"] +`">
                <span>
                    <img src="`+ $img_sub +`">
                </span>
                <span class="blackscreen" id="blackscreen`+ $we +`">
                    <div>
                        <ol id="cartin`+ $we +`">
                            <li>
                                <img src="./ico/icon_heart.png">
                            </li>
                            <li>장바구니</li>
                        </ol>
                        <ol id="lovepro`+ $we +`">
                            <li>
                                <img src="./ico/icon_cart.png">
                            </li>
                            <li>찜하기</li>
                        </ol>
                    </div>
                </span>
            </li>
            <li>`+ product[$we]["productnm"] +`</li>
            <li>`+ product[$we]["productnm_dtc"] +`</li>
            <li><s>`+ product[$we]["product_money"] +`</s></li>
            <li>`+ product[$we]["product_sales"].toLocaleString() +`원</li>
        </ul>
    </span>
</div>
*/