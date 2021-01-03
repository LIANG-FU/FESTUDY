function getIndexOf(str1,str2){
    let str1Arr = str1.split('');
    let str2Arr = str2.split('');
    let i1 = 0;
    let i2 = 0;
    let nextArr = getNextArray(str2Arr)
    while(i1 < str1.length && i2 < str2.length){
        if(str1Arr[i1] == str2Arr[i2]){
            i1++;
            i2++;
        }else{
            if(next[i2]==-1){
                i1++
            }else{
                i2 = nextArr[i2]
            }
        }
    }
    return i2 == str2.length ? i1 - i2 : -1
}

function getNextArray(str){
    if(str.length==0){
        return [-1]
    }else{
        
    }
}