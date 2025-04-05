<template>
  <div class="points-dashboard">
    <header class="header">🏆 积分中心</header>
    
    <section class="points-balance">
      <h2>当前积分</h2>
      <div class="points-amount" :class="{ 'points-updating': updating }">{{ points }}</div>
    </section>
    
    <section class="points-history">
      <h2>积分变化历史</h2>
      <ul>
        <li v-for="record in pointsHistory" :key="record.id" class="history-item">
          <span class="history-date">{{ record.date }}</span>
          <span class="history-reason">{{ record.reason }}</span>
          <span :class="{ 'positive': record.change > 0, 'negative': record.change < 0 }">{{ record.change > 0 ? '+' : '' }}{{ record.change }}</span>
        </li>
      </ul>
    </section>
    
    <section class="redeem-section">
      <h2>兑换专区</h2>
      <div class="filters">
        <select v-model="selectedCategory" class="filter-dropdown">
          <option value="all">全部</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
        <select v-model="sortOrder" class="filter-dropdown">
          <option value="asc">价格升序</option>
          <option value="desc">价格降序</option>
        </select>
      </div>
      <ul class="redeem-list">
        <li v-for="item in filteredItems" :key="item.id" class="redeem-item">
          <span class="redeem-name">{{ item.name }}</span>
          <span class="redeem-cost">{{ item.cost }} 分</span>
          <button @click="redeem(item)" class="redeem-btn" :disabled="points < item.cost">兑换</button>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      points: 1000,
      updating: false,
      pointsHistory: [
        { id: 1, date: '2025-04-01', reason: '签到奖励', change: 10 },
        { id: 2, date: '2025-04-02', reason: '购物消费', change: -50 },
        { id: 3, date: '2025-04-03', reason: '活动奖励', change: 30 }
      ],
      items: [
        { id: 1, name: '10元代金券', cost: 500, category: '优惠券' },
        { id: 2, name: '50元话费', cost: 2000, category: '话费充值' },
        { id: 3, name: '精美礼品', cost: 1500, category: '实物' }
      ],
      categories: ['优惠券', '话费充值', '实物'],
      selectedCategory: 'all',
      sortOrder: 'asc'
    };
  },
  computed: {
    filteredItems() {
      let filtered = this.selectedCategory === 'all' ? this.items : this.items.filter(item => item.category === this.selectedCategory);
      return filtered.sort((a, b) => this.sortOrder === 'asc' ? a.cost - b.cost : b.cost - a.cost);
    }
  },
  methods: {
    redeem(item) {
      if (this.points >= item.cost) {
        this.updating = true;
        setTimeout(() => {
          this.points -= item.cost;
          this.pointsHistory.unshift({ id: Date.now(), date: new Date().toISOString().split('T')[0], reason: `兑换 ${item.name}`, change: -item.cost });
          this.updating = false;
        }, 500);
      }
    }
  }
};
</script>

<style scoped>
.points-dashboard {
  max-width: 450px;
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
.points-balance {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
.points-amount {
  font-size: 32px;
  font-weight: bold;
  color: #0077ff;
  transition: transform 0.3s ease-in-out;
}
.points-updating {
  transform: scale(1.2);
}
.points-history {
  background: white;
  margin-top: 15px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}
.history-item {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}
.positive {
  color: green;
}
.negative {
  color: red;
}
.redeem-section {
  background: white;
  margin-top: 15px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}
.filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.filter-dropdown {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.redeem-list {
  list-style: none;
  padding: 0;
}
.redeem-item {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid #eee;
}
.redeem-btn {
  padding: 5px 10px;
  border: none;
  background: #0077ff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
.redeem-btn:disabled {
  background: gray;
  cursor: not-allowed;
}
</style>
