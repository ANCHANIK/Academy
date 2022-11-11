let login_form = new Vue({
    el:"#login_buisness_vue",
    data:{
        on:0,
        login_title:"회원 로그인",
        lo_memo:"※ 개인회원 및 사업자 회원을 선택한 후 로그인 하시면 됩니다",
        lo_name:"",
        lo_pass:"",
        bu_name:"",
        bu_num:"",
        bu_pass:"",
        lom:"POST",
        loa:"sign_ok.php",
        loenc:"application/x-www-form-urlencoded",
        alert:""
    },
    methods:{
        click_lo(no){
            if(no==0){
                this.on=0;
            }
            else{
                this.on=1;
            }
        },
        login(){
        let mailck1 = this.lo_name.match(/@/g);
        let mailck2 = this.lo_name.match(/.com/g);
        //console.log(this.lo_name.match(/@/g))   //null인지 확인
        if(this.lo_name == ""){
            this.alert="아이디를 입력해주세요";
            setTimeout(() => {
                this.alert="";
                this.$refs.alertre.style.height='0px';              
            }, 1000);
            this.$refs.person_id.focus();
            this.$refs.alertre.style.height='80px'
        }
        else if(this.lo_pass == ""){
            this.alert="패스워드를 입력해주세요";
            setTimeout(() => {
                this.alert="";
                this.$refs.alertre.style.height='0px';              
            }, 1000);
            this.$refs.person_pw.focus();
            this.$refs.alertre.style.height='80px'
        }
        else{
            lofrm.method = this.lom;
            lofrm.action = this.loa;
            lofrm.enctype = this.loenc;
            lofrm.submit();
            }  
        },
        login_buisness(){
            let mailck1 = this.bu_name.match(/@/g);
            let mailck2 = this.bu_name.match(/.com/g);
            //console.log(this.lo_name.match(/@/g))   //null인지 확인 
            let num1 = this.bu_num.match(/[ㄱ-ㅎ, 가-하, a-z, A-Z]/g);
            let num2 = this.bu_num.match(/-/g); 
        
            if(!this.bu_name){
                alert("사업자 이메일을 입력하세요");
                this.$refs.bu_name.focus();
            }
            else if(mailck1==null || mailck2==null){
                alert("올바른 형식의 이메일을 입력하세요");
                this.$refs.bu_name.focus();
                
            }
            else if(!this.bu_num){
                alert("사업자 번호를 입력하세요");
                this.$refs.bu_num.focus();
            }
            else if(num1!=null){
                alert("정확한 사업자 번호를 입력하세요");
                this.$refs.bu_num.focus();
            }
            else if(num2!=null){
                alert( '"-"를 빼고 입력해주세요');
                this.$refs.bu_num.focus();
            }
            else if(!this.bu_pass){
                alert("패스워드를입력하세요");
                this.$refs.bu_pass.focus();
            }
            else{
                this.alert("렬루 사업자 마즘? 아닌거가툰뎁😒\n일단 들어오셈😤");
            }
        },
    },
    components:{

    },
    computed:{

    }
})