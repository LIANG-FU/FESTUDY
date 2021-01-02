// 类式继承
// 声明父类
function SuperClass(){
    this.SuperValue = true;
}
// 为父类添加共有的方法
SuperClass.prototype.getSuperValue = function(){
    return this.SuperValue
}
// 声明子类
function subClass(){
    this.subValue = false
}
// 继承父类
subClass.prototype = new SuperClass()
// 为子类添加共有的方法
subClass.prototype.getSubValue = function(){
    return this.subValue;
}