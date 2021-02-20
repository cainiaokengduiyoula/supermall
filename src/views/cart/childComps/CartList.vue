<template>
	<div class="cart-list">
		<scroll ref="scroll" class="scroll">
			<cart-list-item 
			v-for="(item,index) in cartList"
			:key="item.iid"
			:product="item"
			class="cart-list-item">
			</cart-list-item>
		</scroll>
	</div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll"
import CartListItem from "./CartListItem"
import { itemListenerMixin } from "common/mixin"
export default {
	name: "CartList",
	mixins: [itemListenerMixin],
	props: {
		cartList: {
			type: Array,
			default() {
				return []
			}
		}
	},
	components: {
		Scroll,
		CartListItem
	},
	activated() {
		this.$refs.scroll.refresh()
	}
}
</script>

<style scoped>
	.scroll {
		height: 100%;
		overflow: hidden;
	}
	.scroll .cart-list-item:not(:last-child) {
		border-bottom: 2px solid #E9E9E9;
	}
</style>
