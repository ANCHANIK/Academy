export let a = function(){  // aa : addEventListener의 click값의 a 함수의 값을 받아옴
    // console.log(aa.target);
    // console.log(this.querySelector(".onoff"));
    // aa : 핸들링 값
    // target :  자식 객체를 지정한 것. 부모값을 핸들링했는지, 자식값을 핸들링했는지 명확히 구분해 줌
    var z = this.querySelector(".onoff");
    z.style.backgroundColor = "red";
    let getid = z.getAttribute("ids");
    // setAttribute : 값을 집어 넣을 때 쓰는 것
    // getAttribute : 값을 가져올 때 쓴다.
    document.getElementById(getid).value = "Y"
}

let b = document.querySelectorAll(".btn_bk");

// [] = Array.
Array.from(b).forEach(function(c,index){
    // 클래스에 한해서 querySelectorAll을 쓰면 같은 클래스 값을 인식해서 배열로 바꿔서 반복문으로 찍는다.
    // b : .btn_bk 의 querySelectorAll 값
    // console.log(c)
    c.addEventListener("click",a); // a : a() 이런식이로 되어 있음
});