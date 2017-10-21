import '../vendor/io-lazyload/iolazy.js';

const LazyLoad = {

	/**
	 * Lazy images selector.
	 *
	 * @type {string}
	 */
	lazySelector: 'img',

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
		this.html.classList.remove( 'no-js' );

		if ( 'undefined' !== typeof IOlazy ) {
			document.addEventListener( 'DOMContentLoaded', () => {
				new IOlazy({
					image: this.lazySelector
				});
			});
		} else {
			this.basicLazyLoad();
		}
	},

	/**
	 * Basic lazy load fallback.
	 * Inspired from: https://davidwalsh.name/lazyload-image-fade
	 *
	 * @returns {void}
	 */
	basicLazyLoad() {
		[].forEach.call( document.querySelectorAll( this.lazySelector ), function( img ) {
			if ( img.getAttribute( 'data-src' ) ) {
				img.setAttribute( 'src', img.getAttribute( 'data-src' ) );
			}
			if ( img.getAttribute( 'data-srcset' ) ) {
				img.setAttribute( 'srcset', img.getAttribute( 'data-srcset' ) );
			}
			img.onload = function() {
				img.removeAttribute( 'data-src' );
				img.removeAttribute( 'data-srcset' );
			};
		});
	}
};

export default LazyLoad;
