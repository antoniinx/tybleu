document.addEventListener('DOMContentLoaded', () => {
    // Glitch effect enhancement
    const glitchText = document.querySelector('.glitch');
    const originalText = glitchText.textContent;
    
    function createGlitchEffect() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let iterations = 0;
        const maxIterations = 3;
        
        const interval = setInterval(() => {
            glitchText.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (char === ' ') return ' ';
                    if (iterations >= index) {
                        return originalText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');
            
            iterations += 1/3;
            
            if (iterations >= maxIterations) {
                clearInterval(interval);
                glitchText.textContent = originalText;
            }
        }, 30);
    }

    // Trigger glitch effect on hover
    glitchText.addEventListener('mouseover', createGlitchEffect);

    // Add typing effect to subtitle
    const subtitle = document.querySelector('.subtitle');
    const subtitleText = subtitle.textContent;
    subtitle.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < subtitleText.length) {
            subtitle.textContent += subtitleText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
}); 