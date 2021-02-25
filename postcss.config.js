module.exports = {
	syntax: 'postcss-scss',
	plugins: [
		require( '@csstools/postcss-sass' ),
		require( 'postcss-color-function' ),
		require( 'postcss-preset-env' )( {
			stage: 2,
			features: {
				'custom-properties': {
					preserve: true, // Do not remove :root selector.
				},
			},
			autoprefixer: {
				grid: true,
			},
		} ),
		require( 'postcss-clean' )
	],
};
