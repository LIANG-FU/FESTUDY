const shallowClone = function(target){
    if(typeof target != 'object' || target !== null){
        const cloneTarget = Array.isArray(target) ? [] : {}
        for (const k in target) {
            if (Object.hasOwnProperty.call(target, k)) {
                res[k] = target[k]
            }
        }
        return cloneTarget
    }else{
        return target
    }
}
