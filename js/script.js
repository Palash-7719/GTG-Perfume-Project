// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initGallery();
    initRadioButtons();
    initCounterAnimation();
    initAccordion();
    initMobileMenu();
    initScrollAnimations();
});

// Gallery Functionality
function initGallery() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const thumbs = document.querySelectorAll('.thumb');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        thumbs.forEach(thumb => thumb.classList.remove('active'));
        
        // Show current slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        thumbs[index].classList.add('active');
        
        currentIndex = index;
    }

    function nextSlide() {
        const nextIndex = (currentIndex + 1) % totalSlides;
        showSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(prevIndex);
    }

    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    thumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', () => showSlide(index));
    });

    // Auto-play gallery
    setInterval(nextSlide, 5000);
}

// Radio Button Functionality
function initRadioButtons() {
    const subscriptionRadios = document.querySelectorAll('input[name="subscription"]');
    const fragranceRadios = document.querySelectorAll('input[name="fragrance"]');
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    
    let selectedSubscription = 'single';
    let selectedFragrance = 'original';

    function updateCartButton() {
        const combinations = {
            'single-original': 'Add to Cart - Single Original',
            'single-lily': 'Add to Cart - Single Lily',
            'single-rose': 'Add to Cart - Single Rose',
            'double-original': 'Add to Cart - Double Original',
            'double-lily': 'Add to Cart - Double Lily',
            'double-rose': 'Add to Cart - Double Rose'
        };
        
        const key = `${selectedSubscription}-${selectedFragrance}`;
        const buttonText = combinations[key] || 'Add to Cart';
        
        if (addToCartBtn) {
            addToCartBtn.textContent = buttonText;
        }
    }

    // Subscription radio change
    subscriptionRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            selectedSubscription = this.value;
            updateCartButton();
            
            // Update subscription card styling
            const subscriptionCards = document.querySelectorAll('.subscription-card');
            subscriptionCards.forEach(card => {
                card.classList.remove('active');
            });
            
            if (this.value === 'single') {
                document.getElementById('single-subscription').classList.add('active');
            } else {
                document.getElementById('double-subscription').classList.add('active');
            }
        });
    });

    // Fragrance radio change
    fragranceRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            selectedFragrance = this.value;
            updateCartButton();
            
            // Update fragrance card styling
            const fragranceCards = document.querySelectorAll('.fragrance-card');
            fragranceCards.forEach(card => {
                card.classList.remove('selected');
            });
            
            const selectedCard = this.closest('.fragrance-card');
            if (selectedCard) {
                selectedCard.classList.add('selected');
            }
        });
    });

    // Initialize with default selections
    updateCartButton();
}

// Counter Animation
function initCounterAnimation() {
    const counters = document.querySelectorAll('.percentage-number');
    
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    }

    // Intersection Observer for counter animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Accordion Functionality
function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all accordion items
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Mobile Menu Functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.hero-content, .product-content, .collection-content, .comparison-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        if (email) {
            // Simulate form submission
            alert('Thank you for subscribing!');
            this.reset();
        }
    });
}

// Add to cart button functionality
const addToCartBtn = document.getElementById('add-to-cart-btn');
if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
        // Simulate adding to cart
        const originalText = this.textContent;
        this.textContent = 'Added to Cart!';
        this.style.background = '#00C950';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.background = 'linear-gradient(180deg, #032E15 0%, #016630 100%)';
        }, 2000);
    });
}

// Search functionality
const searchBtn = document.querySelector('.search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', function() {
        // Simulate search functionality
        const searchTerm = prompt('Enter your search term:');
        if (searchTerm) {
            alert(`Searching for: ${searchTerm}`);
        }
    });
}

// Dropdown functionality
const navDropdown = document.querySelector('.nav-dropdown');
if (navDropdown) {
    navDropdown.addEventListener('click', function() {
        // Simulate dropdown functionality
        alert('Shop dropdown menu would open here');
    });
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Handle scroll-based animations or effects
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-bg');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Initialize tooltips for better UX
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Initialize tooltips
initTooltips();

// Error handling for missing images
function handleImageErrors() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn(`Failed to load image: ${this.src}`);
        });
    });
}

// Initialize error handling
handleImageErrors();

// Export functions for potential external use
window.GTGPerfumes = {
    initGallery,
    initRadioButtons,
    initCounterAnimation,
    initAccordion,
    initMobileMenu,
    initScrollAnimations
};
