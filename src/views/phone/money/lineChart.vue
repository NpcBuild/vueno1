<template>
  <div class="chart-container">
    <div class="chart-header">
      <select v-model="selectedType">
        <option v-for="type in expenseTypes" :key="type" :value="type">{{ type }}</option>
      </select>
      <select v-model="selectedPeriod" @change="updateChart">
        <option v-for="period in periods" :key="period" :value="period">{{ period }}</option>
      </select>
    </div>
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  props: {
    items: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedType: '',
      selectedPeriod: '月',
      expenseTypes: ['餐饮', '购物', '娱乐', '交通'],
      periods: ['日', '月', '年'],
      chart: null
    };
  },
  watch: {
    // items: {
    //   immediate: true, // 初始化时立即触发
    //   handler(newItems) {
    //     if (Object.keys(newItems).length > 0) {
    //       if (this.chart) {
    //         this.updateChart(); // 确保 chart 已初始化后再更新图表
    //       } else {
    //         this.$nextTick(() => {
    //           if (this.chart) {
    //             this.updateChart();
    //           }
    //         });
    //       }
    //     }
    //   },
    // },
    selectedType: {
      immediate: true, // 初始化时立即触发
      handler(newType) {
        console.log('new', newType);
        if (Object.keys(newType).length > 0) {
          if (this.chart) {
            this.updateChart({newType});  // 确保 chart 已初始化后再更新图表
          } else {
            this.$nextTick(() => {
              if (this.chart) {
                this.updateChart({newType}); // 数据变化后更新图表
              }
            });
          }
        }
      },
    },
  },
  mounted() {
    this.initChart();
    this.updateChart();
    window.addEventListener('resize', this.resizeChart);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeChart);
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chart);
    },
    updateChart(parame = {}) {
      const data = this.getChartData(parame);
      this.renderChart(data);
    },
    getChartData({newType} = {}) {
      const labels = []; // X 轴标签
      const all = {}; // 存储所有类型的值

      const dateRegex = /^\d{4}-\d{2}$/; // 匹配 yyyy-mm 格式的正则表达式

      // 提取符合 yyyy-mm 格式的键值对，并排序
      const sortedItems = Object.entries(this.items)
        .filter(([key]) => dateRegex.test(key)) // 过滤符合日期格式的键
        .sort(([a], [b]) => new Date(a) - new Date(b)); // 按日期升序排序
      // const lastTenItems =  sortedItems.slice(-10); // 取最近的 10 个项目

      const values2Map = {};
      sortedItems.forEach(([key, value]) => {
        if (dateRegex.test(key)) {
          labels.push(key); // 如果 key 符合 yyyy-mm 格式，则使用 key 作为 x 轴标签
          let sum = 0;
          Object.entries(value).forEach(([key, value]) => {
            if (key !== 'month') {
              all[key] = all[key] || [];
              all[key].push(value); // 将所有值存储在 all 数组中
              sum += value;
              // 如果类型不在 expenseTypes 中
              if (this.expenseTypes.indexOf(key) === -1) {
                this.expenseTypes.push(key); // 将所有类型存储在 expenseTypes 数组中
              }
            }
          });
          values2Map[key] = sum;
        }
      });
      console.log(newType);
      const values2 = [];
      labels.forEach(label => {
        values2.push(-values2Map[label] || 0);
      })
      this.selectedType = newType || this.expenseTypes[0]; // 默认选择第一个周期
      return { labels, values: all[this.selectedType] || [] , values2};
    },
    renderChart({ labels, values, values2 }) {
      const option = {
        tooltip: { trigger: 'axis' },
        legend: { data: ['支出', '结余'] },
        xAxis: { 
          type: 'category', 
          data: labels 
        },
        yAxis: [
          {
            type: 'value',
            name: '支出', // 左侧 Y 轴名称
            position: 'left',
            axisLine: {
              lineStyle: {
                color: '#5470C6' // 左侧 Y 轴颜色
              }
            },
            axisLabel: {
              formatter: '{value}' // 格式化刻度值
            }
          },
          {
            type: 'value',
            name: '结余', // 右侧 Y 轴名称
            position: 'right',
            axisLine: {
              lineStyle: {
                color: '#91CC75' // 右侧 Y 轴颜色
              }
            },
            axisLabel: {
              formatter: '{value}' // 格式化刻度值
            }
          }
        ],
        series: [
          {
            name: '支出',
            type: 'line',
            data: values,
            yAxisIndex: 0 // 使用左侧 Y 轴
          },
          {
            name: '结余',
            type: 'bar',
            data: values2,
            yAxisIndex: 1 // 使用右侧 Y 轴
          }
        ]
      };
      this.chart.setOption(option);
    },
    resizeChart() {
      if (this.chart) {
        this.chart.resize();
      }
    }
  }
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
}
.chart-header {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 10px;
}
.chart {
  flex: 1;
  width: 100%;
  height: 100%;
}
</style>
