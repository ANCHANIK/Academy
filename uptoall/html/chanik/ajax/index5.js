let banner_data;
function windowck(){
    if(window.XMLHttpRequest){
        return new XMLHttpRequest();
    }
}
function bannerlist(){
    if(banner_data.readyState == XMLHttpRequest.DONE && banner_data.status == 200){
        // console.log(this)
        banner(this);
    }
}
banner_data = windowck();
banner_data.onreadystatechange = bannerlist;
banner_data.open("GET","./banner.json",true);
banner_data.send();

var banner_li = "";
function banner(data){
    const bannerlist = JSON.parse(data.response);
    // console.log(bannerlist["mainbanner"]);
    Object.keys(bannerlist["mainbanner"]).forEach(function(data,node,array){
        // console.log(bannerlist["mainbanner"][data][0]);
        var banner_img = "<img src="+ bannerlist["mainbanner"][data][0] +">";
        banner_li += "<li>"+ banner_img +"</li>";
        document.getElementById("banner_ol").innerHTML = banner_li;
    })
}

$(function(){
    
    var $node = 0;
    var $banner_width = $("#banner_ol > li").width(); //1000
    var $banner_ea = $("#banner_ol > li").length; // 4
    console.log($banner_width);
    console.log($banner_ea);
    var $banner_ol_width = $banner_width * $banner_ea; // 4000
    $("#banner_ol").width($banner_ol_width);
    
    $("#r_btn").click(function(){
        if($node > $banner_ea-1){
            $ndoe = 0;
        }
        // $("#banner_disc > ul > li").eq($node).css("background-color","red");
        console.log($node)
        
        
        $node ++;
    });

});