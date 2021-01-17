console.log('vite-server-start')

const Koa = require('koa')
const { moduleResolvePlugin } = require('./serverPluginModuleResolve')
const moduleRewritePlugin = require('./serverPluginModuleReWrite')
const serverStaticPlugin = require('./serverPluginServerStatic')

function createServer(){
    const app = new Koa()

    // 实现静态服务 就是访问我们的服务器 可以返回对应的文件 koa-static

    const context = {  // 直接创建一个上下文 来给不同的插件共享功能
        app,
        root:process.cwd()
    }

    const resolvePlugin = [
        moduleRewritePlugin, // 重写请求的文件
        moduleResolvePlugin,
        serverStaticPlugin,   // 静态服务插件
    ]

    resolvePlugin.forEach(plugin=>plugin(context))


    return app
} 

createServer().listen(4000,()=>{
    console.log('vite start on 4000')
})