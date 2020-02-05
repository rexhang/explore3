/*
* @Author: guhang
* @Date:   2018-01-03 11:15:10
 * @Last Modified by: rexhang
 * @Last Modified time: 2018-03-09 15:25:54
*/

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import isJquery from 'jquery'
window.$ = isJquery
window.jQuery = isJquery

require('./lib/rem/rem.js')
require('./lib/sys/sys.js')

import './lib/rex-ui/rex-ui.css'
import './lib/bootstrap-Grid-System/bootstrap-gridSystem.min.css'

import Vue from 'vue'
import App from './App'
import router from './router'

import layer from 'vue-layer'
Vue.prototype.$layer = layer(Vue)

import axios from 'axios'
Vue.prototype.$axios = axios
Vue.prototype.$https = axios

import BScroll from 'better-scroll'
Vue.prototype.$BScroll = BScroll

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
Vue.use(MuseUI)

Vue.config.productionTip = false;

// 集成fundebug插件
function formatComponentName(vm)
{
  if (vm.$root === vm) return 'root';

  var name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name;
  return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '');

}

Vue.config.errorHandler = function(err, vm, info)
{
  var componentName = formatComponentName(vm);
  var propsData = vm.$options && vm.$options.propsData;

  fundebug.notifyError(err,
  {
      metaData:
      {
          componentName: componentName,
          propsData: propsData,
          info: info
      }
   });
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

