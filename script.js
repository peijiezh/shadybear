document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation classes when elements come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .instruction-step, .about-content, .faq-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    // Initial check and add scroll listener
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Responsive navigation menu for mobile
    const createMobileMenu = () => {
        const nav = document.querySelector('nav');
        const navList = nav.querySelector('ul');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.setAttribute('aria-label', 'Toggle navigation menu');
        
        // Add button to nav
        nav.insertBefore(mobileMenuBtn, navList);
        
        // Toggle menu on button click
        mobileMenuBtn.addEventListener('click', () => {
            navList.classList.toggle('show');
            mobileMenuBtn.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && navList.classList.contains('show')) {
                navList.classList.remove('show');
                mobileMenuBtn.classList.remove('active');
            }
        });
    };
    
    // Only create mobile menu for smaller screens
    if (window.innerWidth < 768) {
        createMobileMenu();
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth < 768) {
            if (!document.querySelector('.mobile-menu-btn')) {
                createMobileMenu();
            }
        } else {
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (mobileMenuBtn) {
                mobileMenuBtn.remove();
                document.querySelector('nav ul').classList.remove('show');
            }
        }
    });
    
    // Game loading state
    const gameIframe = document.querySelector('#game iframe');
    const gameContainer = document.querySelector('.game-container');
    
    if (gameIframe) {
        // Add loading indicator
        const loadingIndicator = document.createElement('div');
        loadingIndicator.classList.add('loading-indicator');
        loadingIndicator.innerHTML = '<div class="spinner"></div><p>Loading game...</p>';
        gameContainer.appendChild(loadingIndicator);
        
        // Remove loading indicator when game loads
        gameIframe.addEventListener('load', () => {
            loadingIndicator.style.display = 'none';
        });
    }
});

// Add additional CSS for the new elements
document.head.insertAdjacentHTML('beforeend', `
<style>
    .mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        color: var(--light-text);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
    }
    
    .loading-indicator {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: rgba(26, 26, 46, 0.9);
        z-index: 5;
    }
    
    .spinner {
        width: 50px;
        height: 50px;
        border: 5px solid rgba(255, 107, 157, 0.3);
        border-radius: 50%;
        border-top-color: var(--primary-color);
        animation: spin 1s ease-in-out infinite;
        margin-bottom: 1rem;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    .feature-card, .instruction-step, .about-content, .faq-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .feature-card.animate, .instruction-step.animate, .about-content.animate, .faq-item.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block;
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
        }
        
        nav {
            position: relative;
        }
        
        nav ul {
            display: none;
            flex-direction: column;
            width: 100%;
            text-align: center;
            padding: 1rem 0;
        }
        
        nav ul.show {
            display: flex;
        }
        
        nav ul li {
            margin: 0.5rem 0;
        }
    }
</style>
`);