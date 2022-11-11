let array = [1,4,2,5,3];

for(let a in array){
    
    for(let b in array[a]){
        
        if(b%2 == 0){
            console.log(array[a])
            
        }
    }
}