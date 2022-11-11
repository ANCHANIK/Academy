// 배열값은 함수 안에 작성 또는 html에서 script를 이용해서 사용하는 방법 외에는 없다.
// .js 상단에 출력이 불가능 함. 안됨!@!!@@@!!
export let a = function(w){
    let words = ["C","F","Z","A","J"];
    /*
    문제 1. 해당 배열에 B라는 값을 추가하고 해당 배열을 재설정하여
    "B" 를 넣어서 알파벳 순으로 재 배열하라.
    
    1) const일때는 절대 값을 못 넣음. 즉, const를 var또는 let으로 바꿔서 쓸 것.
    2) B를 push로 넣을 것.
    */

   // 문제2 다음 2개의 배열값을 확인하여 해당 값을 추가한 후
   // console.log 로 출력하라.

    words.push("B");
    words.sort();
    console.log(words);
}

export let b = function(){
    let a1 = ["red","blue","green"];
    let a2 = ["black","yellow","orange"];
    // [주니어]
    // for(let z in a2){
    //     a1.push(a2[z]);
    // }

    // [시니어]
    Array.prototype.push.apply(a1,a2);
    console.log(a1);
}

export let c = function(){
    let c1 = ["lee","kim","park","kang"];
    let c2 = ["jang","sin"];
    // 출력결과 : ["jang","kang","kim","lee","park","sin"];
    for(let q in c1){
        // c2.push(c1[q]);
        c2.unshift(c1[q]);
    }
    c2.sort();
    console.log(c2)
}

export let d = function(){
    let d1 = ["a","b","c","d"];
    let data1 = "a3";
    let data2 = "a5";
    let data3 = "a7";

    d1.splice(1,0,data1);
    d1.splice(3,0,data2,data3);
    console.log(d1)
    // splice 사용해서 출력
    //출력 결과 : ["a","a3","b","a5","a7","c","d"];
}