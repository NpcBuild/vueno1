<template>
  <div>
    <div>{{Info.title}}</div>
    <div>{{Info.time}}</div>
    <div>{{Info.todo}}</div>
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

</style>