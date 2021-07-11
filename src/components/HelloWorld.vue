<template>
  <div class="hello">
    <div class="data-item" v-for="(item, index) in LargeData" :key="index">
      <p>{{ item.name }}</p>
      <p>{{ item.age }}</p>
    </div>
  </div>
</template>

<script>
import LargeData from '@/data/index.json'
export default {
  name: 'HelloWorld',
  data(){
    return {
      LargeData: Object.freeze(LargeData)
    }
  },
  created(){
    console.log(this.LargeData);
  }
}
</script>

<style scoped>
.hello {
  display: flex;
  flex-wrap: wrap;
}
.data-item {
  width: 105px;
  margin: 5px;
  background-color: lightgreen;
}
</style>
