module.exports = {
	plugins: {
		postcss: [
			require('autoprefixer')({ browsers: ['last 4 versions'] })
		]
	}
};
