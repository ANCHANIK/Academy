// 상단 로고 클릭시 메인 페이지 이동
document.getElementById("mainpage").onclick = function(){
    location.href = 'https://www.waynehills.co/';
}

// 로그인 페이지 이동
function logingo(){
    location.href = 'http://ttv.waynehills.co/login';
}

// Text-To-Video 롤링 Jquery 사용
$(function(){
    var $img_ea = $("#rolling_img > li").length; // 3ea
    var $img_width = $("#rolling_img > li").width(); // 480px
    var $underbar_w = $("#under_line").width(); // 160px
    let $count = 0;
    let $rolltime;
    $.fn.$rolling = function(){
        $rolltime = setInterval(function(){
            $("#rolling_img").stop().animate({
                left:-$img_width * $count
            },850);
            $("#under_line").stop().animate({
                left:$underbar_w * $count
            },850);
            $count++;
            if($count >= $img_ea){
                $count = 0;
            }
        },2000);
    }
    setTimeout($.fn.$rolling);

// Text-To-Video 클릭시 해당 파트 이동
    $("#TTVt > label").bind({
        "mouseenter":function(){
            clearTimeout($rolltime);
        },
        "mouseleave":function(){
            setTimeout($.fn.$rolling);
        },
        "click":function(){
            let $node = $(this).index();
            $("#rolling_img").stop().animate({
                left:-$img_width * $node
            },850);
            $("#under_line").stop().animate({
                left:$underbar_w * $node
            },850);
        }
    });

// Terms of Use
    $("#TOU").click(function(){
        $("#popup").css("display","flex");
        $("#popup").stop().animate({
            opacity:1
        },350);
        $("html,body").css({
            "overflow":"hidden",
            "height":"100%"
        });
    });
    $("#gotit").click(function(){
        $("html,body").css({
            "overflow":"",
            "height":""
        });
        $("#popup").stop().animate({
            opacity:0
        },350,function(){
            $("#popup").css("display","none");
        });
    });
});

// 메인 파트는 Vue로 작성
var hab = {
    props:["wayne"],
    template:'<li><div class="Convert-Button"><button type="button" onclick="wvue.convert()">Convert</button></div></li>'
}

var gyeok = {
    props:["hills"],
    template:'<li><div class="Convert-Button"><button type="button" onclick="wvue.making()">Convert</button></div></li>'
}

var chuk = {
    props:["ventures"],
    template:'<li><div class="Convert-Button"><button type="button" onclick="wvue.encoding()">Convert</button></div></li>'
}

let wvue = new Vue({
    el:"#vues",
    data:{
        AN:"",
        CHAN:"",
        IK:"",
        textcount:"",
        videodata:"",
        coding:"",
        content1:true,
        content2:false,
        content3:false,
        title1:"Scripting",
        title2:"Matching Video",
        title3:"Encoding"
    },
    methods:{
        convert(){
            if(!this.textcount){
                alert("Put your Script, please");
                this.$refs.A.focus();
            }
            else {
                this.content1 = false;
                this.content2 = true;
            }
        },
        making(){
            if(!this.videodata){
                alert("Put your Script, please");
                this.$refs.C.focus();
            }
            else {
                this.content2 = false;
                this.content3 = true;
            }
        },
        encoding(){
            if(!this.coding){
                alert("Put your Script, please");
                this.$refs.I.focus();
            }
            else {
                alert("please wait");
            }
        },
        check(num){
            switch(num){
                case 0:
                    this.content1=true
                    this.content2=false
                    this.content3=false
                break;
                case 1:
                    this.content1=false
                    this.content2=true
                    this.content3=false
                break;
                case 2:
                    this.content1=false
                    this.content2=false
                    this.content3=true
                break;
            }
        }
    },
    components:{
        "convert": hab,
        "making": gyeok,
        "encoding": chuk
    }
})