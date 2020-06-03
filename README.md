##### 命令处理
```
npm install //安装依赖
npm run dev  //本地启动项目
npm run build //打包项目生成dist文件夹
```
#### package.json
```
  --quiet 控制台中不输出打包的信息
  --compress 开启gzip压缩
  --progress 显示打包的进度
  
  "scripts": {
    "dev": "cross-env NODE_ENV=dev webpack-dev-server --quiet --config config/webpack.config.dev.js",
    "build": "cross-env NODE_ENV=prod webpack --config config/webpack.config.prod.js"
  },
```

##### 项目目录结构
```
- dist  //打包之后的项目文件,目录结构跟pages一样
- src
    - assets 全局资源目录
        - img 图片
        - js //js脚本
            - api //接口请求
            - common //公用方法
            - lib //放各种库 例如 echarts-wordcloud.min.js
        - less //less样式表
        - location_json //本地json
    - components //公共组件目录
    - pages //页面
        - index(剪刀石头布)
            - index.html
            - index.js
            - index.less
```

##### 所用技术栈
- [webpack相关学习文档比较详细](https://github.com/nicejade/nice-front-end-tutorial/blob/master/tutorial/webpack-tutorial.md)

- 构建项目
    - [node.js](http://nodejs.cn/api/) 
    - [npm](https://www.npmjs.cn/) 
    - webpack4 -[网上demo](https://www.cnblogs.com/cangqinglang/p/8964460.html)
    - plugin [安装依赖-devDependencies与dependencies的区别](https://www.cnblogs.com/hao-1234-1234/p/9718604.html)
- 页面实现
    - [vue](https://cn.vuejs.org/) 
    - [element-ui 2.4.0](https://element.eleme.cn/#/zh-CN)
    - [echart](https://echarts.baidu.com/api.html#echarts) 
    - [axios](http://www.axios-js.com/)
    - [ES6](http://es6.ruanyifeng.com/)
    - [less](http://lesscss.cn/)


    ##### 游戏如何自测
    
    首页页面url可传三个参数，分别为storeid | deviceid | userid, 不传默认为store01 | device01 | user01

    [小游戏接口参数说明文档](https://docs.qq.com/sheet/DV2lrUlRTc1pmYWVL?tab=BB08J2&c=G28A0Q0)
    ```js
    <!-- 游戏中可以自发请求测试 -->
    
    接口名：https://xapi-dev.x2era.com/api/game/push_result
    参数
    {
        'store_id':'store01',
        'device_id':'device01',
        'user_id':'user01',
        'image':'',
        'game_result':1,//1:胜，2:负
        'game_sign':1,//1:剪刀 2:石头 3:布
    }
    ```




