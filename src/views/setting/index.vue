<template>
  <div>
    语音助手：<el-switch v-model="voiceAssistant" @change="changeVoice"/>
    <tables :list="tableData" :table-attr="tableAttr" :stripe="false" :cell-class-name="cellClassName" @opt="opt"></tables>
  </div>
</template>

<script>
import tables from '@/components/table/index'

export default {
  name: "index",
  components: {
    tables
  },
  data() {
    return {
      voiceAssistant: false,
      tableData: [],
      tableAttr: [
        {
          prop: 'jobName',
          label: '任务名',
          tooltip: true,
          width: '400px',
          align: 'left',
          type: 'text'
        },
        {
          prop: 'cron',
          label: '执行时间',
          tooltip: true,
          width: '200px',
          align: 'left',
          type: 'text'
        },
        {
          prop: 'status',
          label: '状态',
          tooltip: false,
          width: '100px',
          align: 'left',
          wrap: true,
          type: 'text'
        },
        {
          prop: 'createTime',
          label: '创建时间',
          tooltip: false,
          width: '400px',
          align: 'left',
          wrap: true,
          type: 'text'
        },
        {
          prop: 'updateTime',
          label: '更新时间',
          tooltip: false,
          width: '400px',
          align: 'left',
          wrap: true,
          type: 'text'
        },
        {
          prop: 'opt',
          label: '开关',
          tooltip: false,
          width: '200px',
          align: 'left',
          wrap: true,
          type: 'switch'
        }
      ],
      cellClassName: '',
    }
  },
  created() {
    this.getSetting()
  },
  mounted() {
    this.init()
  },
  methods: {
    getSetting() {
      this.getRequest('/setting/getSettingById', {id: 1}).then(res => {
        this.voiceAssistant = res.data.voiceAssistant
      })
    },
    changeVoice() {
      this.postRequest('/setting/update', {id: 1,voiceAssistant: this.voiceAssistant}).then(res => {
        console.log(res)
      })
    },
    init() {
      this.postRequest('/quartz/list',{pageNum: 1,pageSize:20}).then(res => {
        let data = res.records
        data.forEach(item => item.opt = (item.status == 2))
        this.tableData = data
      })
    },
    opt(status, row) {
      let url = status ? '/quartz/resume' : '/quartz/pause';
      this.postRequestParams(url,{},{taskId: row.id}).then(res => {
        this.$message.success(res.message)
        this.init()
      })
    }
  }
}
</script>

<style scoped>

</style>