<template>
  <div class="diary-page">
    <header class="header">📖 我的日记 & 复盘</header>

    <!-- 切换查看日记或复盘 -->
    <div class="tab-container">
      <span @click="activeTab = 'diary'" :class="['tab', { active: activeTab === 'diary' }]">📅 日记</span>
      <span @click="activeTab = 'review'" :class="['tab', { active: activeTab === 'review' }]">🔍 复盘</span>
    </div>

    <section v-if="activeTab === 'diary'" class="diary-section">
      <h2>📅 今日日记</h2>
      <textarea v-model="todayDiary.text" placeholder="写下你的今天..." class="diary-input"></textarea>

      <div class="mood-container">
        <span v-for="(mood, index) in moods" :key="index"
              @click="todayDiary.mood = mood.text"
              :class="['mood-item', { active: todayDiary.mood === mood.text }]">
          {{ mood.icon }}
        </span>
      </div>

      <button @click="saveDiary" class="save-btn">✅ 保存日记</button>

      <h2>📜 以往日记</h2>
      <ul class="diary-list">
        <li v-for="(entry, index) in pastDiaries" :key="index" class="diary-entry">
          <span @click="viewDiary(entry)">{{ entry.date }} - {{ entry.mood }}</span>
        </li>
      </ul>
    </section>

    <section v-if="activeTab === 'review'" class="review-section">
      <h2>📝 录入复盘</h2>
      <input v-model="newReview.period" type="date" class="review-input" placeholder="选择日期">
      <textarea v-model="newReview.event" placeholder="发生了什么？" class="review-input"></textarea>
      <textarea v-model="newReview.reflection" placeholder="你的反思" class="review-input"></textarea>
      <textarea v-model="newReview.improvement" placeholder="如何改进？" class="review-input"></textarea>
      <button @click="addReview" class="save-btn">📌 保存复盘</button>

      <h2>🔍 复盘记录</h2>
      <div v-for="(review, index) in reviews" :key="index" class="review-card">
        <h3 class="review-title">{{ review.period }}</h3>
        <p class="review-text">📌 {{ review.event }}</p>
        <p class="review-reflection">💡 {{ review.reflection }}</p>
        <p class="review-improvement">🚀 {{ review.improvement }}</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'diary',
      todayDiary: {
        text: "",
        mood: "😃 开心"
      },
      pastDiaries: [
        { date: "2025-03-10", text: "今天学习了 Vue，收获满满！", mood: "😃 开心" },
        { date: "2025-03-05", text: "感觉有点疲惫，需要调整作息。", mood: "☹️ 低落" }
      ],
      moods: [
        { text: "😃 开心", icon: "😃" },
        { text: "🙂 平静", icon: "🙂" },
        { text: "😐 一般", icon: "😐" },
        { text: "☹️ 低落", icon: "☹️" },
        { text: "😢 难过", icon: "😢" }
      ],
      reviews: [
        { period: "2025-03-10", event: "工作效率低，未按时完成任务", reflection: "未合理规划时间，容易分心", improvement: "使用番茄钟工作法，提高专注度" },
        { period: "2025-03-05", event: "健身计划未坚持", reflection: "动力不足，缺乏监督", improvement: "制定详细计划，并与朋友一起打卡" }
      ],
      newReview: {
        period: "",
        event: "",
        reflection: "",
        improvement: ""
      }
    };
  },
  methods: {
    saveDiary() {
      this.pastDiaries.unshift({ date: new Date().toISOString().slice(0, 10), text: this.todayDiary.text, mood: this.todayDiary.mood });
      this.todayDiary.text = "";
      alert("日记已保存！");
    },
    viewDiary(entry) {
      alert(`日期: ${entry.date}\n心情: ${entry.mood}\n内容: ${entry.text}`);
    },
    addReview() {
      if (!this.newReview.period || !this.newReview.event || !this.newReview.reflection || !this.newReview.improvement) {
        alert("请完整填写复盘信息！");
        return;
      }
      this.reviews.unshift({ ...this.newReview });
      this.newReview = { period: "", event: "", reflection: "", improvement: "" };
      alert("复盘已保存！");
    }
  }
};
</script>

<style scoped>
.diary-page {
  font-family: Arial, sans-serif;
  padding: 20px;
  background: #ffffff;
  min-height: 100vh;
  text-align: center;
}
.header {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}
.tab-container {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 15px;
}
.tab {
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-bottom: 3px solid transparent;
  transition: all 0.3s;
}
.tab.active {
  border-bottom: 3px solid #4caf50;
  font-weight: bold;
}
.diary-input, .review-input {
  width: 90%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  margin-top: 10px;
  background: #f8f8f8;
}
.mood-container {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 10px;
}
.mood-item {
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
  transition: transform 0.2s;
}
.mood-item.active {
  transform: scale(1.2);
}
.save-btn {
  background: #4caf50;
  color: white;
  padding: 12px;
  border-radius: 20px;
  margin-top: 12px;
  width: 80%;
  max-width: 200px;
  transition: background 0.3s;
}
.save-btn:hover {
  background: #45a049;
}
</style>
