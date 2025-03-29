<template>
  <div class="profile-page">
    <header class="header">📌 个人主页</header>

    <div class="profile-card">
      <img :src="user.avatar" class="avatar" />
      <h2>{{ user.name }}</h2>
      <p class="bio">{{ user.bio }}</p>
    </div>

    <div class="settings">
      <button @click="goToAccountSettings" class="settings-btn">账户设置</button>
      <button @click="goToPrivacySettings" class="settings-btn">隐私设置</button>
      <button @click="goToNotificationSettings" class="settings-btn">通知设置</button>
    </div>

    <section v-if="showActivity" class="activity-log">
      <h3>最近活动</h3>
      <ul>
        <li v-for="(activity, index) in activities" :key="index">{{ activity }}</li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: '张三',
        avatar: 'https://i.pravatar.cc/100?img=1',
        bio: '前端工程师，喜欢旅行和摄影'
      },
      activities: [
        '更新个人资料',
        '更改密码',
        '开启通知提醒'
      ],
      showActivity: false
    };
  },
  methods: {
    goToAccountSettings() {
      alert('跳转到账户设置页面');
    },
    goToPrivacySettings() {
      alert('跳转到隐私设置页面');
    },
    goToNotificationSettings() {
      alert('跳转到通知设置页面');
    }
  }
};
</script>

<style scoped>
.profile-page {
  font-family: 'Arial', sans-serif;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 25px;
  color: #333;
}

.profile-card {
  background: #fff;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 90%;
  max-width: 350px;
  margin-bottom: 30px;
  transition: transform 0.3s ease;
}

.profile-card:hover {
  transform: scale(1.05);
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.avatar:hover {
  transform: scale(1.1);
}

.bio {
  color: #777;
  font-size: 16px;
}

.settings {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 350px;
}

.settings-btn {
  background: linear-gradient(135deg, #6a5acd, #4b0082);
  color: white;
  border: none;
  padding: 12px 20px;
  margin: 10px 0;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.settings-btn:hover {
  background: linear-gradient(135deg, #4b0082, #6a5acd);
  transform: translateY(-4px);
}

.activity-log {
  margin-top: 30px;
  width: 100%;
  max-width: 350px;
  padding: 15px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.activity-log h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}

.activity-log ul {
  list-style: none;
  padding-left: 0;
}

.activity-log li {
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
  color: #666;
}
</style>
