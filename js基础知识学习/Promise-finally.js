// let a = new Promise((resolve,reject)=>{
//     resolve(1)
// })
// Promise.prototype.myFinally = function(callback){
//     let Promise = this.constructor;
//     this.then(
//         function(value){
//             Promise.resolve(callback()).then(
//                 function(){
//                     return value
//                 }
//             )
//         },
//         function(reason){
//             Promise.resolve(callback).then(
//                 function(){
//                     throw reason
//                 }
//             )
//         }
//     )
// }
// a.myFinally(res=>console.log('finally'))

let a = 0

function fn(){
    a++
    if(a === 1){
        throw new Error("给catch参数e的内容")
    }else{
        console.log(3)
    }
}
function fn2(){
    try {
        fn()
    } catch (err){
        fn2()
    }
}
fn2()
