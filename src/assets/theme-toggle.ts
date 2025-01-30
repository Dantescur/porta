// theme-toggle.ts

export function setupThemeToggle(): void {
  // Get DOM elements with type assertions
  const themeToggle = document.getElementById(
    "theme-toggle"
  ) as HTMLButtonElement | null;
  const mobileThemeToggle = document.getElementById(
    "mobile-theme-toggle"
  ) as HTMLButtonElement | null;
  const htmlEl = document.documentElement;

  // Determine the stored theme or fallback to system preference
  const storedTheme: string | null =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  // Function to set the theme
  function setTheme(theme: string): void {
    htmlEl.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }

  // Initialize the theme based on stored or system preference
  if (storedTheme) {
    setTheme(storedTheme);
  }

  // Toggle between light and dark themes
  function toggleTheme(): void {
    const isDark = htmlEl.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
  }

  // Add event listeners to both theme toggle buttons
  [themeToggle, mobileThemeToggle].forEach((button) => {
    button?.addEventListener("click", toggleTheme);
  });
}

export function setupMobileMenu(): void {
  // Get DOM elements with type assertions
  const mobileMenuButton = document.getElementById(
    "mobile-menu-button"
  )! as HTMLButtonElement;
  const mobileMenu = document.getElementById("mobile-menu")! as HTMLElement;

  // Ensure elements exist before proceeding
  if (!mobileMenuButton || !mobileMenu) {
    console.error("Mobile menu or button not found in the DOM.");
    return;
  }

  // Toggle mobile menu visibility
  function toggleMobileMenu(): void {
    const isExpanded =
      mobileMenuButton.getAttribute("aria-expanded") === "true";
    mobileMenuButton.setAttribute("aria-expanded", String(!isExpanded));
    mobileMenu.classList.toggle("hidden");

    if (!isExpanded) {
      const firstLink = mobileMenu.querySelector("a");
      if (firstLink instanceof HTMLElement) {
        firstLink.focus();
      }
    }
  }

  // Add click event listener to the mobile menu button
  mobileMenuButton.addEventListener("click", toggleMobileMenu);

  // Close the mobile menu when clicking outside of it
  document.addEventListener("click", (event: MouseEvent) => {
    if (
      mobileMenu &&
      !mobileMenu.contains(event.target as Node) &&
      !mobileMenuButton.contains(event.target as Node)
    ) {
      mobileMenu.classList.add("hidden");
      mobileMenuButton.setAttribute("aria-expanded", "false");
    }
  });

  // Close the mobile menu when pressing the Escape key
  document.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      mobileMenu.classList.add("hidden");
      mobileMenuButton.setAttribute("aria-expanded", "false");
      mobileMenuButton.focus();
    }
  });
}
