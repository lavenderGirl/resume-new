/*开发环境配置*/
const path = require('path')
const webpackBase = require('./webpack.config.base')
const webpackMerge = require('webpack-merge')
const webpack = require('webpack')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = webpackMerge(webpackBase, {
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    port: 9005,
    open:true,//自动打开
    hot:true,
    overlay: { // 错误、警告展示设置（页面全屏显示信息，默认关闭）
      errors: true,
      warnings: true
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 启用webpack热模块更新
    // new BundleAnalyzerPlugin()
  ],
})