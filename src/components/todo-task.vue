<template>
  <div class="task" v-if="show">
    <div role="cell" class="col col-4">
      <div class="TagStyle" :style="{'background-color': randomColor}"></div>
    </div>
    <div role="cell" class="col col-18" @click="markAsCompleted">
      <div class="list-item" :class="{ 'completed-task': completed }" style="font-size: 20px;">{{ taskText }}</div>
    </div>
    <div role="cell" class="col col-2">
      <span role="img" aria-label="close-circle" style="font-size: 20px;" @click="hidenTask">
        <i class="el-icon-circle-close"></i>
      </span>
    </div>
  </div>
</template>

<script>
import {randomNumber} from "@/utils/yMethods";

export default {
  name: "todo-task",
  props: {
    taskText: String,
    completed: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      show: true,
      colos: ['rgb(255, 85, 0)','rgb(135, 208, 104)','rgb(45, 183, 245)']
    };
  },
  computed: {
    randomColor() {
      return this.colos[randomNumber(0,this.colos.length - 1)];
    }
  },
  methods: {
    markAsCompleted() {
      this.completed = !this.completed
      // if (this.completed) {
      //   setTimeout(() => {
      //     this.completed = false;
      //   }, 3000);
      // }
    },
    hidenTask() {
      this.show = false
    },
  },
}
</script>

<style scoped>
.completed-task {
  text-decoration: line-through;
  color: rgb(226, 226, 226) !important;
}
.task {
  display: flex;
  align-items: center;
  margin: 10px 0;
}
.ant-list * {
  outline: none;
}
.col {
  max-width: 100%;
  min-height: 1px;
  position: relative;
}
.col-4 {
  display: block;
  flex: 0 0 16.66666667%;
  max-width: 16.66666667%;
}
.col-18 {
  display: block;
  flex: 0 0 75%;
  max-width: 75%;
}
.col-2 {
  display: block;
  flex: 0 0 8.33333333%;
  max-width: 8.33333333%;
}
.TagStyle {
  border-Radius: 50%;
  height: 20px;
  width: 20px;
}
.list-item {
  align-items: center;
  color: rgba(0,0,0,.85);
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
}
</style>