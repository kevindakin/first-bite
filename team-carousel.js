function teamCarousel() {
    const wrapper = document.querySelector(".team-carousel_wrap");
  
    if (!wrapper) return;
  
    const slider = wrapper.querySelector(".team-carousel_cms.swiper");
    const arrowPrev = wrapper.querySelector(".team-carousel_arrow.swiper-prev");
    const arrowNext = wrapper.querySelector(".team-carousel_arrow.swiper-next");
  
    let swiper = new Swiper(slider, {
      slidesPerView: "auto",
      spaceBetween: 16,
      speed: 300,
      loop: false,
      watchOverflow: true,
      navigation: {
        nextEl: arrowNext,
        prevEl: arrowPrev,
      },
      breakpoints: {
        //   640: {
        //     slidesPerView: 3,
        //   },
        992: {
          // slidesPerView: 4.5,
          spaceBetween: 24,
        },
      },
    });
  }
  
  window.Webflow ||= [];
  window.Webflow.push(() => {
    teamCarousel();
  });  