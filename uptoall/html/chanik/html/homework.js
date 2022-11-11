let re_count = 0;
function refresh_btn(){
    re_count++;
    document.getElementById("codes").setAttribute("src","code.php?v="+re_count);
}

var a = 1+1;
var b = 2+2;
var c = 3+3;
console.log(a);
setTimeout(function(){console.log(b)},1000)
console.log(c);