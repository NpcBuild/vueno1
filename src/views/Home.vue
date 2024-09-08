<template>
  <div class="home" id="home">
    <Header/>
<!--    <rolling-barrage></rolling-barrage>-->
<!--    <Info :Info="Info"/>-->
    <el-container>
<!--      日历区域-->
      <el-main>
        <Calendar @calClick="calClick"/>
      </el-main>
      <el-aside width="30%">
        <Carousel v-if="false"/>
        <VideoPlayer v-if="false"/>
        <div class="card-body">
          <i class="el-icon-full-screen" @click="goTodoDetail" style="font-size:20px;"></i>
          <div style="padding: 2vw;">
            <div class="title" style="border-bottom: solid;">
              <span style="color: rgb(0, 67, 190);margin-bottom: 20px;font-weight: 500;font-size: 2vw;">ToDo任务清单</span>
              <div style="float: right;font-size: 0.8vw;">{{date}}</div>
            </div>
            <div class="wrapper" v-click-outside="handleDivClick">
              <div class="task-list" style="margin-top: 20px;">
                <todo-task ref="tasks" v-for="(task, index) in tasks" :key="index" :task="task" :completed="task.completedStatus === '1'" @refresh="calClick"></todo-task>
              </div>
            </div>
          </div>
        </div>
      </el-aside>
    </el-container>
    <drag-ball :value="message" v-drag @click="this.$message.error('悬浮球事件');">
      <div slot="value"><input type="checkbox" class="toggler" id="toggler"/>
        <label for="toggler"></label>
        <ul>
          <li class="menu-item">
            <a href="https://www.bilibili.com/">
              <i class="el-icon-share" aria-hidden="true"></i>
            </a>
          </li>
          <li class="menu-item">
            <a href="#">
              <i class="el-icon-loading" aria-hidden="true"></i>
            </a>
          </li>
          <li class="menu-item">
            <a href="#">
              <i class="el-icon-eleme" aria-hidden="true"></i>
            </a>
          </li>
          <li class="menu-item">
            <a href="#">
              <i class="el-icon-loading" aria-hidden="true"></i>
            </a>
          </li>
          <li class="menu-item">
            <a href="#">
              <i class="el-icon-share" aria-hidden="true"></i>
            </a>
          </li>
          <li class="menu-item">
            <a href="#">
              <i class="el-icon-eleme" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
      </div>
    </drag-ball>
    <nav>
<!--      <input type="checkbox" class="toggler" id="toggler"/>-->
<!--      <label for="toggler"></label>-->
<!--      <ul>-->
<!--        <li class="menu-item">-->
<!--          <a href="https://www.bilibili.com/">-->
<!--            <i class="el-icon-share" aria-hidden="true"></i>-->
<!--          </a>-->
<!--        </li>-->
<!--        <li class="menu-item">-->
<!--          <a href="#">-->
<!--            <i class="el-icon-loading" aria-hidden="true"></i>-->
<!--          </a>-->
<!--        </li>-->
<!--        <li class="menu-item">-->
<!--          <a href="#">-->
<!--            <i class="el-icon-eleme" aria-hidden="true"></i>-->
<!--          </a>-->
<!--        </li>-->
<!--        <li class="menu-item">-->
<!--          <a href="#">-->
<!--            <i class="el-icon-loading" aria-hidden="true"></i>-->
<!--          </a>-->
<!--        </li>-->
<!--        <li class="menu-item">-->
<!--          <a href="#">-->
<!--            <i class="el-icon-share" aria-hidden="true"></i>-->
<!--          </a>-->
<!--        </li>-->
<!--        <li class="menu-item">-->
<!--          <a href="#">-->
<!--            <i class="el-icon-eleme" aria-hidden="true"></i>-->
<!--          </a>-->
<!--        </li>-->
<!--      </ul>-->
    </nav>
    <NPC/>
  </div>
</template>

<script>
import api from "@/api";
import Header from "@/components/Header";
// import RollingBarrage from "@/components/rollingBarrage";
// import Info from "@/components/Info";
import Carousel from "@/components/Carousel";
import Calendar from "@/components/Calendar";
import VideoPlayer from "@/components/videoPlayer/video2.vue";
import NPC from "@/components/NPC/NPC.vue";
import TodoTask from "@/components/todo-task.vue";
import {timestampToDateStr} from "@/utils/time/time";


