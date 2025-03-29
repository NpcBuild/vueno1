<template>
  <div class="task-page">
    <!-- 顶部栏 -->
    <div class="header">
      <div class="month">3月</div>
      <div class="add-btn">+</div>
    </div>

    <!-- 固定一周的日期栏 -->
    <div class="week-calendar">
      <div v-for="(day, index) in weekDays" :key="index" class="day">
        <div class="weekday">{{ day.weekday }}</div>
        <div
            class="date"
            :class="{ active: selectedDate === day.date }"
            @click="selectedDate = day.date"
        >
          {{ day.date }}
        </div>
      </div>
    </div>

    <!-- 今日任务标题 -->
    <div class="section-title">今日任务</div>

    <!-- 任务列表 -->
    <div class="task-list task-wrapper">
      <div v-for="(task, index) in tasks" :key="index" class="task-item"
           @touchstart="touchStart($event, index)"
           @touchmove="touchMove($event, index)"
           @touchend="touchEnd($event, index)"
           :style="{ transform: `translateX(${task.offsetX}px)`, transition: task.transition }">
        <div class="task-left">
          <!-- 分类和标题 -->
          <div class="task-category" :class="categoryColor(task.category)">
            {{ task.category }}
          </div>
          <!-- 倒计时 -->
          <span class="countdown" v-if="task.deadline">{{ task.remainingTime }}</span>
          <div class="task-title">{{ task.title }}</div>

          <!-- 进度条 -->
          <div v-if="task.progress || task.total">
            <div class="progress-bar">
              <div
                  class="progress-bar-fill"
                  :style="{ width: (task.progress / task.total) * 100 + '%' }"
              ></div>
            </div>
            <div class="progress-text">
              {{ task.progress }}/{{ task.total }}
            </div>
          </div>

          <!-- 右侧滑动按钮 -->
          <div class="task-actions" v-show="task.swipeActive">
            <button class="skip-btn" @click="skipTask(index)">跳过</button>
            <button class="delete-btn" @click="deleteTask(index)">删除</button>
          </div>
        </div>
