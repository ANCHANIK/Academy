let pos = 0; // 이미지의 초기값
let position = 0; // 이미지 위치 값
let startx, endx; // 터치에 대한 pageX에 좌표값
let imgsize = 160; // 이미지 한 개당 가로 크기

function next(n){
    if(pos < n){ // pos < 3 -> 3 : 이미지 갯수값
        position -= imgsize;
        // document.querySelector("#images").style.transform = `translateX(${position}px)`;
        document.querySelector("#images").style.transform = "translateX("+position+"px)";
        pos += 1;
    }
}
function prev(){
    position += imgsize;
    document.querySelector("#images").style.transform = `translateX(${position}px)`;
    pos -= 1;
}

export let a = function(e){  // e : 인자값은 핸들링시 이벤트 관련 속성 배열이 나열된다.
    startx = e.touches[0]["pageX"];  // touches : 해당 오브젝트를 터치할 경우
    // pageX : 화면(오브젝트 기준) 가로 기준좌표
    // pageY : 화면(오브젝트 기준) 세로 기준좌표
    // screenX : 화면 (전체 기준) 가로 좌표
    // screenY : 화면 (전체 기준) 세로 좌표
    // console.log(startx);
}

export let b = function(e){
    endx = e.changedTouches[0]["pageX"];
    //changedTouches : 해당 오브젝트의 터치가 끝난 경우 발생하는 값
    // 여기서 이미지의 갯수값을 확인해야 한다.
    var nodes = document.querySelectorAll("#images > img");
    if(startx > endx){
        next(nodes.length - 1); // 노드 갯수를 파악해서 태워 보낸다
    }
    else {
        prev();
    }
}
//순수 모바일 전용 핸들링
// touchstart : 스왑이 시작되는 행위
// touchend : 스왑이 끝나는 행위
// touchmove : 오브젝트가 움직일때 따라오는 것
// touchcancel : 더블터치시 원래대로 이벤트가 취소되는 것
// document.querySelector("#images").addEventListener("touchstart",a);
// document.querySelector("#images").addEventListener("touchend",b);

// ECMA에서만 사용 가능. JS JQ에서는 안됨
document.getElementById("images").ontouchstart = a;
document.getElementById("images").ontouchend = b;