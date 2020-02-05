<template>
    <div id="addproject" class="addproject">
      <div class="progress rex-cf" v-show="isprogress">
        <mu-linear-progress color="#ed2d2e" :size="size" mode="determinate" :value="value"/>
      </div>
      <Header></Header>
      <div class="wraps">
        <div class="tits rex-cf">
          <!-- history.go(-1)表示后退与刷新。如数据有改变也随之改变
          history.back()只是单纯的返回到上一页。 -->
          <!-- <img :src="back" alt="" class="backicon rex-fl" onclick="history.go(-1)"> -->
          <span class="rex-fl">探索 / 新建项目 / 添加素材</span>
        </div>
        <!-- 识别物 -->
        <div class="shibiewu" id="shibiewu" v-if="shibiewu">
          <div class="tits2 rex-cf">
            <img :src="scan" alt="" class="scan rex-fl">
            <span class="rex-fl">识别物</span>
          </div>
          <div class="upload-box rex-cf" id="upload-box">
            <img :src="xuanzebtn" width="150" height="150" class="rex-disable-select rex-fl" id="xuanzebtn" alt="">
            <div class="shuom rex-fl">
              <p>图片仅限JPG格式，大小不超过2M</p>
              <p>请上传边缘清晰主题明确的识别图，<!-- <router-link style="color: #fff;" to="/About">说明</router-link> --></p>
            </div>
            <img :src="uploadfilebtn" width="120" height="40" class="rex-disable-select uploadbtn rex-fl" id="uploadbtn" alt="">
          </div>
        </div>
        <!-- 地理 -->
        <div class="dili" id="dili" v-if="dili">
          <div class="tits2 rex-cf">
            <img :src="scan" alt="" class="scan rex-fl">
            <span class="rex-fl">地理位置</span>
          </div>
          <div class="upload-box rex-cf" id="upload-box">
            <img :src="xuanzebtn" width="150" height="150" class="rex-disable-select rex-fl" id="xuanzebtn" alt="">
            <div class="shuom rex-fl">
              <p>图片仅限JPG格式，大小不超过2M</p>
              <p>请上传边缘清晰主题明确的识别图，<router-link style="color: #fff;" to="/About">说明</router-link></p>
            </div>
            <img :src="uploadfilebtn" width="120" height="40" class="rex-disable-select uploadbtn rex-fl" id="uploadbtn" alt="">
          </div>
          <div class="put">
            <span>地理位置名称</span>
            <input type="text" class="dili-name" maxlength="32" v-model="diliName_" placeholder="请输入地理位置名称">
          </div>
          <div class="lnglat">
            <span>地理位置坐标</span>
            <input type="text" class="dili-name" maxlength="32" v-model="diliLnglat_" placeholder="请输入地理位置坐标  经度、纬度">
            <a target="_blank" class="lookfor" href="http://lbs.amap.com/console/show/picker">查找</a>
            <span>默认为附近100米</span>
          </div>
        </div>
        <!-- 识别结果 -->
        <div class="result">
          <div class="tits2 rex-cf">
            <img :src="menu" alt="" class="scan rex-fl">
            <span class="rex-fl">识别结果</span>
          </div>
          <div class="sel">
            <ul class="list-ctrl rex-cf" id="list-ctrl">
              <li class="rex-disable-select">
                <img :src="sel0" alt="" class="selicon">
                <span class="name">视频</span>
              </li>
              <li class="rex-disable-select">
                <img :src="sel0" alt="" class="selicon">
                <span class="name">3D</span>
              </li>
              <li class="rex-disable-select active">
                <img :src="sel1" alt="" class="selicon">
                <span class="name">图文</span>
              </li>
            </ul>
          </div>
          <div class="contents tuwen" v-show="content2">
            <div class="editor-box">
                <!-- 分离式结构 -->
                <div id="e-menu" class="toolbar">
                </div>
                <p class='pleaseInput'>请在下面输入区录入图文内容</p>
                <div id="e-content" class="text"></div>
            </div>
          </div>
          <div class="contents d3" v-show="content1">
            <div class="doc">资源仅限ZIP格式，大小不超过10M</div>
            <div class="osupload rex-cf">
              <div class="os-box rex-fl">
                <p class="zipname">ios包</p>
                <div id="up-group-ios" class="up-group">
                  <img :src="addassets" alt="" id="sel-ios" class="rex-block">
                  <p class="doc">{{iosZipName}}{{iosZipName?`（${iosZipNamePercent}%）`:''}}</p>
                  <img :src="uploadbtnsmall" alt="" id="upload-ios" class="rex-block upos">
                </div>
              </div>
              <div class="os-box android rex-fl">
                <p class="zipname">android包</p>
                <div id="up-group-android" class="up-group">
                  <img :src="addassets" alt="" id="sel-android" class="rex-block">
                  <p class="doc">{{androidZipName}}{{androidZipName?`（${androidZipNamePercent}%）`:''}}</p>
                  <img :src="uploadbtnsmall" alt="" id="upload-android" class="rex-block upos">
                </div>
              </div>
            </div>
          </div>
          <div class="contents shipin" v-show="content0">
            <div class="doc">视频文件大小不超过10MB,时长不超过3分钟，支持MOV/MP4/AVI/FIV格式</div>
            <div id="up-group-video">
              <div id="sel-video">上传视频</div>
              <p class="doc">{{videoName}}{{videoName?`（${videoNamePercent}%）`:''}}</p>
              <img :src="uploadbtnsmall" alt="" id="upload-video" class="rex-block upos">
            </div>
          </div>
          <!-- checkbox -->
          <div class="check-area">
            <mu-checkbox label="购买链接地址" class="checkname" v-model="selbuylink_" />
            <input type="text" class="vals" placeholder="http://" v-model="buylink_">
          </div>
          <div class="check-area">
            <mu-checkbox label="用户可以送祝福和看祝福" class="checkname" v-model="sellook_" />
          </div>
        </div>
        <!-- 按钮组 -->
        <div class="btngroup rex-cf">
          <div class="btn1 rex-disable-select rex-fl" @click="getThisPageData()">确定</div>
          <div class="btn2 rex-disable-select rex-fl">取消</div>
        </div>
      </div>
      <!-- 弹窗组件 -->
      <mu-dialog :open="dialog" title="提示">
        {{msg}}
        <mu-flat-button label="确定" slot="actions" primary @click="close"/>
      </mu-dialog>
      <!-- toast -->
      <mu-snackbar v-if="snackbar" :message="msg" action="关闭" @actionClick="hideSnackbar" @close="hideSnackbar"/>
    </div>
</template>

<script>
  import Do from './Do';
  export default Do;
</script>

<style lang="scss" scoped>
  @import './Addmaterial.scss';
</style>
