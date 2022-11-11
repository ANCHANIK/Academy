// 한 페이지당 출력하는 목록 갯수
const viewpage = 10;
let pgno = 1; // 페이징 번호 1번 번호

// ----------- 검색어 -----------
let getpages = window.location.search;
let fwd = "";
if(getpages != ""){
    var fsplit = getpages.split("page=");
    var searchnm = getpages.split("fnm=");
    if(fsplit != ""){
        if(decodeURI(fsplit[1]) != "undefined"){
            pgno = Number(fsplit[1]);
        }
    }
    if(searchnm != ""){
        if(decodeURI(searchnm[1]) != "undefined"){
            fwd = decodeURI(searchnm[1]);
        }
        else{
            fwd = "";
        }
    }
}

let startpage = (pgno-1) * viewpage;
let endpage = viewpage * pgno;



//------------Jquery-------------



let faq_vue = new Vue({
    el:"#faq",
    data:{
        tx:"text",
        sb:"submit",
        bt:"button",
        hd:"hidden",
        sb_search:"검색",
        bt_alllist:"전체목록",
        f_if:1,
        farray:[],
        sfarray:[],
        btnarray:[],
        fdata:"",
        fword:"",
        fea:0,
        fpaging:0,
        ans:false,
        list_ea:""
    },
    methods:{
        // 전체목록
        faq_all_list(){
            location.href = './admin_faq.html';
        },
        //검색 버튼
        faq_search(){
            if(this.fword == ""){
                alert("검색 내용을 입력하세요");
                this.$refs.sch.focus();
            }
            else{
                ffrm.submit();
            }
        },
        // faq 등록 버튼
        faq_insert(){
            location.href = './faq_write.html';
        },
        // answer 출력 버튼
        faq_btn(ln){
            $(function(){
                $(".faq_list_tbody:eq("+ ln +") > tr:eq(1)").stop().slideToggle();
            });
        },
        // 수정 버튼
        faq_view(fno){
            console.log(fno)
            location.href = './admin_faqview.html?fidx='+fno;
        },
        // paging 버튼
        fgopaging(fnum){
            location.href = './admin_faq.html?page=' + fnum;
        },
        catebtn(btntext){
            let bnum = "";
            this.btnarray = this.fdata.filter(function(d1,d2,d3){
                bnum = d1.category.indexOf(btntext);
                if(bnum != -1){
                    return d1.fqtext;
                }
            });
            this.fea = this.btnarray.length;
            this.farray = this.btnarray.slice(startpage,endpage);
            this.fpaging = Math.ceil(this.fea/viewpage);
            this.fea = this.fea - startpage;
        }
    },
    components:{

    },
    computed:{
        faqdata(){
            fetch("./admin_faq.json?v="+nos).then((fd)=>{
                return fd.json();
            }).then((flist)=>{
                this.fdata = flist;
                this.fword = fwd;
                this.fea = flist.length; //23
                this.list_ea = flist.length;
                for(let fl in flist){
                    switch(flist[fl]["category"]){
                        case 1:
                            flist[fl]["category"] = "배송문의";
                        break;
                        case 2:
                            flist[fl]["category"] = "반품/교환/환불";
                        break;
                        case 3:
                            flist[fl]["category"] = "주문/결제";
                        break;
                        case 4:
                            flist[fl]["category"] = "회원서비스";
                        break;
                        case 5:
                            flist[fl]["category"] = "안전거래";
                        break;
                    }
                }
                if(this.fea == 0){
                    this.f_if = 2;
                }
                else {
                    if(this.fword == ""){
                        this.farray = flist.slice(startpage,endpage);
                        this.fpaging = Math.ceil(this.fea/viewpage);
                        this.fea = this.fea - startpage;
                    }
                    else{
                        var ck = "";
                        this.sfarray = flist.filter(function(d1,d2,d3){
                            ck = d1.fqtext.indexOf(fwd);
                            if(ck != -1){
                                return d1.fqtext;
                            }
                        });
                        this.fea = this.sfarray.length;
                        this.farray = this.sfarray.slice(startpage,endpage);
                        this.fpaging = Math.ceil(this.fea/viewpage);
                        this.fea = this.fea - startpage;
                    }
                }
            })
            .catch((error)=>{
                console.log("DATA ERROR");
            })
        }
    }
});