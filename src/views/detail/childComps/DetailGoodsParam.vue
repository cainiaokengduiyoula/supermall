<template>
	 <div class="detail-goods-param" v-if="Object.keys(paramsInfo).length != 0">
	    <table class="params-rule">
	      <tbody>
	        <tr
	          v-for="(item, index) in paramsInfo.sizes[0]"
	          :key="index"
						v-if="item[1] != '-'"
	        >
	          <th>{{ item[0] }}</th>
	          <td v-for="(td_item, td_index) in item.length - 1" :key="td_index">
	            {{ item[td_item] }}
	          </td>
	        </tr>
	      </tbody>
	    </table>
	    <table class="params-set">
	      <tbody>
	        <tr v-for="(item, index) in paramsInfo.infos" :key="index">
	          <th>{{ item.key }}</th>
	          <td>{{ item.value }}</td>
	        </tr>
	      </tbody>
	    </table>
	  </div>
</template>

<script>
	export default {
		name: "DetailGoodsParam",
		props: {
			paramsInfo: {
				type: Object,
				default() {
					return {}
				}
			}
		}
	}
</script>

<style scoped>
	.params-rule,
	.params-set {
		width: 100%;
		padding: 10px 0px;
		border-bottom: 2px solid #E9E9E9;
	}
	.params-rule tr,
	.params-set tr{
		display: flex;
		width: 100%;
		padding: 10px;
	}
	.params-rule tr:not(:last-of-type),
	.params-set tr:not(:last-of-type){
		border-bottom: 1px solid #E9E9E9;
	}
	.params-rule tr th,
	.params-rule tr td,
	.params-set tr td {
		flex: 1;
	}
	.params-set tr th {
		flex: .5;
	}
	.params-rule tr th,
	.params-set tr th,
	.params-set tr td {
		text-align: left;
	}
	.params-rule tr td{
		text-align: center;
	}
	.params-set tr td {
		color: #FF5777;
	}
</style>
