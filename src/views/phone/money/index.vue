<template>
  <div class="billing-dashboard">
    <header class="header">📊 每月账单</header>
    <main class="charts-container">
      <div class="chart-wrapper"> 
        <h2>支出趋势</h2>
        <LineChart v-if="shouru && Object.keys(shouru).length > 0" :items="shouru" style="height: 400px;"></LineChart>
      </div>
      <!-- <div class="chart-wrapper">
        <h2>支出趋势</h2>
        <div class="chart-mode-toggle">
          <span class="mode-label" @click="toggleDropdown">{{ selectedExpenseLabel }}</span>
          <ul v-if="showDropdown" class="mode-dropdown">
            <li v-for="mode in expenseModes" :key="mode.value" @click="changeExpenseMode(mode.value)">{{ mode.label }}</li>
          </ul>
        </div>
        <div class="chart-container">
          <canvas ref="lineChartCanvas" class="chart-canvas" @click="showDataPoint"></canvas>
          <div v-if="tooltip.visible" class="tooltip" :style="{ top: tooltip.y + 'px', left: tooltip.x + 'px' }">
            {{ tooltip.value }}
          </div>
        </div>
      </div>
      <div class="chart-wrapper">
        <h2>收入变化</h2>
        <div class="chart-container">
          <canvas ref="barChartCanvas" class="chart-canvas"></canvas>
        </div>
      </div> -->
    </main>
    <section class="bills-list">
      <div v-for="(bills, month) in monthlyBills" :key="month" class="month-section">
        <h2 class="month-title">{{ month }}</h2>
        <ul>
          <li v-for="bill in bills" :key="bill.id" class="bill-item">
            <span class="bill-date">{{ bill.date }}</span>
            <span class="bill-category">{{ bill.category }}</span>
            <span class="bill-amount">¥{{ bill.amount }}</span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import LineChart from "./lineChart.vue";

