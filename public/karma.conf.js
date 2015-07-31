module.exports = function(config) {
	config.set({
		frameworks: ['mocha', 'chai-as-promised', 'chai', 'sinon'],
		browsers: ['Chrome'],
		reporters: ['karmaSimpleReporter'],
		singleRun: true,

		files: [
			'build/vendor.js',
			'build/!(vendor.js).js',
			'build/*-partials.min.js',
			'node_modules/angular-mocks/angular-mocks.js',
			'test/karma/**/*.js'
		]
	});
};
