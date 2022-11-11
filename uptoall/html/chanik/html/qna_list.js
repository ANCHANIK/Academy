let ql_vues = new Vue({
    el:"#qna_list",
    data:{
        q_title:"Q&A 상품문의",
        nolist:false,
        qlist:true,
        q_in:"text",
        q_sea:"submit",
        q_sea_nm:"검색",
        qna_array:[]
    },
    methods:{
        qna_register(){
            location.href = './qna_config.html';
        }
    },
    components:{

    },
    computed:{
        QNALIST(){
            fetch("./qna_list.json?v=<?php echo $data?>").then(function(qlist){
                return qlist.json();
            }).then(function(qray){
                console.log(qray)
                
            })
            .catch(function(error){
                console.log("DATA ERROR");
            })
        }
    }
});