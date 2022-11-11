// 전체 선택
function all_age(){
    var age_length = document.getElementsByClassName("age").length;
    var all_check = document.getElementById("all_check").checked;
    console.log(all_check);

    var ac = 0;
    while(ac < age_length){
        if(all_check == true){
            document.getElementById("age" + ac).checked = all_check;
            document.getElementById("drug" + ac).style.display = "block";
        }
        else{
            console.log("test")
        }
        ac++;
    }
}

