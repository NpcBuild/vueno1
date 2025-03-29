<template>
  <div class="interest-page">
    <header class="header">
      <h1>🎯 兴趣爱好</h1>
    </header>

    <!-- 兴趣展示区域 -->
    <section class="interest-section">
      <div v-for="(interest, index) in interests" :key="index" class="interest-card">
        <div class="interest-header" @click="toggleActivity(index)">
          <h4>{{ interest.name }}</h4>
          <i :class="{'icon-up': isActive(index), 'icon-down': !isActive(index)}"></i>
        </div>

        <div v-show="isActive(index)" class="activities">
          <ul>
            <li v-for="(activity, idx) in interest.activities" :key="idx">{{ activity }}</li>
          </ul>
          <div class="add-activity">
            <input v-model="newActivity" placeholder="添加新活动" @keydown.enter="addActivity(index)" />
            <button @click="addActivity(index)" class="add-btn">＋</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 添加兴趣按钮 -->
    <div class="add-interest-btn">
      <button @click="addInterest">+ 添加兴趣</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newActivity: '',
      interests: [
        { name: '摄影', activities: ['拍摄风景', '拍摄人像'] },
        { name: '旅行', activities: ['去海边', '去山里'] }
      ],
      activeIndex: null // 用来记录当前展开的兴趣索引
    };
  },
  methods: {
    goBack() {
      // 返回操作
      console.log('返回');
    },
    addInterest() {
      const newInterest = {
        name: '新的兴趣',
        activities: []
      };
      this.interests.push(newInterest);
    },
    removeInterest(index) {
      this.interests.splice(index, 1);
    },
    addActivity(index) {
      if (this.newActivity.trim() !== '') {
        this.interests[index].activities.push(this.newActivity);
        this.newActivity = '';
      }
    },
    toggleActivity(index) {
      if (this.activeIndex === index) {
        this.activeIndex = null; // 如果点击的是同一个兴趣，折叠起来
      } else {
        this.activeIndex = index; // 展开新的兴趣
      }
    },
    isActive(index) {
      return this.activeIndex === index;
    }
  }
};
</script>

<style scoped>
.interest-page {
  font-family: 'Arial', sans-serif;
  padding: 30px;
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding-bottom: 80px; /* 留出底部按钮空间 */
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 32px;
  font-weight: bold;
  color: #4b0082;
  margin-bottom: 20px;
}

.back-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
}

.interest-section {
  width: 100%;
  max-width: 600px;
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.interest-card {
  background: #fafafa;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.interest-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.interest-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.icon-up,
.icon-down {
  font-size: 18px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.icon-up {
  transform: rotate(180deg);
}

.activities {
  margin-top: 15px;
}

.activities ul {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
}

.activities li {
  padding: 8px;
  border-left: 3px solid #4b0082;
  margin-bottom: 10px;
  font-size: 16px;
}

.add-activity {
  display: flex;
  margin-top: 20px;
  gap: 15px;
  align-items: center;
}

.add-activity input {
  flex-grow: 1;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
}

.add-activity button {
  background: #4b0082;
  color: white;
  padding: 10px 18px; /* 调整按钮大小 */
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;
}

.add-activity button:hover {
  background-color: #6a5acd;
}

.add-interest-btn {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #28a745;
  color: white;
  padding: 12px 30px; /* 适当调整按钮大小 */
  border-radius: 25px;
  border: none;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;
}

.add-interest-btn:hover {
  background-color: #218838;
}

@media (max-width: 768px) {
  .interest-card {
    padding: 15px;
  }

  .interest-header h4 {
    font-size: 18px;
  }

  .add-interest-btn {
    font-size: 16px;
    padding: 12px 24px;
  }
}
</style>
