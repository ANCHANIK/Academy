// 메인 화면 이동 로고 버튼
function main_window(){
    location.href = "http://cksdlr7446.dothome.co.kr/portfolio/shop/admin/admin_index.html";
}
/*폰트 크기 조절*/
function fontclass(part){
    let cs = document.getElementById("pd").className;
    if(part == "1"){
        plus_cs = "section";
        document.getElementById("pd").className = plus_cs;
    }
    else{
        if(part == "2"){
            plus_cs = "font_view2";
            document.getElementById("pd").classList.remove("font_view3");
        }
        else if(part == "3"){
            plus_cs = "font_view3";
            document.getElementById("pd").classList.remove("font_view2");
        }
        document.getElementById("pd").className += " " + plus_cs;
    }
};

// 탑 메뉴 이동
$(function(){
    $("#admin_top_menu_ul > li").click(function(){
        var $links = $(this).attr("links");
        location.href = $links;
    });
});

// copyright - ajax(JSON)
$(function () {
    let $ajaxdata; // ajax 데이터

    $.fn.bottom = function () {
        $.ajax({
            url: "admin_info.json",
            cache: false,
            type: "GET",
            dataType: "JSON",
            success: function ($data) {
                $.fn.printCopyright($data);
            },
            error: function () {
                console.log("DATA ERROR");
            },
        });
        $.fn.printCopyright = function ($copyright) {
            $ajaxdata = $copyright
            $.each($copyright[0], function ($key, $text) {
                // ico image 출력
                if($key == "info_site_ico"){
                    if($copyright[0][$key] != ""){
                        $("#fimg_on").css("display","block");
                        $("#fimg").css({
                            "background":"url("+ $text +")",
                            "background-size":"cover",
                            "background-repeat":"no-reapeat"
                        });
                        $("#fimg_off").css("display","none");
                    }
                }
                // 포인트 금액
                else if($key == "info_point"){
                    $("#points").val($text);
                }
                // 포인트 checkbox
                else if($key == "info_point_use"){
                    if($text == "Y"){
                        $("#point_use").attr("checked", true);
                    }
                }
                // 아이콘 이미지 확대
                $("#fimg").click(function(){
                    window.open($text, "biz", "width=auto, height=auto")
                });
                // JSON 데이더 출력
                switch ($key) {
                    case $key:
                        $("#" + $key + "1").append($text);
                        $("#" + $key).val($text);
                        break;
                    }
                });
            };
        };
        $.fn.bottom();
    
    // 사업자 번호 확인
    $("#pop_cpno").click(function () {
        let $sano = $("#info_cpno1").text();
        var $sano_val = $sano.replace(/[-]/g, "");
        let $urls = "http://www.ftc.go.kr/bizCommPop.do?wrkr_no=" + $sano_val;
        window.open($urls, "biz", "width=700, height=500,scrollbars=auto");
    });
});