import "./styles/location.css";

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("getLocationBtn");
    const locationInfo = document.getElementById("locationInfo");
    const mapImage = document.getElementById("map") as HTMLImageElement;

    btn.addEventListener("click", (e) => {
        e.preventDefault(); // چون <a> هست، نذار صفحه رفرش بشه

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const {latitude, longitude} = position.coords;
                    locationInfo.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;

                    // نمایش تصویر نقشه با موقعیت کاربر
                    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=300x200&markers=color:red%7C${latitude},${longitude}&key=AIzaSyD9E9rljQBWjAJzToMCXeFScg5buBNTB_k`;
                    mapImage.src = mapUrl;

                    // بعد از گرفتن لوکیشن برو به صفحه لاگین
                    setTimeout(() => {
                        window.location.href = "/src/pages/login.html";
                    }, 3000);

                },
                (error) => {
                    locationInfo.textContent = `Error: ${error.message}. please allow to access location manually or reset permission. `;
                }
            );
        } else {
            locationInfo.textContent = "Geolocation is not supported by your browser.";
        }s
    });
});
  