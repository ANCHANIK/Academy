let viewpage = 5; // 페이지에 출력될 배열 갯수
let pano = 1;

let geturl = window.location.search;
let mwd = "";
let sel_part = "";
if(geturl != ""){
    var nsplit = geturl.split("page=");
    var searchnm = geturl.split("&stext=");
    var searchnm_1 = searchnm[0].split("search_part=");
    var spart = geturl.split("stext=");

    // 페이징 넘버
    if(nsplit != ""){
        if(decodeURI(nsplit[1]) != "undefined"){
            pano = Number(nsplit[1]);
        }
    }

    // 회원 검색 select
    if(searchnm_1[1] != ""){
        if(searchnm_1[1] == "sid"){
            sel_part = searchnm_1[1];
        }
        else if(searchnm_1[1] == "sname"){
            sel_part = searchnm_1[1];
        }
        else if(searchnm_1[1] == "stel"){
            sel_part = searchnm_1[1];
        }
    }

    // 회원 검색 내용
    if(spart[1] != ""){
        if(decodeURI(spart[1]) != "undefined"){
            mwd = decodeURI(spart[1]);
        }
        else{
            mwd = "";
        }
    }
    else if(spart[1] == ""){
        mwd = "";
    }
}
else{
    sel_part = "sid"
}
let start_page = (pano-1) * viewpage;
let end_page = pano * viewpage;

//------------------------ Vue -------------------------
let mem_Vue = new Vue({
    el:"#listview",
    data:{
        // base data
        ch:"checkbox",
        te:"text",
        sb:"submit",
        bt:"button",
        rd:"radio",
        lawtext:"※ 회원자료 삭제시 다른 회원이 기존 회원 아이디를 사용하지 못하도록 회원 아이디, 이름, 닉네임은 삭제하지 않고 영구 보관합니다.",
        allmember:"",
        //검색값
        mem_search:"",
        search_part:"",
        sea_pa:"",
        // 배열
        mea:"",
        ml:1,
        marray:[],
        mpaging:[],
        pmarray:[],
        accept_ck:[],
        agree_ck:[],
        sms_ck:[],

    },
    methods:{
        // 회원검색
        member_search(){
            if(this.mem_search == ""){
                alert("검색할 내용을 입력하세요");
                this.$refs.memsea.focus();
            }
            else{
                sform.submit();
            }
        },
        // 데이터 수정/삭제 버튼
        modi_del(btn_num){
            switch (btn_num){
                case 1:
                    if(confirm("해당 데이터를 수정 하시겠습니까?")){
                        mfrm.action = "member_modify.php";
                        mfrm.submit();
                    }
                break;
        
                case 2:
                    if(confirm("해당 데이터를 삭제시 복구되지 않습니다.\n그래도 삭제를 하시겠습니까?")){
                        mfrm.action = "member_del.php";
                        mfrm.submit();
                    }
                break;
        
                case 3:
                    if(confirm("데이터 전체 삭제를 하시겠습니까?")){
                        alert("최고 관리자 외에는 삭제하실 수 없습니다.");
                    }
                break;
            }
        },
        // 회원 추가 버튼
        add_member(){
            window.open("../member_join.html","","width=1100, height=1000, scrollbars=auto");
        },
        // 전체체크
        all_list(n){
            if(n.target.checked == true){
                for(let ac in this.marray){
                    document.querySelectorAll(".memck")[ac].checked = true;
                }
            }
            else{
                for(let ac in this.marray){
                    document.querySelectorAll(".memck")[ac].checked = false;
                }
            }
        },
        // paging 이동
        mpagego(mnum){
            location.href = 'admin_member.html?page='+mnum;
        },
        // 개별체크
        userck(n){
            document.getElementById("allcheck").checked = false;
        }
    },
    components:{

    },
    computed:{
        tableData(){
            fetch("../shop_members.json?v="+nos).then((td) => {
                return td.json();
            }).then((ml_data) => {
                this.marray = ml_data;
                for(let rd in ml_data){
                    if(this.marray[rd]["mail_accept"] == "Y"){
                        this.accept_ck.push(this.marray[rd]["midx"]);
                    }
                    if(this.marray[rd]["mail_agree"] == "Y"){
                        this.agree_ck.push(this.marray[rd]["midx"]);
                    }
                    if(this.marray[rd]["sms_agree"] == "Y"){
                        this.sms_ck.push(this.marray[rd]["midx"]);
                    }
                }
                this.mem_search = mwd;
                this.sea_pa = sel_part;
                this.mea = ml_data.length;
                this.allmember = ml_data.length;
                if(this.mea == 0 ){
                    this.ml == 2
                }
                else {
                    if(this.mem_search == ""){
                        this.marray = ml_data.slice(start_page,end_page);
                        this.mpaging = Math.ceil(this.mea/viewpage);
                        this.mea = this.mea - start_page;
                        this.sea_pa = sel_part;
                    }
                    else{
                        if(this.sea_pa == "sid"){
                            let ma = "";
                            this.pmarray = ml_data.filter(function(d1,d2,d3){
                                ma = d1.user_id.indexOf(mwd);
                                console.log(ma)
                                if(ma != -1){
                                    return d1.user_id;
                                }
                            });
                            this.mea = this.pmarray.length;
                            this.marray = this.pmarray.slice(start_page,end_page);
                            this.mpaging = Math.ceil(this.mea/viewpage);
                            this.mea = this.mea - start_page;
                        }
                        else if(this.sea_pa == "sname"){
                            let ma = "";
                            this.pmarray = ml_data.filter(function(d1,d2,d3){
                                ma = d1.user_name.indexOf(mwd);
                                console.log(ma)
                                if(ma != -1){
                                    return d1.user_name;
                                }
                            });
                            this.mea = this.pmarray.length;
                            this.marray = this.pmarray.slice(start_page,end_page);
                            this.mpaging = Math.ceil(this.mea/viewpage);
                            this.mea = this.mea - start_page;
                        }
                        else if(this.sea_pa == "stel"){
                            let ma = "";
                            this.pmarray = ml_data.filter(function(d1,d2,d3){
                                ma = d1.user_tel.indexOf(mwd);
                                console.log(ma)
                                if(ma != -1){
                                    return d1.user_tel;
                                }
                            });
                            this.mea = this.pmarray.length;
                            this.marray = this.pmarray.slice(start_page,end_page);
                            this.mpaging = Math.ceil(this.mea/viewpage);
                            this.mea = this.mea - start_page;
                        }
                    }
                }
            })
            .catch((error) => {
                console.log("DATA ERROR")
            })
        }
    }
});