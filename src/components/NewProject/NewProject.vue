<template>    
    <div>
      <div class="progress rex-cf" v-show="isprogress">
        <mu-linear-progress color="#ed2d2e" :size="size" mode="determinate" :value="value"/>
      </div>
      <Header></Header>
      <div class="project">
          <div id="prompt">项目 / 新建项目</div>
          <div class="display">
              <div class="coverImage" id="box">
                  <div id="label1">封面图/轮播图</div>
                  <div class="fileBox">
                      <img id="addImage" :src='addImg'>
                      <!-- <input type="file" id="file" @change='add_img' accept="image/jpeg, image/jpg, image/png" multiple> -->
                  </div>
                  <div class="uploadPanel">
                      <div id="label2">仅限GIF格式或序列帧，大小不超过2M</div>
                      <img id="img_upload" :src="uploadImg">
                  </div>                  
              </div>
              <br>
              <div class="name">
                  <div id="label">项目名称</div>
                  <input type="text" placeholder="请输入项目名称"  v-model="projectName"/>
              </div>
              <br>
              <div class="owner_headurl">
                  <div  id="box1">
                    <div id="label">录入者头像</div>
                    <div class="fileBox">
                        <img id="addImage1" :src='addImg1'>
                        <!-- <input type="file" id="file" @change='add_img' accept="image/jpeg, image/jpg, image/png" multiple> -->
                    </div>
                    <div class="uploadPanel">
                        <div id="label2">大小不超过2M</div>
                        <img id="img_upload1" :src="uploadImg">
                    </div>
                  </div>
              </div>
              <br>
              <div class="owner_name">
                  <div id="label">录入者昵称</div>
                  <input type="text" placeholder="请输入录入者姓名"  v-model="ownerName"/>
              </div>
              <br>
              <div class="des">
                  <div id="label">项目说明</div>
                  <input type="text" placeholder="请输入玩法介绍等"  v-model="projectDes"/>
              </div>
              <br>
              <div class="link">
                  <p><input type="checkbox" id="purchaseLink" v-model="isCanBuy" @click="isCanPurchase">购买链接</p>
              </div>
              <br>
              <div class="linkDes">
                  <input type="text" id="input1" placeholder="eg: http://" readonly="readonly" v-model="linkUrl">
                  <!-- <input type="text" id="input2" placeholder="文字描述" value="文字描述" readonly="readonly" v-model="linkDes"> -->
              </div>
              <br>
              <div class="video">
                  <div id="label">视频信息</div>
                  <div class="check"><input type="checkbox" v-model="isVideoUpload" @click="isCanUpload">&nbsp;&nbsp;是否上传</div>
              </div>
              
              <div v-show='isVideoUpload' class="video_upload" id="box2"> 
                  <div class="fileBox">
                      <img id="addVideo" :src='addVideo'>
                      <!-- <input type="file" id="file" @change='add_img' accept="image/jpeg, image/jpg, image/png" multiple> -->
                  </div>
                  <div class="uploadPanel">
                      <div id="label2">视频文件大小不超过10MB,时长不超过3分钟，MP4格式</div>
                      <div>
                          <img id="video_upload" :src="uploadImg">
                          <div id="fileName">{{videoName}}{{videoName?`（${videoNamePercent}%）`:''}}</div>
                      </div>
                      
                  </div>
              </div>
              <br>
              <!-- <div class="banner">
                  <div id="label">轮播图</div>
                  <div class="check"><input type="checkbox" v-model="isBanner" @click="isCanBanner">&nbsp;&nbsp;是否设置为轮播图</div>
              </div> -->
          </div>
          <div class="addElement">
              <label id="des">项目元素</label>
              <div class="panel">
                  <div class="card" v-bind:key="item.id" v-for="item in elementsList" >
                      <div class="head">
                          <div id="div1">识别图</div>
                          <img id="img" :index="item.id" :src="delImg" @click="_delete($event)">
                      </div>
                      
                      <img id="img" :src="item.recognition_img">
                      <div id="div2" :index="item.id" @click="jump($event)">查看结果</div>
                  </div>
                  <div class="card" v-bind:key="item.id" v-for="item in addElementsList" >
                      <div class="head">
                          <div id="div1">识别图</div>
                          <img id="img" :index="item.id" :src="delImg" @click="_delete($event)">
                      </div>
                      <img id="img" :src="item.recognition_img">
                      <div id="div2" >查看结果</div>
                  </div>                       
                  
                  <div id="add" @mouseover="enter" @mouseout="out">
                      <div v-if="isShow">
                          <div><img id="img1" :src="recogonationImg" @click="recogonation"></div>
                          <!-- <div id="tianjia1">添加</div>
                          <div><img id="img2" :src="locationImg" @click="locationGPS"></div> -->
                      </div>
                      <div v-else>
                          <div id="tianjia2">添加</div>
                      </div>
                      
                  </div>
                  
              </div>

              <div class="buttonBoard">
                  <div class="btn1" id="confirm" @click="_submit">发布</div>
                  <div class="btn2">取消</div>
              </div>
              
          </div>
      </div>
      <!-- toast -->
      <mu-snackbar v-if="snackbar" :message="snackmsg" action="关闭" @actionClick="hideSnackbar" @close="hideSnackbar"/>
    </div>
