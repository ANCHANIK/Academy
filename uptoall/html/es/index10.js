export let js = function(){
    // ajax로 json을 가져옴.
    // vue형태와 동일함
    fetch("../ajax/news.json").then(function(aa){
        return aa.json();
    })
    .then(function(bb){
        console.log(bb);
    })
    .catch(function(error){
        console.log("DATA ERROR");
    })
    /*
    fetch("../ajax/news.json")
    .then(response => response.json())
    .then(aa => console.log(aa))
    .catch(error => console.log("DATA ERROR"));
    */
}