$(function(){
    let $pmcount = "";
    $("#c_menu").click(function(){
        if($pmcount == 0){
            $("#pop_menu_bg_outline").css("display","block");
            $("#pop_menu_outline").stop().animate({
                "left":"0px"
            },700);
            $pmcount++;
        }
        else if($pmcount == 1){
            $("#pop_menu_outline").stop().animate({
                "left":"-360px"
            },700);
            setTimeout(function(){
                $("#pop_menu_bg_outline").css("display","none");
            },800)
            $pmcount--;
        }
    });
    $("#c_mlogo").click(function(){
        location.href = './index.html';
    });
    $("#c_search").click(function(){
        $("#c_searchdiv").stop().slideToggle(250);
    });

    
});
// 검색값 전달
function search_val(){
    if(!sfrm.search_name.value){
        alert("검색할 내용을 입력하세요");
        sfrm.search_name.focus();
        return false;
    }
    else{
        sfrm.method = "POST";
        sfrm.action = "./search.php";
        sfrm.enctype = "application/x-www-form-urlencoded";
        return true;
    }
}