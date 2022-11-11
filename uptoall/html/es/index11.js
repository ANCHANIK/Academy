export let a = function(imgfile){
    
    
    
    // vue, js, es 모두 동일하게 사용 가능
    let v = new FileReader();  // 첨부파일을 읽는 기능

    v.onload = function(z){  // 암호코드화가 정확하게 로드가 됐을 때
        document.getElementById("imgs").style.display = "block";
        // console.log(z.target.result) // 암호화 되어 있음
        document.getElementById("imgs").src = z.target.result; // 해당 경로 전체를 말함
    }
    v.readAsDataURL(imgfile); // c:\바탕화면 => 암호코드화로 변경하게 된다.
}



document.querySelector("#img_file").addEventListener("change",function(imgdata){
    // 미리보기 기능시 change를 무조건 사용해야 함
    // console.log(imgdata.target.files[0])
    a(imgdata.target.files[0]);
    // target.files[0] : 이미지 첨부시 배열로 출력 [0] == name
})