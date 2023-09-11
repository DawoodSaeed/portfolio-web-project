let timer;

const landingSectionAnimate = () => {
  // Landing Section text animation
  document.querySelectorAll(".animatedDiv h1").forEach((h1) => {
    gsap.to(h1, {
      duration: 1,
      translateY: 1,
      ease: "power2.inOut",
    });
  });

  //   Navbar Animation
  const navbar = document.querySelector(".landing-section--nav");
  gsap.to(navbar, {
    duration: 1,
    translateY: 1,
    ease: "power2.inOut",
    stagger: 0.4,
  });
};

var mouse_delta = {
  x: 0,
  y: 0,
};
var prev_delta = {
  x: 0,
  y: 0,
};

const mouseAnimated = () => {
  let prevX = 0,
    prevY = 0;

  window.addEventListener("mousemove", (md) => {
    mouse_delta = {
      x: md.clientX - prev_delta.x,
      y: md.clientY - prev_delta.y,
    };
    setTimeout(() => {
      prev_delta = {
        x: md.clientX,
        y: md.clientY,
      };
    }, 200);
    // main content
    const mouseCircle = document.getElementById("mouseCircle");
    const sectionTwoPosition = document
      .querySelector(".landing-sectionTwo")
      .getBoundingClientRect().top;
    if (md.clientY > sectionTwoPosition) {
      if (!mouseCircle.classList.contains("active")) {
        mouseCircle.classList.add("active");
      }
    } else {
      mouseCircle.classList.remove("active");
    }

    let diffX = md.clientX - prevX;
    prevX = md.clientX;

    let diffY = md.clientY - prevY;
    prevY = md.clientY;

    skewX = gsap.utils.clamp(0.8, 1, diffX);
    skewY = gsap.utils.clamp(0.8, 1, diffY);

    // Account for the scroll position
    const scrollY = window.scrollY;
    mouseCircle.style.transform = `translate(${
      md.clientX - mouseCircle.offsetWidth
    }px, ${md.clientY + scrollY}px) scale(${skewX},${skewY})`;
  });
};
const imageSection = document.querySelectorAll(".landing-sectionTwo > div");
imageSection.forEach((div, idx) => {
  let prevX = 0;
  div.addEventListener("mousemove", (md) => {
    divTop = div.getBoundingClientRect().top;
    divText = div.querySelector("h1");
    image = div.querySelector("img");

    // For the image

    diff = md.clientX - prevX;
    prevX = md.clientY;

    diffFromTop = divTop - md.ClientY;

    gsap.to(divText, {
      x: 200,
      opacity: 0.9,
      ease: Power1,
    });
    gsap.to(image, {
      opacity: 1,
      top: diffFromTop,
      left: gsap.utils.clamp(
        0,
        div.getBoundingClientRect().width,
        `${md.clientX - image.offsetWidth - 30}`
      ),
      ease: Power3,
      rotate: gsap.utils.clamp(-20, 20, mouse_delta.x),
    });

    div.addEventListener("mouseleave", (md) => {
      gsap.from(image, {
        opacity: 0,
        rotate: 1,
      });

      gsap.from(divText, {
        ease: Power1,
        x: 0,
        opacity: 0.7,
      });
    });
  });
});

const startingFn = () => {
  landingSectionAnimate();
  mouseAnimated();
};

startingFn();

const scroll = new LocomotiveScroll({
  el: document.querySelector("main"),
  smooth: true,
});
