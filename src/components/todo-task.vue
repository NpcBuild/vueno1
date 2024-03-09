<template>
  <div class="task" v-drags v-if="show">
    <div role="cell" class="col col-4" @click="markAsCompleted">
      <div class="TagStyle" :style="{'background-color': randomColor}"></div>
    </div>
    <div role="cell" class="col col-18" @dblclick="canEdit">
      <div v-if="!task.edit" class="list-item" :class="{ 'completed-task': completed }" style="font-size: 20px;">{{ task.todoName }}</div>
      <input v-else v-model="task.todoName" ref="myInput" type="text" placeholder="" name="text" class="input">
    </div>
    <div role="cell" class="col col-2">
      <Collect></Collect>
      <Like></Like>
      <span role="img" aria-label="close-circle" style="font-size: 20px;" @click="hidenTask">
        <i class="el-icon-circle-close"></i>
      </span>
    </div>
  </div>
</template>

<script>
import {randomNumber} from "@/utils/yMethods";
import Collect from "@/components/icon/Collect.vue";
import Like from "@/components/icon/Like.vue";

export default {
  name: "todo-task",
  components: {Like, Collect},
  props: {
    task: {
      type: Object,
      required: true,
      default: () => ({
        edit: false,
      })
    },
    completed: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      show: true,
      edit: false,
      colos: ['rgb(255, 85, 0)','rgb(135, 208, 104)','rgb(45, 183, 245)']
    };
  },
  mounted() {
    console.log(this.task)
    if (this.task.edit) {
      this.$nextTick(() => {
        this.$refs.myInput.focus(); // 获取焦点
      });
    }
  },
  computed: {
    randomColor() {
      return this.colos[randomNumber(0,this.colos.length - 1)];
    }
  },
  methods: {
    markAsCompleted() {
      var date = new Date().format('yyyy-MM-dd')
      this.postRequest('/todo/done', {
        ids: this.task.id,
        date: date
      }).then(() => {
        this.$emit("refresh", date);
      })
    },
    canEdit() {
      this.task.edit = true
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
  /*height: 20px;*/
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
.input {
  width: 90%;
  font-size: 20px;
  border-radius: 10px;
  outline: 2px solid #FEBF00;
  border: 0;
  background-color: #e2e2e2;
  outline-offset: 3px;
  padding: 12px 0;
  transition: 0.25s;
}

.input:focus {
  outline-offset: 5px;
  background-color: #fff
}
</style>