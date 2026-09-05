/* ==========================================================================
   ⚙️ CONFIGURAÇÃO DE CHECKOUT - KIWIFY OFICIAL
   ========================================================================== */
const CONFIG = {
  // Link oficial de checkout do curso Redação UEG Sem Mistério (Kiwify):
  checkoutUrl: "https://pay.kiwify.com.br/ikjO2OI",
  
  // Data Oficial da Prova da UEG: 18 de Outubro às 13h00 (Horário de Brasília)
  examDate: new Date("2026-10-18T13:00:00-03:00").getTime()
};

document.addEventListener("DOMContentLoaded", () => {
  initUrgencyCountdown();
  initFaqAccordion();
  initStickyMobileBar();
  initScrollAnimations();
  initCheckoutTriggers();
  initSmoothScroll();
});

/**
 * 1. Urgency Countdown to UEG Exam (18 de Outubro)
 */
function initUrgencyCountdown() {
  const timerElement = document.getElementById("countdown-timer");
  if (!timerElement) return;

  function updateTimer() {
    const now = new Date().getTime();
    const distance = CONFIG.examDate - now;

    if (distance <= 0) {
      timerElement.textContent = "É HOJE! PROVA UEG 2026";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, '0');
    timerElement.textContent = `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/**
 * 2. Interactive FAQ Accordion
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    questionBtn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close other open FAQ items for cleaner reading
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
          const otherAnswer = otherItem.querySelector(".faq-answer");
          otherAnswer.style.maxHeight = null;
          otherItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove("active");
        answer.style.maxHeight = null;
        questionBtn.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
        questionBtn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

/**
 * 3. Mobile Sticky Bottom CTA Bar
 */
function initStickyMobileBar() {
  const stickyBar = document.getElementById("sticky-mobile-cta");
  const heroSection = document.getElementById("hero");
  if (!stickyBar) return;

  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const heroBottom = heroSection ? heroSection.getBoundingClientRect().bottom : 350;
        
        // Show after scrolling past hero
        if (heroBottom < 100) {
          stickyBar.classList.add("visible");
        } else {
          stickyBar.classList.remove("visible");
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/**
 * 4. IntersectionObserver for Reveal Animations
 */
function initScrollAnimations() {
  const elements = document.querySelectorAll(".reveal-on-scroll");
  if (!("IntersectionObserver" in window)) {
    // Fallback if IntersectionObserver not supported
    elements.forEach(el => el.classList.add("revealed"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: "0px 0px -40px 0px",
    threshold: 0.1
  });

  elements.forEach(el => observer.observe(el));
}

/**
 * 5. Dynamic Checkout Triggers
 */
function initCheckoutTriggers() {
  const checkoutButtons = document.querySelectorAll(".trigger-checkout");

  checkoutButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const targetSection = document.getElementById("oferta");
      if (btn.classList.contains("scroll-to-offer") && targetSection) {
        e.preventDefault();
        targetSection.scrollIntoView({ behavior: "smooth" });
        return;
      }

      // Direct redirection to official Kiwify checkout
      if (CONFIG.checkoutUrl && CONFIG.checkoutUrl.startsWith("http")) {
        if (btn.tagName.toLowerCase() === 'a') {
          btn.href = CONFIG.checkoutUrl;
        } else {
          e.preventDefault();
          window.open(CONFIG.checkoutUrl, "_blank");
        }
      }
    });
  });
}

/**
 * 6. Smooth Scroll for Navigation
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === "#" || !targetId) return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
