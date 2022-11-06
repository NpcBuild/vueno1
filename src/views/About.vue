<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div id="webgl-box-warpper" v-loading="is_loading">
<!--      <vue-unity-webgl-->
<!--          v-if="is_show_webgl"-->
<!--          ref="vueUnityWebgl"-->
<!--          :config="webglConfig"-->
<!--          :unity-loader="webglUnityLoader"-->
<!--          :width="webglWidth"-->
<!--          :height="webglHeight"-->
<!--          :on-progress="listenWebglProgress"-->
<!--      ></vue-unity-webgl>-->
    </div>
    <router-link to="/Login">Login</router-link>
    <index :list="tableData" :table-attr="tableAttr" :stripe="false" :cell-class-name="cellClassName"></index>
  </div>
</template>
<script>
// import VueUnityWebgl from '@/components/vue-unity-webgl';
import index from '@/components/table/index'
export default {
  components: {
    // VueUnityWebgl
    index
  },
  data() {
    return {
      is_loading: false,
      is_show_webgl: true,
      webglConfig: '/Scenes1/Build/Scenes1.json',
      webglUnityLoader: '/Scenes1/Build/UnityLoader.js',
      webglWith: 1000,
      webglHeight: 600,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙\n江路 1516 弄'
      }],
      tableAttr: [
        { prop: 'date',
          label: '日期',
          tooltip: true,
          width: '400px',
          align: 'left',
          type: 'date'},
        { prop: 'name',
          label: '姓名',
          tooltip: true,
          width: '400px',
          align: 'left',
          type: 'text'},
        { prop: 'address',
          label: '住址',
          tooltip: false,
          width: '400px',
          align: 'left',
          wrap: true,
          type: 'textarea'}
      ]
    }
  },
  created() {
    window.toVueWebgl = (action) => {
      action && this.sendWebglMessage('{}', '第二次发送JSON数据')
    }
  },
  mounted() {
    window.ReportReady = () => {
      this.sendWebglMessage('1', '第一次发送内容标识')
    }
  },
  methods: {
    listenWebglProgress(instance, progress) {
      this.is_loading = true
      if (progress === 1) {
        this.is_loading = false
      }
    },
    sendWebglMessage(message, info) {
      console.log(info)
      this.$refs.vueUnityWebgl.message('JsTalker', 'toUnityWebgl', message)
    },
    cellClassName({row, column, rowIndex, columnIndex}) {
      console.log(row);
      console.log(column);
      console.log(rowIndex);
      console.log(columnIndex);
      return "green";
    }
  }
}
</script>