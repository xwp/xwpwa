// https://github.com/GoogleChromeLabs/idlize/blob/master/docs/IdleQueue.m
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
	 * Array with all function to write scripts.
	 *
	 * @type {array}
	 */
	queueLinkScripts: [],

	/**
	 * Write js script.
	 *
	 * @param {string} src The lazy sript src.
	 * @returns {void}
	 */
	setScript( src ) {
		let s = document.createElement( 'script' ),
			el = document.getElementsByTagName( 'script' )[0];
		s.async = 'true';
		s.src = src;
		el.parentNode.insertBefore( s, el );
	},

	/**
	 * Get src of script to queue.
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
			window.xwpQueue.push( function() {
				this.setScript( source );
			} );
		} );

		const queue = new IdleQueue();
		window.xwpQueue.forEach( task =>
			queue.pushTask( task, { time: 1000 } )
		);
	},

	/**
	 * Get src of script to queue.
	 *
	 * @param {string} src The lazy sript src.
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

		//this.pushLinkScripts();
		this.pushInlineScripts();
	}
};

export default XwpIdleQueue;
