<template>
    <div class="header">
        <img class="logo" :src="logoImg" @click="indexs" title="回到主页">
        <div class="span">
            <span class="span1">云平台</span>
        </div>        
        <img class="headUrl" :src="head_url" @click="setting" title="个人设置">
        <mu-dialog :open="dialog" title="提示">
            {{msg400}}
            <mu-flat-button label="确定" slot="actions" primary @click="close"/>
        </mu-dialog>
    </div>
</template>

<script>
import { _API } from '../../config.js';
import { local } from '../../ToolsFunc';
import logo from '@/assets/logo.png';
export default {
  data () {
    return {
      logoImg: logo,
      head_url: '',
      nickName: '',
      dialog: false,
      msg400: '',
    }
  },
  created() {
    if(!local.get('token')){
      this.$router.push({ name: 'Login', params: { }, query: {}});
    }
  },
  mounted(){
    this.getUserData();
  },
  methods: {
      open () {
        this.dialog = true
        },
      close () {
        this.dialog = false
        },
      getUserData(){
            let that = this;
            this.$layer.loading(1);
            let postDATA = {token: local.get('token'), head_img: "", nick_name: "", update: 0};
            that.$axios.post( _API.admin, postDATA, {params: {}, transformRequest: function(data){return jQuery.param(data)}} )
                .then( (response) => {
                    let res = response.data;
                    if(res.code == 200){
                        this.head_url = res.data.head_img;
                        this.nickName = res.data.nick_name;
                    } else{
                        // that.$layer.alert(res.msg);
                        that.msg400 = res.msg;
                        that.open();
                    }
                    that.$layer.closeAll('loading');
                })
                .catch( (error) => {
                    console.error('error：' + error);
                    // that.$layer.alert('网络错误');
                    that.msg400 = '网络错误';
                    that.open();
                });
      },
      setting(){
          this.$router.push({ name: 'Setting',params: {}, query: {}});
      },
      indexs(){
          this.$router.push({ name: 'Index',params: {}, query: {}});
      }
  }
}
</script>

<style lang="scss" scoped>
   @import './Header.scss'
</style>
