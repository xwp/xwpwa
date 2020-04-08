// https://github.com/GoogleChromeLabs/idlize/blob/master/docs/IdleQueue.md
import {IdleQueue} from 'idlize/IdleQueue.mjs';

const XwpIdleQueue = {

	/**
	 * Lazy script selector.
	 *
	 * @type {string}
	 */
	queueSelector: '[data-queue-src]',

	/**
	 * Collection of src.
	 *
	 * @type {array}
	 */
	listSrc: [],

	/**
	 * Get src of script to queue.
	 * Write these source in a function to write script in the head.
	 * Push these functions in the queue.
	 * Launch the queue
	 *
	 * @param {string} src The lazy sript src.
	 * @returns {void}
	 */
	pushLinkScripts() {
		const src = document.querySelectorAll( this.queueSelector );

		src.forEach( ( s ) => {
			this.listSrc.push( s.dataset.queueSrc );
		} );

		this.listSrc.forEach( ( source ) => {
			const fun = function() {
				let s = document.createElement( 'script' ),
					el = document.getElementsByTagName( 'script' )[0];
				s.async = 'true';
				s.src = source;
				el.parentNode.insertBefore( s, el );
			};
			window.xwpQueue.push( fun );
		} );

		this.pushInlineScripts();
	},

	/**
	 * Send all functions in the queue.
	 *
	 * @returns {void}
	 */
	pushInlineScripts() {
		const queue = new IdleQueue();
		if ( window.xwpQueue ) {
			window.xwpQueue.forEach( task =>
				queue.pushTask( task, { time: 1000 } )
			);
		} else {
			/* eslint-disable no-console */
			console.warn( 'You need to set window.xwpQueue' );
		}

	},

	init() {
		this.pushLinkScripts();
	}
};

export default XwpIdleQueue;
