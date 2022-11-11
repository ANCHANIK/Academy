let ql_vues = new Vue({
   el:"#QNA_list",
   data:{
      q_title:"Q&A 상품문의",
      nolist:false,
      qlist:true,
      q_p:"상품문의",
      qarray:[]
   },
   methods:{
      qna_register(){
         location.href = './shop_QA_config.html';
      },
      qamethod(dt){
         console.log(dt)
         for(let qw in dt){
            let year = dt[qw]["qaindate"].substring(0,4);
            let month = dt[qw]["qaindate"].substring(4,6);
            let day = dt[qw]["qaindate"].substring(6,8);
            let allday = year +"-"+ month +"-"+ day;
            this.qarray.push({
               date:allday,
               cate:dt[qw]["qacate"],
               subject:dt[qw]["qasubject"],
               name:dt[qw]["qaname"],
               respon:dt[qw]["qarespon"]
            })
         }
      }
   },
   components:{

   },
   computed:{
      QNALIST(){
         fetch("./qadata.json?v=<?php echo $v?>").then(function(qlist){
            return qlist.json();
         }).then(function(qna){
            ql_vues.qamethod(qna);
         })
         .catch(function(error){
            console.log("DATA ERROR");
         })
      }
   }
});