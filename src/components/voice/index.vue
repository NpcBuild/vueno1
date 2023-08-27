<template>
  <div>
    <h1>语音助手</h1>
    <p>请按住按钮并说出您想要对话的内容：</p>
    <div id="voice-input-button" v-on:mousedown="startRecording" v-on:mouseup="stopRecording">
      <div></div>
    </div>
    <p>语音助手的回答：</p>
    <p>{{ voiceOutput }}</p>

    <div class="payment">
      <div class="payment__amount">
        欠缴金额：<strong>111</strong>万元
      </div>
      <div class="payment__button">
        <el-button type="primary" @click="showPaymentInfo">交费</el-button>
        <el-alert
            title="交费信息"
            type="success"
            :visible.sync="paymentInfoVisible"
            effect="light"
            :center="true"
        >
          <p>交费信息内容...</p>
        </el-alert>
      </div>
    </div>
<!--    <iframe src="http://www.baidu.com"></iframe>-->
    <iframe id="my-iframe" ref="myIframe" style="height: 1000px;width: 100%"
            @load="onloads" src="http://b2b-uni.csuat.cmburl.cn/mobPage.html?orderNbr=N0000000000000367287&timestamp=20230417093939&authCode=c50ba10b271746b8a3609cbc4de20ceef96f508d55c2052b65be0bf431cabad8"></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      voiceOutput: ""
    };
  },
  // mounted() {
  //   // 获取iframe元素
  //   const iframe = this.$refs.myIframe;
  //
  //   // 定义消息处理程序
  //   const handleMessage = (event) => {
  //     if (event.data.type === 'my-message') {
  //       console.log('Received message:', event.data.message);
  //     }
  //   };
  //
  //   // 添加消息事件监听器
  //   window.addEventListener('message', handleMessage);
  //
  //   // 加载URL并发送消息
  //   iframe.onload = () => {
  //     iframe.contentWindow.postMessage('Hello from parent!', '*');
  //   };
  //   iframe.src = 'https://www.baidu.com';
  // },
  methods: {
    startRecording() {
      // 开始录音
    },
    stopRecording() {
      // 停止录音并将录音数据发送到语音助手
      // sendVoiceInputToAssistant(voiceInput)
      //     .then((voiceOutput) => {
      //       // 将语音助手的回答设置到数据中
      //       this.voiceOutput = voiceOutput;
      //     });
    },
    onloads() {
      // try {
      //   console.log('开始')
      //   const contentWin = this.$refs.myIframe.contentWindow.document
      //   console.log(contentWin)
      // } catch(e) {
      //   console.log(e)
      // }

    }
  }
};
</script>
<style>
body {
  font-family: sans-serif;
}

h1 {
  text-align: center;
}

p {
  margin: 10px 0;
}

#voice-input-button {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  border-radius: 50%;
  background-color: #4285f4;
  cursor: pointer;
}

#voice-input-button > div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 70%;
  border-radius: 50%;
  background-color: #0e3775;
}

#voice-input-button:active > div {
  width: 100%;
  height: 100%;
  background-color: #4285f4;
}

#voice-output {
  margin: 20px 0;
  padding: 10px;
  font-size: 18px;
  color: white;
  background-color: #4285f4;
  border-radius: 5px;
}

.payment {
  display: flex;
  align-items: center;
}

.payment__amount {
  margin-right: 20px;
  font-size: 18px;
}

.payment__button {
  display: flex;
  align-items: center;
}
</style>
