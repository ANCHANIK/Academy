// 수정 복사 part
function go_page(part,bname){
    switch(part){
        case 1:
            location.href = './admin_bmodify.html?boardnm='+bname;
        break;
    }
}

function search(){
    let stext = document.getElementById("stext").value;
    if(stext == ""){
        alert("내용을 입력해 주세요");
        return false;
    }
    else{
        return;
    }
}

// 내용 입력 부분
function filters(){
    let sword = window.location.search;
    let stext = sword.split("&stext=");
    let spart = stext[0].replace("?spart=","");
    if(sword == ""){
        document.getElementById("stext").value = "";
    }
    else{
        document.getElementById("stext").value = decodeURI(stext[1]);
    }
    var sea = document.getElementById("spart").length;
    var s = 0;
    while(s < sea){
        if(document.getElementById("spart").options[s].value == spart){
            document.getElementById("spart").options.selected = "selected";
        }
        s++;
    }
}