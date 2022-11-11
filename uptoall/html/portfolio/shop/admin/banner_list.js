// 배너 리스트 출력 Vue 부분
let days = new Date();  // 데이터 갱신
var nos = days.getMonth() + '' +  days.getDay() + '' + ('0' + days.getHours()).slice(-2) + '' + ('0' + days.getMinutes()).slice(-2) + '' + ('0' + days.getSeconds()).slice(-2);

let list_bn = new Vue({
    el:"#banner",
    data:{
        array:[],
        in:"text"
    },
    methods:{
        popup_img(imgsrc){
            window.open(imgsrc,"","_blank");
        },
        del_banner(dn){
            // admin_banner.json (bidx : 백엔드 고유값을 삭제 글자 클릭시 GET 전송)
            if(confirm("해당 데이더를 지우면 복구되지 않습니다.\n그래도 지우시겠습니까?")){
                console.log(dn)
                location.href = 'banner_del.php?del_idx=' + dn;
            }
        }
    },
    components:{

    },
    computed:{
        getajax(){
            fetch("./admin_banner.json?v="+nos).then((d)=>{
                return d.json();
            }).then((da)=>{
                var ea = da.length;
                if(ea == 0){
                    document.getElementById("banner_table").style.display="none";
                }
                else{
                    document.getElementById("bannerlist_no").style.display="none";
                }
                for(let f in da){
                    var date = da[f]["bindate"].substr(0,10);
                    this.array.push({
                        no:ea--,
                        bidx:da[f]["bidx"],
                        img:da[f]["bimg"],
                        date:date,
                        link:da[f]["blink"],
                        name:da[f]["bname"],
                        order:da[f]["bno"]
                    });
                }
            })
            .catch(function(error){
                console.log("error");
            })
        }
    }
});