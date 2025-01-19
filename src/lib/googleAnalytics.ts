export function initGoogleAnalytics() {
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
                gtag('config', 'G-LYL2HNSHV0');
            };
            console.log('Google Analytics loaded');
        }, 2000);
    });
}
