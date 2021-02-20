<template>
	 <div id="detail-goods-info" v-if="Object.keys(detailInfo).length != 0">
	     <div class="goods-info-imgs">
	       <img
	         v-for="(item, index) in detailInfo.detailImage[0].list"
	         :src="item"
	         :key="index"
	         alt=""
	         @load="loadImg"
	       />
	     </div>
	   </div>
</template>

<script>
	export default {
		name: 'DetailGoodsInfo',
		props: {
			detailInfo: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		data() {
			return {
				counter: 0,
				imagesLength: 0
			}
		},
		methods: {
			// loadImg() {
			// 	if(++this.counter === this.imagesLength) {
			// 		this.$bus.$emit("imgLoad")
			// 	}
			// }
			loadImg() {
				this.$emit("loadImgEvent")
			}
		},
		// 监视器 
		watch: {
			// 监视 this.detailInfo 的变化
			detailInfo() {
				this.imagesLength = this.detailInfo.detailImage[0].list.length
			}
		}
	}
</script>

<style scoped>
	.goods-info-imgs img {
		width: 100%;
	}
</style>
