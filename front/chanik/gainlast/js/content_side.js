let conside = new Vue ({
    el:"#side",
    data:{
        sf1:false,
        sf2:true,
        earr:[],
        narr:[],
    },
    methods:{
        eventbtn(){
            this.sf1 = true;
            this.sf2 = false;
        },
        notice(){
            this.sf1 = false;
            this.sf2 = true;
        },
        totalopen(){
            window.open("https://m.sonyunara.com/board/list.php?boardid=csnotice","","");
        }
    },
    components:{

    },
    computed:{
        eventajax(){
            fetch("./src/event.json").then((ed) => {
                return ed.json();
            }).then((elist) => {
                this.earr = elist
            })
            .catch((error) => {
                console.log("DATA ERROR");
            })
        },
        noticeajax(){
            fetch("./src/notice.json").then((nd) => {
                return nd.json();
            }).then((nlist) => {
                this.narr = nlist
            })
            .catch((error) => {
                console.log("DATA ERROR");
            })
        }
    }
});

function randomimg(){
    let rsbanner1 = document.getElementById("sidebanners");
    let rsbanner2 = document.getElementById("sidebanners2");
    var rannum1 = Math.ceil(Math.random()*6);
    var rannum2 = Math.ceil(Math.random()*6);
    let sideimg1 = "./img/sidebanner"+ rannum1 +".png";
    let sideimg2 = "./img/sidebanner"+ rannum2 +".png";
    rsbanner1.setAttribute("src",sideimg1);
    rsbanner2.setAttribute("src",sideimg2);
}
randomimg()