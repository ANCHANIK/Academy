export class aaa{
    constructor(a1,a2){
        var a3 = a1 * a2;
        if(a3 < 100){
            this.as = true;
        }
        else{
            this.as = false;
        }
    }
}

export class login{
    constructor(){
        var id = document.getElementById("mid").value;
        if(!id){
            this.aws = "아이디를 입력하세요";
            document.getElementById("mid").focus();
        }
        else{
            this.aws = id;
            window.open("http://naver.com","","width=500 height=500");
        }
    }
}
