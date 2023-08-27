<template>
  <div class="chat">11
    <div class="top"><span>To: <span class="name">Dog Woofson</span></span></div>
    <div class="left">
      <div v-for="message in messages" :key="message.id">
        {{ message.message }}2122
      </div>
    </div>
    <div class="right">
      <input type="text" v-model="messageInput">
<!--      <button @click="sendMessage">Send</button>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "chatDetail",
  props: {
    messages: {
      type: Array,
      required: true,
    },
  },
  data() {
    return{
      messageInput: ''
    }
  },
  mounted() {
    console.log(this.messages)
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.chat {
  position: relative;
  display: none;
  overflow: hidden;
  padding: 0 35px 92px;
  border-width: 1px 1px 1px 0;
  border-style: solid;
  border-color: red;
  height: calc(100% - 48px);
  justify-content: flex-end;
  flex-direction: column;

  &.active-chat {
    display: block;
    display: flex;

    .bubble {
      transition-timing-function: cubic-bezier(.4, -.04, 1, 1);
      @for $i from 1 through 10 {
        &:nth-of-type(#{$i}) {
          animation-duration: .15s * $i;
        }
      }
    }
  }
}
</style>