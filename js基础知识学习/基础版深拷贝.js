// 真的吗？
// 这个深拷贝函数并不能复制不可枚举的属性以及 Symbol 类型；

// 这种方法只是针对普通的引用类型的值做递归复制，而对于 Array、Date、RegExp、Error、Function 这样的引用类型并不能正确地拷贝；

// 对象的属性里面成环，即循环引用没有解决。

const deepClone_base = function(target){
    if(typeof target!= 'object' && target !== null){
        const cloneTarget = Array.isArray(target) ? [] : {}
        for (const k in target) {
            target[k] == deepClone_base[target[k]]
        }
        return cloneTarget
    }else{
        return target
    }
}
const fn = function(){
    console.log(1)
}
const date = new Date()
const t = [12,[12,{1:12,3:date,4:fn}]]
t[1][1][1] = t;

console.log(deepClone_base(t)[1][1][4]())


