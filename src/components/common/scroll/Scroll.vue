<template>
	<div class="wrapper" ref='wrapper'>
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default {
		name: 'Scroll',
		data() {
			return {
				scroll: null
			}
		},
		props: {
			probeType: {
				type: Number,
				default: 0
			},
			pullUpLoad: {
				type: Boolean,
				default: false
			},
			click: {
				type: Boolean,
				default: true
			}
			
		},
		mounted() {
			this.scroll = new BScroll(this.$refs.wrapper,{
				probeType: this.probeType,
				pullUpLoad: this.pullUpLoad,
				click: this.click
			})
			if(this.probeType != 0 && this.probeType != 1) {
				this.scroll.on('scroll',(position) => {
					this.$emit('scroll',position);
				})
			}
			if(this.pullUpLoad) {
				this.scroll.on('pullingUp',() => {
					this.$emit('pullingUp');
				})
			}
		},
		methods: {
			scrollToElement(el, time = 500) {
				this.scroll.scrollToElement(el, time);
			},
			scrollTo(x,y,time = 500) {
				this.scroll.scrollTo(x,y,time);
			},
			finishPullUp() {
				// 当前向上拉取完成，可执行下一次的向上拉取
				this.scroll.finishPullUp();
			},
			refresh() {
				// 进行刷新，重新计算可滚动长度
				this.scroll.refresh();
			},
			getScrollY() {
				return this.scroll ? this.scroll.y : 0
			}
		}
	}
</script>

<style scoped>
	
</style>
