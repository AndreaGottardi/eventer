var path = require('path');

module.exports = {
	entry: './src/eventer.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'eventer.js',
		library: 'Eventer',
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	module: {
		rules: [{
			test: /(\.jsx|\.js)$/,
			loader: 'babel-loader',
			exclude: /(node_modules|bower_components)/
		}]
	},
};
