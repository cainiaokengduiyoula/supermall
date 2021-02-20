<template>
	<div id="home">
		<nav-bar class="home-nav">
			<div slot="center">购物街</div>
		</nav-bar>
		<tab-control
		:titles="['流行','新款','精选']" 
		@tabClick="tabClick" 
		class="tab-control" 
		v-show="tabIsShow"
		ref="tabControl2"
		/>
		<scroll 
		ref="scroll" 
		class="content" 
		:probe-type="2" 
		@scroll="contentScroll" 
		:click="true"
		:pull-up-load="true"
		@pullingUp="loadMoad">
			<home-swiper :banners="banners"
				@swiperImageLoad="swiperImageLoad"
			></home-swiper>
			<recommend-view :recommends="recommends" />
			<feature-view></feature-view>
			<tab-control 
			:titles="['流行','新款','精选']" 
			@tabClick="tabClick" 
			class="tab-control"
			ref="tabControl1"
			 />
			<goods-list :goods="showGoods" />
		</scroll>
		<back-top @click.native="backTopClick" v-show="isShowBackUp" />
	</div>
</template>

<script>
	import { debounce } from "common/utils"
	import { itemListenerMixin,backTopMinxin } from "common/mixin"
	import NavBar from 'components/common/navBar/NavBar'
	import Scroll from 'components/common/scroll/Scroll'
	import TabControl from 'components/content/tabControl/TabControl'
	import GoodsList from 'components/content/goods/GoodsList'
	import BackTop from 'components/content/backTop/BackTop'
	import HomeSwiper from './childComps/HomeSwiper'
	import RecommendView from './childComps/RecommendView'
	import FeatureView from './childComps/FeatureView'
	import {
		getHomeMultidata,
		getHomeGoods
	} from "network/home"

	export default {
		name: "Home",
		mixins: [itemListenerMixin,backTopMinxin],
		components: {
			NavBar,
			Scroll,
			TabControl,
			GoodsList,
			BackTop,
			HomeSwiper,
			RecommendView,
			FeatureView
		},
		data() {
			return {
				banners: [],
				recommends: [],
				goods: {
					'pop': {
						'page': 0,
						list: []
					},
					'new': {
						'page': 0,
						list: []
					},
					'sell': {
						'page': 0,
						list: []
					}
				},
				currentType: 'pop',
				tabControl: 0,
				tabIsShow: false,
				saveY: 0,
			}
		},
		created() {
			this.getHomeMultidata()

			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
		},
		mounted() {
			this.$bus.$on('itemLoad',this.bcFunc)
		},
		activated() {
			this.$refs.scroll.refresh()
			this.$refs.scroll.scrollTo(0,this.saveY,0)
			this.$bus.$on('itemLoad',this.bcFunc)
		},
		deactivated() {
			this.saveY = this.$refs.scroll.getScrollY()
			this.$refs.scroll.refresh()
			this.$bus.$off('itemLoad',this.bcFunc)
		},
		computed: {
			showGoods() {
				return this.goods[this.currentType].list
			}
		},
		methods: {
			swiperImageLoad() {
				// 所有组件都有个 $el 属性可获取 原DOM元素
				this.tabControl = this.$refs.tabControl1.$el.offsetTop;
				this.$refs.scroll.refresh()
			},
			tabClick(index) {
				switch (index) {
					case 0:
						this.currentType = 'pop'
						break
					case 1:
						this.currentType = 'new'
						break
					case 2:
						this.currentType = 'sell'
						break
				}
				this.$refs.tabControl1.currentIndex = index
				this.$refs.tabControl2.currentIndex = index
			},
			contentScroll(position) {
				this.isShowBackUp = (-position.y) > 1000
				this.tabIsShow =  (-position.y) > this.tabControl
			},
			loadMoad() {
				this.getHomeGoods(this.currentType);
			},
			getHomeMultidata() {
				getHomeMultidata().then(res => {
					this.banners = res.data.banner.list;
					this.recommends = res.data.recommend.list;
				})
			},
			getHomeGoods(type) {
				const page = this.goods[type].page + 1
				getHomeGoods(type, page).then(res => {
					// ...运算符
					this.goods[type].list.push(...res.data.list)
					this.goods[type].page += 1
					this.$refs.scroll.finishPullUp();
				})
			}
		}

	}
</script>

<style scoped>
	#home {
		padding-top: 44px;
		height: 100vh;
		position: relative;
	}

	.home-nav {
		background-color: var(--color-tint);
		color: #fff;

		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9;
	}

	.tab-control {
		position: sticky;
		top: 44px;
		z-index: 9;
	}

	.content {
		overflow: hidden;

		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}

	/*.content {*/
	/*height: calc(100% - 93px);*/
	/*overflow: hidden;*/
	/*margin-top: 44px;*/
	/*}*/
</style>
