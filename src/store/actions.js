import { ADD_CARTCOUNT,ADD_CARTLIST,CHANGE_UID } from "./mutations_type"
export default {
	changeCart(context,payload) {
		return new Promise((resolve,reject) => {
			// 通过find方法进行判断carList中是否存在该商品
			// 返回的值是 cartList 中的某一个对象
			let product = context.state.cartList.find(item => item.iid === payload.iid)
			if(product) {
				context.commit(ADD_CARTCOUNT,product)
				resolve("商品数量+1")
			}else {
				payload.count = 1
				context.commit(ADD_CARTLIST,payload)
				resolve("添加商品到了购物车")
			}
		})
	}
} 