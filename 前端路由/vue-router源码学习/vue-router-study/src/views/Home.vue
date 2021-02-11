<template>
  <div class="home">
    <h1>This is an home page</h1>
    <Hello :infomation="[1]"></Hello>
  </div>
</template>
<script>
import Hello from '../components/HelloWorld'
export default {
  components:{Hello}
}
</script>

