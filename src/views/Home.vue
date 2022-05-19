<template>
  <div class="home">
    <Header/>
    <Info :Info="Info"/>
  </div>
</template>

<script>
import api from "@/api";
import Header from "@/components/Header";
import Info from "@/components/Info"
export default {
  name: 'Home',
  data(){
    return {
      //朋友圈文字：Info
      Info: {
        content:"",
        source:"",
      }
    }
  },
  components: {
    Header,
    Info
  },
  mounted() {
    api.getPyqwenan({
      key:"9926be2444c935728b45d5e4b6f50da0"
    }).then(res =>{
      console.log(res)
      // eslint-disable-next-line no-debugger
      debugger
      if (res.code == 200){
        this.Info.content = res.newslist[0].content
        this.Info.source = res.newslist[0].source
      }
      console.log(res.newslist[0].content)
      console.log(res.newslist[0].source)
    }).catch((error) => {
      console.log(error)
    })
  }
}
</script>