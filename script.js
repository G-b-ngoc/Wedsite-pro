window.addEventListener('load', () => {
    // Initialize EmailJS
    emailjs.init("c9F4CdfgkavuYnm0x");

    // Initialize AOS
    AOS.init({
        once: true,
        offset: 100,
    });

    // Check if we're on the homepage or login page
    if (document.getElementById('container')) {
        // Login page functionality
        const container = document.getElementById('container');
        const registerBtn = document.getElementById('register');
        const loginBtn = document.getElementById('login');
        const signUpForm = document.querySelector('.sign-up form');
        const signInForm = document.querySelector('.sign-in form');

        // Toggle between sign-in and sign-up forms
        registerBtn.addEventListener('click', () => {
            container.classList.add("active");
        });

        loginBtn.addEventListener('click', () => {
            container.classList.remove("active");
        });

        // Handle sign-up form submission
        signUpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = signUpForm.querySelector('input[type="text"]').value;
            const email = signUpForm.querySelector('input[type="email"]').value;
            const password = signUpForm.querySelector('input[type="password"]').value;

            if (name && email && password) {
                alert('Đăng ký thành công! Chuyển hướng đến trang chủ...');
                window.location.href = 'index.html';
            } else {
                alert('Vui lòng điền đầy đủ thông tin!');
            }
        });

        // Handle sign-in form submission
        signInForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = signInForm.querySelector('input[type="email"]').value;
            const password = signInForm.querySelector('input[type="password"]').value;

            if (email && password) {
                alert('Đăng nhập thành công! Chuyển hướng đến trang chủ...');
                window.location.href = 'index.html';
            } else {
                alert('Vui lòng điền đầy đủ email và mật khẩu!');
            }
        });
    }

    // Homepage functionality
    if (document.getElementById('menu-toggle')) {
        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Responsive menu toggle
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('hidden');
            navMenu.classList.toggle('flex');
            navMenu.classList.toggle('flex-col');
            navMenu.classList.toggle('absolute');
            navMenu.classList.toggle('top-16');
            navMenu.classList.toggle('left-0');
            navMenu.classList.toggle('w-full');
            navMenu.classList.toggle('bg-white');
            navMenu.classList.toggle('p-4');
        });

        // Service card toggle
        document.querySelectorAll('.grid > div').forEach(card => {
            card.addEventListener('click', () => {
                const detail = card.querySelector('.service-detail');
                detail.classList.toggle('hidden');
            });
        });

        // Contact form handling with EmailJS
        document.getElementById('submit-btn').addEventListener('click', () => {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const formMessage = document.getElementById('form-message');

            if (name && email && message) {
                emailjs.send("service_8mnecpb", "template_m4ej3j5", {
                    from_name: name,
                    from_email: email,
                    message: message,
                    to_email: "nb6761315@gmail.com"
                }).then(
                    () => {
                        formMessage.classList.remove('hidden');
                        formMessage.textContent = 'Tin nhắn đã được gửi!';
                        document.getElementById('name').value = '';
                        document.getElementById('email').value = '';
                        document.getElementById('message').value = '';
                        setTimeout(() => formMessage.classList.add('hidden'), 3000);
                    },
                    (error) => {
                        formMessage.classList.remove('hidden');
                        formMessage.classList.add('text-red-600');
                        formMessage.textContent = 'Có lỗi xảy ra, vui lòng thử lại!';
                        setTimeout(() => {
                            formMessage.classList.add('hidden');
                            formMessage.classList.remove('text-red-600');
                        }, 3000);
                    }
                );
            } else {
                formMessage.classList.remove('hidden');
                formMessage.classList.add('text-red-600');
                formMessage.textContent = 'Vui lòng điền đầy đủ thông tin!';
                setTimeout(() => {
                    formMessage.classList.add('hidden');
                    formMessage.classList.remove('text-red-600');
                }, 3000);
            }
        });

        // Back to Top button
        const backToTop = document.getElementById('back-to-top');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.remove('hidden');
            } else {
                backToTop.classList.add('hidden');
            }
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});