const _new = function(ctor, ...args){
    if(typeof ctor != 'function'){
        throw 'ctor must be a funciont'
    }
    let obj = Object.setPrototypeOf({},ctor.prototype)
    let res = ctor.call(obj,...args)
    let isObject = typeof res === 'object' && res != null;
    let isComplate = typeof res === 'function'
    return isObject && isComplate ? res : obj
}

function Fn(a,b){
    this.a = a
    this.b = b
    return {a:1}
}

const fn = new Fn(1, 2)
console.log(fn)