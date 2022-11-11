export let abc = function(){
    let start = null;
    let sleft = null;
    var ani = document.getElementById("box");

    function ccc(times){  // ccc 확장함수를 사용할 수 있음. export 안에서는 사용 가능함
        start = start + 0.01; // 계산 수식구
        sleft = sleft + 1;
        ani.style.opacity = start;
        ani.style.left = sleft + "px";
        if(start <= 1){ // requestAnimationFrame을 제어하는 제어 수식구
            window.requestAnimationFrame(ccc);
        }
        // console.log(times)
    }
    window.requestAnimationFrame(ccc); // 비동기 함수, setTimeout에 가까운 성질을 띄고 있다.
}

document.querySelector("#btn").addEventListener("click",abc);
// document.getElementById("btn").onclick = abc;
// onclick : id 기준
// addEventListener : id, class 모두 사용 가능