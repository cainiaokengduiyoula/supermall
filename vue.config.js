module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
				'store': '@/store'
      }
    }
  },
	// 用于部署项目到Apache上
	// publicPath : '/Demo/dist'
	
	// 用于部署到Tomcat
		publicPath: './',
}
