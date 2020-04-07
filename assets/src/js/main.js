/* Polyfills */
/* eslint-disable no-unused-vars */
import Promise from '../../../node_modules/promise-polyfill/promise';
import IntersectionObserver from '../../../node_modules/intersection-observer/intersection-observer';
import Fetch from '../../../node_modules/whatwg-fetch/fetch.js';
/* eslint-enable no-unused-vars */

/* Custom Modules */
import LazyLoad from './LazyLoad';
import XwpIdleQueue from './IdleQueue';
import LazyLoadEmbeds from './LazyLoadEmbeds';
import FontsDetection from './FontsDetection';

// import ServiceWorkerRegistration from './ServiceWorkerRegistration';

( function() {
	LazyLoad.init();
	XwpIdleQueue.init();
	LazyLoadEmbeds.init( {
		twitter: '.embed-twitter',
		instagram: '.embed-instagram',
		scribd: '.embed-scribd'
	} );
	FontsDetection.init( [ 'Lato', 'Source Serif Pro' ] );

	// ServiceWorkerRegistration.init( '/sw.js' );
} )();
