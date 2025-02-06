export function initGoogleAnalytics() {
	window.addEventListener('load', function () {
		// Ensure all resources are loaded
		window.addEventListener('load', function () {
			setTimeout(function () {
				var script = document.createElement('script');
				script.src = 'https://www.googletagmanager.com/gtag/js?id=G-LYL2HNSHV0';
				script.async = true;
				script.defer = true;
				document.head.appendChild(script);
				// ID-en hentes fra Google Analytics
				script.onload = function () {
					window.dataLayer = window.dataLayer || [];
					function gtag(...args: any[]) {
						window.dataLayer.push(arguments);
					}
					gtag('js', new Date());
					gtag('config', 'G-2GB2CHNFXH');
				};
				console.log('Google Analytics loaded');
			}, 5000); // Delay by 5 seconds after the load event
		});
	});
}
