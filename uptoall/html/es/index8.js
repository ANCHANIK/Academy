// JS,ES 프로토타입 : String, Number, Boolean(true,fales)
// JS,ES 프로토타입 체이닝 : new, toLocaleString(), split, substring, substr, replaceAll
// method라는 형태 : 부모 함수 또는 클래스를 통해서 사용 되는 부분을 메서드라 함. 가상의 함수를 실행시키는 것.

export class aaa{
    constructor(a,b){
        this.a = a;
        this.b = b;
    }
    get loads(){  // 클래스 호출시 바로 실행되는 메서드. 다른 메서드의 값을 가져오는 역할만 수행함.
        // loads()를 실행시키면 calc()의 값을 가져온다.
        return this.calc();
    }
    calc(){ // 가상함수 = 메서드
        return this.a * this.b;
    }
}
export class bbb{
    test(){ // 메서드 . 함수 아님
        console.log("testtestsets")
    }
}

// 얘는 함수임!!
// export let a = function(){

// }