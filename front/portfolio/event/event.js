$(document).ready(function(){



    var $img;
    var $data = "5000,100,200,2000,1000,500,300";
    var $result = $data.split(",");
    
    $("#game_btn").mouseover(function(){
        $("#game_btn > img").attr("src","./images/event_start_on.png");
    });
    $("#game_btn").mouseout(function(){
        $("#game_btn > img").attr("src","./images/event_start_off.png");
    });
    
    var $r = 0; // 오브젝트 최초 위치값
    var $time;
    $("#game_btn").click(function(){
        //횟수 제한
        var $ct = Number($("#ct").val());
        if($ct > 0){
            $ct = $ct - 1 ;

            console.log($ct);
            $("#ct").val($ct);
            
            
        $("#msg").slideUp(800);
        var $pc = Number(Math.ceil(Math.random()*360));
        $r = $r + 1800;  // 기본 돌아가는 횟수 : 5바퀴
        var $msg = $.fn.rotate($r,$pc);
        //console.log($msg); // 결과출력
        setTimeout(function(){
            // 결과 애니메이션
            $("#msg").slideDown(800);
            $("#msg").html($result[$msg] + " 마일리지에 당첨되셨습니다!😄 ");
        },5500);
        }
        else{
            alert("오늘 룰렛 3회 끝😜")
        }
    });
    $time = setTimeout($.fn.$msf,5500)


$.fn.rotate = function($r,$pc){
    var $node = 0;

    if($pc >= 22 && $pc <= 67){
        $node = 1;
    }
    else if($pc > 67 && $pc <= 112){
        $node = 2;
    }
    else if($pc > 112 && $pc <= 157){
        $node = 3;
    }
    else if($pc > 157 && $pc <= 202){
        $node = 4;
    }
    else if($pc > 202 && $pc <= 247){
        $node = 1;
    }
    else if($pc > 247 && $pc <= 292){
        $node = 5;
    }
    else if($pc > 292 && $pc <= 337){
        $node = 6;
    }
    else if($pc > 337 && $pc <= 360 || ($pc == 0 && $pc < 22) ){
        $node = 0;
    }
    else{
        $node = 1;
    }
    
    var $rotate = $r + $pc;
        $("#board").css("transform","rotate("+ $rotate +"deg)");
        return $node;
    }
});