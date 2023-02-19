<template>
  <div>
    <h1>语音助手</h1>
    <p>请按住按钮并说出您想要对话的内容：</p>
    <div id="voice-input-button" v-on:mousedown="startRecording" v-on:mouseup="stopRecording">
      <div></div>
    </div>
    <p>语音助手的回答：</p>
    <p>{{ voiceOutput }}</p>
  </div>
</template>

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
</style>

<script>
export default {
  data() {
    return {
      voiceOutput: ""
    };
  },
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
    }
  }
};
</script>
