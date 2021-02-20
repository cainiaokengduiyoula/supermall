import { ADD_CARTCOUNT,ADD_CARTLIST,CHANGE_ISCHECKED,CHANGE_ALLCHECKED } from "./mutations_type"

export default {
	[ADD_CARTLIST](state,payload) {
		payload.isChecked = false
		state.cartList.push(payload)
	},
	[ADD_CARTCOUNT](state,payload) {
		payload.count++
	},
	[CHANGE_ISCHECKED](state,payload) {
		payload.isChecked = !payload.isChecked
	},
	[CHANGE_ALLCHECKED](state,payload) {
		for(let item of state.cartList) {
			item.isChecked = payload
		}
	}
}