<template>
	<div class="cart-bottom">
		<check-button class="bottom-left" @click.native="checkClick" :isChecked="isSelectAll">
			<div slot="text" class="text">全选</div>
		</check-button>
		<div class="bottom-center">合计:￥{{totalPrice}}</div>
		<div class="bottom-right">总计({{totalLength}})</div>
	</div>
</template>

<script>
	import { mapGetters } from "vuex"
	import { CHANGE_ALLCHECKED } from "store/mutations_type"
	import CheckButton from "./CheckButton"
	export default {
		name: "CartBottom",
		components: {
			CheckButton
		},
		computed: {
			...mapGetters(["cartListLength","cartList","cartChecked","totalLength","totalPrice"]),
			// 设置计算属性 根据cartList判断是否每个商品都选中了
			isSelectAll() {
				if(this.cartListLength === 0) return false
				return this.cartList.every(item => item.isChecked)
			}
		},
		methods: {
			checkClick() {
				if(this.isSelectAll) {// 全部选中
					this.$store.commit(CHANGE_ALLCHECKED,false)
				}else {
					this.$store.commit(CHANGE_ALLCHECKED,true)
				}
				// 不能合并，因为isSelectAll是根据CartList是否有一个不选中的计算属性，
				// 如果合并了，一旦修改了一个商品isSelectAll就会响应发生更改
				// this.$store.commit(CHANGE_ALLCHECKED,this.isSelectAll)
			}
		}
	}
</script>

<style scoped>
	.cart-bottom {
		display: flex;
		height: 45px;
		line-height: 45px;
		background-color: #EFEFEF;
		border: 1px solid #E4E4E4;
	}
	.bottom-left {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 20%;
	}
	.bottom-center {
		flex: 1;
		text-indent: 10px;
	}
	.bottom-right {
		width: 30%;
		color: white;
		background-color: red;
		text-align: center;
	}
</style>
