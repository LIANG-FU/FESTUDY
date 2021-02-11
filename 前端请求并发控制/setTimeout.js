let startTime = Date.now()

const timeout = function(timeout, ret){
    return (idx) => 
        new Promise((resolve)=>{
            setTimeout(()=>{
                const compare = Date.now() - startTime;
                console.log(`At ${Math.floor(compare / 100)}00 return`, ret)
                resolve(idx)
            }, timeout)
        })
}

class Concurrent {
    maxConcurrent = 2
    constructor(count){
        this.maxConcurrent = count
    }
    async useRace(fnc){
        let curQueue = []
        for(let i = 0; i < this.maxConcurrent && fnc.length; i++){
            curQueue.push(fnc.shift()(i))
        }
        const handle = async function(){
            if(fnc.length){
                let idx = await Promise.race(curQueue)
                let next = fnc.shift()
                curQueue.splice(idx,1,next(idx))
                handle()
            }else{
                await Promise.all(curQueue)
            }
        }
        handle()
    }
}



const timeout1 = timeout(1000, 1);
const timeout2 = timeout(300, 2);
const timeout3 = timeout(400, 3);
const timeout4 = timeout(500, 4);
const timeout5 = timeout(200, 5);

const run = async () => {
    const concurrent = new Concurrent(2)
    startTime = Date.now()
    await concurrent.useRace([timeout1,timeout2,timeout3,timeout4,timeout5])
}
run()




