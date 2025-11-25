document.addEventListener('DOMContentLoaded', function() {
    
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const carousel = document.getElementById('carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;
    let autoRotateInterval;
    
    function updateSlidePositions() {
        slides.forEach((slide, index) => {
            let position = (index - currentIndex + slides.length) % slides.length;
            
            slide.setAttribute('data-position', position);
            
            if (position === 0) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlidePositions();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlidePositions();
    }
    
    function startAutoRotate() {
        autoRotateInterval = setInterval(nextSlide, 1250);
    }
    
    function stopAutoRotate() {
        clearInterval(autoRotateInterval);
    }
    
    if (carousel) {
        updateSlidePositions();
        
        startAutoRotate();
        
        carousel.addEventListener('mouseenter', stopAutoRotate);
        carousel.addEventListener('mouseleave', startAutoRotate);
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                stopAutoRotate();
                nextSlide();
                startAutoRotate();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                stopAutoRotate();
                prevSlide();
                startAutoRotate();
            });
        }
    }
    
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    function showToast(message, duration = 4000) {
        if (toast && toastMessage) {
            toastMessage.textContent = message;
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, duration);
        }
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.btn-primary');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            try {
                const formData = new FormData(contactForm);
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                    showToast('✨ Message sent successfully!');
                    
                    contactForm.style.opacity = '0.6';
                    setTimeout(() => {
                        contactForm.reset();
                        contactForm.style.opacity = '1';
                    }, 250);
                } else {
                    showToast('❌ Failed to send. Please try again.');
                }
            } catch (error) {
                showToast('❌ Network error. Please try again.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.section').forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'scale(0.95)';
        section.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`;
        observer.observe(section);
    });
    
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    const cards = document.querySelectorAll('.interest-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.15}s`;
    });
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => cardObserver.observe(card));
    
    console.log('%c👋 Welcome to Naman Bhatta\'s Portfolio!', 'font-size: 20px; font-weight: bold; color: #667eea;');
    console.log('%c✈️ Exploring the world one adventure at a time', 'font-size: 14px; color: #764ba2;');
});