export default {
  name: "index",
  components: {LineChart},
  created() {
    this.getInfo()
  },
  data() {
    return {
      selectedExpenseMode: 'daily',
      showDropdown: false,
      expenseModes: [
        { label: '按日', value: 'daily' },
        { label: '按周', value: 'weekly' },
        { label: '按月', value: 'monthly' }
      ],
      shouru: {},
      zhichu: [],
      expenseData: {
        daily: [[120, 80, 100, 90, 150, 170, 200], [100, 60, 80, 70, 140, 160, 190]],
        weekly: [[500, 700, 600, 900], [400, 650, 500, 850]],
        monthly: [[2000, 2500, 2300], [1800, 2400, 2200]]
      },
      monthlyBills: {},
      tooltip: { visible: false, x: 0, y: 0, value: '' }
    };
  },
  computed: {
    selectedExpenseLabel() {
      return this.expenseModes.find(m => m.value === this.selectedExpenseMode).label;
    }
  },
  mounted() {
    // this.drawLineChart();
    // this.drawBarChart();
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    getInfo() {
      this.getRequest('/money/getMoneyChart').then(res => {
        console.log("获取结果：", res.data)
        let monthlyBills = []
        let monthlyBillsMoney = []
        for (let key in res.data) {
          monthlyBills.push(-(res.data[key]['收入'] || 0))
          monthlyBillsMoney.push(res.data[key]['餐饮'] || 0)
        }
        // this.drawLineChart([monthlyBillsMoney]);
        console.log(monthlyBills)
        console.log(monthlyBillsMoney)
        this.shouru = res.data
        this.zhichu = [monthlyBillsMoney]
        // this.drawBarChart(monthlyBills);
      })
      this.getRequest('/money/getMoneyList', {pageSize: 100}).then(res => {
        let result = {}
        res.data.records.forEach(item => {
          let month = item.paymentTime.split('-')[0] + '年' + item.paymentTime.split('-')[1] + '月';
          let obj = {
            id: item.id,
            date: item.paymentTime.substr(0, 10),
            category: item.category + '（' + item.description + '）',
            amount: item.amount
          }
          if (result[month]) {
            result[month].push(obj)
          } else result[month] = [obj]
        })
        this.monthlyBills = result
      })
    },
    // changeExpenseMode(mode) {
    //   this.selectedExpenseMode = mode;
    //   this.showDropdown = false;
    //   this.drawLineChart();
    // },
    showDataPoint(event) {
      const canvas = this.$refs.lineChartCanvas;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const datasets = this.zhichu;
      const closestIndex = Math.round((x - 40) / (360 / (datasets[0].length - 1)));
      let tooltipValue = datasets.map(data => data[closestIndex] || 0).join(' / ');
      this.tooltip = {
        visible: true,
        x: x,
        y: 160 - (datasets[0][closestIndex] / Math.max(...datasets[0])) * 140,
        value: `¥${tooltipValue}`
      };
    },
    // drawLineChart(data) {
    //   const canvas = this.$refs.lineChartCanvas;
    //   const ctx = canvas.getContext('2d');
    //   const datasets = data ? data : this.expenseData[this.selectedExpenseMode];
    //   canvas.width = 400;
    //   canvas.height = 200;
    //   ctx.clearRect(0, 0, canvas.width, canvas.height);
    //   const colors = ['#0077ff', '#ff7700'];
    //   datasets.forEach((data, i) => {
    //     ctx.strokeStyle = colors[i % colors.length];
    //     ctx.lineWidth = 3;
    //     ctx.beginPath();
    //     data.forEach((value, index) => {
    //       const x = 40 + index * (360 / (data.length - 1));
    //       const y = 180 - (value / Math.max(...data)) * 160;
    //       if (index === 0) ctx.moveTo(x, y);
    //       else ctx.lineTo(x, y);
    //     });
    //     ctx.stroke();
    //   });
    // },
    // drawBarChart(data) {
    //   const canvas = this.$refs.barChartCanvas;
    //   const ctx = canvas.getContext('2d');

    //   // 让 Canvas 适应父容器
    //   const parentWidth = canvas.parentElement.clientWidth || 400;
    //   const parentHeight = canvas.parentElement.clientHeight || 300;
    //   canvas.width = parentWidth;
    //   canvas.height = parentHeight;

    //   ctx.clearRect(0, 0, canvas.width, canvas.height);

    //   // **调整间距，优化视觉**
    //   const paddingTop = 20; // 顶部预留空间
    //   const paddingBottom = 20; // 底部预留空间
    //   const paddingLeft = 20; // 左侧预留空间
    //   const paddingRight = 20; // 右侧预留空间

    //   const chartWidth = canvas.width - paddingLeft - paddingRight;
    //   const chartHeight = canvas.height - paddingTop - paddingBottom;

    //   // **计算柱状图缩放比例**
    //   const barData = data || [];
    //   const maxDataValue = Math.max(...barData, 1); // 避免除 0
    //   const normalizedData = barData.map(h => (h / maxDataValue) * chartHeight);

    //   // **计算柱子宽度和间距**
    //   const barWidth = Math.min(40, chartWidth / (barData.length * 2)); // 柱子宽度自适应
    //   const gap = (chartWidth - barData.length * barWidth) / (barData.length + 1); // 计算间距

    //   // **动画绘制柱状图**
    //   let frame = 0;
    //   const totalFrames = 20;

    //   function animate() {
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);

    //     ctx.fillStyle = '#0077ff';

    //     barData.forEach((value, index) => {
    //       const x = paddingLeft + gap + index * (barWidth + gap);
    //       const targetHeight = normalizedData[index];
    //       const currentHeight = (targetHeight * frame) / totalFrames;
    //       const y = canvas.height - paddingBottom - currentHeight;

    //       ctx.fillRect(x, y, barWidth, currentHeight);
    //     });

    //     if (frame < totalFrames) {
    //       frame++;
    //       requestAnimationFrame(animate);
    //     }
    //   }

    //   animate();
    // }

  }
};
</script>

<style scoped>
.billing-dashboard {
  max-width: 450px;
  margin: auto;
  text-align: center;
  font-family: Arial, sans-serif;
  background: #f4f6f9;
  padding: 15px;
  border-radius: 10px;
}
.chart-mode-toggle {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.mode-dropdown {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  list-style: none;
  padding: 5px;
  margin: 0;
  top: 20px;
  right: 0;
}
.chart-tooltip {
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px;
  font-size: 12px;
  border-radius: 4px;
  pointer-events: none;
}
.header {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
}
.charts-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.chart-wrapper {
  background: #ffffff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow-x: auto;
  white-space: nowrap;
}
.chart-container {
  position: relative;
}
.chart-canvas {
  width: 100%;
  height: 200px;
}
.tooltip {
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  pointer-events: none;
}
.toggle-button {
  padding: 5px 10px;
  border: none;
  background: #eee;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}
.toggle-button.active {
  background: #0077ff;
  color: white;
}
.chart-canvas {
  width: 100%;
  height: 150px;
}
.bills-list {
  text-align: left;
}
.month-section {
  margin-top: 15px;
  padding: 12px;
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}
.month-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}
.bill-item {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}
.bill-amount {
  color: #0077ff;
  font-weight: bold;
}
</style>