<template>
    <div id="Index" class="index">
        <Header></Header>
        <div class="board rex-cf" id="board">
          <div class="img" @click="NewProject">
            <img class="pic" :src="addImg" />
          </div>
          <div class="card" v-for="item in list" >
            <img class="pic" :src="item.back_img">
            <div class="name">{{item.name}}</div>
            <div class="panel">
              <!-- <img id="img1" :src="searchImg"> -->
              <!-- <span>{{item.view_num}}次</span> -->
              <img id="img2" :index="item.id" :src="bianjiImg" @click="edit($event)" title="edit" />
              <img id="img3" :index="item.id" :src="delImg" @click="_delete($event)" title="delete" />
            </div>
          </div>
        </div>
        <div v-show="isHadMore" class="loadMore" @click="loadMore">点击加载更多···</div>
        <!-- <div v-show="isEnd" class="loadMore">已经是最后了</div> -->
    </div>
</template>

<script>
import { _API } from '../../config.js';
import { local } from '../../ToolsFunc';
import Header from '../Header/Header';
import search from './img/search.png';
import bianji from './img/bianji.png';
import del from './img/del.png';
import add from './img/tianjia.png'
export default {
  name: 'index',
  data () {
    return {
      msg: 'index',
      list: [],
      searchImg: search,
      bianjiImg: bianji,
      delImg: del,
      addImg: add,
      background: {
          // backgroundImage: 'url('+ add+ ')',
      },
      page: 1,
      isHadMore: false,
      isEnd: false
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
      let params = {token: local.get('token'), page: that.page};
      that.$axios.get(_API.index, {params: params})
        .then((response) => {
            let res = response.data;
            if(res.code == 200){
                that.list = res.data.list.reverse();
                if(res.data.total >= res.data.page * res.data.limit)
                {
                    this.isHadMore = true;
                }
                else{
                    this.isHadMore = false;
                    this.isEnd = true; 
                }
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
    edit(){

    },
    _delete: function(e){
      //询问框
      let index = e.currentTarget.getAttribute('index');
      let that = this;
      let layerIndex =  this.$layer.confirm('是否删除？', {
         btn: ['确定','取消'] //按钮
      }, function(){  
        that.$layer.close(layerIndex);
        that.$layer.loading(1);
        let postDATA = {token: local.get('token'), id: index};
        that.$axios.post( _API.deleteProject, postDATA, {params: {}, transformRequest: function(data){return jQuery.param(data)}} )
            .then( (response) => {
                let res = response.data;
                if(res.code == 200){
                    console.log("删除成功");
                    that.getIndexData();
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
      }, function(){
        that.$layer.close(layerIndex);
      });
      

    },
    NewProject(){
      local.remove('elementIds');
      local.remove('projectId');
      local.set('projectId', -1);
      this.$router.push({ name: 'NewProject',params: {type: '0', isNewProject: true}, query: {}});//type：0表示从首页跳转 type：1表示从增加元素页面跳转
    },
    edit: function(e){
      local.remove('elementIds');
      local.remove('projectId');
      let index = e.currentTarget.getAttribute('index');
      local.set('projectId', index);
      this.$router.push({ name: 'NewProject',params: {type: '0', isNewProject: false, projectId: index}, query: {}});//type：0表示从首页跳转 type：1表示从增加元素页面跳转
    },
    loadMore(){
        var that = this;
        let params = {token: local.get('token'), page: ++that.page};
        that.$axios.get(_API.index, {params: params})
          .then((response) => {
              let res = response.data;
              if(res.code == 200){
                  that.list = that.list.concat(res.data.list).reverse();
                  this.bottom();
                  document.scrollingElement.scrollTop = document.scrollingElement.scrollHeight;
                  if(res.data.total >= res.data.page * res.data.limit)
                  {
                      this.isHadMore = true;
                  }
                  else{
                      this.isHadMore = false;
                      this.isEnd = true;
                  }
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
    bottom(){
      this.$nextTick(function(){
          console.log("nextTick");
        var div = document.getElementById('board');
        //div.scrollTop = div.scrollHeight;
        console.log(div.scrollHeight);
        div.scrollTop = 5000;
      })
    }
  },
  computed: {
    // 倒序数组
    reversedMessage: function (arr) {
      
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
