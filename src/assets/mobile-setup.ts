export function setupMobileMenu(): void {
  const mobileMenuButton = document.getElementById(
    "mobile-menu-button",
  ) as HTMLButtonElement | null;
  const mobileMenu = document.getElementById("mobile-menu") as HTMLElement | null;

  if (!mobileMenuButton || !mobileMenu) {
    console.error("Mobile menu or button not found in the DOM.");
    return;
  }

  const menuOpenIcon = mobileMenuButton.querySelector(
    '[data-menu-icon="open"]',
  ) as HTMLElement | null;
  const menuCloseIcon = mobileMenuButton.querySelector(
    '[data-menu-icon="close"]',
  ) as HTMLElement | null;

  if (!menuOpenIcon || !menuCloseIcon) {
    console.error("Mobile menu icons not found.");
    return;
  }

  function toggleMobileMenu(): void {
    if (!mobileMenuButton || !mobileMenu) return
    const isExpanded = mobileMenuButton.getAttribute("aria-expanded") === "true";
    const newExpandedState = !isExpanded;

    mobileMenuButton.setAttribute("aria-expanded", String(newExpandedState));

    if (newExpandedState) {
      mobileMenu.classList.remove("hidden");
      mobileMenu.style.opacity = '0';
      mobileMenu.style.transform = 'translateY(-10px)';

      requestAnimationFrame(() => {
        mobileMenu.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        mobileMenu.style.opacity = '1';
        mobileMenu.style.transform = 'translateY(0)';
      });

      setTimeout(() => {
        const firstLink = mobileMenu.querySelector("a");
        if (firstLink instanceof HTMLElement) {
          firstLink.focus();
        }
      }, 100);
    } else {
      mobileMenu.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      mobileMenu.style.opacity = '0';
      mobileMenu.style.transform = 'translateY(-10px)';

      setTimeout(() => {
        mobileMenu.classList.add("hidden");
        mobileMenu.style.transition = '';
      }, 300);
    }

    if (!menuOpenIcon || !menuCloseIcon) return

    menuOpenIcon.style.transition = 'transform 0.3s ease, opacity 0.2s ease';
    menuCloseIcon.style.transition = 'transform 0.3s ease, opacity 0.2s ease';

    if (newExpandedState) {
      menuOpenIcon.style.transform = 'rotate(90deg)';
      menuOpenIcon.style.opacity = '0';
      menuCloseIcon.style.transform = 'rotate(0deg)';
      menuCloseIcon.style.opacity = '1';

      setTimeout(() => {
        menuOpenIcon.classList.add("hidden");
        menuCloseIcon.classList.remove("hidden");
      }, 200);
    } else {
      menuCloseIcon.style.transform = 'rotate(90deg)';
      menuCloseIcon.style.opacity = '0';
      menuOpenIcon.style.transform = 'rotate(0deg)';
      menuOpenIcon.style.opacity = '1';

      setTimeout(() => {
        menuCloseIcon.classList.add("hidden");
        menuOpenIcon.classList.remove("hidden");
      }, 200);
    }
  }

  function closeMobileMenu(): void {
    if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
      mobileMenu.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      mobileMenu.style.opacity = '0';
      mobileMenu.style.transform = 'translateY(-10px)';

      setTimeout(() => {
        mobileMenu.classList.add("hidden");
        mobileMenu.style.transition = '';
      }, 300);

      if (mobileMenuButton && menuOpenIcon && menuCloseIcon) {
        mobileMenuButton.setAttribute("aria-expanded", "false");

        menuOpenIcon.classList.remove("hidden");
        menuCloseIcon.classList.add("hidden");
        menuOpenIcon.style.transform = 'rotate(0deg)';
        menuOpenIcon.style.opacity = '1';
      }
    }
  }

  mobileMenuButton.addEventListener("click", toggleMobileMenu);

  document.addEventListener("click", (event: MouseEvent) => {
    const target = event.target as Node;
    if (
      mobileMenu &&
      !mobileMenu.contains(target) &&
      !mobileMenuButton.contains(target) &&
      !mobileMenu.classList.contains("hidden")
    ) {
      closeMobileMenu();
    }
  });

  document.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Escape" && !mobileMenu.classList.contains("hidden")) {
      closeMobileMenu();
      mobileMenuButton.focus();
    }
  });

  const mobileNavLinks = mobileMenu.querySelectorAll('a[href^="#"]');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(() => closeMobileMenu(), 100);
    });
  });
}

export function setupActiveNavigation(): void {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('a[href^="#"]');

  function updateActiveLink(): void {
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = (section as HTMLElement).offsetTop;
      const sectionHeight = (section as HTMLElement).offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));

        const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();
}
