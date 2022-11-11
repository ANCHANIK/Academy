let timer;
function slideUp(mid){
    let objects = document.getElementById(mid);
    console.log(objects.offsetHeight);
    // offset : 오브젝트의 크기, 위치 등의 값을 가져올 때 사용
    // offsetHeight
    let heights = objects.offsetHeight;
    timer = setInterval(slide,10);
    function slide(){
        heights--;
        if(heights <= 0){
            clearInterval(timer);
            objects.style.display = "none";
            document.getElementById("onbox").style.display = "block";
        }
        else{
            objects.style.overflow = "hidden";
            objects.style.height = heights + "px";
        }
        // console.log(typeof(height))
    }
}

/* slideDown Plug */
function slideDown(mid){
    let objects = document.getElementById(mid);
    let heights = objects.offsetHeight;
    // console.log(objects.offsetHeight);
    timer = setInterval(slide,10);
    function slide(){
        heights++;
        if(heights >= 100){
            clearInterval(timer);
        }
        else{
            objects.style.display = "block";
            objects.style.overflow = "hidden";
            objects.style.height = heights + "px";
        }
        // console.log(typeof(height))
    }
}