// let scrollContent = document.getElementById("home");
// let videoWidth = scrollContent.offsetWidth;//直播区域的总宽度
// let listHeight = scrollContent.offsetHeight/10;//每一层直播区域的高度
let listTopNum = [0,1,2,3,4,5,6,7,8,9];//将直播区域的高度分成10层
let speedArr = ['normal','fast','faster'];
let animateType = {
  'normal':3,
  'fast':6,
  'faster':9
}
export default {
  name: 'Home',
  data(){
    return {
      //朋友圈文字：Info
      Info: {
        content:"",
        source:"",
      },
      message: '1',
      date: '',
      tasks: [
        {todoName: "跑步"}, {todoName: "俯卧撑"}, {todoName: "敲代码"}, {todoName: "弹吉他"}, {todoName: "剪视频"},
      ]
    }
  },
  components: {
    TodoTask,
    NPC,
    VideoPlayer,
    Header,
    // RollingBarrage,
    // Info,
    Carousel,
    Calendar,
  },
  mounted() {
    this.initTask()
    api.getPyqwenan({
      key:"9926be2444c935728b45d5e4b6f50da0"
    }).then(res =>{
      res = res.data
      if (res.code == 200){
        this.Info.content = res.newslist[0].content
        this.Info.source = res.newslist[0].source
        this.createVideoBulletChatDom(res.newslist[0].content)
      }
      console.log(res.newslist[0].content)
      console.log(res.newslist[0].source)
      this.speaks()
    }).catch((error) => {
      console.log('一言：' + error)
    })
  },
  computed: {
    nowTime() {
      return timestampToDateStr(new Date().getTime())
    }
  },
  methods: {
    //滚动弹幕
    createVideoBulletChatDom(value){//将输入框的值插入到弹幕中
      let scrollContent = document.getElementById("home");
      let videoWidth = scrollContent.offsetWidth;
      let num = listTopNum[Math.floor((Math.random()*listTopNum.length))];
      let p = document.createElement("p");
      p.setAttribute("class","video_p");
      p.style.top = (num * 60) + "px";
      p.style.left = videoWidth + "px";
      p.innerHTML = value;
      scrollContent.appendChild(p);
      let speed = speedArr[Math.floor((Math.random()*speedArr.length))];
      this.Animate(p,speed);//滚动动画
    },
    Animate(dom,speed){//滚动动画
      let scrollContent = document.getElementById("home");
      let videoWidth = scrollContent.offsetWidth;
      let domWidth = dom.offsetWidth;//当前弹幕元素的宽度
      let distance = videoWidth;//直播区域的总宽度
      speed ? speed : 'normal';
      let interval = animateType[speed]
      let timer = setInterval(function(){
        distance -= interval;
        dom.style.left = distance + 'px';
        if(distance <= -domWidth){
          clearInterval(timer);
          scrollContent.removeChild(dom);//清除已经滚动出屏幕的标签
        }
      },50)
    },
    speaks() {
      let synth = window.speechSynthesis
      let utterance = new SpeechSynthesisUtterance(this.Info.content)
      synth.speak(utterance)
    },
    // 日历块点击事件
    calClick(day) {
      this.initTask(day)
    },
    // 初始化待办列表
    initTask(date) {
      if (!date) {
        // 获取当前日期
        date = new Date().format("yyyy-MM-dd");
      }
      this.getRequest('/todo/getTodoList',{pageNum:1,pageSize:999,date:date}).then(res => {
        this.tasks = res.data.records
        this.date = date
      })


    },
    handleDivClick(event) {
      console.log(event)
      console.log(this.$refs.tasks)
      let changed
      this.$refs.tasks && this.$refs.tasks.forEach(item => {
        if (item.task.edit) {
          item.task.edit = false
          changed = true
        }
      })
      if (!changed) this.tasks.push({todoName: "空",edit: true})
    },
    goTodoDetail() {
      this.$router.push("/dailyPlan");
    }
  },
}
</script>
<style scoped>
.home{
  /*width: 600px;*/
  /*height: 600px;*/
  /*background-color: rgba(0, 0, 0, 0.5);*/
  /*float: left;*/
  /*position: relative;*/
  /*overflow: hidden;*/
}
.wrapper {
  /*height: 600px;*/
  overflow: hidden;
}
.task-list {
  font-feature-settings: "tnum","tnum";
  box-sizing: border-box;
  color: rgba(0,0,0,.85);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
}
.card-body {
  /*width: 550px;*/
  width: 80%;
  min-width: 300px;
  height: calc(98% - 40px);
  border-color: rgb(0, 67, 190);
  border-width: 3px;
  border-radius: 25px;
  /*margin-left: 100px;*/
  margin-left: 10%;
  margin-top: 20px;
  box-shadow: rgb(0, 67, 190) 1px 1px 5px;
}
.toggler{
  position: absolute;
  /*display: block;*/
  display: none;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 40px;
  height: 40px;
  z-index: 2;
  /*不透明度*/
  /*opacity: 0;*/
  cursor: pointer;
}
/*hover选择鼠标指针浮动在其上的元素，并设置其样式*/
.toggler:hover + label,
.toggler:hover + label::before,
.toggler:hover + label::after{
  background: red;
}

