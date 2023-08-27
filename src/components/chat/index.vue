<template>
  <div class="body">
    <div class="wrapper">
      <div class="container">
        <div class="left">
          <span>{{loginStatus?'在线':'离线'}}</span>
          <div class="top">
            <input type="text" placeholder="Search" />
            <a href="javascript:;" class="search"></a>
          </div>
          <ul class="people">
            <li class="person" v-for="(person, index) in persons"
                @click="changeChat(person.userId)"
                :class="{'active': activeId == person.userId}"
                :key="index">
              <img :src="person.avatar" alt="" />
              <span class="name">{{person.userName}}</span>
              <span class="time">{{person.timestamp}}</span>
              <span class="preview">{{person.text}}</span>
              <div v-if="person.unReadNum > 0" class="badge">{{ person.unReadNum }}</div>
            </li>
          </ul>
        </div>
        <div class="right">
          <div class="top"><span>To: <span class="name">{{chatUserName}}</span></span></div>
          <div class="chat active-chat" ref="chat" @scroll="onScroll">
            <div v-for="message in messages"
                 :key="message.id"
                 class="bubble" :class="{'me': message.me, 'you': !message.me}">
              {{ message.text }}
            </div>
<!--            <div class="conversation-start">-->
<!--              <span>Today, 5:38 PM</span>-->
<!--            </div>-->
<!--            <div class="conversation-start">-->
<!--              <span>Monday, 1:27 PM</span>-->
<!--            </div>-->
          </div>
          <div class="write">
            <a href="javascript:;" class="write-link attach"></a>
            <input type="text" v-model="messageInput" @keyup.enter="sendMessage">
<!--            <a href="javascript:;" class="write-link smiley"></a>-->
            <div class="write-link smiley" @click="clickEmoji" v-show="buttonStatus">

            </div>
            <div class="emoji-content" v-show="buttonStatus">
              <Emoji v-show="showEmoji" @sendEmoji="sendEmoji" @closeEmoji="clickEmoji"></Emoji>
            </div>
            <button class="write-link send" @click="sendMessage"></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {yfTimestampToTime} from "@/utils/time/time";
