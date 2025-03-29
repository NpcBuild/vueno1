<template>
  <div class="social-page">
    <header class="header">📌 我的社交圈</header>

    <div v-if="selectedContact" class="contact-detail">
      <button class="back-btn" @click="selectedContact = null">← 返回</button>
      <div class="profile-card">
        <img :src="selectedContact.avatar" class="avatar-large" />
        <h2>{{ selectedContact.name }}</h2>
        <p class="bio">{{ selectedContact.bio }}</p>
      </div>
      <div class="extra-info">
        <div class="info-item"><strong>📍 位置:</strong> {{ selectedContact.location }}</div>
        <div class="info-item"><strong>📞 电话:</strong> {{ selectedContact.phone }}</div>
        <div class="info-item"><strong>📧 邮箱:</strong> {{ selectedContact.email }}</div>
        <div class="info-item"><strong>💼 职业:</strong> {{ selectedContact.job }}</div>
        <div class="info-item"><strong>🎓 教育背景:</strong> {{ selectedContact.education }}</div>
        <div class="info-item"><strong>🔗 社交链接:</strong> <a :href="selectedContact.social" target="_blank">查看社交资料</a></div>
      </div>

      <!-- 聊天话题输入 -->
      <div class="topic-section">
        <input v-model="newTopic" class="topic-input" placeholder="记录一个聊天话题..."/>
        <button @click="addTopic" class="add-topic-btn">➕ 添加话题</button>
      </div>
      <div v-if="selectedContact.topics && selectedContact.topics.length > 0" class="topic-list">
        <h3>🗣️ 聊天话题</h3>
        <ul>
          <li v-for="(topic, index) in selectedContact.topics" :key="index">
            {{ topic }}
            <button @click="removeTopic(selectedContact, index)" class="remove-topic-btn">❌</button>
          </li>
        </ul>
      </div>
    </div>

    <section v-if="!selectedContact" class="contact-list">
      <div class="contact-card" v-for="(contact, index) in contacts" :key="index" @click="selectContact(contact)">
        <img :src="contact.avatar" class="avatar" />
        <div class="info">
          <h2>{{ contact.name }}</h2>
          <p>{{ contact.bio }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedContact: null,
      newTopic: '',
      contacts: [
        {
          name: "张三",
          bio: "前端工程师，喜欢旅行和摄影",
          location: "北京",
          phone: "123-4567-8901",
          email: "zhangsan@example.com",
          job: "软件开发",
          education: "清华大学计算机系",
          social: "https://linkedin.com/in/zhangsan",
          avatar: "https://i.pravatar.cc/100?img=1",
          topics: []
        },
        {
          name: "李四",
          bio: "AI研究员，热衷于机器学习",
          location: "上海",
          phone: "234-5678-9012",
          email: "lisi@example.com",
          job: "人工智能专家",
          education: "复旦大学人工智能学院",
          social: "https://linkedin.com/in/lisi",
          avatar: "https://i.pravatar.cc/100?img=2",
          topics: []
        },
        {
          name: "王五",
          bio: "自由职业者，擅长UI设计",
          location: "广州",
          phone: "345-6789-0123",
          email: "wangwu@example.com",
          job: "UI/UX 设计师",
          education: "广州美术学院",
          social: "https://linkedin.com/in/wangwu",
          avatar: "https://i.pravatar.cc/100?img=3",
          topics: []
        }
      ]
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.getRequest('/chatBuddy/getChatBuddyList',{pageSize: 999}).then(res => {
        console.log("获取结果：", res.data.records)
        let result = []
        res.data.records.forEach(item => {
          let obj = {
            name: item.name,
            bio: item.notes,
            location: "广州",
            phone: "345-6789-0123",
            email: "wangwu@example.com",
            job: "UI/UX 设计师",
            education: "广州美术学院",
            social: "https://linkedin.com/in/wangwu",
            avatar: "https://i.pravatar.cc/100?img=3",
            topics: []
          }
          result.push(obj)
        })
        this.contacts = result
      })
    },
    selectContact(contact) {
      this.selectedContact = contact;
    },
    addTopic() {
      if (this.newTopic.trim()) {
        this.selectedContact.topics.push(this.newTopic.trim());
        this.newTopic = '';
      }
    },
    removeTopic(contact, index) {
      contact.topics.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.social-page {
  font-family: Arial, sans-serif;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 400px;
}

.contact-card {
  display: flex;
  align-items: center;
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.contact-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}

.info h2 {
  font-size: 18px;
  margin: 0;
  color: #333;
}

.info p {
  font-size: 14px;
  color: #777;
}

.contact-detail {
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 90%;
  max-width: 450px;
  animation: fadeIn 0.3s ease-in-out;
}

.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #ddd;
}

.avatar-large {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.bio {
  font-size: 14px;
  color: #555;
}

.extra-info {
  font-size: 14px;
  color: #444;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  text-align: left;
}

.info-item {
  background: #f0f0f0;
  padding: 8px;
  border-radius: 5px;
}

.back-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #666;
}

.topic-section {
  margin-top: 20px;
}

.topic-input {
  width: 75%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.add-topic-btn {
  background: #28a745;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.topic-list {
  margin-top: 20px;
}

.remove-topic-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}
</style>
