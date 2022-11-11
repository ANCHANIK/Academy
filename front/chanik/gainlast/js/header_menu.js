$(function(){
    $("#login").click(function(){
        $("#mem_login").fadeIn(650);
    })
    $("#join").click(function(){
        $("#mem_login").fadeIn(650);
        // location.href = './pop_member.html';
    });
    $("#orderLookup").click(function(){
        location.href = './cart.html'
    });
})