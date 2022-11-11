// 한 페이지당 출력하는 목록 갯수
const viewpage = 5;
let pgno = 1; // 페이징 번호 1번 번호

// 파라미터 체크 부분 (페이징 번호, 검색 부분)
let getpage = window.location.search;
let wd = "";
if(getpage != ""){
    var psplit = getpage.split("page=");
    var searchnm = getpage.split("pnm=");
    if(psplit != ""){
        if(decodeURI(psplit[1]) != "undefined"){
            pgno = Number(psplit[1]);
        }
    }
    if(searchnm != ""){
        if(decodeURI(searchnm[1]) != "undefined"){
            wd = decodeURI(searchnm[1]);
        }
        else{
            wd = "";
        }
    }
}

let start_page = (pgno -1) * viewpage;
let slice_page = pgno * viewpage;

//------------------------------------- vue --------------------------------------
let p_list =  new Vue({
    el:"#pd",
    data:{
        part:1,
        tx:"text",
        sbtn:"submit",
        cbtn:"button",
        word:"", // 검색어
        btn_nm:"상품 검색",
        btn_all:"전체 목록",
        pro_sign:"상품등록",
        arrays:[],
        warrays:[], // 검색어에 따른 재배열
        ea:0, //배열 갯수
        paging:0  // 최초 페이지 번호
    },
    methods:{
        view_product(pno){
            location.href = './admin_productview.html?pidx=' + pno;
        },
        popup_pro(imgsrc){
            window.open(imgsrc,"","_blank");
        },
        // 상품 검색어 입력 함수
        pro_search(){
            if(this.word == ""){
                alert("검색할 상품명을 입력하세요");
                this.$refs.pnm.focus();
            }
            else{
                cfrm.submit();
            }
        },
        // 페이징 번호 클릭시 적용되는 함수
        gopage(pageno){
            location.href = "./admin_product.html?page=" + pageno;
        },
        // 글쓰기 버튼 클릭시 적용되는 함수
        new_pro(){
            location.href = "./admin_newproduct.html";
        },
        // 글삭제 클릭시 적용되는 함수
        product_del(pidx){
            if(confirm("해당 상품 목로을 삭제시 복구되지 않습니다\n그래도 삭제하시겠습니까?")){
                location.href = "./product_listdel.php?idxs="+pidx+"&callsign=pdel_sign";
            }
        },
        all_list(){
            location.href = "./admin_product.html";
        }
    },
    components:{

    },
    computed:{
        lists(){
            fetch("./admin_product.json?v="+nos).then((pdata) => {
                return pdata.json();
            }).then((db) => {
                this.word = wd;
                this.ea = db.length;
                if(this.ea == 0){
                    this.part = 2; // 등록된 게시물 없을 경우
                }
                else{
                    if(this.word == ""){
                        this.arrays = db.slice(start_page,slice_page);
                        this.paging = Math.ceil(this.ea / viewpage);
                        this.ea = this.ea - start_page;
                    }
                    else{ // 검색어가 있을 경우 재배열
                        var z = ""; // 배열값에 맞는 단어가 있는지 없는지 체크하는 변수
                        this.warrays = db.filter(function(a1,a2,a3){
                            z = a1.productnm.indexOf(wd);
                            if(z != -1){
                                return a1.productnm;
                            }
                        });
                        this.ea = this.warrays.length;
                        this.arrays = this.warrays.slice(start_page,slice_page);
                        this.paging = Math.ceil(this.ea / viewpage);
                        this.ea = this.ea - start_page;
                    }
                }
            })
            .catch((error) => {
                console.log("DATA ERROR")
            })
        }
    }
})