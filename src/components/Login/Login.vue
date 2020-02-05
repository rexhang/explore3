<template>
      <div id="login" class="login">
      <div class="tou">
       <img id="img1" src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAACb1JREFUaAXVWntwVNUZ/91795XdzTtBEvMAkpDQDlgg4KsFqwKDgoIyBVuRtjO1WsTXOKUiM0UxVMAOtkqhrQMK6EyrLcJYW6CWxx88puFpkQQ1GEkISUggye4m+7q333fCLpe9u5vshsF4Zjb35JzvnPO9zvd95ztHQpxyrKJipCRJ49q8/u+q0ObIkqRIgBZnyDXrokWkoKYFFEl+L9ti2q9p2pHv1NScjrUA4WUsRMBUScMzmiRNMgN2IgZ+7brgb0DGTGsTEfADbsJpnypjzdhTp3ZFAl5FSHX+eLuU6lpthvSYIkmyjyb4etCPRJPEQ00WIoqkpAYk/KGx07F45rnDnhBkmJDq/Hy7nJr+rl2W7u9WSZFCEIPsywinyDLcqvaB1tXxo8pz5wQxcghPyZm2ionwDGIiGFdmMOPokKVZcKa9EsafK4fLy+8kddoVBOTBKokQwqEvS4akEFQl3D22pmYPI06aJz+nyPI1J0ILBqF6vVC7u3t/PT3QfD5oxNGBFma4WZYVmuk5QUN1aWmJbDKdIItg71Ma8SwXsUMUgmHkJbMZ1sIC2EpKYB46FLLFiqDbBV9DA3q++AL+5mYClyBZLL3jkvjLKxLObgXaaBMUZZwVkt3b1/YmLjJywnzoF5VkSLT5GHnmtmSzIWv2LGTPeRCOm26C4kzVQ4u6v7UVXQcOoO0vf0XXwYOkIzSHohjg+mpgxlslyeEFxpnIP5TRxiHSYstDIyQzZ87E0CcWXkUI8ROq34eGqhXo3LsPzgkTULDkefGNh4Q5NxdZ992HrBkz0L59OxpXrYL/fHNS0iEnTRtFHWFq9Pq+nW43xVtX6DSrSMrIkQa4hhVExO49QgJFVS9DSU0zwMRsIElkzZoF++jROPPUU+g++SkkqzUmeKyOC35/nqxqIH3pu/DGjSxtf3sf519/g6Q1A8WrVydGhG4yZlLJ+vWwjhgBzU8+PMES0DRFKFWC4wQ4b9bGlathG1mGoqoqyDE4qXo86K6pgfvIEfScOYNoDOEJLQUFKP7NCsg2kkgcNY+Fa3ydijWK2lvfeQe+r75CyZ//BHNOjgEy6HKhZeNGtG/bBv+5JmiBABkCK1mxUuTOfxjZs2cLw68f6Jw4Edlz56Jlw0YiyKbv6rOeFCHBri60/30rHJXjkTFtmmERf/N51C16Eq4DB4XOC4tE+0Hz+uA5fhxfHj0KV3U1ipYtM2zwIQsWoH3rVqiebgOhhoV0DeEQRdfWZ9V97Bh66uqQSVYn0g+wjtc/vwSug4cgOxyQTMSrkI+hL8Mzty9s3oLz69YZ1rIWF8N5881QyZQnUpIjhDjKCKbecothrUsf/xsd/9kN2W439Okb5JQUUr234K2v1zeLeuqttwIJev+kCGHPbMrKFBs0EotLH/0rsin6/6RqgfZ2dOzZY+hPKSvtdb6GntgNSRESuHhRmFqFVEdf2CJ5678kL93PrUeq1vP55/opRF3JyOwlJAHrlRQhwjyG9F6PBi0sAsLLYZe+K2qd4aKokBje3zkuT5wUIUp6OoKuLhHR6hHkfWMlf6AFA/rm2HXyxtbhww39gY4OitvIMUZjlgG6tyEpQmzDhpF+X4Sv6Zxh2vQpU4jLseO28ACSnpKWhvTJk8NNoQrvwUQ9fFKEOMaOJZ/gheu/1aG1w9/M6dPJfE40SCsMcLkSJI+fM/cHsJWVRXaFI2JDR5yG5AgZNw6WwkJc/PBDQ8jBZrV45UqkVFSQU/MYDlHs4bk9a8a9yH/2WQNqvsZG4UhlPjIkUJIixJSZiSwK67vIc3fu3WtYzkZ6X7Z5E3J/vACmzAwRnvB5hTe2tagQBUtfwPDfvSYcZuTg1i1b4G+7IM4okX3x/u+nnTROkbvgEbS9/x4aV78qzh9K6tUHKPOQISh66SXkLVokTCwbB3N2jggyox22eAX3iRMihosVgBqxuNKSlER4uLWoCHlPPy2i2oblywW3r0x7pcaHKPbUGVOmwkEqGYsIVqn6xb+C6qbsDp06Ey1JS4QXyn1kPgWBxMW3N0FOsaPghSWG2Ku/CPmamoTkRGzW30E6uMRJ1w1mD15YtVyc8popAKx79Ofo+ewzHUT/q87KSmQ/+ABUyrQkUwZECC+oOJwYRht36JOLRLB4evYDaHy5io6tJ8UmTwSpoQsXgvdWMumiAalWCEkOywuWLkXapElofmMtWtb/ERfocGQbVYGUb42COT9fpIMCXZ3oJollTLkbOfMeCg0Pf61k0of89CdofGUlJDLjiZRrQkhoQSYk9fbb4Tp0CB07d8JNDrNjxy7KZ7l7uWw2CSl1/+8k0u74PiyU74osufPn06lyu1BRkX6KBIjx/zUlhNfg02DqbbeJH0fDgfY2BDs6BQEsOc8nn6DusV+A91Thiy8a0FKcTuSRmp55YpGhL17DgPdIvMmZKHPuENhKS4Wnt1KMxvmxzPtn4sKWd8lvHI86nI/PaXdMFkm/qABRGgcsEQ7u+JSnqZwukqIsEdFEIBlTp+LSP3egac1rKHnzTUOWkRmQTz6KVVQL0Lz9iIIHTEgHhSh1ZG1kUwKxkUIpUsqocHby0o4dyLznnghq6ZpszBhK+s1By1tvk4/qe+MPWLVU3sg9lPelYLDfP8qmhA5nTb9/nc42LgMh3HDD44/DQhYvVi5MP2jAhAixc5qPxZ/Ij7Bgq9R96hRaN2/W4xSus1W74dGfieR4uDFGRdyPxOi7Ls0cILZs2ADv2bNR18uZN4+y+mP6PGjJxMzEk61Rl0yykbIp/pZWnF+7NuoEvD/yKMEdb8ObJCko51nMn/bD1lAeK/r9hXBa/TjZRsXyciP7l/YPtonsYzS49LvuomTgvTHNcY7Z3GSyyvLpvu5wOSLt2r8flhtvNHCmc/dug/mMhkzcNtpbbMbP/nqZyAtHZi/ZqnPCjy+UIsvlS7wzUu/Vm5mu3rS4V28hixQ5Edv8REKJyPH6/2OtwTDR1mGy6FGDO6AGx9DVIaSj5aP+YZOl6T1Rckz6hQZb3UYS6lGDH42trZ0h7kcCWvC3dFlCN73fnMK4BlQtSKr1KtU1oXQTT5/+2A9tHb8o+KYUxpXuP9dV1tbuZpzDmGsOxy/pRcF2OwEMZskwboyjR9W2aa7OxSHGhwmpPHzYozodDxHAOnpQo9G176AiiAlgnOidldqtqWvVLvsPQ+9QmJiozD9cUTGNvMYz1P09CgXFRQe/FPo6ipUyKvxGiby2hyzrPk3CGnq3tTMSl6iEhICOl5eXq5I0/mIgcCc9KniYnz7RgOtDESmEnzazT8OmbLOyhxh5ZEJtbW0It8jv/wFLf54MdCdD5QAAAABJRU5ErkJggg==' class="img1"> 
      </div>

      <div id="divU" class="divU rex-cf">
        <img id="divUImg" :src='divUImg' class="img2">
        <input type="text" id="User1" placeholder="请输入用户名" autofocus v-model="username">
      </div> 

      <div id="divP" class="divP rex-cf">
        <img id="divUImg" :src='divPImg' class="img2">      
        <input type="password" placeholder="请输入密码" id="Pass1" v-model="password" @keypress="keycode" />
      </div>

      <div id="divB"><br>
        <mu-raised-button type="button" label="登 录" id="login" primary @click="loginin()"  />
      </div>

      <div open="dialog" class="dialog1">
        {{msg400}}
      </div>
    </div>

