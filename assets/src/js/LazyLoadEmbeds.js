/**
 * Logic for lazy-loading embeds: Twitter, Instagram, Scribd.
 */

const LazyLoadEmbeds = {

	twitterElements: [],

	instagramElements: [],

	scribdElements: [],

	youtubeElements: [],

	rootMargin: '500px',

	/**
	 * Initialize.
	 *
	 * @param {object} selectors Selectors for embeds.
	 * @returns {void}
	 */
	init( selectors ) {
		this.lazyLoadTwitter( selectors.twitter );
		this.lazyLoadInstagram( selectors.instagram );
		this.lazyLoadScribd( selectors.scribd );
		this.lazyLoadYoutube( selectors.youtube );
	},

	/**
	 * Init lazy load for scribd.
	 *
	 * @param {string} selector Selector for elements.
	 * @returns {void}
	 */
	lazyLoadScribd( selector ) {
		this.scribdElements = document.querySelectorAll( selector );
		this.scribdElements.forEach( target => {
			const options = {
				rootMargin: this.rootMargin
			};
			const scribdObserver = new IntersectionObserver( this.loadScribdScripts, options );
			scribdObserver.observe( target );
		} );
	},

	/**
	 * Logic for loading scribd embed.
	 *
	 * @param {Array} entries Observed entries.
	 * @param {Object} observer Intersection observer object.
	 * @returns {void}
	 */
	loadScribdScripts( entries, observer ) {
		const isIntersecting = entries[0].isIntersecting;
		if ( isIntersecting ) {

			// Add iframe src to all Scribd iframes.
			const scribdIframes = document.querySelectorAll( '.embed-scribd iframe.scribd_iframe_embed' );
			scribdIframes.forEach( iframe => {
				if ( iframe.getAttribute( 'data-src' ) ) {
					iframe.setAttribute( 'src', iframe.getAttribute( 'data-src' ) );
					iframe.onload = function() {
						iframe.removeAttribute( 'data-src' );
					};
				}
			} );

			// Add script tag.
			const script = document.querySelector( '.embed-scribd script[data-script]' );
			if ( script ) {
				const widget = document.createElement( 'script' );
				widget.innerHTML = script.attributes['data-script'].nodeValue;

				// Add just one script for all the widgets.
				document.body.appendChild( widget );
			}
			observer.disconnect();
		}
	},

	/**
	 * Init lazy load for instagram.
	 *
	 * @param {string} selector Selector for elements.
	 * @returns {void}
	 */
	lazyLoadInstagram( selector ) {
		this.instagramElements = document.querySelectorAll( selector );
		this.instagramElements.forEach( target => {
			const options = {
				rootMargin: this.rootMargin
			};
			const instagramObserver = new IntersectionObserver( this.loadInstagramScripts, options );
			instagramObserver.observe( target );
		} );
	},

	/**
	 * Logic for loading instagram embed.
	 *
	 * @param {Array} entries Observed entries.
	 * @param {Object} observer Intersection observer object.
	 * @returns {void}
	 */
	loadInstagramScripts( entries, observer ) {
		const isIntersecting = entries[0].isIntersecting;
		if ( isIntersecting ) {
			LazyLoadEmbeds.loadScript( '.embed-instagram script' );
			observer.disconnect();
		}
	},

	/**
	 * Init lazy load for Twitter.
	 *
	 * @param {string} selector Selector for elements.
	 * @returns {void}
	 */
	lazyLoadTwitter( selector ) {
		this.twitterElements = document.querySelectorAll( selector );
		this.twitterElements.forEach( target => {
			const options = {
				rootMargin: this.rootMargin
			};
			const twitterObserver = new IntersectionObserver( this.loadTwitterScripts, options );
			twitterObserver.observe( target );
		} );
	},

	/**
	 * Logic for loading twitter embed.
	 *
	 * @param {Array} entries Observed entries.
	 * @param {Object} observer Intersection observer object.
	 * @returns {void}
	 */
	loadTwitterScripts( entries, observer ) {
		const isIntersecting = entries[0].isIntersecting;
		if ( isIntersecting ) {
			LazyLoadEmbeds.loadScript( '.embed-twitter script' );
			observer.disconnect();
		}
	},

	/**
	 * Init lazy load for Youtube.
	 *
	 * @param {string} selector Selector for elements.
	 * @returns {void}
	 */
	lazyLoadYoutube( selector ) {
		this.youtubeElements = document.querySelectorAll( selector );
		this.youtubeElements.forEach( target => {
			const options = {
				rootMargin: this.rootMargin
			};

			// Remove placeholder images
			const image = target.querySelector( '.embed-youtube__image-wrap' );
			if ( image ) {
				image.parentNode.removeChild( image );
			}

			const youtubeObserver = new IntersectionObserver( this.loadYoutubeScripts, options );
			youtubeObserver.observe( target );
		} );
	},

	/**
	 * Logic for loading Youtube embed.
	 *
	 * @param {Array} entries Observed entries.
	 * @param {Object} observer Intersection observer object.
	 * @returns {void}
	 */
	loadYoutubeScripts( entries, observer ) {
		const isIntersecting = entries[0].isIntersecting;

		if ( isIntersecting ) {

			// Add iframe src to all Youtube iframes.
			const youtubeIframes = document.querySelectorAll( '.embed-youtube iframe.youtube-player' );
			youtubeIframes.forEach( iframe => {
				if ( iframe.getAttribute( 'data-src' ) ) {
					iframe.setAttribute( 'src', iframe.getAttribute( 'data-src' ) );
					iframe.onload = function() {
						iframe.removeAttribute( 'data-src' );
					};
				}
			} );

			observer.disconnect();
		}
	},

	/**
	 * Add embed script.
	 *
	 * @param {string} selector Selector.
	 * @returns {void}
	 */
	loadScript( selector ) {
		const script = document.querySelector( selector );
		if ( script && script.attributes['data-lazy-src'] ) {
			const widget = document.createElement( 'script' );
			widget.src = script.attributes['data-lazy-src'].nodeValue;

			// Add just one script for all the widgets.
			document.body.appendChild( widget );
		}
	}
};

export default LazyLoadEmbeds;
