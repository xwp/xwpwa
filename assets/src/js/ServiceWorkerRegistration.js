const ServiceWorkerRegistration = {

	/**
	 * Initialize.
	 *
	 * @returns {void}
	 */
	init( serviceWorkerSrc ) {
		if ( 'serviceWorker' in navigator ) {
			navigator.serviceWorker.register( serviceWorkerSrc )
				.catch( function( err ) {
					console.log( 'Service Worker registration failed: ', err );
				});
		}
	}

};

export default ServiceWorkerRegistration;
