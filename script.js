document.addEventListener('DOMContentLoaded', () => {
    // Glitch effect enhancement
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseover', () => {
            element.style.animation = 'none';
            element.offsetHeight; // Trigger reflow
            element.style.animation = null;
        });
    });

    // Typewriter effect for subtitle
    const subtitle = document.querySelector('.subtitle');
    if (subtitle && subtitle.textContent === 'Coming soon...') {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        let i = 0;
        
        setTimeout(() => {
            const typeWriter = () => {
                if (i < text.length) {
                    subtitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            typeWriter();
        }, 1000);
    }

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to your server
            console.log('Form submitted:', data);
            
            // Show success message
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#00cc00';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
            }, 3000);
        });
    }
}); 