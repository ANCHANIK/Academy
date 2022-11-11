// 입력 검토
export let noticein = function(){
    var nedi = CKEDITOR.instances.notice_text.getData();
    document.getElementById("notice_text").value = nedi;
    if(!nfrm.notice_subject.value){
        alert("제목을 입력하세요");
        nfrm.notice_subject.focus();
    }
    else if(!nfrm.notice_id.value){
        alert("아이디를 입력하세요");
        nfrm.notice_id.focus();
    }
    else if(!nfrm.notice_name.value){
        alert("이름을 입력하세요");
        nfrm.notice_name.focus();
    }
    else if(!nfrm.notice_pw.value){
        alert("패스워드를 입력하세요");
        nfrm.notice_pw.focus();
    }
    else if(!nfrm.notice_text.value){
        alert("내용을 입력하세요");
    }
    else{
        nfrm.method = "POST";
        nfrm.action = "./notice_writeok.php";
        nfrm.enctype = "application/x-www-form-urlencoded";
        nfrm.submit();
    }
}

// 뒤로가기
export let noticeback = function(){
    history.go(-1);
}

// 수정 사항 검토
export let noticemodi = function(){
    var mo_nedi = CKEDITOR.instances.notice_text.getData();
    document.getElementById("notice_text").value = mo_nedi;
    if(!nfrm.notice_subject.value){
        alert("제목을 입력하세요");
        nfrm.notice_subject.focus();
    }
    else if(!nfrm.notice_id.value){
        alert("아이디를 입력하세요");
        nfrm.notice_id.focus();
    }
    else if(!nfrm.notice_name.value){
        alert("이름을 입력하세요");
        nfrm.notice_name.focus();
    }
    else if(!nfrm.notice_pw.value){
        alert("패스워드를 입력하세요");
        nfrm.notice_pw.focus();
    }
    else if(!nfrm.notice_text.value){
        alert("내용을 입력하세요");
    }
    else{
        nfrm.method = "POST";
        nfrm.action = "notice_modifyok.php";
        nfrm.enctype = "application/x-www-form-urlencoded";
        nfrm.submit();
    }
}

// 데이터 로드
export let noticeload = function(){
    nfrm.notice_subject.value = ndparse[0]["subject"];
    nfrm.notice_pw.value = ndparse[0]["wpass"];
    nfrm.notice_text.innerHTML = ndparse[0]["wtext"];
}

// 이벤트 리스너
document.querySelector("#notice_btn").addEventListener("click",noticein);
document.querySelector("#notice_list").addEventListener("click",noticeback);
document.querySelector("#notice_modi").addEventListener("click",noticemodi);