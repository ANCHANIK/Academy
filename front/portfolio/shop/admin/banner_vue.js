// 배너 신규등록 파트
let vue_banner = new Vue({
    el:"#banner",
    data:{
        tx:"text",
        bt:"button",
        fl:"file",
        bn:"",
        basic_text:"*업로드 배너 용량은 3MB 이하 입니다.",
        upload_text:"",
        bname:"",
        blink:"",
        bimg:"",
        myurl:"http://cksdlr7446.dothome.co.kr",
        m:"POST",
        a:"banner_input.php",
        enc:"multipart/form-data"

    },
    methods:{
        banner_register(){
            if(this.bname == ""){
                alert("배너명을 입력해 주세요!");
                this.$refs.fn.focus();
            }
            else if(this.blink == ""){
                alert("링크를 입력해 주세요!")
                this.$refs.fb.focus();
            }
            else if(this.bimg == ""){
                this.basic_text = "";
                this.upload_text = "파일을 업로드 해주세요!";
            }
            else{
                banner_register.method = this.m;
                banner_register.action = this.a;
                banner_register.enctype = this.enc;
                banner_register.submit();
            }
        }
    },
    components:{

    },
    computed:{

    }
});

