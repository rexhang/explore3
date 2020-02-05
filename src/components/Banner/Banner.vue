<template>
    <div id="banner" class="banner">
      <Header></Header>
      <h2 class="mod-title">轮播图管理</h2>
      <div class="tablebox">
        <table class="bannerTable">
          <thead>
            <tr>
              <th>序号</th>
              <th>图片(750*354)</th>
              <th>链接</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>

            <tr>
              <td>1</td>
              <td class="banner-td">
                <img class="bannerimg" :src="bannerData[0]['img']" alt="" />
                
                <div class="uploads">
                  <input type="file" @change="changeimg(1, $event)" />
                  <div class="change-btn">更换</div>
                </div>

              </td>
              <td>
                <input class="linkurl" type="text" v-model="bannerData[0]['img_url']" />
              </td>
              <td>
                <button class="save" @click="savebanner(1)">保存</button>
              </td>
            </tr>

            <tr>
              <td>2</td>
              <td class="banner-td">
                  <img class="bannerimg" :src="bannerData[1]['img']" alt="" />
                  <div class="uploads">
                    <input type="file" @change="changeimg(2, $event)" />
                    <div class="change-btn">更换</div>
                  </div>
                </td>
              <td>
                <input class="linkurl" type="text" v-model="bannerData[1]['img_url']" />
              </td>
              <td>
                <button class="save" @click="savebanner(2)">保存</button>
              </td>
            </tr>

            <tr>
              <td>3</td>
              <td class="banner-td">
                <img class="bannerimg" :src="bannerData[2]['img']" alt="" />
                <div class="uploads">
                  <input type="file" @change="changeimg(3, $event)" />
                  <div class="change-btn">更换</div>
                </div>
              </td>
              <td>
                <input class="linkurl" type="text" v-model="bannerData[2]['img_url']" />
              </td>
              <td>
                <button class="save" @click="savebanner(3)">保存</button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
      <!-- 弹窗组件 -->
      <mu-dialog :open="dialog" title="提示">
        {{msg}}
        <mu-flat-button label="确定" slot="actions" primary @click="close"/>
      </mu-dialog>
    </div>
</template>

<script>
  import Main from './Main';
  export default Main;
</script>

<style lang="scss" scoped>
  @import './Banner.scss';
</style>
