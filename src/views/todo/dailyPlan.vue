<template>
  <div id="todo">
    <div id="a4-paper" class="a4-paper">
      <div class="content" style="margin-top: 500px">
        <div class="left-content">
          每日计划
          <hr/>
          今日目标
        </div>
        <div class="right-content" style="text-align: end;">
          日期：{{nowTime}}
          <hr/>
        </div>
      </div>
      <div class="title" @click="generateImage">{{ pageTitle }}</div>
      <hr/>
      <div class="content">
        <div class="left-content">
          <!-- 左侧内容 -->
          <hr/>
          时间轴
          <br/>
          <br/>
          <br/>
          <detail :Info="{title:'起床',time:'06：00',todo:'upup'}"></detail>
        </div>
        <div class="right-content">
          <!-- 右侧内容 -->
          <hr/>
          待办事项
          <br/>
          <br/>
          <br/>
          <detail :Info="{title:'1',time:'实现自身价值',todo:'口'}"></detail>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import html2canvas from 'html2canvas';
import detail from "@/views/todo/detail.vue";
import {timestampToDateStr} from "@/utils/time/time";
export default {
  name: "dailyPlan",
  components: {detail},
  data() {
    return {
      pageTitle: '友善地对待我见到的每一个人',
    };
  },
  mounted() {
    // this.$nextTick(() => {
    //   console.log('$nextTick')
    //   // 监听图片加载完成事件
    //   const images = document.getElementById('todo').getElementsByTagName('img');
    //   let loadedCount = 0;
    //   const totalImages = images.length;
    //   const handleImageLoad = () => {
    //     loadedCount++;
    //     if (loadedCount === totalImages) {
    //       // 所有图片加载完成后生成图片
    //       this.generateImage();
    //     }
    //   };
    //   Array.from(images).forEach(image => {
    //     image.addEventListener('load', handleImageLoad);
    //   });
    // });
  },
  computed: {
    nowTime() {
      return timestampToDateStr(new Date().getTime())
    }
  },
  methods: {
    generateImage() {
      html2canvas(document.getElementById('a4-paper'), {
        scale: 2, // 调整缩放比例
        useCORS: true, // 使用CORS
      }).then(canvas => {
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
.todo {
}
.a4-paper {
  width: 210mm; /* A4纸宽度 */
  height: 297mm; /* A4纸高度 */
  background-color: #ffffcc; /* 淡黄色背景颜色 */
  padding: 10mm; /* 内边距，模拟页边距 */

  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  color: lightgreen;
  font-size: 24px;
  margin: 4mm 0;
}
.content {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.left-content {
  flex: 1;
}

.right-content {
  flex: 1;
}
</style>