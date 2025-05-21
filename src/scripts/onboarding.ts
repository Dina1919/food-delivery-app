import "../styles/main.css";

window.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.querySelector(".next-btn") as HTMLButtonElement;
  const skipBtn = document.querySelector(".skip-btn") as HTMLAnchorElement;
  const steps = document.querySelectorAll<HTMLElement>(".step");
  const dots = document.querySelectorAll<HTMLElement>(".dot");
  const content = document.querySelector(".content")!;

  let currentStep = 0;
  let touchStartX = 0;
  let touchEndX = 0;
  const threshold = 50;

  // اگر آنبوردینگ قبلاً دیده شده، مستقیم به صفحه بعد برو
  if (localStorage.getItem("onboardingShown") === "true") {
    window.location.href = "../../pages/location.html";
  }

  function updateStepClasses(
    prevIndex: number,
    nextIndex: number,
    direction: "left" | "right"
  ) {
    const current = steps[prevIndex];
    const next = steps[nextIndex];

    current.classList.add(direction === "left" ? "exit-left" : "exit-right");
    dots[prevIndex].classList.remove("active");
    setTimeout(() => {
      current.classList.remove("active", "exit-left", "exit-right");
      current.style.display = "none";
    }, 400);
    next.style.display = "flex";
    setTimeout(() => next.classList.add("active"), 10);
    dots[nextIndex].classList.add("active");
  }

  function goToNextStep() {
    if (currentStep >= steps.length - 1) {
      // فقط با کلیک روی دکمه مجاز به ورود هستیم
      window.location.href = "../../pages/location.html";
      return;
    }
    const prevStep = currentStep;
    currentStep++;
    updateStepClasses(prevStep, currentStep, "left");
    if (currentStep === steps.length - 1) {
      nextBtn.textContent = "Get Started";
      skipBtn.style.display = "none";
    }
  }

  function goToPrevStep() {
    if (currentStep === 0) return;
    const prevStep = currentStep;
    currentStep--;
    updateStepClasses(prevStep, currentStep, "right");
    nextBtn.textContent = "Next";
    skipBtn.style.display = "flex";
  }

  function handleSwipeGesture() {
    const isLastStep = currentStep === steps.length - 1;
    if (!isLastStep && touchStartX - touchEndX > threshold) {
      goToNextStep();
    } else if (currentStep > 0 && touchEndX - touchStartX > threshold) {
      goToPrevStep();
    }
  }

  //swipe touch
  content.addEventListener("touchstart", (e) => {
    const touchEvent = e as TouchEvent;
    touchStartX = touchEvent.changedTouches[0].screenX;
  });

  content.addEventListener("touchend", (e) => {
    const touchEvent = e as TouchEvent;
    touchEndX = touchEvent.changedTouches[0].screenX;
    handleSwipeGesture();
  });

  nextBtn.addEventListener("click", () => {
    if (currentStep === steps.length - 1) {
      localStorage.setItem("onboardingShown", "true");
      window.location.href = "../../pages/location.html";
    } else {
      goToNextStep();
    }
  });

  skipBtn.addEventListener("click", () => {
    localStorage.setItem("onboardingShown", "true");
    window.location.href = "../../pages/location.html";
  });
});
