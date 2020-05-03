const webpackMerge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseWebpackConfig = require('./webpack.common');
const MinCssExtractPlugin = require('mini-css-extract-plugin');

//对js进行打包处理的插件
const TerserPlugin = require('terser-webpack-plugin');

const webpackConfig = webpackMerge(baseWebpackConfig, {
    mode: 'production',
    stats: { children: false, warnings: false },
    plugins: [
        //对css进行抽离
        new MinCssExtractPlugin({
            // contenthash：CSS 文件特有的 hash 值，是根据 CSS 文件内容计算出来的，CSS 发生变化则其值发生变化，**推荐 CSS 导出中使用**。
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[id].[contenthash:8].css',
            ignoreOrder: false,
        }),
    ],
    optimization: {
        minimize: true,
        concatenateModules: true, // 开启 Scope-Hosting
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    warnings: false,
                    compress: {
                        warnings: false,
                        // 是否注释掉console
                        drop_console: false,
                        dead_code: true,
                        drop_debugger: true,
                    },
                    output: {
                        comments: false,
                        beautify: false,
                    },
                    mangle: true,
                },
                cache: true,
                //开启多线程
                parallel: true,
                sourceMap: false,
            }),
            //对css进行压缩
            new OptimizeCSSAssetsPlugin(),
        ],
        //分割代码
        splitChunks: {
            chunks: 'all',
            /**
             * initial 入口 chunk 对于异步导入的文件不处理
             * async 异步 chunk支队异步导入的文件处理
             * all 全部 chunk
             */

            //缓存分组
            cacheGroups: {
                //第三方模块，如lodash
                vendor: {
                    name: 'vendor', // chunk名称
                    priority: 1, //权限更高，优先抽离,重要！！！
                    test: /node_modules/,
                    // maxSize: 0, //大小限制
                    // minChunks:1   //最少使用次数
                },
                commons: {
                    name: 'commons', //chunk 名称
                    chunks: 'initial',
                    priority: 0,
                    minChunks: 3,
                    enforce: true,
                },
            },
        },
    },
});

module.exports = webpackConfig;
