<template>
	<div class="detail-nav-bar">
		<nav-bar>
			<div class="back" slot="left" @click="goBack">
				<img src="~assets/img/common/back.svg" alt="">
			</div>
			<div class="title" slot="center">
				<div class="title-item" 
				v-for="(item,index) in titles"
				:class="{active: currentIndex === index}"
				@click="itemClick(index)">{{item}}</div>
			</div>
		</nav-bar>
	</div>
</template>

<script>
	import NavBar from 'components/common/navBar/NavBar'
	export default {
		name: 'DetailNavBar',
		components: {
			NavBar
		},
		data() {
			return {
				titles: ["商品","参数","评论","推荐"],
				currentIndex: 0
			}
		},
		methods: {
			goBack() {
				// this.$router.go(-1)
				this.$router.back();
			},
			itemClick(index) {
				this.currentIndex = index
				this.$emit("itemClick",this.currentIndex)
			}
		}
	}
</script>

<style scoped>
	.active {
		color: var(--color-high-text);
	}
	.back img {
		vertical-align: middle;
	}
	.title {
		display: flex;
	}
	.title-item {
		flex: 1;
	}
</style>
