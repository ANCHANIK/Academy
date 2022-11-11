// 메소드 함수를 이용해 return 값을 적용하라.
const pay = new bpink();

function bpink(){
    this.bbb = function(m1,m2,m3){
        var z = Number(m1);
        var y = Number(1-(m2/100));
        var x = Number(m3);
        var p = z * y;
        var total = p - x
        let last = 10000 - x;
    
        return [total,last];
    }
}