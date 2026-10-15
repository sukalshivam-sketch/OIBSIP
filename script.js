/**
 * SHIVAM SUKAL · PERSONAL PORTFOLIO INTERACTIVITY & ENHANCEMENTS
 * Pure Vanilla JavaScript (No dependencies)
 * Features:
 *  - Dark / Light Mode Switching with LocalStorage
 *  - Mobile Navigation Drawer & Hamburger Animation
 *  - ScrollSpy Navigation Highlighting
 *  - Project Category Filtering
 *  - Interactive Contact Form Validation & Feedback
 *  - Copy Email to Clipboard with Toast Notification
 *  - Back-to-Top Floating Trigger
 */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================================================
  // 1. Dark / Light Theme Toggle
  // ========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const rootElement = document.documentElement;

  // Retrieve saved preference or fallback to system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    rootElement.setAttribute('data-theme', savedTheme);
  } else if (!systemPrefersDark) {
    rootElement.setAttribute('data-theme', 'light');
  } else {
    rootElement.setAttribute('data-theme', 'dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = rootElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      rootElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }

  // ========================================================================
  // 2. Mobile Navigation Drawer & Hamburger
  // ========================================================================
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleMenu(forceClose = false) {
    const isCurrentlyOpen = navMenu.classList.contains('open');
    const shouldOpen = forceClose ? false : !isCurrentlyOpen;

    if (shouldOpen) {
      navMenu.classList.add('open');
      hamburgerBtn.classList.add('open');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden'; // prevent scroll lock while mobile menu is open
    } else {
      navMenu.classList.remove('open');
      hamburgerBtn.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => toggleMenu());
  }

  // Close mobile drawer when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        toggleMenu(true);
      }
    });
  });

  // Close mobile menu on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      toggleMenu(true);
    }
  });

  // ========================================================================
  // 3. ScrollSpy Navigation Highlighting
  // ========================================================================
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (activeLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          activeLink.classList.add('active');
        } else {
          activeLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // ========================================================================
  // 4. Project Category Filter
  // ========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || filterValue === cardCategory) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInCard 0.4s ease-out forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ========================================================================
  // 5. Interactive Contact Form with Validation
  // ========================================================================
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const nameField = document.getElementById('contact-name');
      const emailField = document.getElementById('contact-email');
      const subjectField = document.getElementById('contact-subject');
      const messageField = document.getElementById('contact-message');

      // Helper to toggle error class
      const validateInput = (input, condition) => {
        const parent = input.closest('.form-group');
        if (!condition) {
          parent.classList.add('has-error');
          isValid = false;
        } else {
          parent.classList.remove('has-error');
        }
      };

      // Email validation regex
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      validateInput(nameField, nameField.value.trim().length >= 2);
      validateInput(emailField, emailPattern.test(emailField.value.trim()));
      validateInput(subjectField, subjectField.value.trim().length >= 3);
      validateInput(messageField, messageField.value.trim().length >= 10);

      if (!isValid) {
        formFeedback.className = 'form-feedback error';
        formFeedback.textContent = 'Please review and correct the highlighted fields above.';
        return;
      }

      // Simulated sending state
      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span>Sending Message...</span>
        <svg class="spin-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-linecap="round"></circle>
        </svg>
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
        formFeedback.className = 'form-feedback success';
        formFeedback.textContent = `Thank you, ${nameField.value.trim()}! Your message has been sent successfully. I will get back to you shortly at ${emailField.value.trim()}.`;

        contactForm.reset();
        showToast('Message sent successfully!');

        // Clear feedback after 8 seconds
        setTimeout(() => {
          formFeedback.className = 'form-feedback';
          formFeedback.textContent = '';
        }, 8000);
      }, 1200);
    });

    // Clear validation error on input
    contactForm.querySelectorAll('.form-input, .form-textarea').forEach(input => {
      input.addEventListener('input', () => {
        const parent = input.closest('.form-group');
        if (parent.classList.contains('has-error')) {
          parent.classList.remove('has-error');
        }
      });
    });
  }

  // ========================================================================
  // 6. Copy Email to Clipboard
  // ========================================================================
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailAddress = document.getElementById('email-address');

  if (copyEmailBtn && emailAddress) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = emailAddress.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
        const tooltip = copyEmailBtn.querySelector('.copy-tooltip');
        if (tooltip) tooltip.textContent = 'Copied!';
        showToast(`Copied to clipboard: ${email}`);

        setTimeout(() => {
          if (tooltip) tooltip.textContent = 'Copy';
        }, 2500);
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`Copied to clipboard: ${email}`);
      }
    });
  }

  // ========================================================================
  // 7. Back-to-Top Floating Trigger
  // ========================================================================
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 380) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  // ========================================================================
  // 8. Toast Notification Utility
  // ========================================================================
  const toast = document.getElementById('toast-notification');
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('active');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('active');
    }, 3000);
  }

  // Dynamic Current Year
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

});
