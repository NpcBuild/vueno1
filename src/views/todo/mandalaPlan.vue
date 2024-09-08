<template>
  <div>
    <div class="container">
      <!-- 曼陀罗计划表的九宫格容器 -->
      <div class="grid-container">
        <div class="grid-item" v-for="(row,key1) in plan" :key="row">
          <div class="item" v-for="(item,key2) in row" :key="item.id" :title="item.content" :class="{'center': key1 === 1 && key2 === 1}" @click="more(item,key1,key2)">
            <!-- 每个格子的内容 -->
            {{item.content}}
          </div>
        </div>
      </div>
    </div>
    <el-autocomplete
        v-model="state"
        :fetch-suggestions="queryProblemSearchAsync"
        placeholder="请输入内容"
        @select="handleSelect"
    ></el-autocomplete>
    <div v-if="selectData">
      <div>内容：{{selectData}}</div>
      <div class="content" v-if="textarea">
        <el-input
          type="textarea"
          autosize
          placeholder="请输入内容"
          v-model="textarea"/>
        <el-button @click="saveProblem">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {deepClone} from "@/utils/yMethods";
export default {
  /*曼陀罗计划表*/
  name: "mandalaPlan",
  data() {
    return {
      // 模拟九宫格数据
      plan: [],
      me: ["腿粗","草莓鼻","头发细软","体态","","","","",""],
      oneArr: ["学习成长","体验突破","休闲娱乐","工作事业","我","家庭生活","身体健康","财务理财","人际社群"],
      learn: ["阅读（每天30分钟，一年读50本）","","","","学习成长","","","",""],
      experience: ["100个梦想","今年学会弹吉他《致爱丽丝》","","","体验突破","","","",""],
      recreation: ["看20部高分电影《权力的游戏》、《毒枭》、《疑犯追踪》","","","","休闲娱乐","","","",""],
      work: ["副业小红书","视频直播","","","工作事业","","","",""],
      family: ["十一带家人出国玩","","","","家庭生活","","","",""],
      health: ["保持运动习惯","每周打两次篮球","做一次全面检查","","身体健康","","","",""],
      money: ["财务基本自由","","","","财务理财","","","",""],
      people: ["","","","","人际社群","","","",""],
      selectData: null,
      selectId: '',
      textarea: '',
      centerItem: {id: 9,content: "我"},
      rootPath: [],
      // 远程搜索
      restaurants: [],
      state: '',
      timeout:  null
    };
  },
  created() {
    this.fullScreen()
    this.getPlan(0)
  },
  methods: {
    getPlan(parentId) {
      this.getRequest('/plan/getPlanList',{parentId:parentId}).then(res => {
        // 没有下级内容
        if (res.data.records.length === 0) {
          console.log("没有内容")
          this.$message.error("没有内容")
          return
        }
        this.oneArr = res.data.records.sort((a, b) => a.sort - b.sort)
        this.plan = this.convertOneArrToTwoArr(this.oneArr, 3, parentId === 0 ? this.centerItem : {})
        this.rootPath.push(parentId)
      })
    },
    convertOneArrToTwoArr(oneArr, rowSize, centerItem = {}) {
      const temp = deepClone(oneArr)
      if (temp.length < 8) {
        let count = 8 - temp.length
        for (let i = 0; i< count; i++) {
          temp.splice(temp.length + count, 0, {})
        }
      }
      temp.splice(4, 0, centerItem)
      const twoArr = []
      for (let i = 0; i< temp.length; i+= rowSize) {
        twoArr.push(temp.slice(i, i+rowSize))
      }
      return twoArr
    },
    more(item,row,col) {
      if (!item.id && (row !== 1 || col !== 1)) return
      let change = true
      this.selectData = null
      let parentId
      if (row === 1 && col === 1 && item.content != "我") {
        this.rootPath.pop()
        let to = this.rootPath.pop()
        change && (this.getPlan(to))
      } else {
        parentId = item.id
        change && (this.getPlan(parentId))
      }
      console.log("点击了", item.content)
      this.getProble(item.content)
    },
    getProble(todoId) {
      this.getRequest('/problem/getProblemList', {pageNum: 1,pageSize: 1,title: todoId}).then(res => {
        this.getRequest('/problem/getProblemById', {id: res.data.records[0].id}).then(response => {
          this.selectData = response.data.title
          this.textarea = response.data.solution;
          this.selectId = response.data.id;
        }).catch(() => {this.textarea = ''})
      }).catch(() => {this.textarea = ''})
    },
    queryProblemSearchAsync(queryString, cb) {
      if (!queryString) return
      this.getRequest('/problem/getProblemList', {pageNum: 1, pageSize: 20, title: queryString}).then(res => {
        let results = res.data.records
        results.forEach(item => {
          item.value = item.title
        })
        // var restaurants = this.restaurants;
        // var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      })
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      this.selectData = item.title
      this.selectId = item.id
      this.textarea = item.solution
    },
    saveProblem() {
      this.postRequest('/problem/update', {id: this.selectId, solution: this.textarea}).then(res => {
        this.$message.success(res.message)
      })

    },
    fullScreen() {
      let de = document.documentElement
      if (de.requestFullscreen) {
        de.requestFullscreen()
      } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen()
      } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen()
      } else if (de.msRequestFullScreen) {
        de.msRequestFullScreen()
      }
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.container {
  /* 设置容器的样式 */
}

.grid-container {
  /* 设置九宫格容器的样式 */
  width: 300px;
  .center {
    background-color: yellow !important;
  }
}
.grid-item {
  /* 设置每个格子的样式 */
  display: grid;
  grid-template-columns: auto auto auto;
  .item {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: lightblue;
    margin: 5px;
    /*文字不可选中*/
    user-select: none;
    /*点击样式*/
    cursor: pointer;
  }
}
.content {
  width: 320px;
  margin-left: 5px;
}
/* 利用穿透，设置input边框隐藏 */
//.content >>>.el-textarea__inner{
//  border: 0;
//}
</style>