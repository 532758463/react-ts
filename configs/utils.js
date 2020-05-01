const __DEV__ = process.env.NODE_ENV !== 'production';

const { loader } = require('mini-css-extract-plugin');

function getCssLoaders(importLoaders) {
    return [
        __DEV__ ? 'style-loader' : loader,
        {
            loader: 'css-loader',
            options: {
                modules: false,
                // 前面使用的每一个 loader 都需要指定 sourceMap 选项
                sourceMap: true,
                // 指定在 css-loader 前应用的 loader 的数量
                importLoaders,
            },
        },
        {
            loader: 'postcss-loader',
            options: { sourceMap: true },
        },
    ];
}

module.exports = {
    getCssLoaders,
};
