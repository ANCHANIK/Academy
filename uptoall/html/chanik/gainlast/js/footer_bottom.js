function tels(){
    let telnum = document.getElementById("teling").outerText;
    location.href = "tel:" + telnum;
}

function footck(num){
    console.log(num)
    switch(num){
        case 1: //Q&A
            location.href = 'https://m.sonyunara.com/cs/index.php';
        break;
        case 2://미입금확인자
            location.href = 'https://m.sonyunara.com/cs/unknown.php';
        break;
        case 3://배송지연
            location.href = 'https://m.sonyunara.com/cs/delay.php';
        break;
        case 4://EVENT
            location.href = 'https://m.sonyunara.com/event/list.php';
        break;
        case 5://공지사항
            location.href = 'https://m.sonyunara.com/board/list.php?boardid=csnotice';
        break;
        case 6://아이디어/쓴소리
            location.href = 'https://m.sonyunara.com/board/list.php?boardid=cast';
        break;
        case 7://REVIEW
            location.href = 'https://m.sonyunara.com/review/review_index.php';
        break;
    }
}

$(function(){
    $(".e-box4 > ul > li").click(function(){
        let $golink = $(this).index();
        switch ($golink){
            case 0:
                location.href = 'https://m.sonyunara.com/intro/b2b.php';
            break;
            case 1:
                location.href = 'https://m.sonyunara.com/intro/membership_guide.php';
            break;
            case 2:
                location.href = 'https://m.sonyunara.com/intro/use.php';
            break;
            case 3:
                location.href = 'https://m.sonyunara.com/intro/privacy.php';
            break;
            case 4:
                location.href = 'https://m.sonyunara.com/intro/proposal.php';
            break;
            case 5:
                location.href = 'https://m.sonyunara.com/intro/model.php';
            break;
        }
    });
});