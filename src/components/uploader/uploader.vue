<template>
<!--  <uploader :options="options" class="uploader-example">-->
<!--    <uploader-unsupport></uploader-unsupport>-->
<!--    <uploader-drop>-->
<!--      <p>Drop files here to upload or</p>-->
<!--      <uploader-btn>select files</uploader-btn>-->
<!--      <uploader-btn :attrs="attrs">select images</uploader-btn>-->
<!--      <uploader-btn :directory="true">select folder</uploader-btn>-->
<!--    </uploader-drop>-->
<!--    <uploader-list></uploader-list>-->
<!--  </uploader>-->
  <uploader
      :options="options"

      :autoStart="false">
<!--    @file-added="this.fileAdded"
    @file-error="this.fileError"
    @file-success="this.fileSuccess"-->
    <uploader-unsupport></uploader-unsupport>
    <uploader-btn class="uploader-btn">点击上传</uploader-btn>

    <uploader-list>
      <!--通过slot-scope绑定文件实例-->
      <div slot-scope="props">
        <div v-for="(file,i) in props.fileList" :key="i">
          <uploader-file :list="true" :file="file"></uploader-file>
        </div>
      </div>
    </uploader-list>
  </uploader>

</template>

<script>
export default {
  data () {
    return {
      options: {
        // https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
        target: '//localhost:1314/upload',
        testChunks: false
      },
      attrs: {
        accept: 'image/*'
      }
    }
  }
}
</script>

<style scoped>
  .uploader-example {
    width: 880px;
    padding: 15px;
    margin: 40px auto 0;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  }
  .uploader-example .uploader-btn {
    margin-right: 4px;
  }
  .uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>