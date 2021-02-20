<template>
	<div class="detail-shop-info">
		<div class="shop-base-info">
			<img :src="shop.logo" alt="">
			<span>{{shop.name}}</span>
		</div>
		<div class="shop-info">
			<div class="shop-info-left">
				<div class="info-fans">
					<h3>{{shop.fans}}</h3>
					<p>总销量</p>
				</div>
				<div class="info-goods">
					<h3>{{shop.goodsCount}}</h3>
					<p>全部宝贝</p>
				</div>
			</div>
			<div class="shop-info-center"></div>
			<table class="shop-info-right">
				<tr v-for="(item,index) in shop.score">
					<td>{{item.name}}</td>
					<td :class="{'scroe-better': item.isBetter}">{{item.score}}</td>
					<td class="green" :class="{'better-more': item.isBetter}">{{item.isBetter ? "高" : "低"}}</td>
				</tr>
			</table>
		</div>
		<div class="shop">进店逛逛</div>
	</div>
</template>

<script>
	export default {
		name: "DetailShopInfo",
		props: {
			shop: {
				type: Object,
				default() {
					return {}
				}
			}
		}
	}
</script>

<style scoped>
	.detail-shop-info {
		padding: 0px 10px;
		font-size: 15px;
		border-bottom: 2px solid #E9E9E9;
	}
	.shop-base-info {
		margin: 15px 0;
	}
	.shop-base-info span{
		margin-left: 10px;
		display: inline-block;
		height: 50px;
		line-height: 50px;
	}
	.shop-base-info img {
		height: 50px;
		border-radius: 50%;
		border: 2px solid #E9E9E9;
		vertical-align: bottom;
	}

	.shop-info {
		display: flex;
	}
	.shop-info-left {
		display: flex;
		flex: 1;
		text-align: center;
/* 		background-color: pink; */
	}
	.info-fans,
	.info-goods {
		flex: 1;
		padding: 10px 0px;
	}
	.shop-info-center {
		border: 1px solid #E9E9E9;
		margin: 0px 5px;
	}
	.shop-info-right {
		flex: 1;
		/* background-color: yellow; */
	}
	.scroe-better {
		color: red;
	}
	.green {
		text-align: center;
		background-color: chartreuse;
	}
	.better-more {
		text-align: center;
		background-color: red;
	}
	.shop {
		width: 50%;
		margin: 10px auto;
		margin-top: 10px;
		padding: 5px 15px;
		text-align: center;
		border-radius: 5px;
		border: 1px solid #E9E9E9;
		background-color: #EEEEEE;
	}
</style>
