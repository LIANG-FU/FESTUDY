<template>
  <div class="hello">
    <h1>{{total}}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return {
      total:this.infomation.length
    }
  },
  props:{
    infomation:{
      type:Array,
      default:() => new Array()
    }
  },
  created(){
    console.log(this.infomation)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
