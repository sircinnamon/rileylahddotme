const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.join(__dirname, "index.js"),
	output: {
		path:path.resolve(__dirname, "dist")
	},
	module: {
		rules: [
			{
				test: /\.?jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				}
			},
			{
				test: /\.(css|ico|pdf)$/,
				loader: "file-loader",
				options: {
					name: "[path][name].[ext]",
					context: "./public"
				}
			},
			{
				test: /\.json$/,
				loader: "file-loader",
				type: 'javascript/auto',
				options: {
					name: "[path][name].[ext]",
					context: "./public"
				}
			}
		]
	},
	resolve: {
		extensions: ['', '.json', '.js', '.jsx'],
		fallback: {
			"fs": false,
			"tls": false,
			"net": false,
			"path": false,
			"zlib": false,
			"http": false,
			"https": false,
			"stream": false,
	}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "index.html"),
		}),
	],
	

}