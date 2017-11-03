/* global IOlazy */
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
	 * @param {string} lazySelector The lazy loaded images selector.
	 * @returns {void}
	 */
	init( lazySelector ) {
		this.html = document.querySelector( 'html' );
		this.html.classList.remove( 'no-js' );

		if ( lazySelector ) {
			this.lazySelector = lazySelector;
		} else {
			this.lazySelector = 'img';
		}

		if ( 'undefined' !== typeof IOlazy ) {
			document.addEventListener( 'DOMContentLoaded', () => {
				/* eslint-disable no-new */
				new IOlazy( {
					image: this.lazySelector
				} );
				/* eslint-enable no-new */
			} );
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
		} );
	}
};

export default LazyLoad;
