let bg = new Vue({
    el:"#bargin",
    data:{
        sb:"./img/sobanner.png",
        sb1:"./img/sobanner1.png",
        sb2:"./img/sobanner2.png",
        sb3:"./img/sobanner3.png"
    },
    methods:{
        golink(num){
            console.log(num)
            switch(num){
                case "1":
                    location.href = 'https://m.bluepops.co.kr/product/list.html?cate_no=65';
                break;
                case "2":
                    location.href = 'https://m.bluepops.co.kr/product/list.html?cate_no=75';
                break;
                case "3":
                    location.href = 'https://m.bluepops.co.kr/product/list.html?cate_no=77';
                break;
                case "4":
                    location.href = 'https://m.bluepops.co.kr/product/list_thumb.html?cate_no=54';
                break;
            }
        }
    },
    components:{

    },
    computed:{

    }
});