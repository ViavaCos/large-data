<template>
  <div class="wrap">
    <p>"深蓝的天空中挂着一轮金黄的圆月下面是海边的沙地都种着一望无际的碧绿的西瓜其间有一个十一二岁的少年项带银圈手捏一柄钢叉向一匹猹尽力地刺去那猹却将身一扭反从他的胯下逃走了"</p>
    <br><br>
    <input v-model="searchKeywords" placeholder="输入关键字查询" type="text" @change="inputChange">
    <br><br>
    <div class="hello">
      <div 
        class="data-title" 
        :class="{active: selectLetter===key}" 
        v-for="(item, key) in tempObject" 
        :key="key" 
        @click="letterClick(key)"
      >
        <p>{{ key }}</p>
      </div>
    </div>
    <hr>  
    <div class="hello">
      <div class="data-item" v-for="(item, index) in resultData" :key="index">
        <p>{{ item.name }}</p>
        <p>{{ item.age }}</p>
        <p>{{ item.letter }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import LargeData from '@/data/index.json'
import Worker from './my.worker.js'

export default {
  name: 'HelloWorld',
  data(){
    return {
      LargeData: Object.freeze(LargeData),
      selectLetter: '', // 当前选中的字母
      searchKeywords: '', // 搜索关键字
      tempObject: {},
      resultData: [] // 结果渲染数组
    }
  },
  created(){
    // console.log(this.LargeData);
    this.updateDataStructure(this.LargeData)
    // this.initIndexedDB()
  },
  watch: {
    selectLetter(){
      this.getResultInWorker()
    },
    searchKeywords(){
      this.getResultInWorker()
    }
  },
  computed: {
    // // 结果渲染
    // resultData(){
    //   let result = this.LargeData || []
    //   if(this.selectLetter) {
    //     result = this.tempObject[this.selectLetter]
    //   }

    //   if(this.searchKeywords) {
    //     return result.filter(item => item.name.includes(this.searchKeywords))
    //   }
      
    //   return result
    // }
  },
  methods:{
    // initIndexedDB(){
    //   const request = window.indexedDB.open('data');
    //   let db;
    //   request.onsuccess = () => {
    //     console.log('打开数据库成功');
    //     db = request.result
    //   }

    //   request.onerror = () => {
    //     console.log('打开数据库失败');
    //   }

    //   request.onupgradeneeded = (event) => {
    //     const db = event.target.result
    //     const objectStore = db.createObjectStore('info', {
    //       // keyPath: ''
    //     })
    //     objectStore.createIndex('name', 'name', { unique: false })
    //   }
    // },
    // 更新数据结构
    updateDataStructure(data){
      const tempObject = {A:'',B:'',C:'',D:'',E:'',F:'',G:'',H:'',I:'',J:'',K:'',L:'',M:'',N:'',O:'',P:'',Q:'',R:'',S:'',T:'',U:'',V:'',W:'',X:'',Y:'',Z:''}
      data.forEach(item => {
        if(!tempObject[item.letter]) {
          tempObject[item.letter] = []
        }
        tempObject[item.letter].push(item)
      })
      console.log(tempObject);
      this.tempObject = tempObject
      return tempObject
    },
    // 字母点击
    letterClick(letter){
      this.selectLetter =  this.selectLetter === letter ? '' : letter
    },
    // 输入框值变更
    inputChange(val){
      console.log(val);
    },
    getResultInWorker(){
      const worker = new Worker()
      worker.postMessage({
        origin: JSON.stringify(this.LargeData), // 原始数据
        data: JSON.stringify(this.tempObject), // 分类后数据
        letter: this.selectLetter, // 筛选字母
        keywords: this.searchKeywords // 筛选关键字
      })
      worker.onmessage = (e) => {
        console.log('receive message----------', e);
        this.resultData = e.data || []
      }
      console.log('worker', worker);
    }
  }
}
</script>

<style scoped>
.hello {
  display: flex;
  flex-wrap: wrap;
}
.data-title {
  flex: 1;
  margin: 2px;
  cursor: pointer;
  background-color: lightcoral;
}
.data-title:hover{
  opacity: 0.5;
}
.data-title.active{
  background-color: lightskyblue;
}
.data-item {
  width: 105px;
  margin: 5px;
  background-color: lightgreen;
}
</style>
