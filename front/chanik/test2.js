// 2번 문제

//example1
var target = "abc";
var words = ['a','b','c','ab','ac','bc','abc'];  //7
var count = 0;
var chk = false;
for(var a=0; a<words.length; a++){
    var wordscount =0;
    for(var b=0; b<words[a].length; b++){
        for(var c=0; c<target.length; c++){
            if(words[a][b]==target[c]){
                wordscount++;
            }
            if(wordscount==words[a].length){
                chk=true;
            }
        }
        if(chk){
            count++;
            chk = false;
        }
    }
}
console.log(count)
