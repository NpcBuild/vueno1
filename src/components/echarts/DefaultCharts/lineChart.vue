<template>
<!-- todo 实现-->
  <div id="wrapper">
    <div id="container">
      <div
          v-for="(item, index) in items"
          :key="item.id"
          class="grid-item"
          :style="{ width: item.w + 'px', height: item.h + 'px' }"
          draggable="true"
          @dragstart="onDragStart(index, $event)"
          @dragover.prevent
          @drop="onDrop(index)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      draggingIndex: null,
    };
  },
  methods: {
    onDragStart(index, event) {
      this.draggingIndex = index;
      event.dataTransfer.effectAllowed = 'move';
    },
    onDrop(index) {
      if (this.draggingIndex !== null && this.draggingIndex !== index) {
        const movedItem = this.items.splice(this.draggingIndex, 1)[0];
        this.items.splice(index, 0, movedItem);
      }
      this.draggingIndex = null;
    },
  },
};
</script>

<style scoped>
#wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ddd;
}

#container {
  width: 90%;
  max-width: 800px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
  background: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.grid-item {
  background: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: grab;
  user-select: none;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}

.grid-item:active {
  transform: scale(1.05);
}
</style>
