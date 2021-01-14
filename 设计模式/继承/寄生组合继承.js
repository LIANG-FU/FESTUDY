function Parent(){
    this.name = 'parent'
    this.play = [1,2,3]
}

function Child(){
    Parent.call(this)
    this.subName = 'child'
}

function clone(children,parent){
    children.prototype = Object.create(parent.prototype)
    children.prototype.constructor = children
}

clone(Child,Parent)

let c = new Child()

console.log(c)