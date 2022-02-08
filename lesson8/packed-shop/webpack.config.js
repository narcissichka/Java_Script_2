const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
    module: {
        rules: [
            {

            },
        ],
    },
    plugins: [].concat(devMode ? [] : [new MiniCssExtractPlugin()]),
};

module.exports = {
    mode: 'development',
    entry: [
        './public/js/main.js',
        './public/js/CartComponent.js',
        './public/js/ErrorComp.js',
        './public/js/FilterComp.js',
        './public/js/ProductComponent.js',
        './public/js/SingleProductComp.js',
        './public/js/CarouselComponent.js',
        './public/js/ValidationComponents.js'
    ],
    output: {
        filename: "./build.js"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    'vue-style-loader',
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new HtmlWebpackPlugin({
            filename: 'catalog.html',
            template: "./public/catalog.html"
        }),
        new HtmlWebpackPlugin({
            filename: 'cart.html',
            template: "./public/cart.html"
        }),
        new HtmlWebpackPlugin({
            filename: 'catalog-men.html',
            template: "./public/catalog-men.html"
        }),
        new HtmlWebpackPlugin({
            filename: 'product.html',
            template: "./public/product.html"
        }),
        new HtmlWebpackPlugin({
            filename: 'checkout.html',
            template: "./public/checkout.html"
        }),
        new MiniCssExtractPlugin(),
        new VueLoaderPlugin(),
    ]
}