</template>

<script>
import { _API } from '../../config';
import { local } from '../../ToolsFunc';
import Header from '../Header/Header';
import add from './img/tianjia.jpg'
import head_add from './img/head_tianjia.png'
import diliweizhi from './img/diliweizhi.png'
// import shibietu from './img/shibietu.png'
import shibietu from './img/addimg1.png'
import del from './img/delete.png'
import upload from './img/upload.png'
import uploadFiles from '../../assets/oss-lib/upload.js';
export default {
  data () {
    return {
      snackmsg: '恭喜！文件上传成功~',
      addImg: add,
      addImg1: head_add,
      addVideo: add,
      locationImg: diliweizhi,
      recogonationImg: shibietu,
      delImg: del,
      uploadImg: upload,
      projectName: '',
      ownerName: '',
      projectDes: '',
      linkUrl: '',
      linkDes: '',
      isCanBuy: false,
      isVideoUpload: false,
      is_VideoUpload: '0',
      isPurchase: '0',
      isShow: false,
      isNewProject: true,
      elementsList: [],
      addElementsList: [],
      elementIds:{
          list: []
      },
      snackbar: false,
      filename: '',
      msg: '',
      value: 0,
      isprogress: false,
      size: 4,
      videoName: '',
      videoNamePercent: 0,
      videoUrl: '',
      hasVideo: false,
      isBanner: false,
      is_Banner: '0',
      owner_url: ''
    }
  },
  created() {
    // 完成data数据初始化 $el 还未完成
     if(!local.get('token')){
      this.$router.push({ name: 'Login', params: { }, query: {}});
    }
  },
  mounted(){
    var vm = this;
    // 完成挂载
    
    if(this.$route.params.type == '0'){//由首页跳转
        this.isNewProject = this.$route.params.isNewProject;
        local.setObject('elementIds', vm.elementIds);
        if(!this.isNewProject)
            this.loadElements();
    }
    else{//由增加元素页面跳转或刷新
        console.log("111");
        this.isNewProject = false;
        this.elementIds = local.getObject('elementIds');
        if(this.$route.params.elementsid)
          this.elementIds.list.push(this.$route.params.elementsid);
        local.setObject('elementIds', vm.elementIds);
        //如果是新建工程，将之前填写的信息重新还原
        // if(local.get('projectId') == -1){
        //     this.addImg = local.get('projectCoverImg');
        //     this.projectName = local.get('projectName');
        //     this.projectDes = local.get('projectDes');
        //     if(local.get('isCanBuy')){
        //         this.isCanBuy = true;
        //         this.linkUrl = local.get('projectLinkUrl');
        //         this.linkDes = local.get('projectLinkDes');
        //     }
        // }
        if(local.get('projectId') != -1)
            this.loadElements();
        this.updateDisplay();        
    }
    uploadFiles('box', 'addImage', 'img_upload', 'image', fileload, fileadd, fileok);  
    function fileload(file){
        console.log("fileload");
    }
    function fileadd(file){
        console.log("fileadd");
        // 上传文件的本地文件名
        vm.filename = file.name;
        vm.addImg = window.URL.createObjectURL(file.getNative());
        local.set('projectCoverImg', vm.addImg);
    }
    function fileok(fileurl){
        console.log("fileok");
        // 上传好的图片URL地址
        local.remove('imgUrl');
        local.set('imgUrl', fileurl);
        console.log(local.get('imgUrl'));
        // vm.$layer.alert('图片上传成功');
        vm.showSnackbar();
    }

    uploadFiles('box1', 'addImage1', 'img_upload1', 'image', fileload1, fileadd1, fileok1);  
    function fileload1(file){
        console.log("fileload");
    }
    function fileadd1(file){
        console.log("fileadd");
        // 上传文件的本地文件名
        vm.addImg1 = window.URL.createObjectURL(file.getNative());
        local.set('userHeadImg', vm.addImg1);
    }
    function fileok1(fileurl){
        console.log("fileok1");
        // 上传好的图片URL地址
        local.remove('userHeadUrl');
        local.set('userHeadUrl', fileurl);
        vm.owner_url = fileurl;
        console.log(local.get('userHeadUrl'));
        // vm.$layer.alert('图片上传成功');
        vm.showSnackbar();
    }

    uploadFiles('box2', 'addVideo', 'video_upload', 'video', function(file){
      console.log("1234");
      vm.isprogress = true;
      // 上传进度
      // console.log(file.percent)
      vm.value = file.percent;
      if(vm.value == 100){
        vm.value = 0;
        vm.isprogress = false;
      }
      // 更新百分比
      vm.videoNamePercent = file.percent;
    }, function(file){
      vm.videoNamePercent = 0;
      vm.videoName = file.name;
      console.log(vm.videoName);
    }, function(fileurl){
      // vm.$layer.alert('视频上传成功');
      vm.showSnackbar();
      vm.videoUrl = fileurl;
      local.remove('videoUrl');
      local.set('videoUrl', fileurl);
      vm.hasVideo = true;
      console.log(vm.videoUrl)
    });


    // if(local.get('projectId') != -1)//已有工程
    //     this.loadElements();
    //update项目显示
    if(this.elementIds.list.length != 0){//如果elementIds.list有值，则显示
        this.loadAddElements();
    }
    
  },
  beforeDestroy(){
  },
  methods: {
    showSnackbar () {
      this.snackbar = true
      if (this.snackTimer) clearTimeout(this.snackTimer)
      this.snackTimer = setTimeout(() => { this.snackbar = false }, 2500)
    },
    hideSnackbar () {
      this.snackbar = false
      if (this.snackTimer) clearTimeout(this.snackTimer)
    },
      isCanPurchase(){
          if(this.isCanBuy)
          {
              this.isCanBuy = false;
              this.isPurchase = '0';
              document.getElementById("input1").readOnly=true;
              //document.getElementById("input2").readOnly=true;
              local.set('projectIsCanPurchase', false);
          }
          else
          {
              this.isCanBuy = true;
              this.isPurchase = '1';
              document.getElementById("input1").readOnly=false;
              //document.getElementById("input2").readOnly=false;
              local.set('projectIsCanPurchase', true);
          }

      },
      isCanUpload(){
          console.log("isCanUpload clicked");
          if(this.isVideoUpload)
          {
              this.isVideoUpload = false;
              this.is_VideoUpload = '0';
          }            
          else
          {
              this.isVideoUpload = true;
              this.is_VideoUpload = '1';
          }
          console.log(this.is_VideoUpload); 
      },
      isCanBanner(){
          console.log("isCanBanner clicked");
          if(this.isBanner)
          {
              this.isBanner = false;
              this.is_Banner = '0';
          }
            
          else 
          {
              this.isBanner = true;
              this.is_Banner = '1';
          }
          console.log(this.is_Banner);  
      },
      enter(){
          this.isShow = true;
      },
      out(){
          this.isShow = false;
      },
      recogonation(){
          local.set('projectName', this.projectName);
          local.set('projectDes', this.projectDes);
          local.set('projectLinkUrl', this.linkUrl);
          local.set('projectLinkDes', this.linkDes);
          local.set('authorName', this.ownerName);
          local.set('isVideoUpload', this.is_VideoUpload);
          local.set('videoName', this.videoName);
          local.set('isBanner', this.is_Banner);
          if(this.isNewProject)
            this.$router.push({ name: 'Addmaterial', params: {projectId: -1, type: 0}, query: {}});//type:0 识别图         
          else
            this.$router.push({ name: 'Addmaterial', params: {projectId: local.get('projectId'), type: 0}, query: {}});
      },
      locationGPS(){
          local.set('projectName', this.projectName);
          local.set('projectDes', this.projectDes);
          local.set('projectLinkUrl', this.linkUrl);
          local.set('projectLinkDes', this.linkDes);
          if(this.isNewProject)
            this.$router.push({ name: 'Addmaterial', params: {projectId: -1, type: 1}, query: {}});//type：1 地理位置
          else
            this.$router.push({ name: 'Addmaterial', params: {projectId: local.get('projectId'), type: 1}, query: {}});
      },
      loadElements(){
            console.log("loadElements");
            this.$layer.loading(1);
            var that = this;
            console.log(local.get('token'));
            console.log(local.get('projectId'));
            let params = {token: local.get('token'), id: local.get('projectId')};
            that.$axios.get(_API.getdetail, {params: params})
                .then((response) => {
                    let res = response.data;
                    console.log(res);
                    if(res.code == 200){
                        console.log(res.data);
                        that.addImg = res.data.background;
                        that.projectName = res.data.name;
                        that.projectDes = res.data.description;
                        that.addImg1 = res.data.author_img;
                        that.ownerName = res.data.author_username;
                        if(res.data.is_video == '1')
                        {
                            that.isVideoUpload = true;
                            that.is_VideoUpload = '1';
                            local.set('isVideoUpload', this.is_VideoUpload);
                        }                            
                        else
                        {
                            that.isVideoUpload = false;
                            that.is_VideoUpload = '0';
                            local.set('isVideoUpload', this.is_VideoUpload);
                        }                            
                        if(res.data.is_banner == '1')
                        {
                            that.isBanner = true;
                            that.is_Banner = '1';
                            local.set('isBanner', this.is_Banner);
                        }                            
                        else
                        {
                            that.isBanner = false;
                            that.is_Banner = '0';
                            local.set('isBanner', this.is_Banner);
                        }
                            

                        that.videoUrl = res.data.video_url;
                        if(res.data.pro_is_purchase == '1')
                        {
                            that.isCanBuy = true;
                            that.isPurchase = '1';
                        }
                            
                        else 
                        {
                            that.isCanBuy = false;
                            that.isPurchase = '0';
                        }
                        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");  
                        that.linkUrl = res.data.purchase_url;
                        //that.linkDes = res.data.purchase_desc;
                        that.elementsList = res.data.project_elements;
                        that.videoName = res.data.video_name;
                        that.owner_url = res.data.author_img;
                        //避免从增加元素页面跳回时已填写信息的丢失
                        that.updateDisplay();
                    } else{
                        that.$layer.alert(res.msg);
                    }
                    that.$layer.closeAll('loading');
                })
            .catch( (error) => {
            console.error('error：' + error);
            that.$layer.alert('网络错误');
            })          
      },
      loadAddElements(){
          this.$layer.loading(1);
            var that = this;
            let params = {token: local.get('token'), id: that.elementIds.list};
            that.$axios.get(_API.addElements, {params: params})
                .then((response) => {
                    let res = response.data;
                    if(res.code == 200){
                        that.addElementsList = res.data.project_elements;
                    } else{
                        that.$layer.alert(res.msg);
                    }
                    that.$layer.closeAll('loading');
                })
            .catch( (error) => {
            console.error('error：' + error);
            that.$layer.alert('网络错误');
            })          
      },
      _delete: function(e){
          console.log("_delete");
          let index = e.currentTarget.getAttribute('index');
          console.log("index="+index);
          console.log("elementsList="+this.elementsList);
          console.log("addElementsList="+this.addElementsList);
          //在elementsList和addElementsList中查找，有则删除
          this.removeByValue(this.elementsList, index);
          this.removeByValue(this.addElementsList, index);
          console.log("elementsList="+this.elementsList);
          console.log("addElementsList="+this.addElementsList);
        //   if(local.get('projectId') != -1)//已有工程
        //     this.loadElements();
        //   if(this.elementIds.list.length != 0){//如果elementIds.list有值，则显示
        //     this.loadAddElements();
        //   }
      },
      removeByValue(arr, val) {
        for(var i=0; i<arr.length; i++) {
            if(arr[i].id == val) {
            arr.splice(i, 1);
            break;
            }
        }
    },
    _submit(){
        let vm = this;
        console.log("44444444444444444444444444444444  "+ vm.elementIds.list);
        if(local.get('projectId') == -1){//新建工程
            console.log("111111111111111111111111111111111");
            let postDATA = {token: local.get('token'), author_img: vm.addImg1, author_username: vm.ownerName, back_url: local.get('imgUrl'), video_url: vm.videoUrl, name: vm.projectName, description: vm.projectDes, pro_is_purchase: vm.isPurchase, purchase_url: vm.linkUrl, purchase_desc: vm.linkDes, project_elements: vm.elementIds.list, is_banner: vm.is_Banner, is_video: vm.is_VideoUpload, video_name: vm.videoName};
            vm.$axios.post(_API.addProject, postDATA, {params: {}, transformRequest: function(data){return jQuery.param(data)}})
            .then((response) => {
                let res = response.data;
                if(res.code == 200){
                     console.log(res.msg);
                     vm.$layer.alert('保存成功');
                     this.$router.push({ name: 'Index', params: {}, query: {}});      
                } else{
                    console.log(res.msg);
                    vm.$layer.alert(res.msg);
                }
                vm.$layer.closeAll('loading');
            })
            .catch( (error) => {
                console.error('error：' + error);
                vm.$layer.alert('网络错误');
            })
        }
        else{//调用更新项目接口
            for(var i = 0; i < this.elementsList.length; ++i){
                this.elementIds.list.push(this.elementsList[i].id);
            }
            console.log(this.elementIds.list);
            console.log("is_Banner");
            console.log(vm.is_Banner);
            console.log("is_video");
            console.log(vm.is_VideoUpload);
            let postDATA = {id: local.get('projectId'), token: local.get('token'), author_img: vm.owner_url, author_username: vm.ownerName, back_url: local.get('imgUrl'), video_url: vm.videoUrl, name: vm.projectName, description: vm.projectDes, pro_is_purchase: vm.isPurchase, purchase_url: vm.linkUrl, purchase_desc: vm.linkDes, project_elements: vm.elementIds.list, is_banner: vm.is_Banner, is_video: vm.is_VideoUpload, video_name: vm.videoName};
            vm.$axios.post(_API.updateProject, postDATA, {params: {}, transformRequest: function(data){return jQuery.param(data)}})
            .then((response) => {
                let res = response.data;
                if(res.code == 200){
                    console.log(res.msg);
                    vm.$layer.alert('保存成功');
                    this.$router.push({ name: 'Index', params: {}, query: {}});   
                } else{
                    console.log(res.msg);
                    vm.$layer.alert(res.msg);
                }
                vm.$layer.closeAll('loading');
            })
            .catch( (error) => {
                console.error('error：' + error);
                vm.$layer.alert('网络错误');
            })
        }      
    },
    updateDisplay(){
        console.log("updateDisplay");
        if(local.get('projectCoverImg'))
          this.addImg = local.get('projectCoverImg');
        if(local.get('projectName'))
          this.projectName = local.get('projectName');
        
        if(local.get('userHeadUrl'))
          this.addImg1 = local.get('userHeadUrl');
        if(local.get('authorName'))
          this.ownerName = local.get('authorName');
        
        if(local.get('projectDes'))
          this.projectDes = local.get('projectDes');

        if(local.get('projectIsCanPurchase')){
          this.isCanBuy = local.get('projectIsCanPurchase');
          if(this.isCanBuy)
          {
              document.getElementById("input1").readOnly=false;
              this.isPurchase = '1';
              //document.getElementById("input2").readOnly=false;
          }
          else
          {
              document.getElementById("input1").readOnly=true;
              this.isPurchase = '0';
              //document.getElementById("input2").readOnly=true;
          }
        }

        if(local.get('projectLinkUrl'))
          this.linkUrl = local.get('projectLinkUrl');

        if(local.get('projectLinkDes'))
          this.linkDes = local.get('projectLinkDes');
        console.log("isBanner" + local.get('isBanner'));
        if(local.get('isBanner') == '1')
        {
            this.isBanner = true;
            this.is_Banner = '1';
        }            
        else
        {
            this.isBanner = false;     
            this.is_Banner = '0';
        }
                
              
        if(local.get('isVideoUpload') == '1')
        {
            this.isVideoUpload = true;
            this.is_VideoUpload = '1';
        }          
        else
        {
            this.isVideoUpload = false;
            this.is_VideoUpload = '0';
        }
          
        if(local.get('videoName'))
          this.videoName = local.get('videoName');
        if(local.get('videoUrl'))
          this.videoUrl = local.get('videoUrl');
        
        //将project相关的local清除
        local.remove('projectCoverImg');
        local.remove('projectName');
        local.remove('projectDes');
        local.remove('projectIsCanPurchase');
        local.remove('projectLinkUrl');
        local.remove('projectLinkDes');
        local.remove('userHeadUrl');
        local.remove('authorName');
        local.remove('isBanner');
        local.remove('videoName');
        local.remove('isVideoUpload');
    },
    jump(e){
        console.log("000000000000000000000");
        let index = e.currentTarget.getAttribute('index');
        console.log(index);
        this.$router.push({ name: 'Addmaterial', params: {ItemId: index}, query: {}});
    }

  },
  components: {
      Header
  }
}
</script>

<style lang="scss" scoped>
  @import './NewProject.scss'
</style>
