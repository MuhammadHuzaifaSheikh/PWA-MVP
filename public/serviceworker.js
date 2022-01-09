let cacheData = "appV1";
this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                '/static/js/main.chunk.js',
                '/static/js/0.chunk.js',
                '/static/js/bundle.js',
                '/static/css/main.chunk.css',
                '/index.html',
                '/',
                "/login",
                "/task",
                "/todos",
                "/blog/:id",
                "/settingscreen",
                "/privacypolicy",
                "/instascreen"
            ])
        })
    )
})



this.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((resp) => {
            if (resp) {
                return resp
            }
            let requestUrl = event.request.clone();
            console.log("requestUrl", requestUrl)
            fetch(requestUrl)
        })
    )
})