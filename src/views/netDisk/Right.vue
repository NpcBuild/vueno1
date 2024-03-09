<template>
  <div>
    <div class="bt">
      <el-button type="primary" size="medium" icon="el-icon-upload2" @click="dialogVisible = true">上传文件</el-button>
      <el-button size="medium" @click="addfolder = true">新建文件夹</el-button>
      <el-dialog
          title="输入文件名字"
          :visible.sync="addfolder"
          width="20%"
      >
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addfolder = false">取 消</el-button>
          <el-button type="primary" @click="newfolder">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
          title="上传"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
        <el-upload
            class="upload-demo"
            drag
            action="upload"
            :before-upload="beforeUpload"
            multiple

            v-loading="loading"
            element-loading-text="正在上传"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip"></div>
        </el-upload>
        <uploader></uploader>
        <uploader-css></uploader-css>
        <global-uploader
            :global="false"
            :params="{page: 'home'}"
            :options="{target: '/api/netDisk/upload/'}"
            @fileAdded="fileAdded"></global-uploader>
<!--        :options="{target: 'http://localhost:1314/netDisk/upload/'}"-->
<!--        <div>-->
<!--          <h1>上传文件</h1>-->
<!--          <input type="file" ref="fileInput" @change="onFileSelected"/>-->
<!--          <button v-if="!uploading" @click="uploadFile">上传</button>-->
<!--          <button v-else @click="cancelUpload">取消上传</button>-->
<!--          <div v-if="progress > 0">-->
<!--            <progress :value="progress" max="100"></progress>-->
<!--            <span>{{ progress }}%</span>-->
<!--          </div>-->
<!--        </div>-->

        <span slot="footer" class="dialog-footer">
        </span>
      </el-dialog>
      <div id="search"><input placeholder="请输入内容" class="search" v-model="keywords"/><i class="el-icon-search"></i>
      </div>
    </div>
    <div class="router">
      <el-button type="text" size="medium" icon="el-icon-arrow-left" @click="back" v-if="path=='/'?false:true">
        返回上一级 |
      </el-button>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item v-for="(segment, index) in pathSegments" :key="index"><a @click="goto(index)">{{ segment }}</a></el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-table :data="search(keywords)" :height="height">
      <el-table-column prop="name" label="文件名" width="800">
        <!--        <template slot-scope="{row,$index}">-->
        <template slot-scope="{row}">
          <svg>
            <use :xlink:href="'#icon-' + row.type"></use>
          </svg>
          <!--          <img :src="'data:image/png;base64,' + row.img" alt="" style="cursor: default;-->
          <!--            display: block;height: 35px;width: 35px;position: absolute;left:20px;top: 10px;">-->
          <a href="javascript:void(0)" style="position: absolute;left:60px;top: 12px;"
             @click="next(row)">{{ row.name }}</a>

        </template>
      </el-table-column>
      <el-table-column prop="size" label="大小" width="270">
      </el-table-column>
      <el-table-column prop="time" label="修改日期" width="220">
      </el-table-column>
      <el-table-column>
        <template slot-scope="{row,$index}">
          <el-tooltip class="item" effect="dark" content="下载" placement="bottom-start">
            <el-button type="text"><i class="el-icon-download" @click="download(row.name)"></i></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="bottom-start">
            <el-button type="text"><i class="el-icon-delete" @click="del(row.name,$index)"></i></el-button>
          </el-tooltip>

        </template>
      </el-table-column>
    </el-table>
    <el-drawer
        title="文件详情"
        :visible.sync="detail"
        :direction="direction"
    >
      <div v-if="isLoading">加载中...</div>
      <div v-else-if="!error && row">
        <img v-if="detail && row.type == 'image'" :src="'data:image/jpg;base64,' + row.img" alt="" style="cursor: default;
                    display: block;height: auto;width: auto;position: absolute;left:20px;top: auto;">
        <video-player v-else-if="detail && row.type == 'video'"
                      style="object-fit:fill"
                      :options="playerOptions"
                      :playsinline="true"
                      :x5-video-player-fullscreen="true"
                      @pause="onPlayerPause($event)"
                      @play="onPlayerPlay($event)"
                      @fullscreenchange="onFullscreenChange($event)"
                      ref="player" />
        <!--                      @click="fullScreen"-->
      </div>
      <div v-else>加载失败，请重试</div>
    </el-drawer>
  </div>

