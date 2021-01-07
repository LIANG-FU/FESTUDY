var maxSlidingWindow = function(nums, k) {
    // 存窗口下标
    let qmax = []
    const maxArr = []
    for(let i = 0; i < nums.length; i++){
        if(qmax.length == 0){
            qmax.push(i)
        }else{
            while(nums[qmax[qmax.length-1]]<=nums[i]){
                qmax.pop()
            }
            if(i-qmax[0] >= k){
                qmax.shift()
            }
            qmax.push(i)
        }
        if(i>=k-1){
            maxArr.push(nums[qmax[0]])
        }
    }
    return maxArr;
};

console.log(maxSlidingWindow([1,-1],1))