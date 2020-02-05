<template>
    <div id="setting" class="setting">
        <Header></Header>
        <div class="recongnite-style">
            <p class='recong-title'>探索  /  资料设置</p>
            <div style="text-align:left">
                <div class="userInfo-details">
                    <p style="margin-top: 30px;">头&nbsp;&nbsp;像： <img :src="head_img" width="50px"/></p>
                    <p>昵&nbsp;&nbsp;称：
                        <mu-text-field hintText="昵称" labelClass="whitecolor" v-model="nickName"/>
                        <br/></p>
                    <p>账&nbsp;&nbsp;号：
                        <mu-text-field hintText="账号" v-model="userName" disabled/>
                        <br/></p>
                    <p>密&nbsp;&nbsp;码：
                        <mu-text-field hintText="密码" v-model="initpassword"/>
                        <span class="change-pwd" @click="clickShow()">修改</span><br/></p>
                    <p class="new_pwd" style="display: none;">新&nbsp;&nbsp;密&nbsp;&nbsp;码：
                        <mu-text-field hintText="新密码" v-model="newpwd"/>
                    </p>
                    <p class="new_confirm" style="display: none;">确认密码：
                        <mu-text-field hintText="确认密码" v-model="newconfirmpwd"/>
                    </p>
                    <p>
                        <mu-raised-button @click="updateIndexData();" label="修改" class="demo-raised-button" primary/>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {_API} from '../../config.js';
    import {local} from '../../ToolsFunc';
    import Header from '../Header/Header';
    export default {
        name: 'index',
        data () {
            return {
                msg: 'index',
                head_img: '',
                nickName: '',
                userName: '',
                initpassword: '',
                newpwd: '',
                newconfirmpwd: '',
            }
        },
        created() {
            // 完成data数据初始化 $el 还未完成
            if (!local.get('token')) {
                this.$router.push({name: 'Login', params: {}, query: {}});
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
                let postDATA = {
                    token: local.get('token'),
                    update: 0
                };
                that.$axios.post(_API.admin, postDATA, {
                    params: {}, transformRequest: function (data) {
                        return jQuery.param(data)
                    }
                })
                    .then((response) => {
                        let res = response.data;
                        console.log(res);
                        if (res.code == 200) {
                            this.head_img = res.data.head_img;
                            this.nickName = res.data.nick_name;
                            this.userName = res.data.username;
                        } else {
                            // that.$layer.alert(res.msg);
                            that.msg400 = res.msg;
                            that.open();
                        }
                        that.$layer.closeAll('loading');
                    })
                    .catch((error) => {
                        console.error('error：' + error);
                        // that.$layer.alert('网络错误');
                        that.msg400 = '网络错误';
                        that.open();
                    });
            },
            updateIndexData(){
                var that = this;
                let postDATA = {
                    token: local.get('token'),
                    head_img: this.head_img,
                    nick_name: this.nickName,
                    initpassword: this.initpassword,
                    newpwd: this.newpwd,
                    newconfirmpwd: this.newconfirmpwd,
                    update: 1
                };

                if (this.nickName == '') {
                    alert('用户昵称不能为空');
                    return false;
                }
                if (this.initpassword != '') {
                    if (this.newpwd == '') {
                        alert('新密码不能为空');
                        return false;
                    }
                    if (this.newconfirmpwd == '') {
                        alert('确认密码不能为空');
                        return false;
                    }
                    if (this.newpwd != this.newconfirmpwd) {
                        alert('两次密码不一致');
                        return false;
                    }
                }

                that.$axios.post(_API.admin, postDATA, {
                    params: {}, transformRequest: function (data) {
                        return jQuery.param(data)
                    }
                })
                    .then((response) => {
                        let res = response.data;
                        console.log(res);
                        if (res.code == 200) {
                            alert('修改成功');
                        } else {
                            // that.$layer.alert(res.msg);
                            alert(res.msg);
                        }
                        that.$layer.closeAll('loading');
                        this.newpwd = '';
                        this.newconfirmpwd = '';
                        console.log(res.data.is_login);
                        if (res.data.is_login != 0) {
                            local.set('token', '');
                        this.$router.push({name: 'Login', params: {}, query: {}});
                        }
                    })
                    .catch((error) => {
                        console.error('error：' + error);
                        // that.$layer.alert('网络错误');
                        that.msg400 = '网络错误';
                        that.open();
                    });
            },
            clickShow(){
                $('.new_pwd').show();
                $('.new_confirm').show();
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

