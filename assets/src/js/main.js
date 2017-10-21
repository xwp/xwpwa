/* Polyfills */
import Promise from '../../../node_modules/promise-polyfill/promise';
import IntersectionObserver from '../../../node_modules/intersection-observer/intersection-observer';
import Fetch from '../../../node_modules/whatwg-fetch/fetch.js';

/* Custom Modules */
import LazyLoad from './LazyLoad';
import FontsDetection from './FontsDetection';

( function() {
	LazyLoad.init();
	FontsDetection.init();
})();
