const isComplateDataType = (target) => (typeof target === 'object' || typeof target === 'function') && target !== null

const deepClone = function(obj, hash = new WeakMap()){
    if(obj.constructor === Date){
        return new Date(obj)
    }
    if(obj.constructor === RegExp){
        return new RegExp(obj)
    }
    // 解决循环引用
    if(hash.has(obj)) return hash.get(obj)
    // Object.assign()接口无法正确拷贝set属性和get属性的对象。
    // 因为assign做合并的时候，只能拷贝一个属性值，不会把它背后
    // 的赋值方法或者取值方法一同拷贝过来。所以在这种情况下，我
    // 们就可以用Object.getOwnPropertyDescriptors方法，配合
    // Object.defineProperties方法，实现克隆对象的功能。
    let allDes = Object.getOwnPropertyDescriptor(obj)
    //遍历传入参数所有键的特性
    let cloneTarget = Object.create( .getPrototypeOf(obj),allDes)
    //继承原型链
    hash.set(obj,cloneTarget)
    for (const key of Reflect.ownKeys(obj)) {
        cloneTarget[key] = (isComplateDataType(obj[key]) && typeof obj[key] !== 'function') ? deepClone(obj[key],hash): obj[key] 
    }
    return cloneTarget
}