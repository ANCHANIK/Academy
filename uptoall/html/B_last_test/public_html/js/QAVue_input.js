let ql_vues = new Vue({
    el:"#QNA_input",
    data:{
        qinput_title:"Q&A 상품문의",
        qi_title:"문의 제목",
        qi_cate:"문의 카테고리",
        qi_writer:"문의 작성자",
        qi_pass:"문의 비밀번호",
        qi_file:"문의 첨부파일",
        qi_text:"문의 내용",
        tx:"text",
        bt:"button",
        pw:"password",
        // value
        qa_subject:"",
        qa_cate:"",
        qa_name:"",
        qa_pass:"",
        qa_text:"",
        // 전달
        qp:"POST",
        qa:"qa_insert.php",
        qenc:"multipart/form-data"
    },
    methods:{
        QNA_LIST(){
            history.back(-1);
        },
        QNA_submit(){
            if(this.qa_subject == ""){
                alert("문의 제목을 입력해 주세요");
                this.$refs.qa_subject.focus();
            }
            else if(this.qa_cate == ""){
                alert("카테고리를 선택해 주세요");
            }
            else if(this.qa_name == ""){
                alert("고객명을 선택해 주세요");
                this.$refs.qa_name.focus();
            }
            else if(this.qa_pass == ""){
                alert("비밀번호를 선택해 주세요");
                this.$refs.qa_pass.focus();
            }
            else if(this.qa_text == ""){
                alert("문의 내용을 입력해 주세요");
                this.$refs.qa_text.focus();
            }
            else{
                qainput.method = this.qp;
                qainput.action = this.qa;
                qainput.enctype = this.qenc;
                qainput.submit();
            }
        }
    },
    components:{

    },
    computed:{

    }
});