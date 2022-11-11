export let a = function(){
    var alls = document.querySelector("#allck").checked;
    // span으로 묶어놔야 이렇게 한번에 불러올 수 있다.
    var ea = document.querySelectorAll("#list > input");
    // 묶이지 않은 상태에서 이렇게 불러올 수 있음
    // var ea = document.querySelectorAll(".ck");
    var lg = ea.length;
    console.log(lg);
    var f;
    for(f in ea){
        if(f < lg){
            ea[f].checked = alls;  // 전체 선택 및 해제
        }
    }
}
document.querySelector("#allck").addEventListener("click",a);