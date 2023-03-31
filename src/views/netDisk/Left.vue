<template>
  <el-container>
    <el-header>
      <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
      >
        <el-menu-item index="1">
          <i class="el-icon-tickets"></i>
          <span slot="title">全部文件</span>
        </el-menu-item>
        <el-menu-item index="2" class="item">
          <i class="el-icon-picture-outline"></i>
          <span slot="title">图片</span>
        </el-menu-item>
        <el-menu-item index="3" class="item">
          <i class="el-icon-document"></i>
          <span slot="title" class="item">文档</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-video-play"></i>
          <span slot="title" class="item">视频</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-mic"></i>
          <span slot="title" class="item">音乐</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-more"></i>
          <span slot="title" class="item">其他</span>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main></el-main>
    <el-footer>
      <el-progress :text-inside="false" :stroke-width="10" :percentage="use" :show-text="false"></el-progress>
      <el-breadcrumb separator="/" style="margin-top: 5px;font-size: 12px;">
        <el-breadcrumb-item>{{ usesize }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ size }}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "Left",
  data() {
    return {
      use: 0,
      size: '0M',
      usesize: '0M'
    }
  },
  created() {
    this.postRequest('/netDisk/getusesize').then(res => {
      const MIB = 1048576;
      this.size = res.data.size / MIB + 'M';
      const persent = res.data.realsize / res.data.size * 100;
      if (persent == 0) {
        this.use = 1
      } else {
        this.use = persent
      }
      this.usesize = res.data.realsize / MIB + 'M'
    })
  },
  methods: {}
}
</script>

<style scoped>
.el-menu {
  background-color: #f7f7f7;
  border: 0;
  /*text-align: center;*/

}

.item {
  color: #424e67;
  font-size: 14px;
}

.el-progress-bar__outer {

}
</style>
