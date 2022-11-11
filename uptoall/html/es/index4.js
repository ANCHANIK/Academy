// export let ccc = function(b){
//     let cc = 1;
//     var aa = "";
//     console.log(b)
//     while(cc <= b){
//         if(cc % 2 == 0){
//             aa += cc + " ";
//         }
//         cc++;
//     }
//     return aa;
// }
export let ccc = (b) => {
    let cc = 1;
    var aa = "";
    console.log(b)
    while(cc <= b){
        if(cc % 2 == 0){
            aa += cc + " ";
        }
        cc++;
    }
    console.log(aa)
}

export class aaa{  // aaa라는 class명을 생성함 (함수 X). class엔 "()" 안들어감
    constructor(a){ // class를 호출과 동시에 인자값을 받는 생성함수
        this.mname = a; // this. : 가상의 변수 형태 (Vue의 this와 같은 성격)
    }
}