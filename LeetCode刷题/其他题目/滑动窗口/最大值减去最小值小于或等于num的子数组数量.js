// 最大值减去最小值小于或等于num的子数组数量
// [题目]
// 给定数组arr和整数num,共返回有多少个子数组满足如下情况:
// max (arr[i..j]) - min(arr[i..j]) <= num
// max (arr[i... j])表示子数组arr[i.. j]中的最大值，min(arr[i.. j])表
// 示子数组arr[i... j]中的最小值。
// [要求]
// 如果数组:长度为N，请实现时间复杂度为0 (N)的解法。

function getNum(arr, num){
    const qmax = []
    const qmin = []
    const res = 0
    let l = 0, r = 0, len = arr.length;
    while(l < len){
        while(r < len){
            while(qmax.length > 0 && arr[qmax[qmax.length-1]] <= arr[r]){
                qmax.pop();
            }
            qmax.push(r)
            while(qmin.length > 0 && arr[qmin[qmin.length-1]] >= arr[r]){
                qmin.pop()
            }
            qmin.push(r)
            if(arr[qmax[0]] - arr[qmin[0]] > num){
                break
            }
            r++
        }
        if(qmin[0] == l){
            qmin.shift()
        }
        if(qmax[0] == l){
            qmax.shift()
        }
        res+=r-l
        l++
    }

}

console.log(getNum([]))