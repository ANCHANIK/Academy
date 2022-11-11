/*환경설정 check Script*/
function info_ok(){
    var info_cpname = document.getElementById("info_cpname").value;
    var info_cpno = document.getElementById("info_cpno").value;
    var info_ceo = document.getElementById("info_ceo").value;
    var info_tel = document.getElementById("info_tel").value;
    var info_fax = document.getElementById("info_fax").value;
    var info_cn = document.getElementById("info_cn").value;
    var info_cnetc = document.getElementById("info_cnetc").value;
    var info_addr = document.getElementById("info_addr").value;
    var info_addrdtc = document.getElementById("info_addrdtc").value;
    var info_manager = document.getElementById("info_manager").value;
    var info_manager_email = document.getElementById("info_manager_email").value;
    var info_site_nm = document.getElementById("info_site_nm").value;
    var info_site_ico = document.getElementById("info_site_ico").value;
    var info_site_admin = document.getElementById("info_site_admin").value;
    var info_site_email = document.getElementById("info_site_email").value;
    var info_site_emailnm = document.getElementById("info_site_emailnm").value;
    var point_use = document.getElementById("point_use").checked;
    var points = document.getElementById("points").value;
    var info_cpno_length = info_cpno.length;

    if(info_cpno_length < 10 || info_cpno_length > 12){
        alert("정확한 사업자 번호를 입력하세요.");
        return false;
    }
    else {
        return true;
    }
}

// 포인트 checkbox
function use_point(){
    var point_use = document.getElementById("point_use").checked;
    if(point_use == true){
        document.getElementById("points").disabled = false;
        document.getElementById("points").focus();
    }
    else{
        document.getElementById("points").value = "";
        document.getElementById("points").disabled = true;
    }
}