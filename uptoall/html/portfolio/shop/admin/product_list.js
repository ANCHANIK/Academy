let days = new Date();  // 데이터 갱신
var nos = days.getMonth() + '' +  days.getDay() + '' + ('0' + days.getHours()).slice(-2) + '' + ('0' + days.getMinutes()).slice(-2) + '' + ('0' + days.getSeconds()).slice(-2);

//--------------------- 페이지 번호 -----------------------------
const viewpage = 3; // 페이지 당 출력 목록 갯수
let getpage = window.location.search;
let pgno = 1;
if(getpage != ""){
    var psplit = getpage.split("page=");
    pgno = psplit[1];
}
let start_page = (pgno-1) * viewpage;
let slice_page = viewpage * pgno;


//---------------------- 상품 이름 검색 부분 ----------------------
let wd = "";
let search_pnm = window.location.search;

if(search_pnm!=""){
    var spnm = search_pnm.split("?pnm=");
    if(spnm!=""){
        if(decodeURI(spnm[1])!="undefined"){
            wd = decodeURI(spnm[1]);
        }
    }
    else{
        wd = "";
    }
}

//---------------------------- Vue Part ---------------------------
let p_list = new Vue({
    el:"#pd",
    data:{
        product_arr:[],
        tx:"text",
        sbtn:"submit",
        cbtn:"button",
        btn_nm:"상품검색",
        pro_sign:"상품등록",
        hd:"hidden",
        ea:0,
        p_list_nodata:false,
        p_list_data:true,
        cow_search:"",
        paging:0,
        cm:"GET",
        ca:"admin_product.html",
        cenc:"application/x-www-form-urlencoded"
    },
    methods:{
        popup_pro(imgsrc){
            window.open(imgsrc,"","_blank");
        },
        new_pro(){
            location.href = 'admin_newproduct.html'
        },
        pro_search(){
            if(this.cow_search == ""){
                alert("상품명을 검색해 주세요!");
                this.$refs.pnm.focus();
            }
            else{
                cfrm.method = this.cm;
                cfrm.action = this.ca;
                cfrm.enctype = this.cenc;
                cfrm.submit();
            }
        },
        product_del(pro_num){
            if(confirm("해당 상품을 삭제하면 복구되지 않습니다\n그래도 삭제하시겠습니까?")){
                // location.href = 'product_listdel.php?idxs='+ pro_num +'&callsign=pdel_sign';
                console.log(pro_num);
            }
        },
        gopage(pnum){
            location.href = './admin_product.html?page=' + pnum;
        },
        productsearch(productdata){
            let sea;
            let url = window.location.search;
            let url_s = url.split("?pnm=");
            let pro_sea = decodeURI(url_s[1]); // 상품 검색값
            console.log(pro_sea);
            for(sea in productdata){
                
                console.log(sea)
            }
            console.log(productdata);
        }
    },
    components:{

    },
    computed:{
        productlist(){
            if(this.p_list_data == true){
                this.p_list_nodata = false;
            }
            else{
                this.p_list_nodata = true;
            }
        },
        product_ajax(){
            fetch("./admin_product.json?v="+nos).then((p_data)=>{
                return p_data.json();
            }).then((parray)=>{
                this.ea = parray.length;
                p_list.productsearch(parray);
                let num = 1;
                let p;
                if(this.ea == 0){
                    this.p_list_nodata = true;
                }
                else{
                    this.cow_search = wd;
                    let slice_arr = parray.slice(start_page,slice_page);
                    this.paging = this.ea / viewpage;
                    this.product_arr = slice_arr;
                    this.ea = this.ea - start_page;
                }
            })
            .catch(function(error){
                console.log("DATA ERROR");
            })
        }
    }
});

