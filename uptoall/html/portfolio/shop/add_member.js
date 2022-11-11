$(function(){
    
    $("#personal_join").click(function(){
        let $mid = $("#M_id").val();
        let $match = /^(?=.*[!@#$%^&*+-=`.,?"])/;
        let $match_lang = /^(?=.*[a-zA-Z가-힣])/g;

        if($("#M_id").val() == ""){
            alert("아이디를 입력하세요");
            $("#M_id").focus();
        }
        else if($("#M_pass").val() == "" || $("#M_pass_ck").val() == ""){
            alert("패스워드 및 동일한 패스워드를 입력하세요");
            $("#M_pass").focus();

        }
        else{
            if($("#M_id").val().length < 4){
                alert("아이디는 최소 3자 이상 입력하세요");
                $(this).focus();
            }
            else{
                let $match = /^(?=.*[~!@#$%^&*+-=`.,?"])/;
                if($match.test($("#M_id").val()) == true){
                    alert("아이디는 '_' 외에 다른 특수문자는 사용할 수 없습니다");
                    $("#M_id").val() = "";
                    $("#M_id").fucus()
                }
                else{
                    if($("#M_pass").val() != $("#M_pass_ck").val()){
                    alert("동일한 패스워드를 입력하세요");
                    $("#M_pass").val() = "";
                    $("#M_pass").focus()
                    } 
                    else{
                        $.fn.info2();
                    }
                }
                
            }
        }
    });

    $.fn.info2 = function(){
        
        if($("#M_name").val() == ""){
            alert("이름을 입력하세요");
        }
        else if($("#M_nick").val() == ""){
            alert("닉네임을 입력하세요");
        }
        else if($("#M_email").val() == ""){
            alert("이메일을 입력하세요");
        }
        else if($("#M_tel").val() == ""){
            alert("휴대폰 번호를 입력하세요");
        }
        else if($("#M_post").val() == ""){
            alert("도로명 주소를 검색하세요");
        }
        else if($("#M_addr").val() == ""){
            alert("상세주소를 입력하세요");
        }
        else if($("#M_security").val() == ""){
            alert("보안코드를 입력하세요");
        }
        else{
            $.fn.etc();
        }
    }
    $.fn.etc = function(){
        if($("#M_nick").val() != ""){
            let $match = /^(?=.*[!@#$%^&*+-=`.,_?"])/;
            if($match.test($("#M_nick").val()) == true){
                alert("특수문자는 사용할 수 없습니다");
            }
            else if($("#M_nick").val().length < 2){
                alert("닉네임은 2자 이상 입력하세요");
            }
            else{
                let $ck = /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*.[0-9a-zA-Z]/g;
                if($("#M_email").val().match($ck) == null){
                    alert("올바른 이메일 주소를 입력하세요");
                }
                else{
                    mfrm.submit();
                }
            }
        }
    }
});