export function createRoute(record,location){
    let res = [];
    if(record){
        while(record){
            res.unshift(record)
            record = record.parent
        }
    }
    return {
        ...location,
        mathched:res
    }
}

export default class History {
    constructor(router){
        this.router = router
        // 默认路由应该保存一个当前路径，后续会更改这个路径
        this.current = createRoute(null,{
            path:'/'
        })
    }
    // 跳转的核心路径， location代表跳转的目的地  onComplate代表跳转成功后指定的方法
    transitionTo(location, onComplate){
        let route = this.router.match(location)  // 我要用当前的路径，找出对应的记录
        // 如果是相同路径，就不进行跳转了
        if(this.current.path === location && route.matched.length === this.current.matched.length){
            return
        }
        this.updateRoute(route)
        onComplate && onComplate()
    }
    updateRoute(route){
        this.current = route
        this.cb && this.cb(route)
    }
    listen(cb){
        this.cb = cb
    }
}