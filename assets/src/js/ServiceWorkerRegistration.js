const ServiceWorkerRegistration = {

	/**
	 * Initialize.
	 *
	 * @returns {void}
	 */
	init( serviceWorkerSrc ) {
		if ( 'serviceWorker' in navigator ) {
			navigator.serviceWorker.register( serviceWorkerSrc )
				.then( function( registration ) {
					console.log( 'Service Worker registration successful with scope: ',
						registration.scope );
				})
				.catch( function( err ) {
					console.log( 'Service Worker registration failed: ', err );
				});
		}
	}

};

export default ServiceWorkerRegistration;
