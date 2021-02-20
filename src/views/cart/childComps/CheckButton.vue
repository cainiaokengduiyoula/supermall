<template>
	<div class="check-button">
		<div class="button" :class="{active:isChecked}"></div>
		<div class="text"><slot name="text"></slot></div>
	</div>
</template>

<script>
	export default {
		name: "CheckButton",
		props: {
			isChecked: {
				type: Boolean,
				default() {
					return false
				}
			}
		}
	}
</script>

<style scoped>
	.button {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		border: 2px solid #E9E9E9;
		background: url(~assets/img/cart/tick.svg) 0 0 repeat;
	}
	.active {
		border-color: red;
		background-color: red;
	}
</style>
