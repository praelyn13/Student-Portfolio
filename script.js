document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Here you would typically send the data to a server
            // For this example, we'll just log it and show an alert
            console.log({ name, email, message });
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset the form
            this.reset();
        });
    }

    // Animate progress bars when skills section comes into view
    const skillsSection = document.querySelector('.skills');
    const progressBars = document.querySelectorAll('.progress');
    
    function animateProgressBars() {
        progressBars.forEach(bar => {
            const width = bar.parentElement.previousElementSibling.lastElementChild.textContent;
            bar.style.width = width + '%';
        });
    }
    
    function checkScroll() {
        const sectionTop = skillsSection.offsetTop;
        const sectionHeight = skillsSection.offsetHeight;
        const scrollPosition = window.pageYOffset;
        
        // If skills section is in viewport
        if (scrollPosition > sectionTop - window.innerHeight + sectionHeight / 2) {
            animateProgressBars();
            // Remove the event listener after animation
            window.removeEventListener('scroll', checkScroll);
        }
    }
    
    // Only add scroll event listener if skills section exists
    if (skillsSection) {
        window.addEventListener('scroll', checkScroll);
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-links') && !e.target.closest('.hamburger')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});