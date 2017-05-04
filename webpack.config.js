var path = require('path');
var env = process.env.WEBPACK_ENV;

module.exports = {
	entry: './src/eventer.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: env=='build' ? 'eventer.js' : 'eventer.min.js',
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
