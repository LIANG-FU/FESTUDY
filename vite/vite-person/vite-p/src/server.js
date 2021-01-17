console.log('vite-server-start')

const Koa = require('koa')

function createServer(){
    const app = new Koa()

    // 实现静态服务 就是访问我们的服务器 可以返回对应的文件 koa-static

    const context = {  // 直接创建一个上下文 来给不同的插件共享功能
        app
    }

    const resolvePlugin = [

    ]

    resolvePlugin.forEach(plugin=>plugin(context))


    return app
} 

createServer().listen(4000,()=>{
    console.log('vite start on 4000')
})