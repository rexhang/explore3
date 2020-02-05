/*
* @Author: guhang
* @Date:   2018-03-01 11:59:15
 * @Last Modified by: rexhang
 * @Last Modified time: 2018-03-09 16:56:46
*/

import uploadFiles from '../../assets/oss-lib/upload.js';
import { _API } from '../../config.js';
import { local, getBase64Image } from '../../ToolsFunc';
import Header from '../Header/Header';
import defs from './img/defs.jpg';


const defines = new Object;
defines.bannerData = [];
for(let i = 0;i < 4;i++){
    let objs = {};
    objs.img_url = '';
    objs.img = defs;
    defines.bannerData.push(objs);
}

export default {
  name: 'banner',
  data () {
    return {
      bannerData: defines.bannerData,
      msg: '',
      dialog: false
    }
  },
  created() {
  	let that = this;
    // 完成data数据初始化 $el 还未完成
    // 获取数据
    let postDATA = {};
    that.$axios.get(_API.getBanner, {params: {}})
        .then((response) => {
            let res = response.data;
            if(res.code == 200){
                that.bannerData = res.data;
            }
        })
        .catch( (error) => {
          console.error(error);
        });

    
    

  },
  beforeDestroy(){
    
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
    
  },
  methods: {
    open: function() {
      this.dialog = true
    },
    close: function() {
      this.dialog = false
    },
    /* 保存单条数据 */
    savebanner: function(id){
        let that = this;
        let postDATA = {
            id: id,
            img: that.bannerData[id-1].img,
            img_url: that.bannerData[id-1].img_url,
            type: 1
        };
        that.$axios.post( _API.saveBanner, postDATA, {params: {}, transformRequest: function(data){return jQuery.param(data)}} )
        .then( (response) => {
            if(response.data.code == 200){
                // 无需刷新路由
                that.msg = '保存成功!';
                that.open();
            }
        })
        .catch( (error) => {
          console.error(error);
        });
    },
    /* 更换图片 */
    changeimg: function (id, $event) {
        let that = this;
        console.log(id, $event.target);
        var uploadData = new FormData(); // 发送的数据对象
        uploadData.append('type', 'image');
        uploadData.append('file', $event.target.files[0]);
        /* uploadData.append('is_recognition', '1'); */
        /* uploadData.append('x', 0);
        uploadData.append('y', 0);
        uploadData.append('w', 750);
        uploadData.append('h', 354); */
        jQuery.ajax({
            url: _API.uploadimg,
            type: 'post',
            dataType: 'json',
            data: uploadData,
            async: true,
            cache: false,
            contentType: false,
            processData: false,
            success: function(data) {
                if(data.code == 200){
                    let fileUrl = data.data.file_url;
                    that.bannerData[id-1]['img'] = fileUrl;
                } else{
                    layer.closeAll('loading');
                }
            },
            error: function(err) {
                console.log('api连接错误');
            }
        });
    }
  },
  components: {
      Header
  }
}