export let notice = function(){
    if(!ff.person_name.value){
        alert("고객명을 입력하세요");
        return false;
    }
    else if(!ff.person_pw.value){
        alert("패스워드를 입력하세요");
        return false;
    }
    else if(!ff.person_text.value){
        alert("댓글 내용을 입력하세요");
        return false;
    }
    else {
        ff.method = "POST";
        ff.action = "http://lovertvtest.dothome.co.kr/es/noticeok.php";
        ff.enctype = "application/x-www-form-urlencoded";
        return true;
    }
}
document.getElementById("ff").onsubmit = notice;





// submit 쓰는 법
export let a = function(){
    let mid = document.querySelector("#mid").value;
    console.log(mid);
    return false;

}
document.getElementById("frm").onsubmit = a;