<!--        <div class="task-right">-->
<!--          <button class="skip-btn">跳过</button>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canTwoWay: true, // 可以左右滑动
      threshold: 50, // 滑动距离阈值
      selectedDate: new Date().getDate(),
      weekDays: this.getWeekDays(),
      tasks: [
        { category: '财务健康', title: '每月存钱2000块', progress: 0, total: 2000, subtasks: [], deadline: "2025-03-31", swipeActive: false, remainingTime: "", offsetX: 0, startX: 0, transition: "none" },
        { category: '财务健康', title: '每周研究一个赚钱技能或者案例', subtasks: [], deadline: "2025-03-15", swipeActive: false, remainingTime: "", offsetX: 0, startX: 0, transition: "none"},
        { category: '身体健康', title: '保证每天7-8小时睡眠', subtasks: [], deadline: null, swipeActive: false, offsetX: 0, startX: 0, transition: "none" },
        { category: '身体健康', title: '每天8杯水', progress: 0, total: 8, offsetX: 0, startX: 0, transition: "none" },
        { category: '身体健康', title: '多做饭，少点外卖',
          subtasks: [{ title: "每天8杯水", completed: false }, { title: "多做饭", completed: false }],
          deadline: null,
          swipeActive: false, offsetX: 0, startX: 0, transition: "none"},
        { category: '身体健康', title: '不喝奶茶', offsetX: 0, startX: 0, transition: "none"},
        { category: '身体健康', title: '每天吃至少一种水果', offsetX: 0, startX: 0, transition: "none"}
      ]
    };
  },
  created() {
    this.getInfo()
  },
  mounted() {
    this.updateCountdown();
    this.timer = setInterval(this.updateCountdown, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    getWeekDays() {
      let start = new Date();
      start.setDate(start.getDate() - ((start.getDay() || 7) - 1));
      return Array.from({ length: 7 }, (_, i) => {
        let date = new Date(start);
        date.setDate(start.getDate() + i);
        return { weekday: ["一", "二", "三", "四", "五", "六", "日"][i], date: date.getDate() };
      });
    },
    getInfo() {
      this.getRequest('/todo/getTodoList', {pageSize: 100}).then(res => {
        let result = []
        res.data.records.forEach(item => {
          console.log(item)
          let obj = {
            id: item.id,
            category: 0,
            title: item.todoName,
            progress: 0,
            total: 0,
            subtasks: [],
            deadline: 0,
            swipeActive: 0,
            remainingTime: 0,
            offsetX: 0,
            startX: 0,
            transition: "none"
          }
          result.push(obj)
        })
        this.tasks.push(...result)
      })
    },
    categoryColor(cat) {
      if (cat === '财务健康') return 'finance';
      if (cat === '身体健康') return 'health';
      return '';
    },
    updateCountdown() {
      this.tasks.forEach(task => {
        if (task.deadline) {
          // let diff = dayjs(task.deadline).diff(dayjs(), "days");
          let diff = 4;
          task.remainingTime = diff > 0 ? `剩余 ${diff} 天` : "已到期";
        }
      });
    },
    touchStart(event, index) {
      this.tasks[index].startX = event.touches[0].clientX;
      this.tasks[index].transition = "none";
    },
    touchMove(event, index) {
      let diff = event.touches[0].clientX - this.tasks[index].startX;
      if (this.canTwoWay) {
        if (Math.abs(diff) > this.threshold) {
          this.tasks[index].offsetX = diff > 0 ? 50 : -50;
        }
      } else {
        if (diff < 0 && diff > -100) {
          this.tasks[index].offsetX = diff;
        }
      }
    },
    touchEnd(event, index) {
      if (this.canTwoWay) {
        if (Math.abs(this.tasks[index].offsetX) < this.threshold) {
          this.tasks[index].offsetX = 0;
        }
      } else {
        if (this.tasks[index].offsetX < -50) {
          this.tasks[index].offsetX = -100;
          this.tasks[index].swipeActive = true;
        } else {
          this.tasks[index].offsetX = 0;
          this.tasks[index].swipeActive = false;
        }
      }
      this.tasks[index].transition = "transform 0.3s ease";
    },
    skipTask(index) {
      alert(`跳过任务: ${this.tasks[index].title}`);
      this.tasks[index].offsetX = 0;
      this.tasks[index].swipeActive = false;
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.task-page {
  background: #000;
  color: #fff;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 20px;
  box-sizing: border-box;
}

/* 顶部栏 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.month {
  font-size: 28px;
  font-weight: bold;
}

.add-btn {
  font-size: 28px;
  width: 40px;
  height: 40px;
  background: #333;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.week-calendar {
  display: flex;
  gap: 10px;
}

.day {
  text-align: center;
  width: 40px;
}

.weekday {
  color: #888;
  font-size: 12px;
}

.date {
  font-size: 18px;
  background: #222;
  padding: 5px;
  border-radius: 8px;
}

.date.active {
  background: #5b5bff;
}

/* 今日任务标题 */
.section-title {
  font-size: 18px;
  margin-bottom: 10px;
  color: #ccc;
}

/* 任务列表 */
.task-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* 单个任务 */
.task-item {
  background: #111;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-left {
  flex: 1;
}

.task-category {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 5px;
}
.countdown {
  float: right;
}

/* 分类颜色 */
.finance {
  background-color: #c19000;
}

.health {
  background-color: #00a000;
}

.task-title {
  font-size: 16px;
  margin-bottom: 8px;
}

/* 进度条 */
.progress-bar {
  width: 100%;
  height: 6px;
  background: #333;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 5px;
}

.progress-bar-fill {
  height: 100%;
  background: #5b5bff;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 12px;
  color: #999;
}

/* 跳过按钮 */
.task-right {
  margin-left: 15px;
}

.skip-btn {
  background: #333;
  color: #fff;
  border: none;
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}
</style>