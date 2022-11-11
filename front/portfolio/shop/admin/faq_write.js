export let faqinck = function(part){
    var p = part.path[0].id;
    if(p=="faq_inok"){
        var qa = CKEDITOR.instances.fatext.getData();
        document.getElementById("fatext").value = qa;
        // url : faq_writeok.php
        if(frm_faq.fcate.value == ""){
            alert("카테고리를 선택하세요");
        }
        else if(frm_faq.fqtext.value == ""){
            alert("질문 내용을 입력하세요");
        }
        else if(frm_faq.fatext.value == ""){
            alert("답변 내용을 입력하세요");
            if(qa != ""){
                document.getElementById("fatext").value = qa;
            }
        }
        else{
            frm_faq.action = './faq_writeok.php';
            frm_faq.submit();
        }
    }
    else if(p=="faq_list"){
        location.href = './admin_faq.html';
    }
}

// 수정 part
export let faq_modify = function(){
    if(document.getElementById("fqtext").value == ""){
        alert("질문 내용을 입력하세요");
    }
    else {
        frm_faq.action = "./faq_modifyok.php";
        frm_faq.submit();
    }
};

// 삭제 part
export let faq_del = function(){
    if(confirm("해당 데이터를 삭제시 복구되지 않습니다\n그래도 삭제 하시겠습니까?")){
        frm_faq.action = "./faq_delok.php";
        frm_faq.submit();
    }
};

// 데이터 로드
export let fdatainput = function(){
    switch(fdataparse[0]["category"]){
        case 1:
            frm_faq.fcate.value = fdataparse[0]["category"];
        break;
        case 2:
            frm_faq.fcate.value = fdataparse[0]["category"];
        break;
        case 3:
            frm_faq.fcate.value = fdataparse[0]["category"];
        break;
        case 4:
            frm_faq.fcate.value = fdataparse[0]["category"];
        break;
        case 5:
            frm_faq.fcate.value = fdataparse[0]["category"];
        break;
    }
    frm_faq.fqtext.value = fdataparse[0]["fqtext"];
    frm_faq.fatext.value = fdataparse[0]["fatext"];
}

document.querySelector("#faq_inok").addEventListener("click",faqinck);  // 등록
document.querySelector("#faq_list").addEventListener("click",faqinck);  // 리스트
document.querySelector("#faq_modifyok").addEventListener("click",faq_modify);  // 수정
document.querySelector("#faq_delok").addEventListener("click",faq_del);  // 삭제