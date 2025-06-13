// GLOBAL VARIABLES
const durationFast = 0.4;
const durationBase = 0.8;
const durationSlow = 1.2;
const easeBase = "power3.inOut";

//
// FUNCTION DECLARATIONS
//

function disableScrolling() {
  document.body.classList.add("no-scroll");
}

function enableScrolling() {
  document.body.classList.remove("no-scroll");
}

function mobileMenu() {
  const nav = document.querySelector('[data-menu="nav"]');
  const menu = nav.querySelector(".nav_content");
  const links = menu.querySelectorAll(".nav_link-wrapper");
  const button = nav.querySelector('[data-menu="hamburger"]');
  const btnWrap = nav.querySelector(".nav_button-wrap");

  const lineTop = button.children[0];
  const lineMiddle = button.children[1];
  const lineBottom = button.children[2];

  gsap.set(links, { y: "4rem", opacity: 0 });
  gsap.set(btnWrap, { y: "4rem", opacity: 0 });

  let mobileMenuAnim = gsap.timeline({
    paused: true,
    defaults: {
      duration: durationBase,
      ease: "power3.out",
    },
  });

  mobileMenuAnim
    .to(lineTop, {
      y: 11,
      rotate: -45,
    })
    .to(
      lineMiddle,
      {
        x: 24,
        opacity: 0,
      },
      "<"
    )
    .fromTo(
      lineBottom,
      {
        y: 0,
        width: "2rem",
        rotate: 0,
      },
      {
        y: -11,
        width: "2.5rem",
        rotate: 45,
      },
      "<"
    )
    .to(
      menu,
      {
        opacity: 1,
        duration: 0.2,
      },
      "<"
    )
    .to(
      links,
      {
        y: "0rem",
        opacity: 1,
        stagger: 0.06,
      },
      "<-0.1"
    )
    .to(
      btnWrap,
      {
        y: "0rem",
        opacity: 1,
      },
      "<0.3"
    );

  button.addEventListener("click", () => {
    if (!menu.classList.contains("is-open")) {
      menu.style.display = "flex";
      menu.style.pointerEvents = "auto";
      requestAnimationFrame(() => {
        menu.classList.add("is-open");
        mobileMenuAnim.timeScale(1).play();
        disableScrolling();
      });
    } else {
      menu.classList.remove("is-open");
      menu.style.pointerEvents = "none";
      mobileMenuAnim
        .timeScale(2)
        .reverse()
        .eventCallback("onReverseComplete", () => {
          menu.style.display = "none";
        });
      enableScrolling();
    }
  });
}

function navScroll() {
  const nav = document.querySelector('[data-menu="nav"]');
  const border = nav.querySelector(".nav_border");
  const hero = document.querySelector('[data-menu="hero"]');
  const navHeight = nav.getBoundingClientRect().height;

  requestAnimationFrame(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: hero,
          start: `bottom ${navHeight}px`,
          toggleActions: "play none none reverse",
          onEnter: () => nav.classList.add("is-scrolled"),
          onLeaveBack: () => nav.classList.remove("is-scrolled"),
        },
      })
      .to(border, { opacity: 1, duration: durationBase, ease: easeBase });
  });
}

function navDropdown() {
  const nav = document.querySelector('[data-menu="nav"]');
  if (!nav) return;

  const items = nav.querySelectorAll('[data-menu="link"]');
  const isTouch = window.matchMedia("(pointer: coarse)").matches;

  items.forEach((item) => {
    const link = item.querySelector(".nav_link");
    const menu = item.querySelector('[data-menu="menu"]');

    if (!link || !menu) return;

    const arrow = link.querySelector(".nav_dropdown-icon");
    if (!arrow) return;

    let timeout;

    const menuOpen = gsap.timeline({
      paused: true,
      defaults: {
        duration: durationFast,
        ease: easeBase,
      },
    });

    menuOpen.to(menu, {
      opacity: 1,
      y: "0rem",
    });

    let isOpen = false;

    const openMenu = () => {
      if (isOpen) return;
      clearTimeout(timeout);
      isOpen = true;
      menu.style.display = "block";
      arrow.classList.add("is-open");
      menuOpen.play();
    };

    const closeMenu = () => {
      isOpen = false;
      menuOpen.reverse();
      arrow.classList.remove("is-open");
      menu.style.display = "none";
    };

    if (isTouch) {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        menu.style.display === "block" ? closeMenu() : openMenu();
      });
    } else {
      item.addEventListener("mouseenter", openMenu);
      menu.addEventListener("mouseenter", openMenu);

      item.addEventListener("mouseleave", () => {
        timeout = setTimeout(closeMenu, 50);
      });

      menu.addEventListener("mouseleave", () => {
        timeout = setTimeout(closeMenu, 50);
      });
    }
  });
}

