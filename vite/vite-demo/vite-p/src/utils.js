const {Readable} = require('stream')
async function readBody(stream){
    if(stream instanceof Readable){
        return new Promise((resolve,reject)=>{
            let res = ''
            stream.on('data',function(chuck){
                res += chuck
            })
            stream.on('end',function(){
                resolve(res)
            })
        })
    }else{
        return stream
    }
}

exports.readBody = readBody