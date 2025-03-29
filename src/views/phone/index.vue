<template>
  <div class="home">
    <!-- 背景壁纸 -->
    <div class="wallpaper">
<!--      <img src="@/assets/wallpaper.jpg" alt="wallpaper" class="background">-->
      <img src="https://cloudflare-imgbed-c0r.pages.dev/file/1740974968122_IMG_4513.jpeg" alt="wallpaper" class="background">
    </div>

    <!-- 时间与天气 -->
    <div class="info">
      <div class="time">{{ currentTime }}</div>
      <div class="date-weather">
        <span>{{ currentDate }}</span>
        <span>{{ weather }}</span>
      </div>
    </div>

    <!-- 应用图标 -->
    <div class="app-grid">
      <div class="app-item"
           v-for="app in apps"
           :key="app.name"
           @mouseover="hoveredApp = app.name"
           @mouseleave="hoveredApp = null"
           :class="{ active: hoveredApp === app.name }">
        <img :src="app.icon" :alt="app.name" class="app-icon" @click="jumpTo(app.to)">
        <span v-if="app.name === '金额' && allMoney" class="app-name">{{allMoney}}</span>
        <span v-else class="app-name">{{ app.name }}</span>
      </div>
    </div>

    <!-- 底部 Dock -->
    <div class="dock">
      <div class="dock-item" v-for="dock in dockApps" :key="dock.name"
           @mouseover="hoveredApp = dock.name"
           @mouseleave="hoveredApp = null"
           :class="{ active: hoveredApp === dock.name }">
        <img :src="dock.icon" :alt="dock.name" class="dock-icon" @click="jumpTo(dock.to)">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTime: '',
      currentDate: '',
      weather: '19°C ☁ 北京',
      hoveredApp: null,
      apps: [
        { name: '金额', icon: require('@/assets/icons/money.png') ,to: '/money'},
        { name: '待办事项', icon: require('@/assets/icons/todo.png'),to: '/todo'},
        { name: '成就', icon: require('@/assets/icons/reach-goal.png'),to: '/goal'},
        { name: '社交', icon: require('@/assets/icons/friends.png'),to: '/friends'},
        { name: '日记复盘', icon: require('@/assets/icons/note.png'),to: '/note'},
        { name: '兴趣爱好', icon: require('@/assets/icons/hobit2.png'),to: '/hobit'},
        { name: '资产', icon: require('@/assets/icons/assets.png'),to: '/assets'},
        { name: '菜谱', icon: require('@/assets/icons/cookbook.png'),to: '/cookbook'},
        { name: '项目', icon: require('@/assets/icons/project.png'),to: '/project'},
        { name: '积分', icon: require('@/assets/icons/points.png'),to: '/points'},
        { name: '设置', icon: require('@/assets/icons/setting.png'),to: '/setting'},
          // 购物、积分兑换、副业项目
        // { name: '股票', icon: require('@/assets/icons/stocks.png') },
        // { name: '图鉴', icon: require('@/assets/icons/gallery.png') },
        // { name: '情报', icon: require('@/assets/icons/news.png') },
        // { name: '玩家作品', icon: require('@/assets/icons/creations.png') },
        // { name: '周边商城', icon: require('@/assets/icons/shop.png') },
        // { name: '动态', icon: require('@/assets/icons/social.png') },
      ],
      dockApps: [
        { name: '自我', icon: require('@/assets/icons/me.png'),to: '/me'},
        { name: '伴侣', icon: require('@/assets/icons/love.png'),to: '/love'},
      ],
      allMoney: null
    };
  },
  created() {
    this.getMoney()
  },
  methods: {
    updateTime() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      this.currentDate = now.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' });
    },
    getMoney() {
      this.getRequest('/money/all').then(res => {
        this.allMoney = res.data
      })
    },
    jumpTo(type) {
      if (!type) {
        return this.$message.error("页面开发中，敬请期待");
      }
      this.$router.push('/phone' + type);
    }
  },
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
  }
};
</script>

<style scoped>
/* 添加鼠标悬浮效果 */
.app-item.active {
  transform: scale(1.1);
  transition: transform 0.2s;
}
</style>
<style scoped>
/* 让整个屏幕填满 */
.home {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  /*justify-content: space-between;*/
}

/* 背景壁纸 */
.wallpaper {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.background {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.9); /* 让壁纸稍微暗一点，文字更清晰 */
}

/* 时间和天气信息 */
.info {
  margin-top: 50px;
  text-align: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.6);
}

.time {
  font-size: 60px;
  font-weight: bold;
  letter-spacing: 2px;
}

.date-weather {
  font-size: 20px;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 应用图标布局 */
.app-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding-bottom: 50px;
  /*background: rgba(0, 0, 0, 0.2);*/
  width: 90%;
  padding: 15px;
  border-radius: 20px;
}

.app-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s;
}

.app-item:hover {
  transform: scale(1.1);
}

.app-icon {
  /*增加辨识度*/
  background: antiquewhite;
  width: 70px;
  height: 70px;
  border-radius: 18px;
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.3);
}

.app-name {
  margin-top: 8px;
  font-size: 16px;
  font-weight: 500;
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
}

.dock {
  position: absolute;
  bottom: 20px;
  display: flex;
  justify-content: center;
  width: 88vw;
  gap: 15px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 15px;
}

.dock-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dock-icon {
  /*增加辨识度*/
  background: antiquewhite;
  width: 50px;
  height: 50px;
  border-radius: 10px;
}
</style>