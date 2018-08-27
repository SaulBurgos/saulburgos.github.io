const path = require('path');

module.exports = {
	mode: 'development',
	//define entry points, the root file were all the dependencies start
	entry: './src/script1.js',
	//define output
	output: {
		path: path.resolve(__dirname+ '/dist'),
		filename: 'main.js',
		publicPath: 'http://localhost:8080/'
	},
	watch: true,
	devServer: { // Automatically reload the page when compilation is done.
		inline: true
	},
	module: {
		rules: [
			{
				test: /\.scss$/, //only css files
				use: [
					{ 
						loader: 'style-loader' 
					},					
					{ 
						loader: 'css-loader' 
					},
					{
						loader: 'sass-loader',
						options: {
							//includePaths: glob.sync('packages/*/node_modules').map((d) => path.join(__dirname, d))
							//includePaths: ['./node_modules'],
							includePaths: ['./node_modules', './node_modules/@material/*'] .map((d) => path.join(__dirname, d))
						}
					}
				],
			},
			{
				test: /\.css$/,
				use: [
					{ 
						loader: 'style-loader', 
					},
					{ 
						loader: 'css-loader' 
					}
				] 
			}
		]
	}
}