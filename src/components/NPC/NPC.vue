<template>
  <div class="container">
    <div class="main" v-drags v-if="voiceDisable">{{transcript}}</div>
    <FloatBall v-drags></FloatBall>
  </div>
</template>

<script>
import FloatBall from '@/components/FloatBall';
export default {
  name: "NPC",
  data() {
    return {
      voiceDisable: false, // 是否开启语音支持
      voiceAssistant: false,
      isListening: false,
      transcript: '',
      recognition: null,
    }
  },
  components: {
    FloatBall
  },
  created() {
    this.getRequest('/setting/getSettingById', {id: 1}).then(res => {
      this.voiceAssistant = res.data.voiceAssistant
      if (this.voiceAssistant && this.checkMicrophoneAccess()) this.startRecognition()
      else if (!this.voiceAssistant) {
        this.stopRecognition()
      }
    })
  },
  mounted() {},
  beforeDestroy() {
    if (this.recognition) {
      this.stopRecognition()
    }
  },
  methods: {
    // 检查是否支持
    checkMicrophoneAccess() {
      if (!('webkitSpeechRecognition' in window)) {
        alert('你的浏览器不支持语音识别')
        return
      }

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then(() => {
              console.log('已获得麦克风访问权限');
              // 在这里初始化和使用webkitSpeechRecognition
            })
            .catch(error => {
              console.error('无法访问麦克风', error);
            });
        return true
      } else {
        console.error('你的浏览器不支持 getUserMedia');
        return
      }
    },
    // 监听是否启动问答
    startMonitor() {
      if (!('webkitSpeechRecognition' in window)) {
        alert('你的浏览器不支持语音识别')
        return
      }

      // eslint-disable-next-line no-undef
      this.recognition = new webkitSpeechRecognition()
      this.recognition.lang = 'zh-CN'
      this.recognition.continuous = true  // 启用连续语音识别
      this.recognition.interimResults = true
      // 说话时触发
      this.recognition.onresult = (event) => {
        this.handleSpeechEvent(event)
      }

      this.recognition.onend = () => {
        if (this.isListening) {
          this.startRecognition()
        }
      }
      this.recognition.onerror = () => {
        console.log("语音识别错误，请重试！")
      }

      this.recognition.start()
      this.isListening = true
    },
    // 语音识别功能
    startRecognition() {
      if (!('webkitSpeechRecognition' in window)) {
        alert('你的浏览器不支持语音识别')
        return
      }

      this.voiceDisable = true
      // eslint-disable-next-line no-undef
      this.recognition = new webkitSpeechRecognition()
      this.recognition.lang = 'zh-CN'
      this.recognition.continuous = true  // 启用连续语音识别
      this.recognition.interimResults = true
      // 说话时触发
      this.recognition.onresult = (event) => {
        let interimTranscript = ''
        let finalTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          let result = event.results[i]

          if (result.isFinal) {
            finalTranscript += result[0].transcript
          } else {
            interimTranscript += result[0].transcript
          }
        }

        this.transcript = finalTranscript || interimTranscript
        if (finalTranscript != '') {
          this.postRequest('/chat', {
            text: this.transcript,
          }).then(res => {
            this.speaks(res.data.response)
            this.transcript = res.data.response
          })
        }
      }

      this.recognition.onend = () => {
        console.log("语音识别已停止")
        if (this.isListening) {
          this.startRecognition()
        }
      }
      this.recognition.onerror = () => {
        console.log("语音识别错误，请重试！")
      }

      this.recognition.start()
      this.isListening = true
    },
    stopRecognition() {
      this.isListening = false
    },
    handleSpeechEvent(event) {
      if (event.results.length > 0) {
        let result = event.results[0][0].transcript
        if (result.includes("打开语音识别")) {
          this.speaks("请说")
          this.startRecognition()
        } else if (result.includes("关闭语音识别")) {
          this.stopRecognition()
        }
      }
    },
    speaks(info) {
      let synth = window.speechSynthesis
      let utterance = new SpeechSynthesisUtterance(info)
      synth.speak(utterance)
    }
  },
}
</script>

<style scoped>
.container{
  /*position: relative;*/
}
.main{
  user-select: none;
  position: fixed;
  right: 10%;
  bottom: 80px;
  width: 10%;
  height: 10%;
  line-height: 40px;
  text-align: center;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999;
  background-color: gray;
  overflow: hidden;
  box-shadow: 0px 0px 10px 2px skyblue;
  padding: 1em;
}
</style>