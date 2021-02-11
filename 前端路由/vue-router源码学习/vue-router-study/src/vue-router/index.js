import HashHistory from './history/hash.js'
import {createRoute} from './history/base.js'

import RouterView from './components/view'
export default class VueRouter {
    constructor(options){
        // 1.什么是路由  核心根据不同的路径跳转不同的组件
        // 将用户传入的router转化成好维护的结构

        // match 负责匹配路径 {'/': '记录', 'about':'记录'}
        // addRoutes  动态添加路由配置

        this.matcher = createMatcher(options.routes || [])


        // 创建路由系统, 根据模式 来创建不同的路由对象
        this.mode = options.mode || 'hash'

        this.history = new HashHistory(this)
    }


    init(app){    // app指代的是根实例
        // 如何初始化  先根据当前的路径， 显示到指定的组件 
        const history = this.history
        const setupHashListener = () => {
            history.setupListener()
        }
        history.transitionTo(history.getCurrentLocation(),setupHashListener)
        history.listen((route)=>{
            app._route = route
        })
    }
    
    match(location){
        return this.matcher.match(location)
    }
    
}



// 安装插件，这个插件应该依赖于vue
VueRouter.install = function(Vue){
    Vue.mixin({
        beforeCreate() {
            console.log(this.$options.name)
            if(this.$options.router){  // 根实例
                this._routerRoot = this.router
                this._router = this.$options.router
                this._router.init(this)  // 初始化方法

                Vue.util.defineReactive(this,'_route',this._router.history.current)
            }else{
                this._routerRoot = this.$parent && this.$parent._routerRoot
            }
        },
    })

    Object.defineProperty(Vue.prototype, "$route", {
        get() {
            return this._routerRoot._route
        }
    })
    Object.defineProperty(Vue.prototype, "$router", {
        get() {
            return this._routerRoot._router
        }
    })
    Vue.component('RouterView',RouterView)
    // 1.注册全局属性  $route  $router
    // 2.注册全局指令  v-scroll
    // 3.注册全局的组件  router-view  router-link
}


function createMatcher(routes){
    // routes: 用户当前传入的配置

    // 扁平化用户传入的数据，创建路由映射表
    let {pathList, pathMap} = createRouteMap(routes)   // 初始化配置

    // 动态添加的方法
    function addRoutes(routes){  // 添加新的配置
        createMatcher(routes, pathList, pathMap)
    }


    // 用来匹配路径的方法
    function match(location){
        // 找到当前的记录


        let record = pathMap[location]
        let local = {
            path: location
        }
        console.log(location,local)
        // 1.需要找到对应的记录，并且根据记录产生一个匹配数组
        if(record){
            return createRoute(record,local)
        }

        return createRoute(null,local)
    }

    return {
        match,
        addRoutes
    }

}

// 将用户传入的数据进行格式化
function createRouteMap(routes, oldPathList, oldPathMap){
    let pathList = oldPathList || []
    let pathMap = oldPathMap || Object.create(null)
    routes.forEach(route => {
        addRouteRecord(route, pathList, pathMap)
    })
    return {
        pathList,
        pathMap
    }
}

function addRouteRecord(route, pathList, pathMap,parent){
    let path =parent ? `${parent.path}/${route.path}` : route.path
    let record = {
        path,
        component: route.component,
        parent
    }
    if(!pathMap[path]){
        pathList.push(path)
        pathMap[path] = record
    }
    if(route.children){
        route.children.forEach(child=>{
            addRouteRecord(child,pathList, pathMap,record)
        })
    }
}
