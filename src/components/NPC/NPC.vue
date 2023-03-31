<template>
  <div class="container">
    <div class="main" v-drag>{{transcript}}</div>
    <FloatBall v-drag></FloatBall>
  </div>
</template>

<script>
import FloatBall from '@/components/FloatBall';
export default {
  name: "NPC",
  data() {
    return {
      isListening: false,
      transcript: '',
      recognition: null,
    }
  },
  components: {
    FloatBall
  },
  mounted() {
    this.startRecognition()
  },
  directives: {
    //v-drag实现拖拽
    drag: {
      // 指令的定义
      bind: function(el) {
        let oDiv = el;  // 获取当前元素
        oDiv.onmousedown = (e) => {
          // 算出鼠标相对元素的位置
          let disX = e.clientX - oDiv.offsetLeft;
          let disY = e.clientY - oDiv.offsetTop;

          document.onmousemove = (e) => {
            // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            let left = e.clientX - disX;
            let top = e.clientY - disY;

            oDiv.style.left = left + 'px';
            oDiv.style.top = top + 'px';
          };

          document.onmouseup = (e) => {
            document.onmousemove = null;
            document.onmouseup = null;
            console.log(e)
          }
        }
      },
      /*阻止拖拽*/
      stopdrag: {
        inserted: function(el, binding, vnode) {
          let element = el;
          element.onmousedown = function(e) {
            e.stopPropagation()
          }
          console.log(binding)
          console.log(vnode)
        }
      }
    }
  },
  beforeDestroy() {
    if (this.recognition) {
      this.stopRecognition()
    }
  },
  methods: {
    // 监听是否启动问答
    startMonitor() {
      if (!('webkitSpeechRecognition' in window)) {
        alert('不支持语音识别')
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
        alert('不支持语音识别')
        return
      }

      // eslint-disable-next-line no-undef
      this.recognition = new webkitSpeechRecognition()
      this.recognition.lang = 'zh-CN'
      this.recognition.continuous = true  // 启用连续语音识别
      this.recognition.interimResults = true
      // 说话时触发
      this.recognition.onresult = (event) => {
        debugger
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
  position: absolute;
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