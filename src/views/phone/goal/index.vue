<template>
  <div class="achievement-page">
    <header class="header">
      <h1>🏆 我的成就</h1>
    </header>

    <div v-if="selectedAchievement" class="achievement-detail">
      <div class="detail-header">
        <span class="badge">🏅 {{ selectedAchievement.category }}</span>
        <h2>{{ selectedAchievement.title }}</h2>
      </div>
      <p>{{ selectedAchievement.description }}</p>
      <div class="extra-info">
        <span class="difficulty">🎯 难度: {{ selectedAchievement.difficulty }}</span>
        <span class="date">📅 达成日期: {{ selectedAchievement.date }}</span>
      </div>
      <button class="close-btn" @click="selectedAchievement = null">×</button>
    </div>

    <section v-if="!selectedAchievement" class="achievement-list">
      <div class="achievement-card" v-for="(ach, index) in achievements" :key="index" @click="selectAchievement(ach)">
        <div class="icon">🏅</div>
        <div class="info">
          <h2>{{ ach.title }}</h2>
          <p class="category">{{ ach.category }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedAchievement: null,
      achievements: [
        { title: "完成马拉松", description: "成功跑完42公里的马拉松比赛", date: "2024-03-10", category: "运动", difficulty: "高" },
        { title: "阅读50本书", description: "在一年内完成50本书籍的阅读目标", date: "2023-12-31", category: "学习", difficulty: "中" },
        { title: "学习Vue.js", description: "成功掌握Vue.js框架并开发多个项目", date: "2023-08-15", category: "编程", difficulty: "中" },
        { title: "登顶一座高山", description: "成功登顶海拔4000米以上的高山", date: "2022-10-05", category: "探险", difficulty: "高" }
      ]
    };
  },
  methods: {
    selectAchievement(achievement) {
      this.selectedAchievement = achievement;
    }
  }
};
</script>

<style scoped>
.achievement-page {
  font-family: Arial, sans-serif;
  padding: 20px;
  background: linear-gradient(135deg, #f6d365, #fda085);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.header {
  text-align: center;
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #fff;
}
.achievement-detail {
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 90%;
  max-width: 450px;
  position: relative;
  margin-bottom: 20px;
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.detail-header {
  font-size: 22px;
  margin-bottom: 10px;
  color: #333;
}
.badge {
  background: #fda085;
  padding: 5px 10px;
  border-radius: 10px;
  color: white;
  font-weight: bold;
}
.extra-info {
  font-size: 14px;
  color: #444;
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 5px;
}
.date, .difficulty {
  font-size: 13px;
  color: #666;
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #999;
}
.achievement-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 400px;
}
.achievement-card {
  display: flex;
  align-items: center;
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}
.achievement-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}
.icon {
  font-size: 24px;
  margin-right: 15px;
}
.info {
  flex: 1;
}
.info h2 {
  font-size: 18px;
  margin: 0;
  color: #333;
}
.category {
  font-size: 14px;
  color: #777;
}
</style>