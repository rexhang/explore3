<template>
    <div id="Index" class="index">
        <Header></Header>
        <div class="about-container-style">
            <h1>识别图应避免的几种情况</h1>
            <div class="list-containers-style">
                <div v-for="item in list" class="list-about">
                    <img :src="item.img" width='250px'/>
                    <p style="font-weight: 900;line-height: 30px;">{{ item.title }}</p>
                    <p style="line-height: 25px;">{{ item.desc }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { _API } from '../../config.js';
import { local } from '../../ToolsFunc';
import Header from '../Header/Header';
export default {
  name: 'index',
  data () {
    return {
      msg: 'index',
      list: []
    }
  },
  created() {
    // 完成data数据初始化 $el 还未完成
    if(!local.get('token')){
      this.$router.push({ name: 'Login', params: { }, query: {}});
    }
  },
  mounted(){
    // 完成挂载
    // 获取路由参数
    console.log(this.$route);
    this.$layer.loading(1);
    this.getIndexData();
  },
  methods: {
    getIndexData (){
      var that = this;
      let params = {token: local.get('token')};
      that.$axios.get(_API.aboutView, {params: params})
        .then((response) => {
            let res = response.data;
            if(res.code == 200){
              that.list = res.data;
              console.log(that.list);
            } else{
              that.$layer.alert(res.msg);
            }
            that.$layer.closeAll('loading');
        })
        .catch( (error) => {
          console.error('error：' + error);
          that.$layer.alert('网络错误');
        })
    }
  },
  components: {
      Header
  }
}
</script>

<style lang="scss" scoped>
  @import './Index.scss';
</style>
