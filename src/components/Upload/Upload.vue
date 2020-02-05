<template>
    <div id="Upload" class="Upload">
      <h2>Upload</h2>
      <div id="wrap">
        <a href="javascript:;" id="seleteFile">选择文件</a>
        <a href="javascript:;" id="startFileUpload">上传文件</a>
      </div>
      <img :src="previewImg" v-if="previewImg" @click="linktoUrl(previewImg)">
    </div>
</template>

<script>
import uploadFiles from '../../assets/oss-lib/upload.js';
export default {
  name: 'index',
  data () {
    return {
      previewImg: ''
    }
  },
  created() {
    
  },
  mounted(){
    let vm = this;
    // params{container, selDom, uploadDom, fileType, fileProgress, fileAdding, fileUploadSuccess}
    uploadFiles('wrap', 'seleteFile', 'startFileUpload', 'image', fileload, fileadd, fileok);
    function fileload(file){
        // 上传进度
        console.log(file.percent);
    }
    function fileadd(file){
        // 上传文件的本地文件名
        console.log(file.name)
    }
    function fileok(fileurl){
        // 上传好的图片URL地址
        console.log(fileurl)
        vm.previewImg = fileurl;
    }
  },
  methods: {
    linktoUrl(url){
      open(url, '_blank');
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './Upload.scss'
</style>
