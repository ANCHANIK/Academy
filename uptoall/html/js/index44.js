            /*
            idcheck 함수를 이용해 id 값 유무를 체크하는 문법을 제작하라
            "아이디를 입력해 주세요", "해당 아이디는 중복되지 않습니다."
            */
            //var sign = "no";


            function idcheck(){
                var aa = document.getElementById("mid").value;
                var bb = "admin";
                //console.log(aa);
                if(aa==""){
                    alert("아이디를 입력해 주세요");
                }
                else{
                    if(aa==bb){
                        alert("해당 아이디는 사용할 수 없습니다.");
                    }
                    else{
                        document.getElementById("mid").readOnly = true;
                        alert("해당 아이디는 중복되지 않습니다.");
                        document.getElementById("sign").value = "yes";
                    }
                }
            }
            /*
            sign="no" 일 경우 "아이디를 중복체그 해야 회원가입이 가능합니다."
            sign="ok" 일 경우 "회원가입이 진행 됩니다."
            */
            function gopage(){
                var s = document.getElementById("sign").value;
                //if(sign=="no")
                if(s == "no"){
                    alert("아이디를 중복체그 해야 회원가입이 가능합니다.");
                }
                else{
                    alert("회원가입이 진행 됩니다.");
                    //sign = "ok";
                }
            }