<template>
  <div class="billing-dashboard">
    <header class="header">📊 每月账单</header>
    <main class="charts-container">
      <div class="chart-wrapper">
        <h2>支出趋势</h2>
        <div class="chart-mode-toggle">
          <button v-for="mode in expenseModes" :key="mode.value"
                  :class="['toggle-button', { active: selectedExpenseMode === mode.value }]"
                  @click="changeExpenseMode(mode.value)">
            {{ mode.label }}
          </button>
        </div>
        <div class="chart-scroll">
          <canvas ref="lineChartCanvas" class="chart-canvas"></canvas>
        </div>
      </div>
      <div class="chart-wrapper">
        <h2>收入变化</h2>
        <div class="chart-scroll">
          <canvas ref="barChartCanvas" class="chart-canvas"></canvas>
        </div>
      </div>
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
export default {
  name: "index",
  data() {
    return {
      selectedExpenseMode: 'daily',
      expenseModes: [
        { label: '按日', value: 'daily' },
        { label: '按周', value: 'weekly' },
        { label: '按月', value: 'monthly' }
      ],
      expenseData: {
        daily: [[120, 80, 100, 90, 150, 170, 200], [100, 60, 80, 70, 140, 160, 190]],
        weekly: [[500, 700, 600, 900], [400, 650, 500, 850]],
        monthly: [[2000, 2500, 2300], [1800, 2400, 2200]]
      },
      monthlyBills: {}
    };
  },
  mounted() {
    this.drawLineChart();
    this.drawBarChart();
  },
  methods: {
    changeExpenseMode(mode) {
      this.selectedExpenseMode = mode;
      this.drawLineChart();
    },
    drawLineChart() {
      const canvas = this.$refs.lineChartCanvas;
      const ctx = canvas.getContext('2d');
      const datasets = this.expenseData[this.selectedExpenseMode];
      canvas.width = 600;
      canvas.height = 200;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const colors = ['#0077ff', '#ff7700'];
      datasets.forEach((data, i) => {
        ctx.strokeStyle = colors[i % colors.length];
        ctx.lineWidth = 3;
        ctx.beginPath();
        data.forEach((value, index) => {
          const x = 50 + index * 100;
          const y = 200 - (value / Math.max(...data)) * 180;
          if (index === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();
      });
    },
    drawBarChart() {
      const canvas = this.$refs.barChartCanvas;
      const ctx = canvas.getContext('2d');
      canvas.width = 600;
      canvas.height = 200;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0077ff';
      const barWidth = 40;
      this.expenseData.monthly[0].forEach((height, index) => {
        ctx.fillRect(60 + index * 100, 200 - height, barWidth, height);
      });
    }
  }
};
</script>

<style scoped>
.billing-dashboard {
  max-width: 400px;
  margin: auto;
  text-align: center;
  font-family: Arial, sans-serif;
  background: #f4f6f9;
  padding: 15px;
  border-radius: 10px;
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
.chart-scroll {
  overflow-x: auto;
  width: 100%;
}
.toggle-button {
  padding: 4px 10px;
  margin: 0 3px;
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
  width: 600px;
  height: 200px;
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
