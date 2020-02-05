<template>
    <div>
        <div>探索/新建项目/添加素材</div>
        <div>识别物<input type="file"/></div>
    </div>
</template>

<script>
import { _API } from '../../config.js';
import { local } from '../../ToolsFunc';
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
      let params = {token: local.get('token'), page: '1'};
      that.$axios.get(_API.index, {params: params})
        .then((response) => {
            let res = response.data;
            if(res.code == 200){
              that.list = res.data.list;
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
  }
}
</script>

<style lang="scss" scoped>
  @import './Index.scss';
</style>
