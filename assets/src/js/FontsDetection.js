import FontFaceObserver from '../../../node_modules/fontfaceobserver/fontfaceobserver.standalone.js';

const FontsDetection = {

	/**
	 * HTML element.
	 *
	 * @type {object}
	 */
	html: {},

	/**
	 * Initialize.
	 *
	 * @param {Array} fontNames Array of critical fonts to load.
	 * @returns {void}
	 */
	init( fontNames ) {
		this.html = document.querySelector( 'html' );

		// Setting up the cookie avoids the flash of fallback font on subsequent page views.
		if ( -1 === document.cookie.indexOf( 'fonts-loaded' ) && 'undefined' !== typeof FontFaceObserver ) {
			const fontObserverPromises = [];
			fontNames.forEach( ( fontName ) => {
				const fontObserver = new FontFaceObserver( fontName );
				fontObserverPromises.push( fontObserver.load() );
			} );

			Promise.all( fontObserverPromises ).then( () => {
				this.displayCustomFonts();
				document.cookie	= 'fonts-loaded=';
			} );
		} else {

			// WebFonts are already cached, as the cookie is set - display them.
			this.displayCustomFonts();
		}
	},

	/**
	 * Removes html class which allows custom fonts to be displayed.
	 *
	 * @returns {void}
	 */
	displayCustomFonts() {
		this.html.classList.remove( 'fonts-loading' );
	}
};

export default FontsDetection;
