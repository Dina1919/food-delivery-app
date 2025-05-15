import "../styles/main.css";

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("getLocationBtn");
  const locationInfo = document.getElementById("locationInfo");
  const mapImage = document.getElementById("map") as HTMLImageElement;

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          locationInfo.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;

          // نمایش تصویر نقشه با موقعیت کاربر
          mapImage.src = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=300x200&markers=color:red%7C${latitude},${longitude}&key=AIzaSyD9E9rljQBWjAJzToMCXeFScg5buBNTB_k`;

          setTimeout(() => {
            window.location.href = "../../pages/login.html";
          }, 3000);
        },
        (error) => {
          locationInfo.textContent = `Error: ${error.message}. please allow to access location manually or reset permission. `;
        }
      );
    } else {
      locationInfo.textContent =
        "Geolocation is not supported by your browser.";
    }
  });
});
