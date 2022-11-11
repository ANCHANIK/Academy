let viewpage = 5; // 페이지에 출력될 배열 갯수
let pano = 1;

let geturl = window.location.search;
let nwd = "";
if(geturl != ""){
    var nsplit = geturl.split("page=");
    var searchnm = geturl.split("nnm=");
    if(nsplit != ""){
        if(decodeURI(nsplit[1]) != "undefined"){
            pano = Number(nsplit[1]);
        }
    }
    if(searchnm != ""){
        if(decodeURI(searchnm[1]) != "undefined"){
            nwd = decodeURI(searchnm[1]);
        }
        else{
            nwd = "";
        }
    }
}
let start_page = (pano-1) * viewpage;
let end_page = pano * viewpage;

let notice_Vue = new Vue({
    el:"#notice",
    data:{
        // 기본
        tx:"text",
        sb:"submit",
        bt:"button",
        ch:"checkbox",
        // form
        me:"POST",
        ac:"./notice_del.php",
        enc:"application/x-www-form-urlencoded",
        nword:"",
        //배열
        narray:[],
        pnarray:[],
        nea:"",//배열 갯수
        nif:1,
        // paging
        npaging:0
    },
    methods:{
        //검색파트
        notice_search(){
            if(nfrm.nnm.value == ""){
                alert("검색내용을 입력하세요");
                this.$refs.lnnm.focus();
            }
            else{
                nfrm.submit();
            }
        },
        //전체목록
        notice_alllist(){
            location.href = './admin_notice.html';
        },
        //등록
        notice_insert(){
            location.href = './notice_write.html';
        },
        // 삭제
        notice_del(){
            if(this.checks == false){
                alert("삭제할 게시물을 선택하세요");
            }
            else{
                if(confirm("해당 게시글을 삭제하면 복구되지 않습니다\n그래도 삭제하시겠습니까?")){
                    nfrm.method = this.me;
                    nfrm.action = this.ac;
                    nfrm.submit();
                }
            }
        },
        // paging 이동
        npagego(nnum){
            location.href = 'admin_notice.html?page='+nnum;
        },
        // checkbox
        chbox(n){
            if(n.target.checked == true){
                for(let i in this.narray){
                    document.querySelectorAll(".solck")[i].checked = true;
                }
            }
            else{
                for(let i in this.narray){
                    document.querySelectorAll(".solck")[i].checked = false;
                }
            }
            // this.checks = true;
        },
        checks(n){
            document.getElementById("chall").checked = false;
        },
        // 수정페이지 이동
        modi(pn){
            console.log(pn);
            location.href = './notice_modify.html?sidx=' + pn;
        }
    },
    components:{

    },
    computed:{
        noticeinput(){
            fetch("./admin_notice.json?v="+nos).then((nd) => {
                return nd.json();
            }).then((nlist) => {
                this.nword = nwd;
                this.nea = nlist.length;
                if(this.nea == 0){
                    this.nif = 2;
                }
                else{
                    if(this.nword == ""){
                        this.narray = nlist.slice(start_page,end_page);
                        this.npaging = Math.ceil(this.nea/viewpage);
                        this.nea = this.nea - start_page;
                    }
                    else{
                        let na = "";
                        this.pnarray = nlist.filter(function(d1,d2,d3){
                            na = d1.subject.indexOf(nwd);
                            if(na != -1){
                                return d1.subject;
                            }
                        });
                        this.nea = this.pnarray.length;
                        this.narray = this.pnarray.slice(start_page,end_page);
                        this.npaging = Math.ceil(this.nea/viewpage);
                        this.nea = this.nea - start_page;
                    }
                }
            })
            .catch((error) => {
                console.log("DATA ERROR");
            })
        }
    }
});