<template>
	<div class="toast" v-show="isShow">
		{{message}}
	</div>
</template>

<script>
	export default {
		name: "toast",
		// props: {
		// 	isShow: {
		// 		type: Boolean,
		// 		default() {
		// 			return false
		// 		}
		// 	},
		// 	message: {
		// 		type: String,
		// 		default() {
		// 			return ""
		// 		}
		// 	}
		// }
		data() {
			return {
					isShow: false,
					message: ""
			}
		},
		methods: {
			show(msg, delay = 1000) {
			  this.isShow = true
			  this.message = msg
			  setTimeout(() => {
			    this.isShow = false
			  }, delay)
			}
		}
	}
</script>

<style>
	.toast {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		padding: 10px;
		white-space: nowrap;
		color: #FFFFFF;
		background-color: rgba(0,0,0,.7);
	}
</style>
