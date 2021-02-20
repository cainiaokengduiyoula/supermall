<template>
	<div class="detail-base-info">
		<h4 class="title">{{goods.title}}</h4>
		<div class="price">
			<span class="new-price">{{goods.newPrice}}</span>
			<span class="old-price">{{goods.oldPrice}}</span>
			<span class="discount">{{goods.discount}}</span>
		</div>
		<div class="columns">
			<span v-for="(item,index) in goods.columns" :key="index">{{item}}</span>
		</div>
		<div class="service">
			<div class="service-item" v-for="(item,index) in goods.services"
				v-if="index <= 2" :key="index"
			>
				<img :src="item.icon" alt=""/>
				<span>{{item.name}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'DatailBaseInfo',
		props: {
			goods: {
				type: Object,
				default() {
					return {}
				}
			}
		}
	}
</script>

<style scoped>
	.detail-base-info {
		padding: 10px 8px;
	}
	.price {
		margin: 10px 0;
	}
	.new-price {
		font-size: 25px;
		color: var(--color-high-text);
	}
	.old-price {
		margin: 0 5px;
		font-size: 15px;
		text-decoration: line-through;
	}
	.discount {
		display: inline-block;
		padding: 5px;
		color: #FFFFFF;
		font-size: 15px;
		line-height: 15px;
		text-align: center;
		border-radius: 15px;
		vertical-align: super;
		background-color: var(--color-high-text);
	}
	.columns,
	.service {
		display: flex;
		justify-content: space-between;
		padding-bottom: 2px;
		border-bottom: 2px solid #E9E9E9;
	}
	.service {
		padding: 10px 0px;
	}
	.columns span,
	.service-item {
		display: 1;
		font-size: 14px;
	}
	.service-item img {
		width: 16px;
	}
</style>
