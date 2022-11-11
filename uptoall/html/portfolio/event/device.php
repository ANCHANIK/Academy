<?php
$agent = array("iPhone","iPod","Android","Blackberry","Opera Mini","Windows ce","Nokia","sony");
$checkmobile = false;

for($i=0;$i<sizeof($agent);$i++){
    if(stripos($_SERVER['HTTP_USER_AGENT'],$agent[$i])){
        $checkmobile = true;
        break;
    }
}

if($checkmobile == true){
    echo ("<script>location.href='mindex.html';</script>");
}
?>