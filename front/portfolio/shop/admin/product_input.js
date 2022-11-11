let np_vue = new Vue({
    el:"#pd",
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
        nm:"",
        ex:"",
        pc:"",
        sl:"",
        pro_ea:"",
        p_img:"",
        psm1:"",
        psm2:"",
        psm3:"",
        p_de:"",
        op1:"",
        op2:"",
        op3:"",
        total_price:"",
        myurl:"http://cksdlr7446.dothome.co.kr",
        pm:"POST",
        pa:"./new_productok.php",
        pe:"multipart/form-data"
    },
    methods:{
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
        sale_radio(num){
            if(num == "1"){
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
        // 상품 등록
        p_regi(){
            if(this.nm == ""){
                alert("상품명을 입력해 주세요!");
                this.$refs.name.focus();
            }
            else if(this.ex == ""){
                alert("간편설명을 입력해 주세요!");
                this.$refs.explain.focus();
            }
            else if(this.pc == ""){
                alert("상품 가격을 입력해 주세요!");
                this.$refs.money.focus();
            }
            else if(isNaN(this.pc) == true){
                alert("숫자만 입력해 주세요!");
                this.$refs.money.focus();
            }
            else if(this.pro_ea == ""){
                alert("제품 수량을 입력해 주세요!");
                this.$refs.ea.focus();
            }
            else if(isNaN(this.pro_ea) == true){
                alert("숫자만 입력해 주세요!");
                this.$refs.money.focus();
            }
            else if(this.p_img == ""){
                alert("상품 대표 이미지를 업로드 해주세요!");
            }
            else if(this.op1 == "" || this.op2 == "" || this.op3 == ""){
                alert("상품 옵션명을 입력해 주세요!");
            }
            else if(this.p_de == ""){
                alert("상품 상세 설명을 입력해 주세요!");
                this.$refs.detail.focus();
            }
            else{
                product_register.method = this.pm;
                product_register.action = this.pa;
                product_register.enctype = this.pe;
                product_register.submit();
            }
        }
    },
    components:{

    },
    computed:{
        product_code(){
            let code = "";
            for(let i=0;i<8;i++){
                code += Math.floor(Math.random() * 10); 
            }
            this.random_code = Number(code);
        }
    }
});