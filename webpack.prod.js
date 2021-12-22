
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');
const CssMinimizerWepPackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebPackPlugin = require('terser-webpack-plugin');


module.exports = {

	mode: 'production',
	output: {
		clean: true,
		filename: 'main.[contenthash].js',
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				loader: 'html-loader',
				options: {
					sources: false,
					minimize: false,
				},
			},
			{
				test: /\.css$/,
				exclude: /styles.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /styles.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.(png|jpe?g|gif)$/,
				use: ['file-loader'],
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env']
					},
				},
			},
		],
	},
	optimization: {
		minimize: true,
		minimizer: [
			new CssMinimizerWepPackPlugin(),
			new TerserWebPackPlugin(),
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			title: 'Mi WebPack App',
			template: './src/index.html',
			// filename: './index.html'
		}),
		new MiniCssExtractPlugin({
			linkType: "text/css",
			filename: '[name].[fullhash].css',
			ignoreOrder: false,
		}),
		new CopyWebPackPlugin({
			patterns: [
				{from: 'src/assets/', to: 'assets/'},
			],
		}),
	]

};
