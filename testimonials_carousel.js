document.addEventListener('DOMContentLoaded', () => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    function handleTestimonialCarousel(e) {
        if (e.matches) {
            const testimonialGrid = document.querySelector('.testimonial-grid');
            const testimonialCards = document.querySelectorAll('.testimonial-card');
            const indicatorsContainer = document.querySelector('.testimonial-indicators');

            // indicators
            testimonialCards.forEach((_, index) => {
                const indicator = document.createElement('div');
                indicator.classList.add('testimonial-indicator');
                if (index === 0) indicator.classList.add('active');
                indicatorsContainer.appendChild(indicator);
            });

            const indicators = document.querySelectorAll('.testimonial-indicator');

            // Carousel
            let currentIndex = 0;
            function autoSlide() {
                currentIndex = (currentIndex + 1) % testimonialCards.length;
                
                testimonialGrid.scrollTo({
                    left: testimonialCards[currentIndex].offsetLeft,
                    behavior: 'smooth'
                });

                indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === currentIndex);
                });
            }

            // sliding
            let slideInterval = setInterval(autoSlide, 5000);

            testimonialGrid.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });

            testimonialGrid.addEventListener('mouseleave', () => {
                slideInterval = setInterval(autoSlide, 5000);
            });

            testimonialGrid.addEventListener('scroll', () => {
                const scrollPosition = testimonialGrid.scrollLeft;
                
                testimonialCards.forEach((card, index) => {
                    if (Math.abs(card.offsetLeft - scrollPosition) < 50) {
                        indicators.forEach(ind => ind.classList.remove('active'));
                        indicators[index].classList.add('active');
                        currentIndex = index;
                    }
                });
            });
        }
    }

    handleTestimonialCarousel(mediaQuery);
    mediaQuery.addListener(handleTestimonialCarousel);
});