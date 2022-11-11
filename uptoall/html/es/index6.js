export let abc = function(){
    if(!frm.mid.value){
        alert("아이디를 입력해라");
        frm.mid.focus();
    }
    else if(!frm.mpass.value){
        alert("패스워드 입력해라");
        frm.mpass.focus();
    }
    else{
        frm.method = "POST";
        frm.action = 'http://cksdlr7446.dothome.co.kr';
        frm.submit();
    }
}
export let login = function(){
    console.log("TEST");
}
export let mails = function(a){
    document.getElementById("email").value = a;
}
document.getElementById("btn").onclick = abc;
document.getElementById("login_btn").onclick = login; // onclick
document.getElementById("mail").onchange = mails;  // onchange
document.querySelector("#mail").addEventListener("change",function(){
    var z = this.value; // addEventListener썼을 때만 this.value가 들어간다.
    mails(z);
});

/*
onclick, onchange일 경우 해당 함수로 이동은 가능하나 함수에 인자값을 적용하기는 힘들다.
addEventListener에는 click, change, keypress, mouseenter, mouseleave, mouseout, mouseover,keyup, keydown
*/