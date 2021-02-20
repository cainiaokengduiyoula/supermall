import { debounce } from "common/utils"

export const itemListenerMixin = {
	data() {
		return {
			bcFunc: null
		}
	},
	mounted() {
		let deBounceRefresh = debounce(this.$refs.scroll.refresh,500)
		this.bcFunc = () => {
			deBounceRefresh()
		}
	}
}

import BackTop from 'components/content/backTop/BackTop'
export const backTopMinxin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackUp: false
    };
  },
  methods: {
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0);
    }
  }
};