</template>

<script>
import { _API } from '../../config';
import { local } from '../../ToolsFunc';
import divU from './img/user.svg'
import divP from './img/password.svg'

export default {
  name: 'login',
  data () {
    return {
      divUImg:divU,
      divPImg:divP,
      msg: 'login',
      username: '',
      password: '',
      dialog: false,
      msg400: ''

    }
  },
  created() {
    // 完成data数据初始化 $el 还未完成
  },
  mounted(){
    // 完成挂载

  },
  beforeDestroy(){
  },
  methods: {
    open () {
      this.dialog = true
    },

    loginin (){
      // post方法 请求 接口 进行 登录
      let that = this;
      this.$layer.loading(1);
      let postDATA = {username: that.username, password: that.password};
      that.$axios.post( _API.login, postDATA, {params: {}, transformRequest: function(data){return jQuery.param(data)}} )
        .then( (response) => {
          let res = response.data;
          if(res.code == 200){
            local.set('token', res.data.token);
            // 去主页
            that.$router.push({ name: 'Index', params: { username: that.username }, query: {}});
          }else{
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

    keycode (e) { 
        if(e.keyCode ==13) 
        this.loginin(); 
    } 

  }
}
</script>

<style lang="scss" scoped>
  @import './Login.scss'
</style>
