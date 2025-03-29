<template>
  <div class="partner-page">
    <header class="header">❤️ 我们的美好回忆</header>

    <!-- 纪念日提醒 -->
    <section class="anniversary">
      <h2>📅 纪念日</h2>
      <ul>
        <li v-for="(event, index) in anniversaries" :key="index" class="event-item">
          <span class="event-name">{{ event.name }}</span>
          <span class="event-date">{{ event.date }}</span>
          <span class="countdown">{{ getCountdown(event.date) }}</span>
        </li>
      </ul>
    </section>

    <!-- 甜蜜时光 -->
    <section class="memories">
      <h2>📸 甜蜜时光</h2>
      <div class="memory-grid">
        <div class="memory-card" v-for="(memory, index) in memories" :key="index">
          <img :src="memory.image" class="memory-image" />
          <div class="memory-info">
            <h3>{{ memory.title }}</h3>
            <p>{{ memory.date }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 甜蜜对话回忆 -->
    <section class="chat-memories">
      <h2>💬 甜蜜对话回忆</h2>
      <div class="chat-list">
        <div class="chat-item" v-for="(chat, index) in chatMemories" :key="index">
          <p class="chat-text">“{{ chat.text }}”</p>
          <span class="chat-date">{{ chat.date }}</span>
        </div>
      </div>
    </section>

    <!-- 愿望清单 -->
    <section class="wishlist">
      <h2>🎯 愿望清单</h2>
      <ul>
        <li v-for="(wish, index) in wishlist" :key="index" class="wishlist-item">
          <span :class="{ completed: wish.completed }">{{ wish.text }}</span>
          <button @click="toggleWish(index)" class="toggle-btn">{{ wish.completed ? '✔' : '⭕' }}</button>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      anniversaries: [
        { name: "恋爱纪念日", date: "2023-06-10" },
        { name: "第一次旅行", date: "2023-09-15" }
      ],
      memories: [
        { title: "第一次约会", date: "2022-10-05", image: "https://via.placeholder.com/150" },
        { title: "海边旅行", date: "2023-07-20", image: "https://via.placeholder.com/150" }
      ],
      chatMemories: [
        { text: "今天的晚霞好美，和你一样。", date: "2023-05-15" },
        { text: "记得第一次见你时，心跳得好快。", date: "2023-02-20" }
      ],
      wishlist: [
        { text: "一起去看极光", completed: false },
        { text: "学习一门新语言", completed: true }
      ]
    };
  },
  methods: {
    getCountdown(date) {
      const eventDate = new Date(date);
      const now = new Date();
      const diff = Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24));
      return diff > 0 ? `还有 ${diff} 天` : "已过";
    },
    toggleWish(index) {
      this.wishlist[index].completed = !this.wishlist[index].completed;
    }
  }
};
</script>

<style scoped>
.partner-page {
  font-family: Arial, sans-serif;
  padding: 20px;
  background: linear-gradient(to right, #ff9a9e, #fad0c4);
  min-height: 100vh;
  text-align: center;
  color: #333;
}
.header {
  font-size: 28px;
  font-weight: bold;
  color: #d63384;
  margin-bottom: 20px;
}
.anniversary, .memories, .chat-memories, .wishlist {
  background: white;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  margin-bottom: 15px;
}
.event-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}
.memory-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
  padding: 10px 0;
}
.memory-card {
  background: #fff;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.memory-image {
  width: 100%;
  border-radius: 10px;
}
.chat-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.chat-item {
  background: #fff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.chat-text {
  font-size: 16px;
  font-weight: bold;
  color: #d63384;
}
.chat-date {
  font-size: 12px;
  color: gray;
}
.wishlist-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}
.completed {
  text-decoration: line-through;
  color: gray;
}
.toggle-btn {
  border: none;
  background: none;
  font-size: 18px;
  cursor: pointer;
  color: #d63384;
}
</style>