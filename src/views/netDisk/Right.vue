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
        <el-breadcrumb-item v-for="(segment, index) in pathSegments" :key="index"><a
            onclick="console.log('ww')">{{ segment }}</a></el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-table :data="search(keywords)" :height="height">
      <el-table-column prop="name" label="文件名" width="800">
        <!--        <template slot-scope="{row,$index}">-->
        <template slot-scope="{row}">
          <svg>
            <use :xlink:href="'#icon-' + row.img"></use>
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
      <div v-else-if="!error && drawerData">
        <img :src="'data:image/jpg;base64,' + drawerData.data" alt="" style="cursor: default;
                    display: block;height: 350px;width: 350px;position: absolute;left:20px;top: auto;">
      </div>
      <div v-else>加载失败，请重试</div>
    </el-drawer>
  </div>

</template>

<script>
import uploader from "@/components/uploader/uploader.vue";
import uploaderCss from "@/components/uploader/uploaderCss.vue";
import {mapState} from 'vuex'

export default {
  name: 'Right',
  components: {
    uploader,
    uploaderCss
  },
  data() {
    return {
      input: '',
      height: window.innerHeight - 62 - 80 - 40,
      tableData: [],
      keywords: '',
      dialogVisible: false,
      loading: false,
      path: '/',
      username: localStorage.getItem('name'),
      addfolder: false,
      detail: false,
      row: {},
      direction: 'rtl',
      isLoading: false,
      error: false,
      drawerData: null,

    }
  },
  watch: {
    detail(newValue) {
      if (newValue) {
        this.loadDrawerData()
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
      return ('全部文件' + this.path).split('/')
    }
  },
  methods: {
    init() {
      localStorage.setItem('path', '/')
      const that = this;
      this.postRequest('/netDisk/filelist', {})
          // this.$axios.post(this.$HOST + 'netDisk/filelist', this.$qs.stringify({
          //   sign: this.$sign,

          //   username:localStorage.getItem('name')
          // }))
          .then(res => {
            that.refresh(res);
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
      res.data.data.dir.forEach(item => {
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
        this.tableData.push({
          name: item.name,
          time: new Date(item.createTime).toLocaleString(),
          img: item.img,
          size: size
        })
      })
      res.data.data.file.forEach(item => {
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
        this.tableData.push({
          name: item.name,
          time: new Date(item.createTime).toLocaleString(),
          img: item.img,
          size: size
        })
      })
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
      if (row.img && row.img == 'folder') {
        const newpath = localStorage.getItem('path') + row.name + '/';
        const that = this;
        this.path = newpath
        this.postRequest('/netDisk/filelist', {
          // sign: this.$sign,
          // username:localStorage.getItem('name'),
          path: newpath
        }).then(res => {
          localStorage.setItem('path', newpath)
          this.tableData = []
          that.refresh(res)
        })
      } else {
        this.showDetail(row)
      }
    },
    back() {
      // console.log( localStorage.getItem('path').split('/'))
      const str = localStorage.getItem('path').split('/');
      str.splice(0, 1)
      str.splice(str.length - 1, 1)
      str.splice(str.length - 1, 1)
      const that = this;
      let backpath = '/';
      str.forEach(item => {
        backpath += item + '/'
      })
      this.path = backpath
      this.postRequest('/netDisk/filelist', {
        // sign: this.$sign,
        // username:localStorage.getItem('name'),
        path: backpath
      }).then(res => {
        localStorage.setItem('path', backpath)
        this.tableData = []
        that.refresh(res)
      })

    },
    showDetail(row) {
      console.log(row)
      this.row = row
      this.detail = true
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
      this.getRequest('/netDisk/playMp4'+this.row.name).then(data => {
        console.log(data,'data')
      })
      // this.$axios('/netDisk/playMp4/'+this.row.name)
      //     .then(function(response) {
      //       console.log(response)
      //   // 响应处理代码
      // })
      //     .catch(function(error) {
      //       // 错误处理代码
      //       console.log(error)
      //     });
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
