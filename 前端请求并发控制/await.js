class Concurrent {
    maxConcurrent = 2;
    list = [];
    currentCount = 0;

    constructor(count){
        this.maxConcurrent = count
    }

    async add(fn){
        this.currentCount++
        if(this.currentCount > this.maxConcurrent){
            const wait = new Promise(resolve=>{
                this.list.push(resolve)
            })
            await wait
        }
        await fn()
        this.currentCount--
        if(this.list.length){
            const resolveHandle = this.list.shift()
            resolveHandle()
        }
    }
}
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


const timeout1 = timeout(1000, 1);
const timeout2 = timeout(300, 2);
const timeout3 = timeout(400, 3);
const timeout4 = timeout(500, 4);
const timeout5 = timeout(200, 5);


const run = async () => {
    const concurrent = new Concurrent();
    startTime = Date.now();
    concurrent.add(timeout1);
    concurrent.add(timeout2);
    concurrent.add(timeout3);
    concurrent.add(timeout4);
    concurrent.add(timeout5);
  };
  
  run();