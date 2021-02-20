import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
// 解决移动端300ms点击延迟
import FastClick from "fastclick"
// 图片懒加载
import VueLazyLoad from 'vue-lazyload'

Vue.use(toast)
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
FastClick.attach(document.body)
// 将img的src属性改成v-lazy
Vue.use(VueLazyLoad,{
	// 在图片加载的时候显示该图片
	loading: require('assets/img/common/load.png')
})

new Vue({
  render: h => h(App),
	router,
	store
}).$mount('#app')
