function formModal() {
    const triggers = document.querySelectorAll('[data-pricing="button"]');
  
    if (!triggers.length) {
      return;
    }
  
    const wrap = document.querySelector('[data-pricing="modal"]');
    const modal = wrap.querySelector(".modal_main");
    const closeBtns = wrap.querySelectorAll('[data-pricing="close"]');
  
    triggers.forEach((trigger) => {
      let lastFocusedElement;
  
      // GSAP Animation
      const tl = gsap.timeline({
        paused: true,
        defaults: {
          duration: durationFast,
          ease: easeBase,
        },
        onReverseComplete: () => {
          wrap.style.display = "none";
          gsap.set(modal, { x: "4rem" });
  
          // Clear form inputs inside modal
          wrap.querySelectorAll(".modal_wrap .form_input").forEach((input) => {
            input.value = "";
          });
        },
      });
  
      // Set initial states
      gsap.set(wrap, { opacity: 0, display: "none" });
      gsap.set(modal, { x: "4rem" });
  
      // Animation sequence
      tl.to(wrap, { opacity: 1 }).to(modal, { x: "0rem" }, "<");
  
      function openModal() {
        lastFocusedElement = document.activeElement;
  
        wrap.style.display = "flex";
        tl.play();
  
        // Accessibility
        wrap.removeAttribute("inert");
        wrap.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
  
        // Add event listeners to modal instead of document
        modal.addEventListener("keydown", trapFocus);
        wrap.addEventListener("keydown", closeOnEscape);
  
        // Find and focus first focusable element
        setTimeout(() => {
          const focusableElements = Array.from(
            modal.querySelectorAll(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
          ).filter(
            (el) => !el.hasAttribute("disabled") && el.offsetParent !== null
          );
  
          if (focusableElements.length > 0) {
            focusableElements[0].focus();
          }
        }, 50);
      }
  
      function closeModal() {
        tl.reverse();
  
        document.activeElement?.blur();
  
        wrap.setAttribute("aria-hidden", "true");
        wrap.setAttribute("inert", "");
        document.body.style.overflow = "";
  
        if (lastFocusedElement) {
          setTimeout(() => lastFocusedElement.focus(), 50);
        }
  
        // Remove listeners from modal instead of document
        modal.removeEventListener("keydown", trapFocus);
        wrap.removeEventListener("keydown", closeOnEscape);
      }
  
      function trapFocus(e) {
        if (e.key !== "Tab") return;
  
        const focusableElements = Array.from(
          modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter(
          (el) => !el.hasAttribute("disabled") && el.offsetParent !== null
        );
  
        if (focusableElements.length === 0) {
          e.preventDefault();
          return;
        }
  
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        const isFirstElement = document.activeElement === firstFocusable;
        const isLastElement = document.activeElement === lastFocusable;
  
        if (e.shiftKey && isFirstElement) {
          e.preventDefault();
          lastFocusable.focus();
        } else if (!e.shiftKey && isLastElement) {
          e.preventDefault();
          firstFocusable.focus();
        }
  
        if (!modal.contains(document.activeElement)) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
  
      function closeOnEscape(e) {
        if (e.key === "Escape" && wrap.style.display === "flex") {
          closeModal();
        }
      }
  
      // Event Listeners
      trigger.addEventListener("click", openModal);
      closeBtns.forEach((button) => button.addEventListener("click", closeModal));
      wrap.addEventListener("click", (e) => {
        if (e.target === wrap) closeModal();
      });
    });
  }
  
  formModal();  