/*生产环境配置*/
const webpackBase = require('./webpack.config.base') // 引入基础配置
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //  提取css
const webpackMerge = require('webpack-merge') // 引入 webpack-merge 插件
const CleanWebpackPlugin = require('clean-webpack-plugin') // 清理dist文件夹

let optimizeCss=require("optimize-css-assets-webpack-plugin")//优化压缩css
let uglifyjs=require("uglifyjs-webpack-plugin")//优化压缩js

// 合并配置文件
module.exports = webpackMerge(webpackBase, {
  plugins: [
    new MiniCssExtractPlugin({// 提取出的Css的相关配置
      filename: 'static/css/[name].[contenthash].css' // 文件存放路径
    }),
    new CleanWebpackPlugin(['dist'], {// 自动清理 dist 文件夹
      root: path.resolve(__dirname, '../'), // 根目录
      verbose: true, // 开启在控制台输出信息
      dry: false // 启用删除文件
    })
  ],
  optimization:{//优化项(必须用于mode:'production'，否则无效)
		minimizer:[
			new optimizeCss(),
			new uglifyjs({
				sourceMap:true,
				cache:true,
				parallel:true
			})
		],
		// splitChunks:{//分割代码块
		// 	cacheGroups:{//缓存组
		// 		// commons:{//公共的模块  
		// 		// 	chunks:'initial', //initial表示提取入口文件的公共部分
		// 		// 	minSize:30000, //表示提取公共部分最少的文件数
		// 		// 	minChunks:2,//表示提取公共部分最小的大小
		// 		// 	name: 'commonModules'//提取出来的文件命名
		// 		// },
		// 		echartsvendors:{
		// 			priority:1,
		// 			test:/echarts/,//抽离出第三方模块，如jq
		// 			chunks:'all',
		// 			minSize:30000,
		// 			minChunks:2,
		// 			name: "echarts-vendors", 
		// 		},
		// 		elementvendors:{
		// 			priority:1,
		// 			test:/element-ui/,//抽离出第三方模块，如jq
		// 			chunks:'all',
		// 			minSize:30000,
		// 			minChunks:2,
		// 			name: "element-ui", 
		// 		}
		// 	}
		// }
	},
})