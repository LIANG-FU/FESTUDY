const reg = /^\/@modules\//

function moduleResolvePlugin({app,root}){
    app.use(async (ctx, next)=>{

        // 如果没有匹配到 /@modules 就往下执行即可
        if(!(reg.test(ctx.path))){
            return next();
        }
        const id = ctx.path.replace(reg,'')
        ctx.type = 'js'

    })
}

exports.moduleResolvePlugin = moduleResolvePlugin