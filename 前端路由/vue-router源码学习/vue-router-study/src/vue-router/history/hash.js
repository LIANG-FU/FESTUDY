import History from './base.js'

function getHash(){
    return window.location.hash.slice(1)
}

function endureSlash(){
    if(window.location.hash){
        return
    }
    window.location.hash = '/'
}

export default class HashHistory extends History {
    constructor(router){
        super(router);
        endureSlash()
    }
    getCurrentLocation(){
        return getHash()
    }
    setupListener(){
        console.log('setupListener')
        window.addEventListener('hashchange',()=>{
            this.transitionTo(getHash())
        })
    }
} 