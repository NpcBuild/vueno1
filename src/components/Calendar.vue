<template>
  <div>
    <div class="progress-day">
      <div :key="index" v-for="(day, index) in days" class="day" :class="{'today': today === day, 'past': today > day}">{{day}}</div>
    </div>
    <el-slider
        v-model="sliderValue"
        range
        show-stops
        :min="6"
        :max="24"
        :marks="marks"
    >
    </el-slider>
<!--    <el-calendar :range="['2022-06-06', '2022-06-26']">-->
    <el-calendar v-model="value" @change="handleCalendarChange" ref="calendar" :class="[shouldHideLastRow? 'hide-last-row' : '']">
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template
          slot="dateCell"
          slot-scope="{date, data}" style="background-color: red">
        <!-- 225px:方形-->
        <!-- style="height: 200px;"-->
        <div slot="reference" class="div-Calendar" @click="calendarOnClick(data)" @mouseenter="activateItem(data.day)" @mouseleave="deactivateItem">
          <p :class="data.isSelected ? 'is-selected' : ''">
            <b>{{ data.day.split('-').slice(1).join('-') }}</b> {{ data.isSelected ? '✔️' : ''}}
            <span class="align-right">{{ taskItems[data.day] && taskItems[data.day].holiday ? '休🌟' : ''}}</span>
          </p>

          <div v-if="expired(data.day)" :class="[{'expired': expired(data.day)}]" style="text-align: center;height: calc(100% - 18px)">
            <div style="height: 100%">
<!--              <card3/>-->
              <div v-if="loadingTaskItems" style="height: 100%;align-content: center;">
                加载中~~~
              </div>
              <div v-else-if="!taskItems[data.day]" style="height: 100%">
                未知
              </div>
              <div v-else-if="taskItems[data.day] && taskItems[data.day].finished" style="height: 100%">
                <card3/>
              </div>
              <div v-else style="height: 100%;background-color: pink;align-content: center;">
                未完成
                <!--              <card3/>-->
              </div>
            </div>
          </div>
          <div v-else :class="['task-scroll-container',(data.isSelected || activeId === data.day) ? 'scrollable' : '']">
            <ul :class="[{'expired': expired(data.day)}]">
              <li v-for="(item, index) in taskItems[data.day] ? taskItems[data.day].list : []"
                  :key="index">
                <b>{{item.completedStatus == '1'?'√':'⚪'}}{{ item.todoName }}</b>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
