let contents = "";
let pnew_vue = new Vue({
    el:"#new_pv",
    data:{
        WMSG:"(*)은 필수 입력사항 입니다.",
        p_code:"※ 해당 상품 코드는 8자리 자동 생성됩니다.",
        p_name:"※ 상품명은 150자까지 등록이 가능합니다.",
        p_expl:"※ 최대 200자 이내입니다.",
        p_ea:"※ 최대수량은 99999개 입니다.",
        pro_img:"※ JPG,BMP,PNG,JPEG,GIF 2MB 이하만 업로드 가능합니다. (500 * 500)",
        p_option:"※ 미 입력시 옵션은 출력되지 않습니다.",
        te:"text",
        random_code:"",
        pd_sale:false,
        p_btn:"button",
        mamg:"",
//---------- new vue ---------
        modyarr:[],
        midx:"",
        m_goodsno:"",
        m_url:"",
        pdc:false,
        pdpart:"P",
        pview:"",
        psview1:"",
        psview2:"",
        psview3:"",
//-------- 이미지 ---------
        pv:1,
//------추가 이미지 --------
        s_pv1:1,
        s_pv2:1,
        s_pv3:1,
        imgdel:"삭제",
        p_img:"",
        s_img1:"",
        s_img2:"",
        s_img3:"",
//---------- 입력 값 ----------
        nm:"",
        ex:"",
        pc:"",
        sl:"",
        pro_ea:"",
        p_de:"",
        op1:"",
        op2:"",
        op3:"",
        total_price:"",
        myurl:"http://cksdlr7446.dothome.co.kr",
        pm:"POST",
        pa:"./modify_productok.php",
        pe:"multipart/form-data"
    },
    methods:{
        sale_radio(str){
            if(str == "Y"){
                if(this.pc == ""){
                    alert("소비자 가격을 입력해 주세요!");
                    document.getElementsByName("product_dc")[1].checked = true;
                    this.$refs.money.focus();
                }
                else{
                    this.pd_sale = true;
                    document.getElementsByName("product_money")[0].readOnly = true;
                }
            }
            else{
                this.pd_sale = false;
                document.getElementsByName("product_money")[0].readOnly = false;
            }
        },
        // 상품 목록
        p_retu(){
            history.back(-1);
        },
        // 상품 수정
        pmodify(){
            this.p_de = CKEDITOR.instances.product_contents1.getData();
            if(this.nm == ""){
                alert("상품명을 입력하세요");
                this.$refs.name.focus();
            }
            else if(this.ex == ""){
                alert("간편설명을 입력하세요");
                this.$refs.explain.focus();
            }
            else if(this.pc == ""){
                alert("상품 가격을 입력하세요");
                this.$refs.money.focus();
            }
            else if(isNaN(this.pc) == true){
                alert("숫자만 입력하세요");
                this.$refs.money.focus();
            }
            else if(this.pro_ea == ""){
                alert("제품 수량을 입력하세요");
                this.$refs.ea.focus();
            }
            else if(isNaN(this.pro_ea) == true){
                alert("숫자만 입력하세요");
                this.$refs.money.focus();
            }
            else if(this.p_img == ""){
                alert("상품 대표 이미지를 업로하세요");
            }
            else if(this.op1 == "" || this.op2 == "" || this.op3 == ""){
                alert("상품 옵션명을 입력하세요");
            }
            else if(this.p_de == ""){
                alert("상품 상세 설명을 입력허세요");
                this.$refs.detail.focus();
            }
            else{
                product_register.method = this.pm;
                product_register.action = this.pa;
                product_register.enctype = this.pe;
                product_register.submit();
            }
        },
        total(){
            // this.pc 소지자 가격
            // this.sl 할인율
            let sale_pr = 0;
            if(document.getElementsByName("product_dcpart")[0].checked == true){
                sale_pr = Math.floor(Number(this.pc) - (Number(this.pc) * Number(this.sl/100))); // 원 단위 부터 올림
                // 영업팀과 회의 사항 : 원 단위 절삭 필요
                this.total_price = (Math.floor(sale_pr * 0.1) * 10);
            }
            else if(document.getElementsByName("product_dcpart")[1].checked == true){
                sale_pr = Number(this.pc) - Number(this.sl);
                this.total_price = sale_pr;
            }
        },
        // 이미지 삭제
        img_del(img_name){
            this.mamg = "";
            if(confirm("이미지를 삭제하시겠습니까?")){
                fetch("./files_del.php?tablenm=shop_product&pidx=" + this.midx + "&fieldnm= " + img_name)
                .then((call) => {
                    return call.json();
                }).then((sign) => {
                    if(sign == "success"){
                        switch(img_name){
                            case "product_img":
                            this.pv = 1;
                            break;
                            case "product_simg1":
                            this.s_pv1 = 1;
                            break;
                            case "product_simg2":
                            this.s_pv2 = 1;
                            break;
                            
                            case "product_simg3":
                            this.s_pv3 = 1;
                            break;
                        }
                    }
                })
                .catch(function(error){
                    console.log("DATA ERROR");
                })
                this.pv = 1;
                this.p_img = "";
                }
            },
    // 이미지 미리보기
        pre_img(data){
            window.open(data,"","width=700 height=700");
        }
    },
    components:{
        
    },
    computed:{
        product_code(){
            this.modyarr = arr_data;
            console.log(this.modyarr)
            if(this.modyarr == ""){
                alert(" 해당 데이터가 없습니다.");
                history.go(-1);
            }
            else{
                this.midx = this.modyarr[0]["pidx"];
                this.m_goodsno = this.modyarr[0]["goodsno"];
                this.nm = this.modyarr[0]["productnm"];
                this.ex = this.modyarr[0]["productnm_dtc"];
                this.pc = Number(this.modyarr[0]["product_money"]);
                this.mamg = this.modyarr[0]["product_img"];
                if(arr_data[0]["product_dc"] == "Y"){
                    this.pd_sale = true;
                    this.pdc = "Y";
                    if(arr_data[0]["product_dcpart"] == "M"){
                        this.pdpart = "M";
                        this.sl = this.modyarr[0]["product_dcnum"];
                    }
                    else{
                        this.sl = this.modyarr[0]["product_dcnum"];
                    }
                    this.total_price = this.modyarr[0]["product_sales"];
                }
                else{
                    this.pd_sale = false;
                    this.pdc = "N";
                }
                // 대표 이미지
                if(arr_data[0]["product_img"] != ""){
                    this.pview = arr_data[0]["product_img"];
                    this.p_img = arr_data[0]["product_img"];
                    this.pv = 2;
                }
                if(arr_data[0]["product_simg1"] != ""){
                    this.psview1 = arr_data[0]["product_simg1"];
                    this.s_img1 = arr_data[0]["product_simg1"];
                    this.s_pv1 = 2;
                }
                if(arr_data[0]["product_simg2"] != ""){
                    this.psview2 = arr_data[0]["product_simg2"];
                    this.s_img2 = arr_data[0]["product_simg2"];
                    this.s_pv2 = 2;
                }
                if(arr_data[0]["product_simg3"] != ""){
                    this.psview3 = arr_data[0]["product_simg3"];
                    this.s_img3 = arr_data[0]["product_simg3"];
                    this.s_pv3 = 2;
                }
                this.pro_ea = this.modyarr[0]["product_ea"];
                this.op1 = this.modyarr[0]["product_option1"];
                this.op2 = this.modyarr[0]["product_option2"];
                this.op3 = this.modyarr[0]["product_option3"];
                this.m_url = this.modyarr[0]["product_url"];
                contents = this.modyarr[0]["product_contents1"];
            }
        }
    }
});
