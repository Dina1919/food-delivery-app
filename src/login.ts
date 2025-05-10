import "./styles/login.css";

const eyeIcon = document.getElementById('eyeIcon');
const eyeClosed = document.getElementById('eyeClosed');
const passwordInput = document.getElementById('password');

eyeIcon.addEventListener('click', function() {
    // تغییر وضعیت نمایش پسورد
    passwordInput.type = 'password'; // پسورد به نمایش در میاد

    // تغییر آیکون
    eyeIcon.style.display = 'none';  // مخفی کردن آیکون چشم باز
    eyeClosed.style.display = 'block'; // نمایش آیکون چشم بسته
});

eyeClosed.addEventListener('click', function() {
    // تغییر وضعیت نمایش پسورد
    passwordInput.type = 'text'; // پسورد به حالت مخفی در میاد

    // تغییر آیکون
    eyeIcon.style.display = 'block';  // نمایش آیکون چشم باز
    eyeClosed.style.display = 'none'; // مخفی کردن آیکون چشم بسته
});
