
let count = 1
Function.prototype.mybind = function (context, ...args) {
    if (typeof this !== "function") {
      throw new Error("this must be a function");
    }
    var self = this;   // self = Fn
    var fbound = function () {
        // this => obj2 
        console.log(this instanceof self)
        self.apply(this instanceof self ? this : context, args.concat(Array.prototype.slice.call(arguments)));
        // self.apply(context,args.concat(Array.prototype.slice.call(arguments)))
        // console.log(this)
    }
    if(this.prototype) {
      fbound.prototype = Object.create(this.prototype);
    }
    return fbound;
}

function Fn(){
    console.log("执行Fn",this,this.a)
}
let fn = new Fn()
fn.a = 2
// console.log(fn)


let obj = {a:1}
let f = Fn.mybind(obj)
let obj3 = new f()
obj3.a = 5
console.log(3,obj3)

// let obj = {a:1}
// fn.f = Fn.bind(obj)

// console.log(fn.f())