.toggler:checked + label{
  /*透明背景，如果一个元素覆盖在另外一个元素之上，而你想显示下面的元素*/
  background: transparent;
}

.toggler:checked + label::before,
.toggler:checked + label::after{
  top: 0;
  width: 40px;
  transform-origin: 50% 50%;
}

.toggler:checked + label::before{
  transform: rotate(45deg);
}
.toggler:checked + label::after{
  transform: rotate(-45deg);
}
.toggler:checked ~ ul .menu-item{
  opacity: 1;
}
.toggler:checked ~ ul .menu-item:nth-child(1){
  /*transform旋转div元素*/
  transform: rotate(0deg) translateX(-110px);
}
.toggler:checked ~ ul .menu-item:nth-child(2){
  transform: rotate(60deg) translateX(-110px);
}
.toggler:checked ~ ul .menu-item:nth-child(3){
  transform: rotate(120deg) translateX(-110px);
}
.toggler:checked ~ ul .menu-item:nth-child(4){
  transform: rotate(180deg) translateX(-110px);
}
.toggler:checked ~ ul .menu-item:nth-child(5){
  transform: rotate(240deg) translateX(-110px);
}
.toggler:checked ~ ul .menu-item:nth-child(6){
  transform: rotate(300deg) translateX(-110px);
}
.toggler:checked ~ ul .menu-item a{
  pointer-events: auto;
}
.toggler + label{
  width: 40px;
  height: 5px;
  display: block;
  z-index: 1;
  border-radius: 2.5px;
  background: rgba(80, 211, 52, 0.7);
  transition: transform 0.5s,top 0.5s;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.toggler + label::before,
.toggler + label::after{
  width: 40px;
  height: 5px;
  display: block;
  z-index: 1;
  border-radius: 2.5px;
  background: rgba(80, 211, 52, 0.7);
  transition: transform 0.5s, top 0.5s;
  content: "";
  position: absolute;
  left: 0;
}
.toggler + label::before{
  top: 10px;
}
.toggler + label::after{
  top: -10px;
}
.menu-item:nth-child(1) a{
  transform: rotate(0deg);
}
.menu-item:nth-child(2) a{
  transform: rotate(60deg);
}
.menu-item:nth-child(3) a{
  transform: rotate(120deg);
}
.menu-item:nth-child(4) a{
  transform: rotate(180deg);
}
.menu-item:nth-child(5) a{
  transform: rotate(240deg);
}
.menu-item:nth-child(6) a{
  transform: rotate(30deg);
}
.menu-item{
  position: absolute;
  display: block;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 80px;
  height: 80px;
  opacity: 0;
  transition: all 0.5s;
}
.menu-item a{
  /*显示为块级元素，此元素前后会带有换行符*/
  display: block;
  /*浏览器会将父盒子的宽度赋给他*/
  width: inherit;
  height: inherit;
  line-height: 80px;
  color: rgba(80, 211, 52, 0.7);
  background: rgba(80, 211, 52, 0.2);
  border-radius: 50%;
  text-align: center;
  text-decoration: none;
  font-size: 40px;
  pointer-events: none;
  transition: 0.2s;
}
.menu-item a:hover{
  box-shadow: 0 0 0 2px rgba(80,255,255,0.3);
  color: #fff;
  background: rgba(80,255,255,0.3);
  font-size: 45px;
}

/*滚动弹幕*/
.scroll_li{
  margin-top: 10px;
  font-size: 14px;
  color: #000000;
  list-style-type: none;
}
.video_p{
  color: red;
  width: fit-content;
  font-size: 24px;
  line-height: 60px;
  position: absolute;
  z-index: 99999;
  /* right: 0px;
  top: 20px; */
}
</style>