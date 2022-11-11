/*폰트 크기 조절*/
function fontclass(part){
    let cs = document.getElementById("banner").className;
    if(part == "1"){
        plus_cs = "section";
        document.getElementById("banner").className = plus_cs;
    }
    else{
        if(part == "2"){
            plus_cs = "font_view2";
            document.getElementById("banner").classList.remove("font_view3");
        }
        else if(part == "3"){
            plus_cs = "font_view3";
            document.getElementById("banner").classList.remove("font_view2");
        }
        document.getElementById("banner").className += " " + plus_cs;
    }
};

// 메인 화면 이동 로고 버튼
function main_window(){
    location.href = "http://cksdlr7446.dothome.co.kr/portfolio/shop/admin/admin_index.html";
}

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

// banner effect 값 전송
if(eff == "R"){
    document.getElementById("effect0").checked = true;
}
else{
    document.getElementById("effect1").checked = true;
}

function banner_effect(){
    let effect = document.querySelector("input[name='effect']").checked;
    let e_val;
    switch(effect){
        case true:
            e_val = "R";
        break;

        case false:
            e_val = "F";
        break;
    }
    let be;
    function windowck(){
        if(window.XMLHttpRequest){
            return new XMLHttpRequest();
        }
    }
    function filepost(){
        if(be.readyState == XMLHttpRequest.DONE && be.status == 200){
            alert("효과가 적용되었습니다.");
        }
    }
    let geturl = "banner_effect.php?effect="+e_val;
    be = windowck();
    be.onreadystatechange = filepost;
    be.open("GET",geturl,true);
    be.setRequestHeader("content-type","application/x-www-form-urlencoded");
    be.send();
}

// banner 등록
function banner_input(){
    location.href = 'admin_newbanner.html';
}

// banner 목록으로 돌아가기
function banner_register_back(){
    history.back(-1);
}
