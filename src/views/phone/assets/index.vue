<template>
  <div class="assets-page">
    <header class="header">
      <h1>📦 我的资产</h1>
      <button class="view-toggle" @click="toggleView">
        <i :class="isGridView ? 'icon-list' : 'icon-grid'"></i>
      </button>
    </header>
    <main :class="['assets-container', { grid: isGridView }]">
      <div v-for="asset in assets" :key="asset.id" class="asset-card">
        <div class="asset-image">
          <img v-if="asset.type === 'image'" :src="asset.src" alt="资产图片" />
          <i v-else :class="asset.icon"></i>
          <div v-if="asset.expiry" class="countdown" :data-time="asset.expiry">
            {{ getRemainingTime(asset.expiry) }}
          </div>
        </div>
        <div class="asset-info">
          <h3>{{ asset.name }}</h3>
          <p>{{ asset.description }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isGridView: false,
      assets: [
        { id: 1, name: "会员卡", description: "高级会员权益", type: "image", src: "vip-card.png", expiry: Date.now() + 86400000 },
        { id: 2, name: "代金券", description: "50元购物券", type: "icon", icon: "icon-ticket", expiry: Date.now() + 172800000 },
        { id: 3, name: "游戏皮肤", description: "限时免费领取", type: "image", src: "skin.png" },
        { id: 4, name: "现金红包", description: "1元微信红包", type: "icon", icon: "icon-money" }
      ]
    };
  },
  methods: {
    initData() {
      this.getRequest();
    },
    toggleView() {
      this.isGridView = !this.isGridView;
    },
    getRemainingTime(expiry) {
      if (!expiry) return "永久有效";
      const diff = expiry - Date.now();
      if (diff <= 0) return "已过期";
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      return `${hours}小时${minutes}分钟`;
    }
  }
};
</script>

<style scoped>
.assets-page {
  padding: 15px;
  font-family: Arial, sans-serif;
  max-width: 450px;
  margin: auto;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
}
.view-toggle {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}
.assets-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.assets-container.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
.asset-card {
  background: #fff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  text-align: left;
  position: relative;
}
.asset-image {
  flex: 0 0 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  overflow: hidden;
  margin-right: 10px;
}
.asset-image img {
  max-width: 100%;
  max-height: 100%;
}
.countdown {
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(255, 0, 0, 0.7);
  color: white;
  font-size: 12px;
  padding: 2px 5px;
  border-radius: 4px;
}
.asset-info h3 {
  font-size: 16px;
  margin: 5px 0;
}
.asset-info p {
  font-size: 12px;
  color: #555;
}
.icon-list::before {
  content: "📜";
}
.icon-grid::before {
  content: "🔲";
}
</style>