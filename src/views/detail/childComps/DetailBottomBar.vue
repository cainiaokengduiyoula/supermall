<template>
	<div class="detail-bottom-bar">
		<div class="bottom-left">
			<div class="service">
				<i class="icon"></i>
				<span>客服</span>
			</div>
			<div class="shop">
				<i class="icon"></i>
				<span>店铺</span>
			</div>
			<div class="collect">
				<i class="icon"></i>
				<span>收藏</span>
			</div>
		</div>
		<div class="bottom-right">
			<div class="cart" @click="addToCart">
				加入购物车
			</div>
			<div class="buy">
				购买
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "DetailBottomBar",
		methods: {
			addToCart() {
				this.$emit("addToCart")
			}
		}
	}
</script>

<style scoped>
	.detail-bottom-bar {
		display: flex;
		position: fixed;
		bottom: 0px;
		left: 0;
		right: 0;
		font-size: 16px;
		height: 52px;
		text-align: center;
		background-color: #fff;
		box-shadow: 0 -1px 4px gray;
	}

	.bottom-left {
		display: flex;
		flex: 1;
	}

	.bottom-left>div {
		flex: 1;
		border-right: 1px solid rgba(128, 128, 128, 0.2);
	}

	.bottom-left .icon {
		display: block;
		background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
		width: 25px;
		height: 25px;
		margin: 3px auto;
	}

	.service .icon {
		background-position: 0 -60px;
	}

	.shop .icon {
		background-position: 0 -112.5px;
	}

	.bottom-right {
		display: flex;
		flex: 1;
	}

	.bottom-right>div {
		flex: 1;
		line-height: 52px;
	}

	.cart {
		background-color: rgb(255, 174, 0);
	}

	.buy {
		background-color: var(--color-tint);
		color: white;
	}
</style>
