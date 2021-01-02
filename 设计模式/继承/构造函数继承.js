// 构造函数继承
// 声明父类
function SuperClass(id){
    this.books = ['javascript','html','css'];
    this.id = id;
}

SuperClass.prototype.showBooks = function(){
    return this.books;
}

function subClass(id){
    SuperClass.call(this,id)
}

let instance1 = new subClass(1)
let instance2 = new subClass(2)

instance1.books.push('vue')

console.log(instance1)
console.log(instance2)
