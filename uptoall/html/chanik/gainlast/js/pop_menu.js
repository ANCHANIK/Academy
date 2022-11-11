function popajax(){
    let pajax;
    function windowck(){
        if(window.XMLHttpRequest){
            return new XMLHttpRequest();
        }
    }
    function fileload(){
        if(pajax.readyState == XMLHttpRequest.DONE && pajax.status == 200){
            icoload(pajax.response);
        }
    }
    pajax = windowck();
    pajax.onreadystatechange = fileload;
    pajax.open("GET","./ico.json",true);
    pajax.send();
}
popajax()

// ICO
function icoload(icod){
    let icoa = JSON.parse(icod);
    for(pc in icoa.c_ico){
        var htmls = `
        <li>
            <img src="`+ icoa.c_ico[pc]["img"] +`" name="`+ icoa.c_ico[pc]["name"] +`" title="`+ icoa.c_ico[pc]["name"] +`">
        </li>
        `;
        document.getElementById("totalicon").innerHTML += htmls;
    }
}


$(function(){

    $("#sm0").click(function(){
        $("#c_submenus0").stop().slideToggle(350);
    });
    $("#sm1").click(function(){
        $("#c_submenus1").stop().slideToggle(350);
    });
    $("#sm2").click(function(){
        $("#c_submenus2").stop().slideToggle(350);
    });
    $("#sm3").click(function(){
        $("#c_submenus3").stop().slideToggle(350);
    });
    $("#sm4").click(function(){
        $("#c_submenus4").stop().slideToggle(350);
    });

});