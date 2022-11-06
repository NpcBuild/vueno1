<template>
  <div>
    <el-form>
      <el-form-item label="账号" prop="uid">
        <el-input type="text" v-model="form.uid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="消息" prop="message">
        <el-input type="text" v-model="form.message" autocomplete="off"></el-input>
      </el-form-item>
      <el-button @click="send">发送ws消息</el-button>
    </el-form>
    <hr color="black" />
    <h3>服务器端返回的应答消息</h3>
    <textarea id="responseText" style="width: 1024px;height: 300px;"></textarea>
  </div>
</template>

<script>
var socket;
export default {
  name: "socket",
  data() {
    return {
      form: {
        uid: '',
        message: ''
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (!window.WebSocket) {
        window.WebSocket = window.MozWebSocket;
      }
      if (window.WebSocket) {
        socket = new WebSocket("ws://127.0.0.1:12345/socket?uid=666&gid=777");
        socket.onmessage = function (event) {
          debugger
          var ta = document.getElementById('responseText');
          ta.value += event.data + "\r\n";
        };
        socket.onopen = function (event) {
          var ta = document.getElementById('responseText');
          console.log(event);
          ta.value = "Netty-WebSocket服务器。。。。。。连接 \r\n";
        };
        socket.onclose = function (event) {
          var ta = document.getElementById('responseText');
          console.log(event);
          ta.value = "Netty-WebSocket服务器。。。。。。关闭 \r\n";
        };
      } else {
        alert("您的浏览器不支持WebSocket协议！");
      }
    },
    send() {
      if (!window.WebSocket) {return;}
      if (socket.readyState == WebSocket.OPEN) {
        socket.send(this.form.uid+':'+this.form.message);
      } else {
        alert("WebSocket 连接没有成功建立！");
      }
    }
  }
}
</script>

<style scoped>

</style>