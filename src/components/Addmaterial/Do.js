/*
* @Author: guhang
* @Date:   2018-01-08 17:05:07
* @Last Modified by:   guhang
* @Last Modified time: 2018-03-05 11:52:25
*/

import uploadFiles from '../../assets/oss-lib/upload.js';
import { _API } from '../../config.js';
import { local, getBase64Image } from '../../ToolsFunc';
import Header from '../Header/Header';
import back from './img/back.svg';
import scan from './img/scan.svg';
import menu from './img/menu.svg';
import sel0 from './img/sel0.png';
import sel1 from './img/sel1.png';
import xuanzebtn from './img/xuanzebtn.png';
import uploadfilebtn from './img/uploadfilebtn.png';
import addassets from './img/addassets.png';
import uploadbtnsmall from './img/uploadbtn-small.png';
const E = require('wangeditor');

export default {
  name: 'addproject',
  data () {
    return {
      E: E,
      back: back,
      scan: scan,
      menu: menu,
      sel0: sel0,
      sel1: sel1,
      xuanzebtn: xuanzebtn,
      uploadfilebtn: uploadfilebtn,
      addassets: addassets,
      uploadbtnsmall: uploadbtnsmall,
      dialog: false,
      msg: '',
      size: 4,
      value: 0,
      isprogress: false,
      snackbar: false,
      filename: '',
      shibiewu: false,
      iosZipName: '',
      iosZipNamePercent: 0,
      androidZipName: '',
      androidZipNamePercent: 0,
      videoName: '',
      videoNamePercent: 0,
      dili: false,
      content0: false,
      content1: false,
      content2: true,
      shibietuUrl_: '',
      diliName_: '',
      diliLnglat_: '',
      inputhtml_: '',
      buylink_: '',
      selbuylink_: false,
      sellook_: false,
      ioszipUrl_: '',
      androidzipUrl_: '',
      videoUrl_: ''
    }
  },
  created() {
    // 完成data数据初始化 $el 还未完成
    // if(!local.get('token')){
    //   this.$router.push({ name: 'Login', params: { }, query: {}});
    // }
    let vm =  this;
    console.log(vm.$route.params);
    if(vm.$route.params.type == 1){
      vm.dili = true;
      vm.shibiewu = false;
    } else{
      // 默认识别图
      vm.shibiewu = true;
      vm.dili = false;
    }
  },
  beforeDestroy(){
    jQuery('#list-ctrl li').off('click');
  },
  beforeUpdate(){

  },
  updated(){

  },
  mounted(){
    // 完成挂载
    // 获取路由参数
    let vm = this;
    // console.log(vm.$route);
    // params{container, selDom, uploadDom, fileType, fileProgress, fileAdding, fileUploadSuccess}
    // 识别图上传
    uploadFiles('upload-box', 'xuanzebtn', 'uploadbtn', 'image', fileload, fileadd, fileok, true);
    function fileadd(file){
        // 上传文件的本地文件名
        vm.filename = file.name;
        console.log(file.name)
        // console.log(file.getNative())
        vm.xuanzebtn = window.URL.createObjectURL(file.getNative());

        let imgObj = new Image; 
        imgObj.src = vm.xuanzebtn; 
        imgObj.onload =function() { 
            var base64Data = getBase64Image(imgObj); 
            //console.log(base64Data); 
        }
    }
    function fileok(fileurl){
        // 上传好的图片URL地址
        // console.log(fileurl)
        vm.xuanzebtn = fileurl;
        vm.msg = `恭喜！"${vm.filename}"上传成功！`;
        vm.showSnackbar();
        vm.shibietuUrl_ = fileurl;
    }
    function fileload(file){
        vm.isprogress = true;
        // 上传进度
        // console.log(file.percent)
        vm.value = file.percent;
        if(vm.value == 100){
          vm.value = 0;
          vm.isprogress = false;
        }
    }

    // ios zip upload
    uploadFiles('up-group-ios', 'sel-ios', 'upload-ios', '3d', function(file){
      vm.isprogress = true;
      // 上传进度
      // console.log(file.percent)
      vm.value = file.percent;
      if(vm.value == 100){
        vm.value = 0;
        vm.isprogress = false;
      }
      // 更新百分比
      vm.iosZipNamePercent = file.percent;
    }, function(file){
      vm.iosZipNamePercent = 0;
      vm.iosZipName = file.name;
    }, function(fileurl){
      vm.msg = `恭喜！"${vm.iosZipName}"上传成功！`;
      vm.showSnackbar();
      vm.ioszipUrl_ = fileurl;
    });

    // android zip upload
    uploadFiles('up-group-android', 'sel-android', 'upload-android', '3d', function(file){
      vm.isprogress = true;
      // 上传进度
      // console.log(file.percent)
      vm.value = file.percent;
      if(vm.value == 100){
        vm.value = 0;
        vm.isprogress = false;
      }
      // 更新百分比
      vm.androidZipNamePercent = file.percent;
    }, function(file){
      vm.androidZipNamePercent = 0;
      vm.androidZipName = file.name;
    }, function(fileurl){
      vm.msg = `恭喜！"${vm.androidZipName}"上传成功！`;
      vm.showSnackbar();
      vm.androidzipUrl_ = fileurl;
    });

    // video upload
    uploadFiles('up-group-video', 'sel-video', 'upload-video', 'video', function(file){
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
    }, function(fileurl){
      vm.msg = `恭喜！"${vm.videoName}"上传成功！`;
      vm.showSnackbar();
      vm.videoUrl_ = fileurl;
      console.log(vm.videoUrl_)
    });
    
    jQuery('#list-ctrl li').on('click', function(){
      let _index = jQuery(this).index();
      // console.log(_index)
      switch(_index){
        case 0:
          vm.content0 = true;
          vm.content1 = false;
          vm.content2 = false;
          break;
        case 1:
          vm.content0 = false;
          vm.content1 = true;
          vm.content2 = false;
          break;
        case 2:
          vm.content0 = false;
          vm.content1 = false;
          vm.content2 = true;
          break;
      }
      jQuery(this).addClass('active').siblings().removeClass('active');
      jQuery('#list-ctrl li .selicon').attr('src', vm.sel0);
      jQuery(this).find('.selicon').attr('src', vm.sel1);
    })
    vm.initEditor();
  },
  methods: {
    open () {
      this.dialog = true
    },
    close () {
      this.dialog = false
    },
    showSnackbar () {
      this.snackbar = true
      if (this.snackTimer) clearTimeout(this.snackTimer)
      this.snackTimer = setTimeout(() => { this.snackbar = false }, 2500)
    },
    hideSnackbar () {
      this.snackbar = false
      if (this.snackTimer) clearTimeout(this.snackTimer)
    },
    getThisPageData(){
      this.$layer.loading(1);
      let vm = this;
      var calc_result_type = 3;

      if(vm.content0){
        calc_result_type = 1;
      }
      if(vm.content1){
        calc_result_type = 2;
      }
      if(vm.content2){
        calc_result_type = 3;
      }

      let postDATA = {
        token: local.get('token'),
        type: vm.shibiewu ? 1 : 2,
        result_type: calc_result_type,
        recognition_img: vm.shibietuUrl_,
        video_url: vm.videoUrl_,
        android: vm.androidzipUrl_,
        ios: vm.ioszipUrl_,
        content: vm.inputhtml_,
        location_name: vm.diliName_,
        location_coordinate: vm.diliLnglat_,
        purchase_elements_url: vm.buylink_,
        is_purchase: vm.selbuylink_ ? 1 : 0,
        is_send: vm.sellook_ ? 1 : 0
      };

      vm.$axios.post( _API.add, postDATA, {params: {}, transformRequest: function(data){return jQuery.param(data)}} )
        .then( (response) => {
          let res = response.data;
          if(res.code == 200){
            vm.$router.push({ name: 'NewProject', params: { elementsid: res.data.id }, query: {}});
          } else{
            vm.msg = res.msg;
            vm.open();
          }
          vm.$layer.closeAll('loading');
        })
        .catch( (error) => {
          vm.$layer.closeAll('loading');
          console.error('error：' + error);
          vm.msg = '网络错误';
          vm.open();
        });
    },
    initEditor(){
      let vm = this;
      let editor = new this.E('#e-menu', '#e-content'); // 分离式
      //let editor = new E('#editor');
      // 自定义菜单配置
      editor.customConfig.menus = [
          'head',  // 标题
          'bold',  // 粗体
          'italic',  // 斜体
          'underline',  // 下划线
          'strikeThrough',  // 删除线
          'foreColor',  // 文字颜色
          'backColor',  // 背景颜色
          'link',  // 插入链接
          'list',  // 列表
          'justify',  // 对齐方式
          'quote',  // 引用
          'emoticon',  // 表情
          'image',  // 插入图片
          'table',  // 表格
          'video',  // 插入视频
          'code',  // 插入代码
          'undo',  // 撤销
          'redo'  // 重复
      ];
      editor.customConfig.menus = [
          'image',  // 插入图片
          'undo',  // 撤销
          'redo'  // 重复
      ];
      // 将图片大小限制为 2M
      editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024;
      // 限制一次最多上传 1 张图片
      editor.customConfig.uploadImgMaxLength = 1;
      editor.customConfig.uploadImgParams = {
          from: 'wangEditor',   // 属性值会自动进行 encode ，此处无需 encode
          type: 'image'
      };
      editor.customConfig.uploadFileName = 'file';
      // 将 timeout 时间改为 6s
      editor.customConfig.uploadImgTimeout = 10000;
      editor.customConfig.uploadImgServer = 'https://api.arseeds.com/explore2/img-show/upload';
      //editor.customConfig.uploadImgServer = 'https://rexhang.com/file_upload/file2.php';
      editor.customConfig.uploadImgHooks = {
          before: function (xhr, editor, files) {
              // 图片上传之前触发
              // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
              vm.$layer.loading(1);
          },
          success: function (xhr, editor, result) {
              // 图片上传并返回结果，图片插入成功之后触发
              // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
              vm.$layer.closeAll('loading');
          },
          fail: function (xhr, editor, result) {
              // 图片上传并返回结果，但图片插入错误时触发
              // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
              vm.$layer.closeAll('loading');
          },
          error: function (xhr, editor) {
              // 图片上传出错时触发
              // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
              vm.$layer.closeAll('loading');
          },
          timeout: function (xhr, editor) {
              // 图片上传超时时触发
              // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
              vm.$layer.closeAll('loading');
          },
          // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
          customInsert: function (insertImg, result, editor) {
              var url = result.data.file_url;
              insertImg(url)
          }
      };
      // 文本改变触发事件
      editor.customConfig.onchange = function (html) {
          // html 即变化之后的内容
          console.log(html)
          vm.inputhtml_ = html;
      }
      editor.create();
      // 设置内容
      editor.txt.html(vm.inputhtml_);
      // 获取文本内容
      // console.log(editor.txt.html());
      
      // 禁止粘贴
      jQuery("#e-content div[contenteditable='true']").on('paste', function(){
          alert('不允许粘贴！！！');
          editor.txt.html('<p><br></p>');
      });
      /*更多配置查看 https://www.kancloud.cn/wangfupeng/wangeditor3/332599*/
    }
  },
  components: {
      Header
  }
}