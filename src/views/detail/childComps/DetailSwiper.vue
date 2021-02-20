<template>
	<swiper class="content" @load="itemLoad">
		<swiper-item v-for="(item,index) in topImages" :key="index">
			<img :src="item" alt="" >
		</swiper-item>
	</swiper>
</template>

<script>
	import { Swiper, SwiperItem } from "components/common/wiper"
	
	export default {
		name: 'DetailSwiper',
		components: {
			Swiper,
			SwiperItem
		},
		props: {
			topImages: {
				type: Array,
				default() {
					return []
				}
			}
		},
		data() {
			return {
				isLoad: false
			}
		},
		methods: {
			itemLoad() {
				if(!this.isLoad) {
					this.$bus.$emit('itemLoad')
					this.isLoad = true
				}
			}
		}
	}
</script>

<style scoped>
	.content {
		height: 300px;
		overflow: hidden;
	}
</style>
