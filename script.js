/* ==========================================================================
   ⚙️ CONFIGURAÇÃO DE CHECKOUT - COLE SEUS LINKS DE PAGAMENTO AQUI
   Suporta Hotmart, Kiwify, Eduzz, Kirvano, Monetizze, etc.
   ========================================================================== */
const CONFIG = {
  // 1. Link de Checkout do Curso (R$ 37,90):
  // Substitua pelo link de checkout da sua plataforma:
  checkoutUrl: "COLE_SEU_LINK_DE_CHECKOUT_AQUI",

  // 2. Link de Checkout com a Correção Individual (+ R$ 20,00 = R$ 57,90):
  checkoutWithBumpUrl: "COLE_SEU_LINK_COM_BUMP_AQUI",
  
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
  const bumpCheckbox = document.getElementById("bump-checkbox");

  checkoutButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      
      const targetSection = document.getElementById("oferta");
      if (btn.classList.contains("scroll-to-offer") && targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
        return;
      }

      // Check if bump is included
      const hasBump = bumpCheckbox && bumpCheckbox.checked;
      const destination = hasBump ? CONFIG.checkoutWithBumpUrl : CONFIG.checkoutUrl;

      // Direct redirection or fallback to checkout section
      if (destination.includes("COLE_SEU_LINK") || destination.includes("YOUR_PRODUCT_ID") || !destination.startsWith("http")) {
        // Scroll to the main pricing card
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });
          // Highlight card
          const box = targetSection.querySelector(".checkout-box");
          if (box) {
            box.style.borderColor = "#FFD200";
            box.style.boxShadow = "0 0 35px rgba(255, 210, 0, 0.4)";
            setTimeout(() => {
              box.style.borderColor = "";
              box.style.boxShadow = "";
            }, 1800);
          }
        }
      } else {
        window.open(destination, "_blank");
      }
    });
  });

  // Interactive toggle on order bump card
  const orderBumpCard = document.getElementById("order-bump-card");
  if (orderBumpCard && bumpCheckbox) {
    orderBumpCard.addEventListener("click", (e) => {
      if (e.target !== bumpCheckbox) {
        bumpCheckbox.checked = !bumpCheckbox.checked;
      }
      updateBumpUI(bumpCheckbox.checked);
    });

    bumpCheckbox.addEventListener("change", () => {
      updateBumpUI(bumpCheckbox.checked);
    });
  }

  function updateBumpUI(isChecked) {
    if (orderBumpCard) {
      if (isChecked) {
        orderBumpCard.style.borderColor = "#2563EB";
        orderBumpCard.style.background = "#EFF6FF";
      } else {
        orderBumpCard.style.borderColor = "#EAB308";
        orderBumpCard.style.background = "#FFFDF0";
      }
    }
  }
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
