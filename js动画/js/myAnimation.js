function getStyle(target, attr){
    if(target.currentStyle){
        // 针对IE浏览器
        return target.currentStyle[attr]
    }else{
        // 针对主流浏览器
        return getComputedStyle(target,null)[attr]
    }
}
function startAnimation(target, json, callback ,modulus=10){
    clearInterval(target.timer)
    target.timer = setInterval(function(){
        let cur = 0
        let flag = true
        for(let attr in json){
            if(attr == 'opacity'){
                cur = Math.round(parseFloat(getStyle(target,attr)) * 100)
            }else{
                cur = parseInt(getStyle(target,attr))
            }
            // 临界处理
            if(json[attr] !== cur){
                flag = false
            }
            let speed = (json[attr] - cur) / modulus
            speed = json[attr] > cur ? Math.ceil(speed) : Math.floor(speed)
            if(attr == 'opacity'){
                target.style[attr] = `alpha(opacity:${cur + speed})`
                target.style[attr] = (cur + speed)/100
            }else{
                target.style[attr] = cur + speed + 'px';
            }
        }
        if(flag){
            clearInterval(target.timer)
            callback && callback()
            return
        }
    },30)
}