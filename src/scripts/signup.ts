import "../styles/main.css";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".signup-form") as HTMLFormElement;
  const nameInput = document.getElementById("name") as HTMLInputElement;
  const emailInput = document.getElementById("email") as HTMLInputElement;
  const passwordInput = document.getElementById("password") as HTMLInputElement;
  const confirmPasswordInput = document.getElementById(
      "confirm-password"
  ) as HTMLInputElement;

  const content = document.querySelector(".content");
  const backBtn = document.querySelector(".back-btn");
  const eyeIcon = document.getElementById("eye-icon");
  const eyeClosed = document.getElementById("eye-closed");
  const confirmPasswordEyeIcon = document.getElementById(
      "eye-icon-confirm-password"
  );
  const confirmPasswordEyeClosed = document.getElementById(
      "eye-closed-confirm-password"
  );

  const allFieldsError = document.getElementById("all-fields-error")!;
  const fieldErrors: { [key: string]: string | null } = {};
  const existingUser = localStorage.getItem("user-token");

// toggle visibility
  eyeIcon?.addEventListener("click", () => {
    passwordInput.type = "password";
    eyeIcon.style.display = "none";
    eyeClosed!.style.display = "block";
  });
  eyeClosed?.addEventListener("click", () => {
    passwordInput.type = "text";
    eyeIcon!.style.display = "block";
    eyeClosed.style.display = "none";
  });
  confirmPasswordEyeIcon?.addEventListener("click", () => {
    confirmPasswordInput.type = "password";
    confirmPasswordEyeIcon.style.display = "none";
    confirmPasswordEyeClosed!.style.display = "block";
  });
  confirmPasswordEyeClosed?.addEventListener("click", () => {
    confirmPasswordInput.type = "text";
    confirmPasswordEyeIcon!.style.display = "block";
    confirmPasswordEyeClosed.style.display = "none";
  });

  function updateErrorMessages(field: string, message: string | null) {
    fieldErrors[field] = message;
    const messages = Object.values(fieldErrors).filter(Boolean) as string[];
    allFieldsError.innerHTML = messages.join("<br>");
  }

  function isStrongPassword(password: string): boolean {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
    const hasNoSpaces = !/\s/.test(password);
    return (
        password.length >= 8 &&
        hasUpper &&
        hasLower &&
        hasNumber &&
        hasSymbol &&
        hasNoSpaces
    );
  }

  nameInput.addEventListener("input", () => {
    const value = nameInput.value.trim();
    if (value) {
      nameInput.classList.remove("error");
      updateErrorMessages("name", null);
    } else {
      nameInput.classList.add("error");
      updateErrorMessages("name", "Please enter your name!");
    }
  });

  emailInput.addEventListener("input", () => {
    const value = emailInput.value.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (isValidEmail) {
      emailInput.classList.remove("error");
      updateErrorMessages("email", null);
    } else {
      emailInput.classList.add("error");
      updateErrorMessages("email", "Please enter a valid email address!");
    }
  });

  passwordInput.addEventListener("input", () => {
    const value = passwordInput.value;
    if (/\s/.test(value)) {
      passwordInput.classList.add("error");
      updateErrorMessages("password", "Password must not contain spaces.");
    } else if (!isStrongPassword(value)) {
      passwordInput.classList.add("error");
      updateErrorMessages(
          "password",
          "Password must be at least 8 characters and include uppercase, lowercase, number, and symbol."
      );
    } else {
      passwordInput.classList.remove("error");
      updateErrorMessages("password", null);
    }
  });

  passwordInput.addEventListener("keydown", (e) => {
    if (e.key === " ") e.preventDefault();
  });

  confirmPasswordInput.addEventListener("keydown", (e) => {
    if (e.key === " ") e.preventDefault();
  });

  confirmPasswordInput.addEventListener("input", () => {
    const passwordValue = passwordInput.value;
    const confirmValue = confirmPasswordInput.value;
    if (confirmValue && confirmValue === passwordValue) {
      confirmPasswordInput.classList.remove("error");
      updateErrorMessages("confirmPassword", null);
    } else {
      confirmPasswordInput.classList.add("error");
      updateErrorMessages("confirmPassword", "Passwords do not match!");
    }
  });

  form.addEventListener("submit", (e) => {
    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value;
    const confirmPasswordValue = confirmPasswordInput.value;
    const token = {
      name: nameValue,
      email: emailValue,
      password: passwordValue,
    };

    let hasError = false;
    allFieldsError.innerHTML = "";

    if (!nameValue && !emailValue && !passwordValue && !confirmPasswordValue) {
      updateErrorMessages("all", "All fields are required");
      nameInput.classList.add("error");
      emailInput.classList.add("error");
      passwordInput.classList.add("error");
      confirmPasswordInput.classList.add("error");
      e.preventDefault();
      return;
    }

    if (!nameValue) {
      nameInput.classList.add("error");
      updateErrorMessages("name", "Please enter your name!");
      hasError = true;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      emailInput.classList.add("error");
      updateErrorMessages("email", "Please enter a valid email address!");
      hasError = true;
    }

    if (/\s/.test(passwordValue)) {
      passwordInput.classList.add("error");
      updateErrorMessages("password", "Password must not contain spaces.");
      hasError = true;
    } else if (!isStrongPassword(passwordValue)) {
      passwordInput.classList.add("error");
      updateErrorMessages(
          "password",
          "Password must be at least 8 characters and include uppercase, lowercase, number, and symbol."
      );
      hasError = true;
    }

    if (passwordValue !== confirmPasswordValue) {
      confirmPasswordInput.classList.add("error");
      updateErrorMessages("confirmPassword", "Passwords do not match!");
      hasError = true;
    }

    if (hasError) {
      e.preventDefault();
      return;
    }

    if (existingUser) {
      const parsed = JSON.parse(existingUser);
      if (parsed.email === emailValue) {
        updateErrorMessages("email", "This email is already registered!");
        emailInput.classList.add("error");
        e.preventDefault();
        return;
      }
    }
    localStorage.setItem("user-token", JSON.stringify(token));

  });

  backBtn.addEventListener("click", () => {
    content?.classList.add("slide-out");
    setTimeout(() => {
      window.location.href = "../../pages/login.html"
    }, 600);
  });
});