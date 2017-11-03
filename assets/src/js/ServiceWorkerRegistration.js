const ServiceWorkerRegistration = {

	/**
	 * Initialize.
	 *
	 * @param {string} serviceWorkerSrc The absolute path to the service worker file.
	 * @returns {void}
	 */
	init( serviceWorkerSrc ) {
		if ( 'serviceWorker' in navigator ) {
			navigator.serviceWorker.register( serviceWorkerSrc );
		}
	}

};

export default ServiceWorkerRegistration;