function copyright() {
  const copyrightDate = document.querySelector(
    '[data-element="copyright-date"]'
  );

  if (copyrightDate) {
    const currentYear = new Date().getFullYear();
    copyrightDate.textContent = currentYear;
  }
}

function externalLinks() {
  const links = document.querySelectorAll('[data-link="external"]');

  if (!links.length) {
    return;
  }

  links.forEach((link) => {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });
}

function buttonHover() {
  const links = document.querySelectorAll(".btn_primary");
  if (!links.length) return;

  links.forEach((link) => {
    const text = link.querySelector(".btn_text");
    const icon = link.querySelector('[data-button="icon"]');
    const iconHover = link.querySelector('[data-button="icon-hover"]');

    link.addEventListener("mouseenter", () => {
      if (!link._tl) {
        link._tl = gsap
          .timeline({
            defaults: { duration: durationFast, ease: easeBase },
            paused: true,
          })
          .to(icon, { x: "2rem", opacity: 0, overwrite: "auto" })
          .to(text, { x: "1.5rem", overwrite: "auto" }, "<0.02")
          .to(iconHover, { x: "2rem", opacity: 1, overwrite: "auto" }, "<0.02");
      }
      link._tl.play();
    });

    link.addEventListener("mouseleave", () => {
      link._tl?.reverse();
    });
  });
}

function announcementHover() {
  const banner = document.querySelector(".announcement_wrap");
  if (!banner) return;

  const text = banner.querySelector(".announcement_title");
  const icon = banner.querySelector('[data-announcement="icon"]');
  const iconHover = banner.querySelector('[data-announcement="icon-hover"]');

  banner.addEventListener("mouseenter", () => {
    if (!banner._tl) {
      banner._tl = gsap
        .timeline({
          defaults: { duration: durationFast, ease: easeBase },
          paused: true,
        })
        .to(icon, { x: "2rem", opacity: 0, overwrite: "auto" })
        .to(text, { x: "1.5rem", overwrite: "auto" }, "<0.02")
        .to(iconHover, { x: "2rem", opacity: 1, overwrite: "auto" }, "<0.02");
    }
    banner._tl.play();
  });

  banner.addEventListener("mouseleave", () => {
    banner._tl?.reverse();
  });
}

function imageReveal() {
  const wrappers = document.querySelectorAll('[data-scroll="image-reveal"]');
  if (!wrappers.length) return;

  wrappers.forEach((wrap) => {
    const img = wrap.querySelector(".u-cover-absolute");
    if (img) {
      gsap.set(img, { scale: 1.2 });
    }
  });

  ScrollTrigger.batch(wrappers, {
    onEnter: (batch) => {
      batch.forEach((wrap) => {
        const img = wrap.querySelector(".u-cover-absolute");
        if (img) {
          gsap.to(img, {
            scale: 1,
            duration: durationBase,
            ease: "power3.out",
          });
        }
      });
    },
    start: "top 95%",
    toggleActions: "play none none none",
    once: true,
  });
}

function fadeUp() {
  const fadeEls = document.querySelectorAll('[data-scroll="fade-up"]');
  if (!fadeEls.length) return;

  gsap.set(fadeEls, { y: "3rem", opacity: 0 });

  ScrollTrigger.batch(fadeEls, {
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: "0rem",
        duration: durationBase,
        ease: "power3.out",
        stagger: 0.1,
      }),
    start: "top 90%",
    toggleActions: "play none none none",
    once: true,
  });
}

function fadeLeft() {
  const fadeEls = document.querySelectorAll('[data-scroll="fade-left"]');
  if (!fadeEls.length) return;

  gsap.set(fadeEls, { x: "3rem", opacity: 0 });

  ScrollTrigger.batch(fadeEls, {
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        x: "0rem",
        duration: durationBase,
        ease: "power3.out",
        stagger: 0.1,
      }),
    start: "top 90%",
    toggleActions: "play none none none",
    once: true,
  });
}

//
// FUNCTION INITS
//

window.addEventListener("load", () => {
  navScroll();
  copyright();
  externalLinks();
  imageReveal();
  fadeUp();
  fadeLeft();
});

gsap.matchMedia().add("(min-width: 992px)", () => {
  navDropdown();
  buttonHover();
  announcementHover();
});

// Mobile Only Functions

gsap.matchMedia().add("(max-width: 991px)", () => {
  mobileMenu();
});

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 250);
});