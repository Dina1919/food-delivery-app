import "../styles/main.css";

window.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname;
  if (
    currentPage.includes("index.html") ||
    currentPage === "/" ||
    currentPage === ""
  ) {
    setTimeout(() => {
      window.location.href = "./pages/onboarding.html";
    }, 3000);
  }
});
