function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href')?.substring(1);
        
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
              mobileMenu.classList.add('hidden');
              mobileMenuButton?.setAttribute('aria-expanded', 'false');
              
              const openIcon = mobileMenuButton?.querySelector('[data-menu-icon="open"]');
              const closeIcon = mobileMenuButton?.querySelector('[data-menu-icon="close"]');
              openIcon?.classList.remove('hidden');
              closeIcon?.classList.add('hidden');
            }
            
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }
      });
    });
  }
  
  document.addEventListener('DOMContentLoaded', setupSmoothScroll);