import {animation} from "@/utils/yMethods"
import Emoji from "@/components/chat/Emoji.vue";
export default {
  name: "index",
  components: {
    Emoji
  },
  data(){
    return {
      loginStatus: false,
      friends: {},
      chat: {},
      persons: [],
      activeId: null,
      messages: [],
      messageInput: '',
      chatUserName: '',
      ws: null,
      //是否显示表情和录音按钮
      buttonStatus: true,
      showEmoji: false,
      isAutoScroll: true,
    }
  },
  created() {
    this.getMessageList()
  },
  computed: {
  },
  watch: {
    messages() {
      // 收到信消息后，对左侧列表进行排序
      // this.messages.sort((a, b) => b.timestamp - a.timestamp);
    },
  },
  mounted() {
    this.init()
  },
  destroyed () {
    this.ws.close() // 页面销毁后断开websocket连接
  },
  methods:{
    init() {
      var that = this
      if (!window.WebSocket) {
        // 不支持的情况
        window.WebSocket = window.MozWebSocket;
      }
      if (window.WebSocket) {
        let token = this.$store.getters.getToken
        console.log(token)
        this.ws = new WebSocket("ws://127.0.0.1:12345/socket?uid=" + token);
        this.ws.onmessage = function (event) {
          // console.log(JSON.parse(event.data));
          console.log('收到消息：' + event.data);
          // 实时更新
          that.changeChat(that.activeId)
          that.getMessageList()
        };
        this.ws.onerror = function (event) {
          console.log(event)
          console.log('WebSocket连接失败')
        };
        this.ws.onopen = function (event) {
          // 连接ws成功，变成在线状态
          that.loginStatus = true
          console.log(event);
          console.log('Netty-WebSocket服务器。。。。。。连接');
        };
        this.ws.onclose = function (event) {
          console.log(event);
          console.log('Netty-WebSocket服务器。。。。。。关闭');
        };
      } else {
        alert("您的浏览器不支持WebSocket协议！");
      }
    },
    //关闭标签框
    clickEmoji() {
      this.showEmoji = !this.showEmoji;
    },
    //发送表情
    sendEmoji(msg) {
      console.log(msg)
      // const dateNow = JCMFormatDate(getNowTime());
      // let chatMsg = {
      //   headImg: USER_HEAD_IMG_URL,
      //   name: USER_NAME,
      //   time: dateNow,
      //   msg: msg,
      //   chatType: 1, //信息类型，0文字，1图片
      //   extend: {
      //     imgType: 1, //(1表情，2本地图片)
      //   },
      //   uid: "jcm",
      // };
      // this.sendMsg(chatMsg);
      // this.clickEmoji();
    },
    sendMessage() {
      var that = this
      if (!this.messageInput) {return;}
      if (!window.WebSocket) {return;}
      if (this.ws.readyState == WebSocket.OPEN) {
        // this.ws.send(this.form.uid+':'+this.form.message);
        this.getRequest('/socket/'+`${this.activeId}`,{message:this.messageInput}).then(() => {
          that.changeChat(that.activeId)
          that.getMessageList()
          this.messageInput = ''
          this.redirectScrollBottom()
        })
      } else {
        // alert("WebSocket 连接没有成功建立！");
        alert("您现在是未登录状态！");
      }
    },
    getMessageList() {
      // 向后端发送请求，获取聊天记录列表
      this.getRequest('/messages/getUserMessage').then(response => {
        // 将聊天记录保存到Vue实例的messages属性中
        this.persons = response.data
        this.persons.forEach(person => person.timestamp = yfTimestampToTime(person.timestamp))
      })
    },
    async changeChat(tId) {
      this.activeId = tId
      // 向后端发送请求，获取好友的聊天记录
      this.getRequest('/messages/getMessageByUserId',{tId:tId}).then(response => {
        // 将聊天记录保存到Vue实例的messages属性中
        this.messages = response.data
        this.chatUserName = this.persons.filter(person => person.userId==tId)[0].userName
        this.redirectScrollBottom()
      })
    },
    markAsRead() {
      // ...
      this.messages.forEach((m) => {
        if (!m.read) {
          m.read = true;
        }
      });
    },
    onScroll() {
      // const scrollDom = this.$refs.chat;
      // const scrollTop = scrollDom.scrollTop;
      // const offsetHeight = scrollDom.offsetHeight;
      // const scrollHeight = scrollDom.scrollHeight;
      // // 当滚动到底部，设置 isAutoScroll 为 true
      // if (scrollTop + offsetHeight === scrollHeight) {
      //   this.isAutoScroll = true;
      // } else {
      //   // 否则，用户正在手动滑动，设置为 false，停止自动滚动
      //   this.isAutoScroll = false;
      // }
    },
    redirectScrollBottom() {
      // fixme 默认显示最下方聊天记录
      // this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight
      //获取窗口高度并滚动至最底层
      this.$nextTick(() => {
        if (!this.isAutoScroll) return; // 如果 isAutoScroll 为 false，不执行滚动方法
        const scrollDom = this.$refs.chat;
        animation(scrollDom, scrollDom.scrollHeight - scrollDom.offsetHeight);
      });
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@mixin font-bold {
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 600;
}
@mixin font {
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
}
@mixin placeholder {
  &::-webkit-input-placeholder {
    @content;
  }
  &:-moz-placeholder {
    @content;
  }
  &::-moz-placeholder {
    @content;
  }
  &:-ms-input-placeholder {
    @content;
  }
}

*, *:before, *:after {
  box-sizing: border-box;
}
$white: #fff;
$black: #000;
$bg: #f8f8f8;
$grey: #999;
$dark: #1a1a1a;
$light: #e6e6e6;
$wrapper: 1000px;
$blue: #00b0ff;

.body {
  height: 100vh;
  background-color: $bg;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  @include font;
  //background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/image.jpg');
  background-size: cover;
  background-repeat: none;
  .wrapper {
    position: relative;
    left: 50%;
    width: $wrapper;
    height: 800px;
    transform: translate(-50%, 0);
  }
}
.container {
  position: relative;
  top: 50%;
  left: 50%;
  width: 80%;
  height: 75%;
  background-color: $white;
  transform: translate(-50%, -50%);
  .left {
    float: left;
    width: 37.6%;
    height: 100%;
    border: 1px solid $light;
    background-color: $white;
    .top {
      position: relative;
      width: 100%;
      height: 96px;
      padding: 29px;
      &:after {
        position: absolute;
        bottom: 0;
        left: 50%;
        display: block;
        width: 80%;
        height: 1px;
        content: '';
        background-color: $light;
        transform: translate(-50%, 0);
      }
    }
    input {
      float: left;
      width: 188px;
      height: 42px;
      padding: 0 15px;
      border: 1px solid $light;
      background-color: #eceff1;
      border-radius: 21px;
      @include font();
      &:focus {
        outline: none;
      }
    }
    a.search {
      display: block;
      float: left;
      width: 42px;
      height: 42px;
      margin-left: 10px;
      border: 1px solid $light;
      background-color: $blue;
      background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/name-type.png');
      background-repeat: no-repeat;
      background-position: top 12px left 14px;
      border-radius: 50%;
    }
    .people {
      margin-left: -1px;
      border-right: 1px solid $light;
      border-left: 1px solid $light;
      width: calc(100% + 2px);
      .person {
        position: relative;
        width: 100%;
        padding: 12px 10% 16px;
        cursor: pointer;
        background-color: $white;
        &:after {
          position: absolute;
          bottom: 0;
          left: 50%;
          display: block;
          width: 80%;
          height: 1px;
          content: '';
          background-color: $light;
          transform: translate(-50%, 0);
        }
        img {
          float: left;
          width: 40px;
          height: 40px;
          margin-right: 12px;
          border-radius: 50%;
          object-fit: cover;
        }
        .name {
          font-size: 14px;
          line-height: 22px;
          color: $dark;
          @include font-bold;
        }
        .time {
          font-size: 14px;
          position: absolute;
          top: 16px;
          right: 10%;
          padding: 0 0 5px 5px;
          color: $grey;
          background-color: $white;
        }
        .preview {
          font-size: 14px;
          display: inline-block;
          overflow: hidden !important;
          width: 78%;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: $grey;
        }
        .badge {
          position: absolute;
          top: 0;
          right: 0;
          padding: 4px 8px;
          background-color: red;
          color: white;
          font-size: 12px;
          font-weight: bold;
          border-radius: 50%;
        }
        &.active,&:hover {
          margin-top: -1px;
          margin-left: -1px;
          padding-top: 13px;
          border: 0;
          background-color: $blue;
          width: calc(100% + 2px);
          padding-left: calc(10% + 1px);
          span {
            color: $white;
            background: transparent;
          }
          &:after {
            display: none;
          }
        }
      }
    }
  }
  .right {
    position: relative;
    float: left;
    width: 62.4%;
    height: 100%;
    //overflow: hidden;
    display: flex;
    flex-direction: column;
    .top {
      width: 100%;
      height: 47px;
      padding: 15px 29px;
      background-color: #eceff1;
      span {
        font-size: 15px;
        color: $grey;
        .name {
          color: $dark;
          @include font-bold;
        }
      }
    }
    .chat {
       //position: relative;
      //display: none;
      //overflow: hidden;
       //padding: 0 35px 92px;
       //border-width: 1px 1px 1px 0;
       //border-style: solid;
       //border-color: $light;
      //height: calc(100% - 48px);
      //justify-content: flex-end;
      //flex-direction: column;
      position: relative;
      flex-grow: 1;
      //overflow: auto;
      padding: 0 35px 92px;
      border-width: 1px 1px 1px 0;
      border-style: solid;
      border-color: $light;
      &.active-chat {
        //display: block;
        //display: flex;
        overflow-y: scroll;
        overflow-x: hidden;
        //隐藏滚动条
        scrollbar-width: none; /*为了兼容 Firefox 和 Edge */
        -ms-overflow-style: none; /*为了兼容 IE */
        &::-webkit-scrollbar { display: none;} /*为了兼容 Chrome */
        //height: calc(100% - 47px);
        display: flex;
        flex-direction: column;
        .bubble {
          transition-timing-function: cubic-bezier(.4,-.04, 1, 1);
          @for $i from 10 through 1 {
            &:nth-of-type(#{$i}) {
              animation-duration: .15s * $i;
            }
          }
        }
      }
    }
    .write {
      position: absolute;
      bottom: 29px;
      left: 30px;
      height: 42px;
      padding-left: 8px;
      border: 1px solid $light;
      background-color: #eceff1;
      width: calc(100% - 58px);
      border-radius: 5px;
      input {
        font-size: 16px;
        float: left;
        width: 347px;
        height: 40px;
        padding: 0 10px;
        color: $dark;
        border: 0;
        outline: none;
        background-color: #eceff1;
        @include font;
      }
      .write-link {
        &.attach {
          &:before {
            display: inline-block;
            float: left;
            width: 20px;
            height: 42px;
            content: '';
            background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/attachment.png');
            background-repeat: no-repeat;
            background-position: center;
          }
        }
        &.smiley {
          &:before {
            display: inline-block;
            float: left;
            width: 20px;
            height: 42px;
            content: '';
            background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/smiley.png');
            background-repeat: no-repeat;
            background-position: center;
          }
        }
        &.send {
          //去除边框
          border: none;
          //鼠标放上去变手型
          cursor: pointer;
          &:before {
            display: inline-block;
            float: left;
            width: 20px;
            height: 42px;
            margin-left: 11px;
            content: '';
            background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/send.png');
            background-repeat: no-repeat;
            background-position: center;
          }
        }
      }
    }
    .bubble {
      font-size: 16px;
      position: relative;
      display: inline-block;
      clear: both;
      margin-bottom: 8px;
      padding: 13px 14px;
      vertical-align: top;
      border-radius: 5px;
      &:before {
        position: absolute;
        top: 19px;
        display: block;
        width: 8px;
        height: 6px;
        content: '\00a0';
        transform: rotate(29deg) skew(-35deg);
      }
      &.you {
        float: left;
        color: $white;
        background-color: $blue;
        //background-color: #00b0ff;
        align-self: flex-start;
        animation-name: slideFromLeft;
        &:before {
          left: -3px;
          background-color: $blue;
        }
      }
      &.me {
        float: right;
        color: $dark;
        background-color: #eceff1;
        align-self: flex-end;
        animation-name: slideFromRight;
        &:before {
          right: -3px;
          background-color: #eceff1;
        }
      }
    }
    .conversation-start {
      position: relative;
      width: 100%;
      margin-bottom: 27px;
      text-align: center;
      span {
        font-size: 14px;
        display: inline-block;
        color: $grey;
        &:before,&:after {
          position: absolute;
          top: 10px;
          display: inline-block;
          width: 30%;
          height: 1px;
          content: '';
          background-color: $light;
        }
        &:before {
          left: 0;
        }
        &:after {
          right: 0;
        }
      }
    }
  }
}
@keyframes slideFromLeft {
  0% {
    margin-left: -200px;
    opacity: 0;
  }
  100% {
    margin-left: 0;
    opacity: 1;
  }
}
@-webkit-keyframes slideFromLeft {
  0% {
    margin-left: -200px;
    opacity: 0;
  }
  100% {
    margin-left: 0;
    opacity: 1;
  }
}
@keyframes slideFromRight {
  0% {
    margin-right: -200px;
    opacity: 0;
  }
  100% {
    margin-right: 0;
    opacity: 1;
  }
}
@-webkit-keyframes slideFromRight {
  0% {
    margin-right: -200px;
    opacity: 0;
  }
  100% {
    margin-right: 0;
    opacity: 1;
  }
}
</style>