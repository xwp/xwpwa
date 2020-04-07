const LazyLoad = {

	checkLazyLoadAttribute() {

		// If the browser support native-lazy-loading.
		// Each image get the data-src as src.
		if ( 'loading' in HTMLImageElement.prototype ) {
			console.log( 'inside' ); // eslint-disable-line no-console
			const img = document.querySelectorAll( 'img.lazyload' );
			img.forEach( ( image ) => {
				console.log( image ); // eslint-disable-line no-console
				image.src = image.dataset.src;
			});// eslint-disable-line space-in-parens
		} else {

			// Dynamically import the LazySizes library
			// to be able to use a await import, Babel must be updated to version 7
			let script = document.createElement( 'script' );
			script.async = true;
			script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/4.1.8/lazysizes.min.js';
			document.body.appendChild( script );
		}
	},

	init() {
		this.checkLazyLoadAttribute();
	}
};

export default LazyLoad;
