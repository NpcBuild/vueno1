<template>
  <div>
    <el-table
    :data="list"
    :border="border"
    :height="tableHeight"
    :header-row-class-name="headerRowClassName"
    :row-class-name="rowClassName"
    :span-method="spanMethod"
    :show-summary="showSummary"
    :summary-method="getSummaries"
    :cell-class-name="cellClassName"
    :highlight-current-row="highlightCurrentRow"
    @select-all="selectAll"
    @selection-change="selectionChange"
    @select="select"
    @row-click="rowClick"
    @toggleSelection="clearSelection"
    empty-text="暂无数据"
    :stripe="stripe"
    :style="{'width': '100%','min-height': minHeight ? '418px' : '0'}">
      <el-table-column
          v-if="checked"
          type="selection"
          :selectable="selectable"
          width="55">
      </el-table-column>
      <el-table-column
          v-if="showIndex"
          label="序号"
          align="center"
          type="index"
          :index="indexMethod"
          :show-overflow-tooltip="true"
          width="60">
      </el-table-column>
      <template v-for="item in tableAttr">
        <slot :name="item.prop" :item="item">
          <el-table-column
              v-if="item.type == 'text'"
              :align="item.align ? item.align : 'left'"
              :label="item.label"
              :min-width="item.width"
              :prop="item.prop"
              :sortable="item.sortable"
              :show-overflow-tooltip="item.tooltip">
            <template slot-scope="scope">
              {{item.ishtml}}
              <div :class="item.wrap?'wrap':''">{{scope.row[item.prop] }}</div>
            </template>
          </el-table-column>
          <el-table-column
              v-if="item.type == 'button'"
              :align="item.align ? item.align : 'left'"
              :label="item.label"
              :min-width="item.width"
              :prop="item.prop"
              :sortable="item.sortable"
              :show-overflow-tooltip="item.tooltip">
            <template slot-scope="scope">
              <div :class="item.wrap?'wrap':''">{{scope.row[item.prop] }}</div>
            </template>
          </el-table-column>
          <el-table-column
              v-if="item.type == 'switch'"
              :align="item.align ? item.align : 'left'"
              :label="item.label"
              :min-width="item.width"
              :prop="item.prop"
              :sortable="item.sortable"
              :show-overflow-tooltip="item.tooltip">
            <template slot-scope="scope">
              <el-switch
                  v-model="scope.row[item.prop]"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="switchChange(item.prop, scope.row[item.prop], scope.row)">
              </el-switch>
            </template>
          </el-table-column>
        </slot>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "index",
  props: {
    id: {
      type: String, // 每一列数据的 id
      default: 'id'
    },
    stripe: {
      type: Boolean,
      default: true
    },
    // 显示尾部合并表格
    showSummary: {
      type: Boolean,
      default: false
    },
    // 是否开启分页
    pagination: {
      type: Boolean,
      default: true
    },
    pagerCount: {
      type: Number,
      default: 7
    },
    pageObj: {
      type: Object,
      default: null
    },
    list: {
      type: Array,
      default: null
    },
    pageSelected: {
      type: Boolean,
      default: true
    },
    // 表头
    tableAttr: {
      type: Array,
      default: null
    },
    // 数据排序
    sortable: {
      type: Boolean,
      default: false
    },
    // 选中框
    checked: {
      type: Boolean,
      default: false
    },
    // 按钮
    tableButton: { // 按钮
      type: [Array, Object],
      default: () => []
    },
    // 操作按钮控制函数
    tableButtonCtrl: {
      type: Function,
      default: undefined
    },
    // 表格高度
    tableHeight: {
      type: [String, Number, undefined], // 表格高度
      default: undefined
    },
    border: {
      type: Boolean, // 是否开启边框
      default: true
    },
    checkedCount: {
      type: Number, // 选中数量
      default: 0
    },
    loading: {
      type: Boolean,
      default: true
    },
    // 是否开启序号
    showIndex: {
      type: Boolean,
      default: true
    },
    selectable: {
      type: [Function, undefined], // 单选框是否可以选中
      default: undefined
    },
    selectedList: {
      type: Array, // 已选中列
      default: () => []
    },
    autoChecked: {// 根据传入的id自动选中
      type: Function
    },
    spanMethod: { // 合并列算法
      type: [Function, undefined],
      default: undefined
    },
    memory: {
      type: Boolean, // 是否开启分页记忆选中功能 现版本配合vuex使用
      default: false
    },
    headerRowClassName: {
      type: [Function, String],
      default: undefined
    },
    cellClassName: {
      type: [Function, String],
      default: undefined
    },
    highlightCurrentRow: {
      type: Boolean, // 是否单选
      default: false
    },
    rowClassName: {
      type: [Function, undefined],
      default: undefined
    },
    newLine: { // 是否展开新行
      type: Boolean,
      default: false
    },
    minHeight: { // 是否设置min-height
      type: Boolean,
      default: false
    },
    pageSize: {
      type: [Array, Object],
      default: () => [10, 20, 50, 100]
    }
  },
  data() {
    return {}
  },
  created() {
  },
  mounted() {
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 1) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        }
      })
      return sums
    },
    switchChange(opt, val, row) {
      this.$emit(opt, val, row)
    }
  }
}
</script>

<style scoped>
/deep/ .green {
  background-color: aqua;
  color: green;
}
/deep/ .wrap {
  white-space: pre-line;
}
</style>