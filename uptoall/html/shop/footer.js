$(function(){
    $("#copy_ol > li").bind({
        "mouseenter":function(){
            var $li = $(this).index();
            $(this).eq($li).stop().animate({
                "border-bottom":"4px",
            },700);
        }
    });
});