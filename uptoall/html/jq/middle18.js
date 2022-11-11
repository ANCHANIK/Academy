$(function(){
    const $menus = [
        {
            "main_menu":"훈련과정",
            "menu_list":[
                "국민내일배움카드 훈련과정",
                "디지털 신기술 훈련과정",
                "기업 훈련과정",
                "디지털 기초역량훈련"
            ]
        },
        {
            "main_menu":"지원제도",
            "menu_list":[
                "정부지원사업안내",
                "정부부처별 지원사업안내",
                "일학습병행"
            ]
        },
        {
            "main_menu":"일자리,직업정보",
            "menu_list":[
                "구인정보",
                "자격정보",
                "학과정보"
            ]
        },
        {
            "main_menu":"지식정보센터",
            "menu_list":[
                "인재뱅크",
                "훈련기관평가정보",
                "훈련/고용 통계"
            ]
        }
    ];
    // 풀페이지 네비게이션
    //햄버거 버튼 클릭
    $("#tbtn").tap(function(){
        var $offset = $("#main").offset().left;
        if($offset == 0){
            $("#main").stop().animate({
                "left":"70%"
            },600);
        }
        else{
            $("#main").stop().animate({
                "left":"0%"
            },600);
        }
    });

    $($menus).map(function($a,$b){ //대메뉴 파트
        // console.log($b["main_menu"]);
        console.log($a);
        var $ol = "<ol class='olcss' id='olcss"+ $a +"'></ol>";
        var $li = "<li>"+ $b["main_menu"] + $ol + "</li>";
        $("#ulcss").append($li);
        // $("#ulcss > li").eq($a).append($ol); 이렇게 해도 됨

        $($b["menu_list"]).map(function($c,$d){  //소메뉴 파트
            var $li2 = "<li>"+ $d +"</li>";
            // console.log($c)
            $("#olcss" + $a).append($li2);
        });
    });

    // 대메뉴 클릭
    $("#ulcss > li").tap(function(){
        let $nd = $(this).index();
        // $(".olcss").slideUp(600);
        // 다른 메뉴 탭시 다른 메뉴 닫힘. for문 돌려야됨
        console.log($nd);
        $("#olcss" + $nd).slideToggle(600);
    });

});