import {weekdayNum, daysInMonth} from "@/utils/time/time";
import card3 from "@/components/card/card3.vue";
export default {
  name: "Calendar",
  components: {card3},
  data(){
    return {
      sliderValue:'',
      value:'',
      nowDate: new Date(),
      activeId: null,
      today: 0,
      marks: {
        8: '8点',
        12: {
          style: {
            color: 'green'
          },
          label: this.$createElement('strong', '午休')
        }
      },
      taskItems: {},
      shouldHideLastRow: true,
      loadingTaskItems: false
    }
  },
  created() {
    this.initClickEvent()
    this.initDay()
    this.hiddenLastRow()
  },
  mounted() {
    this.sliderValue=[this.nowDate.getHours(),24];
    this.initCalendar()
  },
  computed: {
  },

  methods: {
    expired(day) {
      return day < this.nowDate.getFullYear() + '-' + (Array(2).join('0') + (this.nowDate.getMonth() + 1)).slice(-2) + '-' + (Array(2).join('0') + this.nowDate.getDate()).slice(-2);
    },
    showElement(data) {
      if (!data) {
        return false;
      }
      return data.finished;
    },
    // 初始化页面的点击事件
    initClickEvent() {
      this.$nextTick(() => {
        // 点击前一个月
        let prevBtn = document.querySelector(
            ".el-calendar__button-group .el-button-group>button:nth-child(1)"
        );
        prevBtn.addEventListener("click", e => {
          console.log(this.data);
          console.log(this.value);
          this.$notify({
            title: "上一月",
            message: "上个月头天：" + this.value,
            type: "success",
            position: "top-left"
          });
          this.initCalendar()
          this.$message.success(e.toString())
        });

        //点击下一个月
        let nextBtn = document.querySelector(
            ".el-calendar__button-group .el-button-group>button:nth-child(3)"
        );
        nextBtn.addEventListener("click", () => {
          console.log(this.value);
          // this.$notify({
          //   title: "下一月",
          //   message: "下个月头天：" + this.value,
          //   type: "warning",
          //   position: "top-left"
          // });
          this.initCalendar()
        });

        //点击今天
        let todayBtn = document.querySelector(
            ".el-calendar__button-group .el-button-group>button:nth-child(2)"
        );
        todayBtn.addEventListener("click", () => {
          // this.$notify.info({
          //   title: "今天",
          //   message: "今天：" + this.value,
          //   position: "top-left"
          // });
          this.initCalendar()
        });
      });
    },
    // 初始化日历的待办事项
    initCalendar() {
      const calendarSE = this.getCalendarSE();
      let date = new Date();
      let year = date.getFullYear();
      let start = year + '-' + calendarSE.start;
      let end = year + '-' + calendarSE.end;
      if (calendarSE.start > calendarSE.end && date.getMonth() === 11) {
        end = ++year + '-' + calendarSE.end;
      } else if (calendarSE.start > calendarSE.end && date.getMonth() === 0) {
        start = --year + '-' + calendarSE.start;
      }
      this.getTaskItems(start,end)
    },
    activateItem(id) {
      this.activeId = id;
      // console.log(this.activeId)
    },
    deactivateItem() {
      this.activeId = null;
      // console.log(this.activeId)
    },
    //点击日期块
    calendarOnClick(e) {
      console.log(e);
      // this.isArrange.push("2020-06-19");
      this.$notify.error({
        title: "日历块点击",
        message: e,
        position: "top-left"
      });
      this.$message.success(e.day.toString())
      this.$emit("calClick", e.day.toString());
    },
    // 判断是否需要隐藏日历最后一列
    hiddenLastRow() {
      // 获取当月第一天是周几
      let weekdayNumVar = weekdayNum();
      // 获取当月天数
      let daysInMonthVar = daysInMonth();
      let shouldHidden = weekdayNumVar < (8 - daysInMonthVar % 7);
      this.shouldHideLastRow = shouldHidden;
      console.log("是否隐藏最后一行：", shouldHidden)
      return shouldHidden;
    },
    initDay() {
      /* 获取当前日期 */
      const today = new Date();
      /* 获取当前月份 */
      const month = today.getMonth();
      /* 获取当前年份 */
      const year = today.getFullYear();
      /* 获取当前月份的天数 */
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      this.today = today.getDate()
      let days = []
      /* 遍历当前月份的每一天 */
      for (let i = 1; i <= daysInMonth; i++) {
        /* 创建一个日期方格元素 */
        days.push(i)
      }
      this.days = days
    },
    handleCalendarChange(date) {
      const start = date.start
      const end = date.end
      console.log((start,end))
      this.getTaskItems(start,end)
    },
    getCalendarSE() {
      const calendarElement = this.$refs.calendar.$el;

      const dayElements = calendarElement.querySelectorAll('.el-calendar-day');

      const firstDayElement = dayElements[0];
      const lastDayElement = dayElements[dayElements.length - 1];

      const firstDateString = firstDayElement.querySelector('b').innerText;
      const lastDateString = lastDayElement.querySelector('b').innerText;
      return {start:firstDateString,end:lastDateString}
    },
    getTaskItems(start, end) {
      this.loadingTaskItems = true
      this.getRequest('/todo/getTodoCalendar',{startDate: start,endDate:end}).then(res => {
        this.loadingTaskItems = false
        this.taskItems = res.data
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.is-selected {
  color: green;
}
.expired{
  color: #c0c4cc;
}
.div-Calendar {
  /*height: 122px;*/
  box-sizing: border-box;
  /*padding: 8px;*/
}

.align-right {
  float: right; /* 或者使用 display: inline-block; text-align: right; */
  /* 如果需要，可以添加一些内边距或外边距来调整位置 */
  padding-left: 10px; /* 左边距，根据需要调整 */
}

/* 如果使用 display: inline-block; 方法 */
.align-right-inline {
  display: inline-block;
  text-align: right;
  /* 可能需要添加一些额外的样式来避免布局问题 */
}

/* 设置进度条容器的样式 */
.progress-day {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: transparent;
}
/* 设置日期方格的样式 */
.progress-day .day {
  /* 设置方格的宽高和外边距 */
  width: 50px;
  height: 50px;
  margin: 2px;
  /* 设置方格的背景颜色、字体颜色、字体大小、水平居中和垂直居中 */
  background-color: #ffffff;
  color:  #a1abe6; /* 设置字体颜色 */
  font-size: 21px;
  text-align: center;
  line-height: 50px;

&--disabled {
   color: rgba(#98a0a6, 0.6);
   background-color: #ffffff;
   background-color: red;
   background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f9f9fa' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E");
   cursor: not-allowed;
 }
}
/* 设置今天日期方格的样式 */
.progress-day .today {
  background-color: #ff953d;
  color: #ffffff;
}
/* 设置过去日期方格的样式 */
.progress-day .past {
  background-color: #a892ff;
  color: #6343bc;/* 设置字体颜色 */
}

.task-scroll-container {
  /*height: 60px; !* 调整容器高度以适应你的需求 *!*/
  height: calc(12vh - 18px);
  overflow: hidden;
  position: relative;
}
li {
  margin-bottom: 1px; /* 调整每个项之间的间距 */
}
div.scrollable {
  /* 添加指定的样式，例如滚动样式 */
  color: blue;
  font-weight: bold;
  /* 你可以根据需要添加更多样式 */
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  animation: scroll 10s linear infinite; /* 调整滚动速度，这里是10秒 */
}
@keyframes scroll {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
}
// li.active {
//  animation: none; // 移除滚动动画
// }
::v-deep .el-calendar-table .el-calendar-day {
  /*padding: 0px;*/
  height: 100%;
}

//::v-deep.el-calendar__body {
//  height: 1000px;
//}

/*FIXEME：修复日历会多最后一行的问题，但有时候会少一行*/
.hide-last-row ::v-deep.el-calendar__body tr:last-child {
 display: none;
}

</style>


<!--&lt;!&ndash;VUE elementUI calendar 根据日期段标记日期&ndash;&gt;-->
<!--<template>-->
<!--  <div class='outer'>-->
<!--    <main>-->
<!--      <el-calendar value="2020-10">-->
<!--        <template slot="dateCell" slot-scope="{date, data}">-->
<!--          &lt;!&ndash; {{data.day}} &ndash;&gt;-->
<!--          <p :class="data.isSelected ? 'is-selected' : ''">-->
<!--            {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}-->
<!--          </p>-->
<!--          <div v-if="dayCurrent(data.day)" style="height:5px; background-color: #7fbeff;"></div>-->
<!--          <div v-else style="height:5px; background-color: #fff;"></div>-->
<!--        </template>-->
<!--      </el-calendar>-->
<!--    </main>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--export default {-->
<!--  name: '',-->
<!--  data () {-->
<!--    return {-->
<!--      dayList: [],-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    dayCurrent (val) {-->
<!--      console.log(this.dayList.indexOf(val))-->
<!--      if (this.dayList.indexOf(val) !== -1) {-->
<!--        return true-->
<!--      } else {-->
<!--        return false-->
<!--      }-->
<!--    },-->
<!--    format (time) {-->
<!--      let ymd = ''-->
<!--      const mouth = (time.getMonth() + 1) >= 10 ? (time.getMonth() + 1) : ('0' + (time.getMonth() + 1))-->
<!--      const day = time.getDate() >= 10 ? time.getDate() : ('0' + time.getDate())-->
<!--      ymd += time.getFullYear() + '-' // 获取年份。-->
<!--      ymd += mouth + '-' // 获取月份。-->
<!--      ymd += day // 获取日。-->
<!--      return ymd // 返回日期。-->
<!--    },-->
<!--    getAllDate (start, end) {-->
<!--      const dateArr = []-->
<!--      const startArr = start.split('-')-->
<!--      const endArr = end.split('-')-->
<!--      const db = new Date()-->
<!--      db.setUTCFullYear(startArr[0], startArr[1] - 1, startArr[2])-->
<!--      const de = new Date()-->
<!--      de.setUTCFullYear(endArr[0], endArr[1] - 1, endArr[2])-->
<!--      const unixDb = db.getTime()-->
<!--      const unixDe = de.getTime()-->
<!--      let stamp-->
<!--      const oneDay = 24 * 60 * 60 * 1000-->
<!--      for (stamp = unixDb; stamp <= unixDe;) {-->
<!--        dateArr.push(this.format(new Date(parseInt(stamp))))-->
<!--        stamp = stamp + oneDay-->
<!--      }-->
<!--      return dateArr-->
<!--    }-->
<!--  },-->
<!--  created () {-->
<!--    this.dayList = this.getAllDate('2020-10-01', '2020-10-15')-->
<!--  }-->
<!--}-->
<!--</script>-->
<!--<style lang='less' scoped>-->
<!--</style>-->





<!--<template>-->
<!--  <div>-->
<!--    <el-card class="_calendar">-->
<!--      <el-container>-->
<!--        <el-main>-->
<!--          <el-card>-->
<!--            <el-calendar v-model="value" :first-day-of-week="7">-->
<!--              &lt;!&ndash; 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法&ndash;&gt;-->
<!--              <template slot="dateCell" slot-scope="{date, data}">-->
<!--                <div slot="reference" class="div-Calendar" @click="calendarOnClick(data)">-->
<!--                  <p :class="data.isSelected ? 'is-selected' : ''">-->
<!--                    {{ data.day.split('-').slice(1).join('-') }}-->
<!--                    <i-->
<!--                        :class="[data.isSelected ?'el-icon-check':'']"-->
<!--                    ></i>-->
<!--                    <i v-if="_.indexOf(isArrange, data.day)>0" class="el-icon-s-claim"></i>-->
<!--                    &lt;!&ndash; <i class="el-icon-coffee-cup"></i> &ndash;&gt;-->
<!--                  </p>-->
<!--                </div>-->
<!--              </template>-->
<!--            </el-calendar>-->
<!--          </el-card>-->
<!--        </el-main>-->

<!--        <el-aside width="40%" style="overflow: hidden;">-->
<!--          <el-card>-->
<!--            <div class="el-calendar__header">-->
<!--              <div class="el-calendar__title">排班详情</div>-->
<!--              <div class="el-calendar__button-group">-->
<!--                <div class="el-button-group">-->
<!--                  <button-->
<!--                      type="button"-->
<!--                      class="el-button el-button&#45;&#45;plain el-button&#45;&#45;mini"-->
<!--                      @click="saveOnClick"-->
<!--                  >-->
<!--                    <span>新增</span>-->
<!--                  </button>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="calendar-info">-->
<!--              <div style="padding: 15px;">-->
<!--                <div role="alert" class="el-alert el-alert&#45;&#45;success is-dark" @click="infoOnClick">-->
<!--                  <i class="el-alert__icon el-icon-success is-big"></i>-->
<!--                  <div class="el-alert__content">-->
<!--                    <span class="el-alert__title is-bold">2020-06-19 9:00~11:00</span>-->
<!--                    <p class="el-alert__description">值班人员：张三、李四、王五</p>-->
<!--                    <p class="el-alert__description">携带设备：123547、985431、745481</p>-->
<!--                    <i class="el-alert__closebtn el-icon-close" @click.stop="infoDel"></i>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div role="alert" class="el-alert el-alert&#45;&#45;info is-dark" @click="infoOnClick">-->
<!--                  <i class="el-alert__icon el-icon-info is-big"></i>-->
<!--                  <div class="el-alert__content">-->
<!--                    <span class="el-alert__title is-bold">2020-06-19 9:00~11:00（待审核）</span>-->
<!--                    <p class="el-alert__description">值班人员：张三、李四、王五</p>-->
<!--                    <p class="el-alert__description">携带设备：123547、985431、745481</p>-->
<!--                    <i class="el-alert__closebtn el-icon-close"></i>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div role="alert" class="el-alert el-alert&#45;&#45;warning is-dark" @click="infoOnClick">-->
<!--                  <i class="el-alert__icon el-icon-warning is-big"></i>-->
<!--                  <div class="el-alert__content">-->
<!--                    <span class="el-alert__title is-bold">警告提示的文案</span>-->
<!--                    <p class="el-alert__description">文字说明文字说明文字说明文字说明文字说明文字说明</p>-->
<!--                    <i class="el-alert__closebtn el-icon-close"></i>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div role="alert" class="el-alert el-alert&#45;&#45;error is-dark" @click="infoOnClick">-->
<!--                  <i class="el-alert__icon el-icon-error is-big"></i>-->
<!--                  <div class="el-alert__content">-->
<!--                    <span class="el-alert__title is-bold">错误提示的文案</span>-->
<!--                    <p class="el-alert__description">文字说明文字说明文字说明文字说明文字说明文字说明</p>-->
<!--                    <i class="el-alert__closebtn el-icon-close"></i>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </el-card>-->
<!--        </el-aside>-->
<!--      </el-container>-->
<!--    </el-card>-->
<!--    <calendarDrawer ref="calendarDrawer"></calendarDrawer>-->
<!--    <calendarForm ref="calendarForm"></calendarForm>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--// import calendarDrawer from "./calendar-drawer.vue";-->
<!--// import calendarForm from "./calendar-form.vue";-->
<!--export default {-->
<!--  // components: { calendarDrawer, calendarForm },-->
<!--  data: function() {-->
<!--    return {-->
<!--      value: new Date(),-->
<!--      isArrange: [-->
<!--        "2020-06-08",-->
<!--        "2020-06-09",-->
<!--        "2020-06-10",-->
<!--        "2020-06-11",-->
<!--        "2020-06-17",-->
<!--        "2020-06-18"-->
<!--      ]-->
<!--    };-->
<!--  },-->
<!--  created: function() {-->
<!--    this.$nextTick(() => {-->
<!--      // 点击前一个月-->
<!--      let prevBtn = document.querySelector(-->
<!--          ".el-calendar__button-group .el-button-group>button:nth-child(1)"-->
<!--      );-->
<!--      prevBtn.addEventListener("click", e => {-->
<!--        console.log(this.data);-->
<!--        console.log(e);-->
<!--        this.$notify({-->
<!--          title: "上一月",-->
<!--          message: "上个月头天：" + this.value,-->
<!--          type: "success",-->
<!--          position: "top-left"-->
<!--        });-->
<!--      });-->

<!--      //点击下一个月-->
<!--      let nextBtn = document.querySelector(-->
<!--          ".el-calendar__button-group .el-button-group>button:nth-child(3)"-->
<!--      );-->
<!--      nextBtn.addEventListener("click", () => {-->
<!--        console.log(this.value);-->
<!--        this.$notify({-->
<!--          title: "下一月",-->
<!--          message: "下个月头天：" + this.value,-->
<!--          type: "warning",-->
<!--          position: "top-left"-->
<!--        });-->
<!--      });-->

<!--      //点击今天-->
<!--      let todayBtn = document.querySelector(-->
<!--          ".el-calendar__button-group .el-button-group>button:nth-child(2)"-->
<!--      );-->
<!--      todayBtn.addEventListener("click", () => {-->
<!--        this.$notify.info({-->
<!--          title: "今天",-->
<!--          message: "今天：" + this.value,-->
<!--          position: "top-left"-->
<!--        });-->
<!--      });-->
<!--    });-->
<!--  },-->
<!--  mounted: function() {},-->
<!--  methods: {-->
<!--    //点击日期块-->
<!--    calendarOnClick(e) {-->
<!--      console.log(e);-->
<!--      // this.isArrange.push("2020-06-19");-->
<!--      this.$notify.error({-->
<!--        title: "日历块点击",-->
<!--        message: e,-->
<!--        position: "top-left"-->
<!--      });-->
<!--    },-->
<!--    //点击信息块-->
<!--    infoOnClick() {-->
<!--      this.$refs.calendarDrawer.drawer = true;-->
<!--    },-->
<!--    //新增排班-->
<!--    saveOnClick() {-->
<!--      this.$refs.calendarForm.dialogFormVisible = true;-->
<!--    },-->
<!--    //删除排班-->
<!--    infoDel() {-->
<!--      this.$confirm("此操作将永久删除该排班, 是否继续?", "提示", {-->
<!--        confirmButtonText: "确定",-->
<!--        cancelButtonText: "取消",-->
<!--        type: "warning"-->
<!--      })-->
<!--          .then(() => {-->
<!--            this.$message({-->
<!--              type: "success",-->
<!--              message: "删除成功!"-->
<!--            });-->
<!--          })-->
<!--          .catch(() => {-->
<!--            this.$message({-->
<!--              type: "info",-->
<!--              message: "已取消删除"-->
<!--            });-->
<!--          });-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->
<!--<style scoped>-->
<!--.is-selected {-->
<!--  color: #1989fa;-->
<!--}-->
<!--.p-popover {-->
<!--  text-align: center;-->
<!--}-->
<!--._calendar {-->
<!--  height: 99.5%;-->
<!--  width: 100%;-->
<!--}-->
<!--.el-main {-->
<!--  padding: 0px;-->
<!--  overflow: hidden;-->
<!--}-->
<!--.calendar-info {-->
<!--  height: 94%;-->
<!--  overflow: auto;-->
<!--}-->
<!--.el-alert {-->
<!--  margin: 15px 0px;-->
<!--}-->
<!--.el-alert:hover {-->
<!--  transform: scale(1.02);-->
<!--}-->
<!--.el-alert:active {-->
<!--  transform: scale(1.01);-->
<!--}-->
<!--</style>-->
<!--<style >-->
<!--._calendar .div-Calendar {-->
<!--  height: 125px;-->
<!--  box-sizing: border-box;-->
<!--  padding: 8px;-->
<!--}-->
<!--._calendar .el-calendar-table .el-calendar-day {-->
<!--  padding: 0px;-->
<!--  height: 125px;-->
<!--}-->
<!--._calendar .el-container,-->
<!--._calendar .el-calendar {-->
<!--  height: 100%;-->
<!--}-->
<!--._calendar .el-card__body {-->
<!--  padding: 0px;-->
<!--}-->
<!--</style>-->
