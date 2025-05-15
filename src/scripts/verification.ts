import "../styles/main.css";

document.addEventListener("DOMContentLoaded", () => {
  const inputs =
    document.querySelectorAll<HTMLInputElement>(".code-inputs input");
  const resendLink = document.querySelector<HTMLAnchorElement>(".resend a");
  const resendTimer = document.querySelector<HTMLSpanElement>(".resend span");
  const backBtn = document.querySelector<HTMLAnchorElement>(".back-btn");
  const content = document.querySelector(".content");
  const verifyBtn = document.querySelector(".verify-btn") as HTMLButtonElement;

  let countdown = 30;
  let timerId: number;

  verifyBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const inputs =
      document.querySelectorAll<HTMLInputElement>(".code-inputs input");
    const enteredCode = Array.from(inputs)
      .map((input) => input.value)
      .join("");

    const correctCode = localStorage.getItem("verificationCode");

    if (enteredCode === correctCode) {
      alert("Code verified! You can now reset your password.");
      window.location.href = "";
    } else {
      alert("Invalid code. Please try again.");
    }
  });

  backBtn.addEventListener("click", (e) => {
    e.preventDefault();
    content.classList.add("slide-out");
    content.addEventListener(
      "animationend",
      () => {
        window.location.href = backBtn.href;
      },
      { once: true }
    );
  });

  function startResendCountdown() {
    if (resendLink) {
      resendLink.classList.add("disabled");
      resendLink.style.pointerEvents = "none";
      resendLink.style.color = "rgba(155,155,155,0.75)";
    }
    if (resendTimer) {
      resendTimer.textContent = `in ${countdown}s`;
    }

    function updateCountdown() {
      countdown--;
      if (resendTimer) {
        resendTimer.textContent = `in ${countdown}s`;
      }
      if (countdown > 0) {
        setTimeout(updateCountdown, 1000);
      } else {
        clearResendLink();
      }
    }
    setTimeout(updateCountdown, 1000);
  }

  function clearResendLink() {
    countdown = 30;

    if (resendLink) {
      resendLink.classList.remove("disabled");
      resendLink.style.pointerEvents = "auto";
      resendLink.style.color = "#32343E";
    }
    if (resendTimer) {
      resendTimer.textContent = "";
    }
  }

  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      const value = input.value;
      if (value.length === 1 && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && input.value === "" && index > 0) {
        inputs[index - 1].focus();
      }
    });

    input.addEventListener("paste", (e: ClipboardEvent) => {
      const pasteData = e.clipboardData?.getData("text") ?? "";
      if (/^\d{4}$/.test(pasteData)) {
        e.preventDefault();
        pasteData.split("").forEach((char, i) => {
          if (inputs[i]) {
            inputs[i].value = char;
          }
        });
        inputs[3].focus();
      }
    });
  });
  resendLink?.addEventListener("click", (e) => {
    e.preventDefault();
    if (resendLink.classList.contains("disabled")) return;

    startResendCountdown();
  });

  // Start countdown when page loads
  startResendCountdown();
});
