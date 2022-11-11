
//----------------------------- 검색 ----------------------------------------
function search_btn(){
    if(fm_search.searchwd.value == ""){
        alert("검색란을 입력해 주세요");
        fm_search.searchwd.focus();
        return false;
    }
    else{
        fm_search.action = "./search.html";
        fm_search.method = "GET";
        fm_search.submit();
    }
}

//------------------------------ 검색 값 적용 ---------------------------------
function para(){
    let url = location.search.split("?searchwd=");
    let url_para = decodeURI(url[1]);
    if(url_para == "" || url_para == "undefined"){
        document.getElementById("searchwd").value = "";
    }
    else{
        document.getElementById("searchwd").value = url_para;
    }
}
para()