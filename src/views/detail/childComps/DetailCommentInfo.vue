<template>
	<div class="detail-comment-info" v-if="Object.keys(commentInfo).length != 0">
		<div class="comment-info-top">
			<span class="left">用户评价</span>
			<span class="right">更多</span>
		</div>
		<div class="comment-info">
			<div class="comment-info-user">
				<img :src="commentInfo.user.avatar" alt="">
				<span>{{commentInfo.user.uname}}</span>
			</div>
			<div class="comment-info-content">
				<p>{{commentInfo.content}}</p>
				<p>{{commentInfo.created | showDate }} {{commentInfo.style}}</p>
				<div v-if="commentInfo.images != null" class="comment-info-images">
					<img v-for="(item,index) in commentInfo.images" :key="index" :src="item" alt="" @load="loadImg">
				</div>
			</div>
			<div class="shop-reply" v-if="commentInfo.explain !=null">
				{{ commentInfo.explain }}
			</div>
		</div>
	</div>
</template>

<script>
	import {
		formatDate
	} from "common/utils.js"

	export default {
		name: 'DetailCommentInfo',
		props: {
			commentInfo: {
				type: Object,
				default () {
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
			loadImg() {
				if (++this.counter === this.imagesLength) {
					this.$bus.$emit("imgLoad")
				}
			}
		},
		watch: {
			imagesLength() {
				this.imagesLength = this.commentInfo.images != null ? this.commentInfo.images.length : 0
			}
		},
		// 过滤器
		filters: {
			showDate(value) {
				let date = new Date(value * 1000);
				return formatDate(date, "yyyy-MM-dd hh:mm:ss")
			}
		}
	}
</script>

<style scoped>
	.detail-comment-info {
		padding: 10px 5px;
		border-bottom: 2px solid #E9E9E9;
	}

	.comment-info-top {
		display: flex;
		justify-content: space-between;
		border-bottom: 2px solid #E9E9E9;
		padding: 0px 5px;
	}

	.left {
		text-align: left;
	}

	.right {
		text-align: right;
	}

	.left,
	.right {
		height: 25px;
		line-height: 25px;
	}

	.comment-info-user {
		margin: 15px 0;
	}

	.comment-info-user img {
		height: 50px;
		border-radius: 50%;
		border: 2px solid #E9E9E9;
		vertical-align: bottom;
	}

	.comment-info-user span {
		font-weight: 700;
		margin-left: 10px;
		display: inline-block;
		height: 50px;
		line-height: 50px;
	}

	.comment-info-content p {
		margin: 10px 0px;
		font-size: 15px;
	}
	.comment-info-images img {
		height: 10vh;
	}

	.shop-reply {
		padding-top: 10px;
		border-top: 1px solid #E9E9E9;
		font-size: 14px;
	}
</style>
