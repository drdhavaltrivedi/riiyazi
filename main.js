import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => {
    observer.observe(el);
  });
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Video Sound Handling
  const heroVideo = document.getElementById('heroVideo');
  const unmuteBtn = document.getElementById('unmuteBtn');

  if (heroVideo && unmuteBtn) {
    unmuteBtn.addEventListener('click', () => {
      heroVideo.muted = false;
      heroVideo.play();
      unmuteBtn.style.display = 'none';
    });

    // Attempt to unmute on first interaction with the page
    const handleFirstInteraction = () => {
      heroVideo.muted = false;
      heroVideo.play().catch(e => console.log("Autoplay blocked:", e));
      unmuteBtn.style.display = 'none';
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
  }
});
