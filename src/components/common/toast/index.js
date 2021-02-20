// 将组件以插件的方法使用

import Toast from "./Toast.vue"

const obj = {}
obj.install = function(Vue) {
		// 1.创建组件构造器
		const toastContrustor = Vue.extend(Toast)
		// 2.根据组件构造器创建对象
		const toast = new toastContrustor()
		// 3.将组件进行挂载
		toast.$mount(document.createElement("div"))
		// 4.toast.$el对应的就是div，将它添加到body中
		document.body.appendChild(toast.$el)
		// 5.将该对象添加到Ve的原型中
		Vue.prototype.$toast = toast
}
export default obj

// 在mian.js文件中导入并安装插件 Vue.use(toast)
// 	Vue.use(toast) 该代码会调用 toast.install 函数
// 在其他组件中使用该插件的xxx方法
// 	this.$toast.xxx()