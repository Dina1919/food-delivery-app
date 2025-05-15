import "../styles/main.css";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form") as HTMLFormElement;
  const emailInput = document.getElementById("email") as HTMLInputElement;
  const passwordInput = document.getElementById("password") as HTMLInputElement;
  const forgetPasswordBtn = document.querySelector(".forget-password");
  const signUpBtn = document.querySelector(".signup-btn");
  const rememberCheckbox = document.querySelector(
    'input[name="remember"]'
  ) as HTMLInputElement;

  const content = document.querySelector(".content");
  const eyeIcon = document.getElementById("eyeIcon");
  const eyeClosed = document.getElementById("eyeClosed");
  const emailError = document.getElementById("email-error")!;
  const passwordError = document.getElementById("password-error")!;

  const savedEmail = localStorage.getItem("email");
  const savedPassword = localStorage.getItem("password");

  // toggle password visibility
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

  // login submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    emailError.textContent = "";
    passwordError.textContent = "";
    emailInput.classList.remove("error");
    passwordInput.classList.remove("error");

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    let hasError = false;

    //  validate empty fields
    if (!email) {
      emailError.textContent = "Please enter your email!";
      emailInput.classList.add("error");
      hasError = true;
    }

    if (!password) {
      passwordError.textContent = "Please enter your password!";
      passwordInput.classList.add("error");
      hasError = true;
    }

    if (hasError) return;

    // check if token exists
    const storedToken = localStorage.getItem("user-token");

    if (!storedToken) {
      emailError.textContent = "No account found. Please sign up first!";
      emailInput.classList.add("error");
      return;
    }

    const user = JSON.parse(storedToken);

    // invalid credentials
    if (user.email !== email || user.password !== password) {
      emailError.textContent = "Invalid email or password!";
      emailInput.classList.add("error");
      passwordInput.classList.add("error");
      return;
    }

    // remember me
    if (rememberCheckbox.checked) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }

    // success
    alert("Login successful!");
    window.location.href = "../../pages/onboarding.html";
  });

  // live input cleanup
  emailInput.addEventListener("input", () => {
    if (emailInput.value.trim()) {
      emailInput.classList.remove("error");
      emailError.textContent = "";
    }
  });

  passwordInput.addEventListener("input", () => {
    if (passwordInput.value.trim()) {
      passwordInput.classList.remove("error");
      passwordError.textContent = "";
    }
  });

  // autofill saved credentials if available
  if (savedEmail && savedPassword) {
    emailInput.value = savedEmail;
    passwordInput.value = savedPassword;
    rememberCheckbox.checked = true;
  }

  forgetPasswordBtn.addEventListener("click", () => {
    content?.classList.add("fade-out");
    setTimeout(() => {
      window.location.href = "../../pages/forgot-password.html"
    }, 600);
  });

  signUpBtn.addEventListener("click", () => {
    content?.classList.add("fade-out");
    setTimeout(() => {
      window.location.href = "../../pages/signup.html"
    }, 600);
  });
});
