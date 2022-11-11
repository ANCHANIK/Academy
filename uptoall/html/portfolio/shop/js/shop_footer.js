$(function(){
    // 사업자 번호 확인
    $("#pop_cpno").click(function () {
        let $sano = $("#info_cpno1").text();
        var $sano_val = $sano.replace(/[-]/g, "");
        let $urls = "http://www.ftc.go.kr/bizCommPop.do?wrkr_no=" + $sano_val;
        window.open($urls, "biz", "width=700, height=500,scrollbars=auto");
    });


    $.get("./admin/admin_info.json?v="+nos,function(infodata){
    })
    .done(function(infodata){ // 파일로드
        $("#info_cpname1").append(infodata[0]["info_cpname"]) // 회사명
        $("#info_ceo1").append(infodata[0]["info_ceo"])  // 대표자명
        $("#info_cpno1").append(infodata[0]["info_cpno"])  // 사업자 번호
        $("#info_cn1").append(infodata[0]["info_cn"])
        $("#info_manager1").append(infodata[0]["info_manager"])
        $("#info_manager_email1").append(infodata[0]["info_manager_email"])
        $("#info_addr1").append(infodata[0]["info_addr"])
        $("#info_addrdtc1").append(infodata[0]["info_addrdtc"])
        $("#info_tel1").append(infodata[0]["info_tel"])
    })
    .fail(function(product){ // 에러
        console.log("json_error")
    });
})