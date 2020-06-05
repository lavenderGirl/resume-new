let webpack = require('webpack');
let path = require('path');
const glob = require('glob');

let Entries = {} // 保存文件入口
const pages = []// 存放html-webpack-plugin实例
const env = process.env.NODE_ENV !== 'prod' // 判断运行环境

const HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');//抽离css样式
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const { VueLoaderPlugin } = require('vue-loader'); 
let CopyWebpackPlugin = require('copy-webpack-plugin');

// 获取html-webpack-plugin实例集合
(function () {
	console.log('当前执行环境是：' + process.env.NODE_ENV);
    const result = glob.sync(`src/pages/**/*.js`);
	const config = {hash: true,inject: true};
	Entries['common'] = path.resolve(__dirname, `../src/assets/js/common/commonCss.js`);
    result.forEach(item => {
		//例如 item:src/pages/dzsp/jd/index.js
		const one = path.parse(item);
		/*one = { root: '',dir: 'src/pages/dzsp/jd',base: 'index.js',ext: '.js',name: 'index' }*/
		const nextFile = one.dir.split('/').length == 4?one.dir.split('/').slice(-2)[0]:'';
		//nextFile is:dzsp
		const outputfile = one.dir.split('/').slice(-1)[0];
		// console.log('outputfile is:' + outputfile);
		//outputfile is:jd
		const entriesFile = nextFile?nextFile + outputfile:outputfile;
		//entriesFile is:dzspjd
		Entries[entriesFile] = path.resolve(__dirname, '../' + item);
		const filePaths = nextFile?nextFile + '/' + outputfile : '/' + outputfile;
		//filePaths is:dzsp/jd
        pages.push(
            new HtmlWebpackPlugin({
                ...config,
                template: path.resolve(__dirname,'../' + one.dir + '/index.html'),
				filename: outputfile === 'index' ? './index.html' : './' + filePaths + '/index.html', // 输出html文件的路径
				// filename:'./' + outputfile + '.html',
                chunks: [entriesFile,'common'],
				inlineSource:  '.(js|css)$',
				favicon: '', // 添加小图标
                minify: {// 配置生成的html文件的压缩配置
                    collapseWhitespace: true,
                    collapseInlineTagWhitespace: true,
                    conservativeCollapse: true,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: true,
                    trimCustomFragments: true
                }
            }),
        );
        pages.push(
            new HtmlWebpackInlineSourcePlugin()
        )
	});
})()

module.exports = {
	entry: Entries,
	mode:'none',
	// devtool: env?'eval-source-map':'none',
	devtool:'eval-source-map',
	watch:true,
	watchOptions:{
		poll:1000,//每秒检查一次变动
		aggregateTimeout:500,//防抖  我一直输入代码
		ignored:/node_modules///不需要监控哪个文件
	},
	output:{
		//打包之后输出的文件名,防止文件缓存
		filename:env?'static/js/[name].[hash:4].js':'static/js/[name].[chunkhash].js',
		//__dirname，就是当前webpack.config.js文件所在的绝对路径
		//输出路径，要用绝对路径
        path: path.resolve(__dirname, '../dist'), // 输出目录，所有文件的输出路径都基于此路径之上(需要绝对路径)
	},
	resolve:{
		//添加在此的后缀所对应的文件可以省略后缀
		extensions: ['.js', '.vue', '.json','.css','.png','.jpg'], 
	    alias: { //别名
	      	vue             : 'vue/dist/vue.js',//防止使用错误版本导致报错
			commonLess      : path.resolve(__dirname,'../src/assets/less/'),
			commonJs        : path.resolve(__dirname,'../src/assets/js/'),
            components      : path.resolve(__dirname,'../src/components/'),
	    }
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				use: [
					env ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ]
			},
			{
                test: /\.(less)$/,
                use: [
				  env ? 'style-loader' : MiniCssExtractPlugin.loader,
                  'css-loader',
                  'postcss-loader',
                  'less-loader'
                ]
            },
			{
		      test: /\.vue$/, // 处理vue模块
		      use: 'vue-loader',
		    //   include:path.resolve(__dirname,"src"),
		    },
			{
				test:/\.js$/,
				exclude:/node_modules/,
				// include:path.resolve(__dirname,"src"),
				use:{
					loader:'babel-loader',
					options:{
						cacheDirectory:true
					}
				}
			},
			{ 
				test: /\.html$/, //处理html中的图片
				use: 'html-withimg-loader' 
			},
			{
                test: /\.(png|jpg|gif|svg)$/,
                use: [{
                  loader: 'url-loader',
                  options: {
                    limit: 10000, // 设置图像大小超过多少转存为单独图片
					name: '[name].[hash:4].[ext]', // 转存的图片目录
					outputPath: 'static/img/',
					// publicPath:env?'../static/img/':'/static/img/'
					publicPath:'/static/img/'
				  }
                }]
            },
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				exclude:/CDN/,
                use: ['url-loader']
            }
		]
	},
	externals:{ 
		//以sadp/dpxx/index.html为例
		//配置externals之后 再在html引入相应的/CDN文件 就不会打包进js里了
		// vue:'Vue',
		// element:'element-ui',
		// vant:'vant'
	},
	plugins:[
		//提供全局的变量，在模块中使用无需用require引入
        new webpack.ProvidePlugin({
			vue:'vue',
			element:'element-ui',
			axios:'axios',
			vant:'vant'
		}),
		new VueLoaderPlugin(), 
		...pages,
		new CopyWebpackPlugin([{
            from: 'src/assets/js/lib',
            to: 'CDN'
        }], {
            ignore: [],
            copyUnmodified: true
        })
	],
    // 配置webpack执行相关
    performance: {
        maxEntrypointSize: 1000000, // 最大入口文件大小1M
		maxAssetSize: 1000000, // 最大资源文件大小1M
		// hints:false  //禁止输出warning in asset size limit...
    }
};
