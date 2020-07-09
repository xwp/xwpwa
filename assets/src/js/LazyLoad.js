const LazyLoad = {

	init() {

		// If the browser support native-lazy-loading.
		// Each image get the data-src as src.
		if ( 'loading' in HTMLImageElement.prototype ) {
			const img = document.querySelectorAll( 'img.lazyload' );
			img.forEach( ( image ) => {
				image.src = image.dataset.src;
			} );
		} else {

			// Dynamically import the LazySizes library
			// to be able to use a await import, Babel must be updated to version 7
			let script = document.createElement( 'script' );
			script.async = true;
			script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/4.1.8/lazysizes.min.js';
			document.body.appendChild( script );
		}
	}
};

export default LazyLoad;
