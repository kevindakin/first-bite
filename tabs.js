function autoTabs() {
    const wraps = document.querySelectorAll(".split-tabs_wrap");
  
    wraps.forEach((wrap, wrapIndex) => {
      const tabs = wrap.querySelectorAll(".split-tab_link");
      const panels = wrap.querySelectorAll(".split-tabs_image");
      let current = 0;
      let autoSwitch;
  
      // Set up tabs + ARIA
      tabs.forEach((tab, i) => {
        const panel = panels[i];
        const tabId = `tab-${wrapIndex}-${i}`;
        const panelId = `tabpanel-${wrapIndex}-${i}`;
  
        tab.setAttribute("role", "tab");
        tab.setAttribute("id", tabId);
        tab.setAttribute("aria-controls", panelId);
        tab.setAttribute("tabindex", i === 0 ? "0" : "-1");
        tab.setAttribute("aria-selected", i === 0 ? "true" : "false");
  
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("id", panelId);
        panel.setAttribute("aria-labelledby", tabId);
        if (i !== 0) panel.hidden = true;
  
        let userInteracted = false;
  
        tab.addEventListener("click", () => {
          activateTab(i);
  
          if (!userInteracted) {
            clearInterval(autoSwitch);
            userInteracted = true;
  
            // Stop all animations
            progressAnims.forEach((anim) => anim.pause());
  
            // Instantly set active tab’s progress to 100%
            const activeProgress = tabs[i].querySelector(".split-tab_progress");
            gsap.set(activeProgress, { display: "block", height: "100%" });
          }
        });
      });
  
      // GSAP progress bars
      const progressAnims = Array.from(tabs).map((tab) => {
        const progress = tab.querySelector(".split-tab_progress");
        gsap.set(progress, { display: "none", height: 0 });
        return gsap.to(progress, {
          height: "100%",
          duration: 8,
          ease: "none",
          paused: true,
          onStart: () => (progress.style.display = "block"),
          onReverseComplete: () => (progress.style.display = "none"),
        });
      });
  
      function activateTab(index) {
        tabs.forEach((tab, i) => {
          const isActive = i === index;
          const panel = panels[i];
          const tags = tab.querySelector(".u-rich-text--tags");
  
          tab.setAttribute("aria-selected", isActive);
          tab.setAttribute("tabindex", isActive ? "0" : "-1");
  
          progressAnims[i].pause().progress(0);
  
          // Toggle tags visibility
          if (tags) {
            tags.style.display = isActive ? "block" : "none";
          }
  
          if (isActive) {
            progressAnims[i].play();
  
            panel.classList.remove("is-inactive");
            gsap.fromTo(
              panel,
              { x: "3rem", opacity: 0 },
              {
                x: "0rem",
                opacity: 1,
                duration: 0.5,
                ease: "power2.out",
              }
            );
          } else {
            gsap.to(panel, {
              opacity: 0,
              duration: 0.2,
              onComplete: () => panel.classList.add("is-inactive"),
            });
          }
        });
  
        current = index;
      }
  
      function nextTab() {
        const next = (current + 1) % tabs.length;
        activateTab(next);
      }
  
      function resetTimer() {
        clearInterval(autoSwitch);
        autoSwitch = setInterval(nextTab, 8000);
      }
  
      // Init
      activateTab(0);
      resetTimer();
    });
  }
  
  autoTabs();  