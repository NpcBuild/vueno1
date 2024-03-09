<template>
  <card :slide-list="slideList" currentIndex="1"></card>
</template>

<script>
import Card from "@/components/card/card.vue";

export default {
  name: "corpus",
  components: {Card},
  data() {
    return {
      slideList: []
    }
  },
  created() {
    // 获取数据
    this.init()
  },
  methods: {
    init() {
      console.log('初始化数据')
      this.getRequest('/corpus/getCorpusList',{pageNum: 1,pageSize:20}).then(res => {
        this.slideList = res.data.records
      })
    }
  }
}
</script>

<style scoped>

</style>