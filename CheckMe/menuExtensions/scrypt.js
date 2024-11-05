function getDeviceInfo() {
    const userAgent = navigator.userAgent;
    const browserName = navigator.appName;
    const deviceName = navigator.platform;

    document.getElementById("deviceName").textContent = deviceName;
    document.getElementById("browserName").textContent = browserName;
    document.getElementById("userAgent").textContent = userAgent;
}

async function getIPandLocation() {
    try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        document.getElementById("ipv4").textContent = ipData.ip;

        const ipv6Response = await fetch('https://api64.ipify.org?format=json');
        const ipv6Data = await ipv6Response.json();
        document.getElementById("ipv6").textContent = ipv6Data.ip;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                document.getElementById("latitude").textContent = position.coords.latitude;
                document.getElementById("longitude").textContent = position.coords.longitude;
            }, (error) => {
                document.getElementById("latitude").textContent = "Error";
                document.getElementById("longitude").textContent = "Error";
                console.log("Error getting geolocation:", error.message);
            });
        } else {
            document.getElementById("latitude").textContent = "Not supported";
            document.getElementById("longitude").textContent = "Not supported";
        }

    } catch (error) {
        document.getElementById("ipv4").textContent = "Error";
        document.getElementById("ipv6").textContent = "Error";
        console.log("Error fetching IP or location:", error.message);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    getDeviceInfo();
    getIPandLocation();
});
