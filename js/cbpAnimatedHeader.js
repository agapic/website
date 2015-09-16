/**
 * cbpAnimatedHeader.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var cbpAnimatedHeader = (function() {

	var docElem = document.documentElement,
		header = document.querySelector( '.navbar-default' ),
		didScroll = true;
		changeHeaderOn = 0;

	function init() {
		window.addEventListener( 'load', function load( event )
                                {
				didScroll = true;
				setTimeout( scrollPage, 0 );
			
		}, false );
	}

	function scrollPage() {

			classie.add( header, 'navbar-shrink' );

	}


	init();

})();