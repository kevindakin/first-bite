function accordion() {
    const accordionLists = document.querySelectorAll(".faq-list_wrap");
  
    if (!accordionLists) {
      return;
    }
  
    accordionLists.forEach((list) => {
      const accordionItems = gsap.utils.toArray(".accordion_wrap");
  
      accordionItems.forEach((item) => {
        const content = item.querySelector(".accordion_content");
        const icon = item.querySelector(".accordion_icon");
  
        gsap.set(content, { height: 0, display: "none" });
        item.classList.remove("is-open");
        gsap.set(icon, { rotate: 0 });
      });
  
      const firstItem = accordionItems[0];
      const firstContent = firstItem.querySelector(".accordion_content");
      const firstIcon = firstItem.querySelector(".accordion_icon");
  
      gsap.set(firstContent, { height: "auto", display: "block" });
      firstItem.classList.add("is-open");
      gsap.set(firstIcon, { rotation: 135 });
  
      accordionItems.forEach((item) => {
        const header = item.querySelector(".accordion_title");
        const content = item.querySelector(".accordion_content");
        const icon = item.querySelector(".accordion_icon");
  
        header.addEventListener("click", () => {
          accordionItems.forEach((otherItem) => {
            if (otherItem !== item) {
              const otherContent = otherItem.querySelector(".accordion_content");
              const otherIcon = otherItem.querySelector(".accordion_icon");
  
              if (otherItem.classList.contains("is-open")) {
                gsap.to(otherContent, {
                  height: 0,
                  duration: 0.5,
                  ease: easeBase,
                  onComplete: () => {
                    otherItem.classList.remove("is-open");
                    gsap.set(otherContent, { display: "none" });
                  },
                });
  
                gsap.to(otherIcon, {
                  rotate: 0,
                  duration: 0.5,
                  ease: easeBase,
                });
              }
            }
          });
  
          if (!item.classList.contains("is-open")) {
            gsap.set(content, { display: "block" });
            gsap.to(content, {
              height: "auto",
              duration: 0.5,
              ease: easeBase,
              onComplete: () => item.classList.add("is-open"),
            });
  
            gsap.to(icon, {
              rotate: 135,
              duration: 0.5,
              ease: easeBase,
            });
          } else {
            gsap.to(content, {
              height: 0,
              duration: 0.5,
              ease: easeBase,
              onComplete: () => {
                item.classList.remove("is-open");
                gsap.set(content, { display: "none" });
              },
            });
  
            gsap.to(icon, {
              rotate: 0,
              duration: 0.5,
              ease: easeBase,
            });
          }
        });
      });
    });
  }
  
  accordion();  