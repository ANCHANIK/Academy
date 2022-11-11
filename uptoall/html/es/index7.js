export class aaa{
    constructor(person){
        this.username = person;
        if(this.username == "홍길동"){
            this.sign = "ok";
        }
        else{
            this.sign = "cancel";
        }
    }
    login(){  // aaa class에 대한 확장함수 1
        return this.username + "님 환영합니다.";
    }
    errors(){ // aaa class에 다한 확장함수 2
        return this.username + "님은 휴면 계정 입니다.";
    }
    // 기본적으로 3~4개 정도 쓴다
}

export class bbb{
    constructor(){
        // addEventListener 를 이용해서 확장함수로 이동
        // class에서 확장함수로 이동시 this를 이용
        document.querySelector("#box").addEventListener("mouseenter",this.over);
        document.querySelector("#box").addEventListener("mouseenter",this.out);
    }
    over(){
        console.log("마우스 오버");
    }
    out = function(){
        console.log("마우스 아웃");
    }
}