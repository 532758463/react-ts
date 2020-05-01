const webpackMerge = require('webpack-merge');

const baseWebpackConfig = require('./webpack.common');

//对js进行打包处理的插件
const TerserPlugin = require('terser-webpack-plugin');

const webpackConfig = webpackMerge(baseWebpackConfig, {
    mode: 'production',
    stats: { children: false, warnings: false },
    optimization: {
        minimize: true,
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
                parallel: true,
                sourceMap: false,
            }),
        ],
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 3,
                    enforce: true,
                },
            },
        },
    },
});

module.exports = webpackConfig;
