$(function(){
    
    let $copydata;
    $.fn.footerajax = function(){
        $.ajax({
            url:"./json/hello_copyright.json",
            cache:false,
            data:"GET",
            dataType:"JSON",
            success:function($cr){
                $.fn.footerdata($cr);
            },
            error:function(){
                console.log("DATA ERROR");
            }
        })
    }
    $.fn.footerajax();

    $.fn.footerdata = function($cr){
        $copydata = $cr;
        $("#company").text($copydata[0]["company"]);
        $("#owner").text($copydata[1]["owner"]);
        $("#officer").text($copydata[2]["officer"]);
        $("#business_no").text($copydata[3]["business_no"]);
        $("#mail_order_license").text($copydata[4]["mail_order_license"]);
        $("#address").text($copydata[5]["address"]);
        $("#cs_center").text($copydata[6]["cs_center"]);
        $("#bank_name1").text($copydata[7]["account_bank"][0]["bank_name"]);
        $("#bank_name2").text($copydata[7]["account_bank"][1]["bank_name"]);
        $("#bank_no1").text($copydata[8]["account_bankno"][0]["bank_no"]);
        $("#bank_no2").text($copydata[8]["account_bankno"][1]["bank_no"]);
    }

    let $timer;
    var $node = 1;
    $.fn.logoswitch = function(){
        $timer = setInterval(function(){
            if($node > 1){
                $node = 0;
            }
            $("#pet_footer_logo > span").fadeOut(500);
            $("#pet_footer_logo > span").eq($node).fadeIn(500);
            $node += 1;
            // $("#pet_footer_logo > span").eq($node - 1).fadeOut(500);
            
            // console.log($node);
        },10000);
    }
    setTimeout($.fn.logoswitch);

})