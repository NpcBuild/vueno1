<template>
  <div class="container">
    <span :key="index" v-for="index in score" style="margin-top:40px;color: red;font-size: larger">♥</span>
    <el-popover
        placement="bottom"
        :title="'数据总量：' + num.toString()"
        width="300"
        trigger="click"
        :content="'上次同步时间：' + syncTime">
      <i slot="reference" class="el-icon-warning-outline"></i>
    </el-popover>
    <loading v-if="loading"/>
    <div class="text-center">
      <!-- 在这里显示中间的文字 -->
      <h1>{{message}}</h1>
    </div>
    <div class="button-center">
      <el-button @click="back">🔚</el-button>
      <el-button @click="good">👻</el-button>
      <el-button @click="refresh">🔜</el-button>
    </div>
    <div class="buttom">
      <el-button @click="delHandle" :disabled="loading">❌</el-button>
    </div>
  </div>
</template>

<script>
import loading from '@/components/loading/index3'
export default {
  name: "index",
  components: {
    loading
  },
  data() {
    return {
      loading: false,
      num: 0,
      syncTime: '',
      id: null,
      oldId: null,
      message: null,
      score: null
    }
  },
  created() {
    this.init() // 获取数据
    this.getInfo()
  },
  methods: {
    getInfo() {
      let parame = {tag: 10};
      this.getRequest('/corpus/getInfoByTag',parame).then(res => {
        this.num = res.data.num
        this.syncTime = res.data.syncTime
      })
    },
    init(id) {
      let parame = {tag: 10};
      if (id) parame.id = id
      this.loading = true
      this.getRequest('/corpus/getRandByTag',parame).then(res => {
        this.oldId = this.id
        this.id = res.data.id
        this.message = res.data.content
        this.score = res.data.score
        this.loading = false
      })
    },
    // 上一条
    back() {
      this.init(this.oldId)
    },
    // 刷新
    refresh() {
      this.init()
    },
    // 收藏
    good() {
      this.getRequest('/corpus/score',{id: this.id}).then(() => {
        this.$message.success('收藏成功')
      })
    },
    delHandle() {
      this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.del()
      }).catch(() => {});
    },
    // 删除
    del() {
      this.getRequest('/corpus/deleteCorpusById',{id: this.id}).then(() => {
        this.$message.success('删除成功')
        this.oldId = null
        this.refresh()
      })
    }
  }
}
</script>

<style scoped>
.container {
  /* 设置容器的样式，使其充满整个屏幕 */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.text-center {
  /* 设置文字居中的样式 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
  font-size: 16px;
}
.button-center {
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: 0;
  margin-bottom: 20px;
}
.buttom {
  float: right;
}
</style>