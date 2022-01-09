export default function swDev() {
    // if (!navigator.onLine) {
    let swUrl = `/serviceworker.js`
    navigator.serviceWorker.register(swUrl).then((response) => {
            console.warn("response", response)

        })
        // }
}