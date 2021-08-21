const __DEV__ = process.env.NODE_ENV !== 'production';
const { loader } = require('mini-css-extract-plugin');
const fs = require('fs');
const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

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

const resolve = {
    modules: ['node_modules', resolveApp('src')],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
        '@': resolveApp('src'),
        '@assets': resolveApp('src/assets'),
        '@components': resolveApp('src/components'),
        '@constants': resolveApp('src/constants'),
        '@pages': resolveApp('src/pages'),
        '@services': resolveApp('src/services'),
        '@utils': resolveApp('src/utils'),
        '@locales': resolveApp('src/locales'),
    },
};

module.exports = {
    getCssLoaders,
    resolveApp,
    resolve,
};
