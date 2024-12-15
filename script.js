//--================================================
//       Project Name: Flux
//       Author: JohnDev19
//       License: MIT
//       Last Update: December 2024
//=====================================================    
//      Technologies Used: 
//         - HTML5
//         - CSS3
//         - JavaScript
//         - Bootstrap Icons
//         - Responsive Design
//         - Grid Layout
//         - Flexbox
//         - CSS Variables
//         - CSS Animations
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');

    if (navLinks.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });

  // Smooth scrolling - navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Blog posts data
  const blogPosts = [{
    title: 'The Future of Artificial Intelligence',
    excerpt: 'Exploring the latest advancements in AI and machine learning...',
    image: 'images/blog1.jpg'
  },
    {
      title: 'Sustainable Tech: Green Innovations',
      excerpt: 'Discover how technology is driving sustainability efforts...',
      image: 'images/blog2.jpg'
    },
    {
      title: 'Cybersecurity in the Digital Age',
      excerpt: 'Understanding the importance of data protection and online security...',
      image: 'images/blog3.jpg'
    },
    {
      title: '5G Revolution: Transforming Connectivity',
      excerpt: 'How 5G technology is changing the way we connect and communicate...',
      image: 'images/blog4.jpg'
    },
    {
      title: 'The Rise of Quantum Computing',
      excerpt: 'Exploring the potential of quantum computers and their applications...',
      image: 'images/blog5.jpg'
    },
    {
      title: 'Blockchain Beyond Cryptocurrency',
      excerpt: 'Innovative uses of blockchain technology in various industries...',
      image: 'images/blog6.jpg'
    }];

  const postGrid = document.querySelector('.post-grid');
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');
  let currentPage = 0;
  const postsPerPage = 3;

  function displayPosts(page) {
    const start = page * postsPerPage;
    const end = start + postsPerPage;
    const postsToShow = blogPosts.slice(start,
      end);

    postGrid.innerHTML = '';
    postsToShow.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');
      postElement.innerHTML = `
      <div class="post-image-container">
      <img src="${post.image}" alt="${post.title}">
      </div>
      <div class="post-content">
      <div class="post-meta">
      <span>Tech Insights</span>
      <div class="post-tags">
      <span class="post-tag">Technology</span>
      <span class="post-tag">Innovation</span>
      </div>
      </div>
      <h3>${post.title}</h3>
      <p class="post-excerpt">${post.excerpt}</p>
      <div class="post-footer">
      <a href="#" class="read-more">
      Read More <i class="bi bi-arrow-right"></i>
      </a>
      </div>
      </div>
      `;
      postGrid.appendChild(postElement);
    });

    prevButton.disabled = page === 0;
    nextButton.disabled = end >= blogPosts.length;
  }

  function fadeOutPosts() {
    return new Promise(resolve => {
      const posts = document.querySelectorAll('.post');
      posts.forEach(post => {
        post.style.transition = 'opacity 0.3s ease';
        post.style.opacity = '0';
      });
      setTimeout(resolve, 300);
    });
  }

  function fadeInPosts() {
    const posts = document.querySelectorAll('.post');
    posts.forEach((post, index) => {
      setTimeout(() => {
        post.style.transition = 'opacity 0.3s ease';
        post.style.opacity = '1';
      }, index * 100);
    });
  }

  prevButton.addEventListener('click',
    async () => {
      if (currentPage > 0) {
        await fadeOutPosts();
        currentPage--;
        displayPosts(currentPage);
        fadeInPosts();
      }
    });

  nextButton.addEventListener('click',
    async () => {
      if ((currentPage + 1) * postsPerPage < blogPosts.length) {
        await fadeOutPosts();
        currentPage++;
        displayPosts(currentPage);
        fadeInPosts();
      }
    });

  displayPosts(currentPage);
  fadeInPosts();

  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit',
    (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');

      console.log('Form submitted:', {
        name, email, message
      });

      contactForm.reset();

      alert('Thank you for your message! We\'ll get back to you soon.');
    });

  // Go to top
  const goToTopButton = document.querySelector('.go-to-top');

  window.addEventListener('scroll',
    () => {
      if (window.pageYOffset > 100) {
        goToTopButton.classList.add('show');
      } else {
        goToTopButton.classList.remove('show');
      }
    });

  goToTopButton.addEventListener('click',
    () => {
      window.scrollTo({
        top: 0, behavior: 'smooth'
      });
    });

  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.post, .about-content, .contact');
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (elementTop < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  animateOnScroll();

  window.addEventListener('scroll',
    animateOnScroll);
});