</template>

<script>
import { videoPlayer } from "vue-video-player";
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import 'videojs-contrib-hls'
// import 'videojs-flash'
// import SWF_URL from 'videojs-swf/dist/video-js.swf'
import uploader from "@/components/uploader/uploader.vue";
import uploaderCss from "@/components/uploader/uploaderCss.vue";
import globalUploader from "@/components/uploader/globalUploader.vue";
import {mapState} from 'vuex'

export default {
  name: 'Right',
  components: {
    uploader,
    uploaderCss,
    globalUploader,
    videoPlayer
  },
  data() {
    return {
      input: '',
      height: window.innerHeight - 62 - 80 - 40,
      tableData: [],
      keywords: '',
      dialogVisible: false,
      loading: false,
      paths: '/',
      pathId: '',
      username: localStorage.getItem('name'),
      addfolder: false,
      detail: false,
      row: {},
      direction: 'rtl',
      isLoading: false,
      error: false,
      drawerData: null,
      playerOptions: {
        // live: true,
        sources: [{
          withCredentials: false, // 直播是否有播放令牌，反正我是没有
          type: 'application/x-mpegURL'
        }],
        autoplay: true,
        muted: false, // 默认情况下将会消除任何音频
        loop: true, // 是否视频一结束就重新开始
        controls: true,
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        // poster:'https://file.digitaling.com/eImg/uimages/20150907/1441607120885946.gif',
        // language: 'zh-CN',
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,
          currentTimeDisplay: false, // 当前时间
          volumeControl: false, // 声音控制键
          playToggle: false, // 暂停和播放键
          progressControl: true, // 进度条
          fullscreenToggle: true // 全屏按钮

        },
        // techOrder: ['flash'], // 兼容顺序
        techOrder: ['flash', 'html5'],//设置顺序，
        // flash: { hls: {withCredentials: false },swf: SWF_URL },
        html5: { hls: { withCredentials: false } },
        notSupportedMessage: '此视频暂无法播放，请稍后再试' // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
      },
    }
  },
  watch: {
    detail(newValue) {
      if (newValue) {
        // this.loadDrawerData()
      } else {
        this.drawerData = null
      }
    }
  },
  created() {
    this.init()
  },
  computed: {
    ...mapState(['path']),
    pathSegments() {
      return ('全部文件' + this.paths).split('/')
    }
  },
  methods: {
    init() {
      localStorage.setItem('path', '/')
      localStorage.setItem('pathId', '/')
      const that = this;
      this.getFileList(0).then(res => {
        that.refresh(res);
      })
    },
    getFileList(key) {
      return new Promise((resolve, reject) => {
        this.postRequest('/netDisk/filelist', {
          id: key,
          // sign: this.$sign,
          // username:localStorage.getItem('name'),
        }).then(res => {
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    search(key) {
      //搜索
      var newlist = []
      this.tableData.forEach(item => {
        if (item.name.indexOf(key) != -1) {
          newlist.push(item)
        }
      })
      return newlist
    },
    handleClose(done) {
      done();
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {
      //   });
    },
    beforeUpload(file) {
      this.loading = true
      let fd = new FormData();
      fd.append('file', file);//传文件
      // fd.append('sign',this.$sign);//传其他参数
      // fd.append('username',localStorage.getItem('name'));//传其他参数
      // fd.append('path',localStorage.getItem('path'));//传其他参数
      const that = this;
      this.postRequest('/netDisk/upload', fd).then(res => {
        if (res.data.code == '200') {
          this.dialogVisible = false
          that.tableData = []
          that.$message({
            showClose: true,
            message: '上传成功',
            type: 'success'
          });
          that.loading = false
          this.init()
        } else if (res.data.code == '2') {
          that.$message({
            showClose: true,
            message: '文件已存在',
            type: 'warning'
          });
        }
        that.loading = false
      })
    },
    del(name, index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
        this.postRequest('/netDisk/delfile', {
          sign: this.$sign,
          name: localStorage.getItem('path') + name,
          // id: localStorage.getItem('pathId') + id,
          username: this.username
        }).then(res => {
          if (res.data.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          } else {
            this.$message({
              type: 'warning',
              message: '删除失败!'
            });
          }

        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    refresh(res) {
      let file = [];
      let dir = [];
      res.data.data.forEach(item => {
        let size;
        if (item.size == '') {
          size = '-';
        } else {
          if (item.size < 1048576) {
            size = (item.size / 1024).toFixed(2) + 'KB';
          } else if (item.size > 1048576 && item.size < 1073741824) {
            size = (item.size / 1024 / 1024).toFixed(2) + 'MB';
          } else if (item.size > 1073741824) {
            size = (item.size / 1024 / 1024 / 1024).toFixed(2) + 'GB';
          }
        }
        if (item.type == 'folder') {
          dir.push({
            id: item.id,
            name: item.name,
            time: new Date(item.creTime).toLocaleString(),
            type: item.type,
            size: size
          })
        } else {
          file.push({
            id: item.id,
            name: item.name,
            img: item.icon,
            path: item.path,
            time: new Date(item.creTime).toLocaleString(),
            type: item.type,
            size: size
          })
        }
      })
      this.tableData = dir.concat(file)
    },
    download(name) {
      // window.location.href= `${this.$axios.defaults.baseURL}` +'/netDisk/download?username='+this.username+'&name='+name
      this.getRequest('/netDisk/download').then(response => {
        console.log(name)
        debugger
        this.fileUrl = URL.createObjectURL(new Blob([response.data], {type: 'application/png'}));
      })
    },
    newfolder() {
      this.postRequest('netDisk/newfolder', {
        // sign:this.$sign,
        // username:this.username,
        path: localStorage.getItem('path'),
        id: localStorage.getItem('pathId'),
        fname: this.input
      }).then(res => {
        if (res.data.code == 200) {
          this.addfolder = false
          this.input = ''

          this.next('')
          this.$alert('创建文件夹成功', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              console.log(action)
              this.$message({
                type: 'info',
                message: "再见"
              });
            }
          });
        } else {
          this.$alert('创建是失败，文件夹已存在', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              console.log(action)
              this.$message({
                type: 'info',
                message: "再见"
              });
            }
          });
        }
      })
    },
    next(row) {
      if (row.type && row.type == 'folder') {
        const newpath = localStorage.getItem('path') + row.name + '/';
        const newpathId = localStorage.getItem('pathId') + row.id + '/';
        const that = this;
        this.paths = newpath
        this.pathId = newpathId
        this.getFileList(row.id).then(res => {
          localStorage.setItem('path', newpath)
          localStorage.setItem('pathId', newpathId)
          this.tableData = []
          that.refresh(res)
        })
      } else {
        this.showDetail(row)
      }
    },
    goto(index) {
      var that = this
      let opath,opathId
      opath = this.paths.split("/")
      opathId = this.pathId.split("/")
      console.log(index,opath[index],opathId[index])
      let paths,pathId
      paths = opath.slice(0,index+1)
      pathId = opathId.slice(0,index+1)
      this.getFileList(Number(opathId[index])).then(res => {
        console.log('paths.join("/")',paths.join("/"))
        this.setPath(paths.join("/"),pathId.join("/"))
        this.tableData = []
        that.refresh(res)
      })
    },
    back() {
      const str = localStorage.getItem('path').split('/');
      const strId = localStorage.getItem('pathId').split('/');
      str.splice(0, 1)
      str.splice(str.length - 1, 1)
      str.splice(str.length - 1, 1)
      strId.splice(0, 1)
      strId.splice(strId.length - 1, 1)
      strId.splice(strId.length - 1, 1)
      const that = this;
      let backpath = '/';
      let backpathId = '/';
      str.forEach(item => {
        backpath += item + '/'
      })
      strId.forEach(item => {
        backpathId += item + '/'
      })
      this.paths = backpath
      this.pathId = backpathId
      this.getFileList(strId.length ? strId[strId.length - 1] : 0).then(res => {
        localStorage.setItem('path', backpath)
        localStorage.setItem('pathId', backpathId)
        this.tableData = []
        that.refresh(res)
      })
    },
    setPath(path,pathId) {
      localStorage.setItem('path', path)
      localStorage.setItem('pathId', pathId)
      this.paths = path
      this.pathId = pathId
    },
    showDetail(row) {
      console.log(row)
      this.row = row
      this.detail = true
      if (row.type == 'image' && !row.img) {
        this.getImgThumbnail(row.id)
      }
      if (row.type == 'video') {
        // this.$refs.player.getVuePlayer().init()
        this.changeVideoSource(row.id)
      }
      // let path = row.path
      // const url = 'http://127.0.0.1:8012' + path.replaceAll('\\','/')
      // window.open('http://127.0.0.1:8012/onlinePreview?url='+encodeURIComponent(btoa(encodeURI(url))));
    },
    getImgThumbnail(id) {
      this.getRequest('/netDisk/getImgThumbnail', {id: id}).then(res => {
        console.log(res.data,'data')
        this.row.img = res.data
      })
    },
    changeVideoSource(newVideoId) {
      // Assuming you have the correct video server URL pattern
      // console.log('change', this.$refs.player)
      // this.$refs.player && this.$refs.player.$refs.video.reload();
      this.playerOptions.sources[0].src = process.env.VUE_APP_API_BASE_URL + `/video/${newVideoId}`;
      console.log(this.playerOptions.sources[0].src)
      // this.$refs.player.reload(); // Reload the player to change the video source
    },
    loadDrawerData() {
      this.isLoading = true
      this.error = false
      // 根据传入的变量动态查询展示内容，这里假设查询数据的方法是 loadDrawerDataById
      this.postRequest('/netDisk/getFile', localStorage.getItem('path') + this.row.name).then(data => {
        this.drawerData = data
      }).catch(() => {
        this.error = true
      }).finally(() => {
        this.isLoading = false
      })
      console.log(this.drawerData)
      // this.getRequest('/netDisk/playMp4'+this.row.name).then(data => {
      //   console.log(data,'data')
      // })
      // this.$axios('/netDisk/playMp4/'+this.row.name)
      //     .then(function(response) {
      //       console.log(response)
      //   // 响应处理代码
      // })
      //     .catch(function(error) {
      //       // 错误处理代码
      //       console.log(error)
      //     });
    },
    fileAdded() {
      console.log("文件选择完毕！")
    }
  }
}
</script>
<style scoped>

.bt {
  max-width: 100%;
  background-color: white;
  height: 40px;
  font: 12px/1.5 "Microsoft YaHei", arial, SimSun, "宋体";
  line-height: 30px;
}

.router {
  background-color: white;
  display: flex;
  height: 26px;
  align-items: center;
}

.breadcrumb {
  margin-left: 15px;
}

.nav {
  max-width: 100%;
  background-color: white;
  height: 20px;
  /*font: 12px/1.5 "Microsoft YaHei", arial, SimSun, "宋体";*/
  font-size: 8px;
  line-height: 20px;
}

.el-table-column {
  max-height: 48px;
  line-height: 48px;
}

.el-table {
  max-width: 100%;
  font: 12px/1.5 "Microsoft YaHei", arial, SimSun, "宋体";
}

#search {
  width: 315px;
  border-radius: 33px;
  background-color: #f7f7f7;
  float: right;
  text-align: center;
  height: 32px;
  line-height: 32px;

}

.search {
  border: none;
  background-color: #f7f7f7;
  height: 30px;
  width: 248px;
}

img {
  width: 30px;
  height: 30px;
}

a {
  color: #424e67;
  text-decoration: none;
}

a:hover {
  color: #09AAFF;
}

.el-icon-delete {
  color: #F56C6C;
}

svg {
  width: 3em;
  height: 3em;
  fill: currentColor;
}
</style>
