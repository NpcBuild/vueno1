<template>
    <div class="diary-page">
      <header class="header">
        <h1>📖 我的日记 & 复盘</h1>
        <button class="add-btn">➕ 新建</button>
      </header>
  
      <section class="mood-section">
        <h2>今日心情</h2>
        <div class="mood-icons">
          <span v-for="mood in moods" :key="mood.text" class="mood-icon" :class="mood.class">{{ mood.emoji }}</span>
        </div>
      </section>
  
      <section class="summary-section">
        <h2>数据分析</h2>
        <div ref="chart" class="chart"></div>
      </section>
  
      <section class="diary-list">
        <h2>📌 我的日记</h2>
        <div v-for="entry in diaryEntries" :key="entry.id" class="diary-card">
          <img v-if="entry.image" :src="entry.image" class="diary-img" />
          <div class="diary-info">
            <h3>{{ entry.title }}</h3>
            <p class="diary-date">🗓 {{ entry.date }}</p>
            <p class="diary-summary">{{ entry.summary }}</p>
            <div class="diary-actions">
              <button class="review-btn">🔍 复盘</button>
              <button class="edit-btn">✏️ 编辑</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  
  export default {
    data() {
      return {
        moods: [
          { emoji: "😁", text: "开心", class: "happy" },
          { emoji: "😐", text: "平淡", class: "neutral" },
          { emoji: "😢", text: "难过", class: "sad" }
        ],
        diaryEntries: [
          { id: 1, title: "周末旅行", date: "2025-04-01", summary: "去了山里，风景绝美。", image: "trip.jpg" },
          { id: 2, title: "健身挑战", date: "2025-04-02", summary: "完成了一次高强度训练！" },
        ],
      };
    },
    mounted() {
      this.initChart();
    },
    methods: {
      initChart() {
        const chart = echarts.init(this.$refs.chart);
        chart.setOption({
          tooltip: {},
          xAxis: { type: 'category', data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
          yAxis: { type: 'value' },
          series: [{ data: [2, 3, 4, 5, 3, 2, 4], type: 'line' }]
        });
      }
    }
  };
  </script>
  
  <style>
  .diary-page {
    font-family: Arial, sans-serif;
    padding: 20px;
    background: #f4f4f4;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    padding: 15px;
    border-radius: 10px;
  }
  .add-btn {
    background: #007bff;
    color: white;
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .mood-section {
    text-align: center;
    background: #fff;
    margin-top: 15px;
    padding: 15px;
    border-radius: 10px;
  }
  .mood-icons {
    display: flex;
    justify-content: center;
    gap: 15px;
  }
  .mood-icon {
    font-size: 24px;
    cursor: pointer;
  }
  .summary-section {
    background: #fff;
    margin-top: 15px;
    padding: 15px;
    border-radius: 10px;
  }
  .chart {
    height: 200px;
  }
  .diary-list {
    background: #fff;
    margin-top: 15px;
    padding: 15px;
    border-radius: 10px;
  }
  .diary-card {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
  }
  .diary-img {
    width: 70px;
    height: 70px;
    margin-right: 15px;
    border-radius: 8px;
  }
  .diary-info {
    flex-grow: 1;
  }
  .diary-date {
    color: gray;
    font-size: 14px;
  }
  .diary-summary {
    font-size: 14px;
    color: #333;
  }
  .diary-actions {
    display: flex;
    gap: 10px;
    margin-top: 8px;
  }
  .review-btn, .edit-btn {
    border: none;
    padding: 6px 12px;
    border-radius: 5px;
    cursor: pointer;
  }
  .review-btn {
    background: #28a745;
    color: white;
  }
  .edit-btn {
    background: #ffc107;
    color: white;
  }
  </style>
  