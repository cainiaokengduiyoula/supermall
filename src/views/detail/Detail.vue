<template>
	<div id="detail">
		<detail-nav-bar ref="navBar" class="nav-bar" @itemClick="itemClick"></detail-nav-bar>
		<scroll class="scroll-content" ref="scroll" :probe-type="3" @scroll="scroll">
			<detail-swiper ref="swiperRef" :top-images="topImages"></detail-swiper>
			<detail-base-info :goods="goods"></detail-base-info>
			<detail-shop-info :shop="shop"></detail-shop-info>
			<detail-goods-info :detailInfo="detailInfo" @loadImgEvent="loadImgEvent"></detail-goods-info>
			<detail-goods-param ref="paramsRef" :paramsInfo="paramsInfo"></detail-goods-param>
			<detail-comment-info ref="commentRef" :commentInfo="commentInfo"></detail-comment-info>
			<goods-list ref="recommendRef" :goods="recommend"></goods-list>
		</scroll>
		<back-top @click.native="backTopClick" v-show="isShowBackUp" />
		<detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
		<!-- <toast :isShow="isShow" :message="addCartInfo"></toast> -->
	</div>
</template>

<script>
	import Scroll from "components/common/scroll/Scroll"
	import DetailNavBar from "./childComps/DetailNavBar"
	import DetailSwiper from "./childComps/DetailSwiper"
	import DetailBaseInfo from "./childComps/DetailBaseInfo"
	import DetailShopInfo from "./childComps/DetailShopInfo"
	import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
	import DetailGoodsParam from "./childComps/DetailGoodsParam"
	import DetailCommentInfo from "./childComps/DetailCommentInfo"
	import DetailBottomBar from "./childComps/DetailBottomBar"
	
	import { debounce } from "common/utils"
	import { itemListenerMixin,backTopMinxin } from "common/mixin"
	import { getDetail,GoodsInfo,Shop,GoodsParam,getDetailRecommend } from 'network/detail'
	import GoodsList from 'components/content/goods/GoodsList'
	// import Toast from "components/common/toast/Toast"
	
	export default {
		name: "Detail",
		mixins: [itemListenerMixin,backTopMinxin],
		components: {
			Scroll,
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailGoodsParam,
			DetailCommentInfo,
			GoodsList,
			DetailBottomBar,
			// Toast
		},
		data() {
			return {
				iid: null,
				topImages: [],
				goods: {},
				shop: {},
				detailInfo: {},
				paramsInfo: {},
				commentInfo: {},
				recommend: [],
				theme: ["swiperRef","paramsRef", "commentRef", "recommendRef"],
				themePosY: [0],
				bcFuncTheme: null,
				currentIndex: 0,
				isShow: false,
				addCartInfo: ""
			}
		},
		created() {
			this.iid = this.$route.params.iid
			getDetail(this.iid).then(res => {
				const data = res.result
				this.topImages = data.itemInfo.topImages	
				this.goods = new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services)
				this.shop = new Shop(data.shopInfo)
				this.detailInfo = data.detailInfo
				this.paramsInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
				this.commentInfo = data.rate ? data.rate.list[0] : {}
			})
			getDetailRecommend().then((res) => {
				this.recommend = res.data.list
			})
			// // this.$nextTick()将回调延迟到下次 DOM 更新循环之后执行。
			// // 在修改数据之后立即使用它，然后等待 DOM 更新
			// this.$nextTick(() => {
			// 	// 根据最新的数据，对应的DOM是已经被渲染出来
			// 	// 但是图片依然是没有加载完(目前获取到offsetTop不包含其中的图片)
			// 	this.themePosY = [0]
			// 	for(let item of this.theme) {
			// 		this.themePosY.push(this.$refs[item].$el.offsetTop)
			// 	}
			// 	console.log(this.themePosY)
			// })
			this.bcFuncTheme = debounce(() => {
				this.themePosY = []
				for(let item of this.theme) {
					this.themePosY.push(this.$refs[item].$el.offsetTop)
				}
				this.themePosY.push(Number.MAX_VALUE)
			},100)
		},
		mounted() {
			this.$bus.$on("itemLoad",this.bcFunc)
		},
		// 因为detail组件被keep-alive忽视缓存，故不会进行执行deactivated生命函数
		destroyed() {
			this.$bus.$off('itemLoad',this.bcFunc)
		},
		methods: {
			loadImgEvent() {
				this.bcFunc()
				this.bcFuncTheme()
			},
			scroll(position) {
				this.isShowBackUp = (-position.y) > 1000
				for(let i = 0; i < this.themePosY.length; i++) {
					if( this.currentIndex !== i && (-position.y >= this.themePosY[i] && -position.y < this.themePosY[i+1]) ) {
						this.currentIndex = i
						this.$refs.navBar.currentIndex = i
					}
				}
			},
			itemClick(currentIndex) {
				// this.$refs.scroll.scrollTo(0,-this.themePosY[currentIndex],500)
				this.$refs.scroll.scrollToElement(this.$refs[this.theme[currentIndex]].$el,500)
			},
			addToCart() {
				const obj = {
					iid: this.iid,
					desc: this.goods.desc,
					newPrice: this.goods.newPrice,
					oldPrice: this.goods.oldPrice,
					realPrice: this.goods.realPrice,
					title: this.goods.title,
					img: this.topImages[0]
				}
				this.$store.dispatch("changeCart",obj).then(res => {
					// this.addCartInfo = res
					// this.isShow = true
					// this.showToast(res)
					this.$toast.show(res)
				})
			}
		}
	}
</script>

<style scoped>
	#detail {
		height: 100vh;
		background-color: #FFFFFF;
		position: relative;
	}
	.nav-bar {
		position: relative;
		background-color: #fff;
	}
	.scroll-content {
		height: calc(100% - 44px - 52px);
		overflow: hidden;
	}
</style>
