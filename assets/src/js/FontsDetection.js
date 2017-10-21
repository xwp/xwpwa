import FontFaceObserver from '../../../node_modules/fontfaceobserver/fontfaceobserver.standalone.js';

const FontsDetection = {

	/**
	 * Sans-serif Font Family.
	 *
	 * @type {string}
	 */
	sansFont: 'Lato',

	/**
	 * Primary Font Family.
	 *
	 * @type {string}
	 */
	mainFont: 'Lato',

	/**
	 * Secondary Font Family.
	 *
	 * @type {string}
	 */
	secondaryFont: 'Source Serif Pro',

	/**
	 * HTML element.
	 *
	 * @type {object}
	 */
	html: {},

	/**
	 * Initialize.
	 *
	 * @returns {void}
	 */
	init() {
		this.html = document.querySelector( 'html' );

		// Setting up the cookie avoids the flash of fallback font on subsequent page views.
		if ( (  -1 !== document.cookie.indexOf( 'fonts-loaded' ) ) && ( 'undefined' !== typeof FontFaceObserver ) ) {
			const fontObserverMain = new FontFaceObserver( this.mainFont );
			const fontObserverSecondary = new FontFaceObserver( this.secondaryFont );
			Promise.all([ fontObserverMain.load(), fontObserverSecondary.load() ]).then( () => {
				this.displayCustomFonts();
				document.cookie	= 'fonts-loaded=';
			});
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
