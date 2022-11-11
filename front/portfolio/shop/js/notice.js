let notice_data = JSON.parse(notice_view);
function notice(){
    document.getElementById("notice_sidx").value = notice_data[0]["sidx"];
    document.getElementById("notice_writernm").innerHTML = notice_data[0]["writernm"];
    document.getElementById("notice_subject").innerHTML = notice_data[0]["subject"];
    document.getElementById("notice_wcount").innerHTML = notice_data[0]["wcount"];
    document.getElementById("notice_windate").innerHTML = notice_data[0]["windate"].substring(0,10);
    document.getElementById("notice_content").innerHTML = notice_data[0]["wtext"];
}