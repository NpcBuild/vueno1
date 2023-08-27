<template>
  <div id="todo">
    <div>每日计划</div>
    <div>日期：{{new Date}}</div>
    <br/>
    <hr/>
    <div @click="generateImage">今日目标</div>
    <br/>
    <hr/>
    <div>时间轴</div>
    <div>待办事项</div>
    <br/>
    <detail :Info="{title:'起床',time:'06：00',todo:'upup'}"></detail>
  </div>

</template>

<script>
import html2canvas from 'html2canvas';
import detail from "@/views/todo/detail.vue";
export default {
  name: "dailyPlan",
  components: {detail},
  // mounted() {
  //   this.$nextTick(() => {
  //     console.log('$nextTick')
  //     // 监听图片加载完成事件
  //     const images = document.getElementById('todo').getElementsByTagName('img');
  //     let loadedCount = 0;
  //     const totalImages = images.length;
  //     const handleImageLoad = () => {
  //       loadedCount++;
  //       if (loadedCount === totalImages) {
  //         // 所有图片加载完成后生成图片
  //         this.generateImage();
  //       }
  //     };
  //     Array.from(images).forEach(image => {
  //       image.addEventListener('load', handleImageLoad);
  //     });
  //   });
  // },
  methods: {
    generateImage() {
      html2canvas(document.getElementById('todo')).then(canvas => {
        const imgData = canvas.toDataURL('image/png'); // 将canvas转换为图像数据URL
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'image.png'; // 图像下载的文件名
        link.click(); // 模拟点击下载链接
      });
    }
  }

}
</script>

<style scoped>

</style>