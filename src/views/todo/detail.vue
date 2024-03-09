<template>
  <div>
    <span>{{Info.title}}</span>
    <span>{{Info.time}}</span>
    <span>{{Info.todo}}</span>
    <br/>
    <hr/>
  </div>
</template>

<script>
export default {
  name: "detail",
  props: {
    Info: {
      type:Object,
      default:function (){
        return {};
      }
    }
  }
}
</script>

<style scoped>
span{
  margin-left: 3vw;
}
</style>