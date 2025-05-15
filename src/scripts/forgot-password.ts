import "../styles/main.css";

document.addEventListener("DOMContentLoaded", () => {
  const backBtn = document.querySelector<HTMLAnchorElement>(".back-btn");
  const content = document.querySelector(".content");

  const emailInput = document.getElementById("email") as HTMLInputElement;
  const sendCodeBtn = document.querySelector(".send-code") as HTMLButtonElement;
  const form = document.querySelector(
    ".forgot-password-form"
  ) as HTMLFormElement;
  const emailError = document.getElementById("email-error")!;

  backBtn.addEventListener("click", (e) => {
    e.preventDefault();
    content?.classList.add("slide-out");

    setTimeout(() => {
      window.location.href = "../../pages/login.html";
    }, 600);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    if (!email) {
      alert("Please enter your email");
      return;
    }

    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();

    localStorage.setItem("resetEmail", email);
    localStorage.setItem("verificationCode", verificationCode);

    console.log("Mock code sent to email:", verificationCode);
    alert("Mock code: " + verificationCode);

    setTimeout(() => {
      window.location.href = "/pages/verification.html";
    }, 3000); 
  });
});
