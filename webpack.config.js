
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');

module.exports = {

	mode: 'development',
	output: {
		clean: true,
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
		],
	},
	plugins: [
		new HtmlWebPackPlugin({
			title: 'Mi WebPack App',
			template: './src/index.html',
			// filename: './index.html'
		}),
		new MiniCssExtractPlugin({
			linkType: "text/css",
			filename: '[name].css',
			ignoreOrder: false,
		}),
		new CopyWebPackPlugin({
			patterns: [
				{from: 'src/assets/', to: 'assets/'},
			],
		})
	]

};
