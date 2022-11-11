/*폰트 크기 조절*/
function fontclass(part){
    let cs = document.getElementById("listview").className;
    if(part == "1"){
        plus_cs = "section";
        document.getElementById("listview").className = plus_cs;
    }
    else{
        if(part == "2"){
            plus_cs = "font_view2";
            document.getElementById("listview").classList.remove("font_view3");
        }
        else if(part == "3"){
            plus_cs = "font_view3";
            document.getElementById("listview").classList.remove("font_view2");
        }
        document.getElementById("listview").className += " " + plus_cs;
    }
};

// 로그인 파트
function checks(){
    if(adm.a_id.value == ""){
        alert("아이디를 입력하세요.");
        adm.a_id.focus();
        return false;
    }
    else if(adm.a_pw.value == ""){
        alert("패스워드를 입력하세요.");
        adm.a_pw.focus();
        return false;
    }
    else{
        adm.action = "login_ok.php";
        return true;
    }
}

// 아이디 저장 checkbox
function id_save(){
    var userid = document.getElementById("a_id").value;
    var usecheck = adm.a_save.checked;
    if(userid != "" && usecheck == true){
        // 쿠키생성
        document.cookie = "adm_id=" + escape(adm.a_id.value);
    }
    else{
        document.cookie = "adm_id="; // 쿠키 초기화
        alert("아이디를 입력해 주세요.");
        adm.a_save.checked = false;
        adm.a_id.focus();
    }
}

// 메인 화면 이동 로고 버튼
function main_window(){
    location.href = "http://cksdlr7446.dothome.co.kr/portfolio/shop/admin/admin_index.html";
}

// 대메뉴 파트
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

    // ajax POST 전송
    $("#fdel").click(function(){
        var $idx = $("#info_idx").val();
        var $delimg = $("#info_site_ico").val();
        $.ajax({
            url:"./img_del.php",
            cache:false,
            type:"POST",
            dataType:"JSON",
            data:{"idx":$idx,"delimg":$delimg},
            contentType:"application/x-www-form-urlencoded",
            success:function($total_post){
                if($total_post == "success"){
                    alert("아이콘이 삭제되었습니다.");
                    window.location.reload();
                }
            },
            error:function(){
                console.log("DATA ERROR");
            }
        });
    });
    
});
