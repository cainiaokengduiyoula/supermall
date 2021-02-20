export default {
	cartList(state) {
		return state.cartList
	},
	cartListLength(state) {
		return state.cartList.length
	},
	cartChecked(state,getters) {
		if(getters.cartListLength > 0) {
			return state.cartList.filter(item => item.isChecked === true)
		}else {
			return []
		}
	},
	totalLength(state,getters) {
		return getters.cartChecked.length > 0 ? getters.cartChecked.length : 0
	},
	totalPrice(state,getters) {
		if(getters.totalLength > 0) {
			return getters.cartChecked.reduce((pre,curr) => {
				return pre + curr.count * curr.realPrice
			},0).toFixed(2)
		}else {
			return 0
		}
	}
}