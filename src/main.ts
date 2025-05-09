import "./styles/style.css";

window.addEventListener("DOMContentLoaded", () => {
  // لود شدن صفحه آنبوردینگ پس از سه ثانیه
  setTimeout(() => {
    window.location.href = "/src/pages/onboarding.html";
  }, 3000);
});
