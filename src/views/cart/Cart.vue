<template>
	<div id="cart">
		<nav-bar class="nav-bar">
			<div slot="center" >购物车({{cartListLength}})</div>
		</nav-bar>
		<cart-list class="cart-list" :cartList="cartList"></cart-list>
		<cart-bottom></cart-bottom>
	</div>
</template>

<script>
	// 将store文件夹中的getters.js的计算属性直接使用到Cart.vue的computed中
	// 可以使用mapGetters辅助函数，该函数仅仅是将store的getter映射到局部计算属性
	import { mapGetters } from "vuex"
	import NavBar from "components/common/navBar/NavBar"
	import CartList from "./childComps/CartList"
	import CartBottom from "./childComps/CartBottom"
	
  export default {
    name: "Cart",
		components: {
			NavBar,
			CartList,
			CartBottom
		},
		computed: {
			// 两种用法
			// ...mapGetters({
			// 	length: "cartListLength",
			// 	list: "cartList"
			// })
			...mapGetters(["cartListLength","cartList"])
		}
  }
</script>

<style scoped>
	#cart {
		height: 100vh;
	}
	.nav-bar {
		font-size: 16px;
		font-weight: 600;
		color: #FFFFFF;
		background-color: var(--color-tint);
	}
	.cart-list {
		height: calc(100% - 44px - 49px - 45px);
	}
</style>
