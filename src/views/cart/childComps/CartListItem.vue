<template>
	<div class="cart-list-item" >
		<check-button class="check-button" @click.native="buttonClick" :isChecked="product.isChecked"/>
		<div class="item-img" >
			<img :src="product.img" alt="" >
		</div>
		<div class="item-info">
			<p class="info-title">{{product.title}}</p>
			<p class="info-desc">{{product.desc}}</p>
			<div class="info-number">
				<span class="info-money">￥{{product.realPrice}}</span>
				<span class="info-count">x{{product.count}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { CHANGE_ISCHECKED } from "store/mutations_type"
	import CheckButton from "./CheckButton"
	export default {
		name: "CartListItem",
		props: {
			product: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		components: {
			CheckButton
		},
		methods: {
			buttonClick() {
				this.$store.commit(CHANGE_ISCHECKED,this.product)
			}
		}
	}
</script>

<style scoped>
	.cart-list-item {
		display: flex;
		height: 132px;
		padding: 5px 0;
		/* background-color: yellow; */
	}
	.check-button {
		width: 8%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.item-img {
		width: 27%;
		margin: 0 5px;
	}
	.item-info {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		flex: 1;
		width: 65%;
	}
	.item-img img {
		width: 100%;
		border-radius: 5px;
	}
	.info-title,
	.info-desc {
		overflow: hidden;
		white-space : nowrap;
		text-overflow: ellipsis;
	}
	.info-title {
		font-size: 18px;
	}
	.info-desc {
		font-size: 14px;
	}
	.info-number {
		display: flex;
		justify-content: space-between;
		font-size: 18px;
	}
	.info-money {
		color: red;
	}
</style>
