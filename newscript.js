

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight;
}


function triggerTextDrop() {
  document.querySelectorAll('.drop-text1').forEach(el => {
    if (isInViewport(el) && !el.classList.contains('in-view')) {
      el.classList.add('in-view');
    }
  });
}

window.addEventListener('scroll', triggerTextDrop);
window.addEventListener('load', triggerTextDrop);


function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight;
}

function triggerSpanAppear() {
  document.querySelectorAll('.text span').forEach(span => {
    if (isInViewport(span) && !span.classList.contains('appear')) {
      span.classList.add('appear');
    }
  });
}

window.addEventListener('scroll', triggerSpanAppear);
window.addEventListener('load', triggerSpanAppear);



function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight;
}


function triggerEmailSpanAppear() {
  document.querySelectorAll('.spanemail').forEach((span) => {
    if (isInViewport(span) && !span.classList.contains('appear')) {
      span.classList.add('appear');
    }
  });
}

window.addEventListener('scroll', triggerEmailSpanAppear);
window.addEventListener('load', triggerEmailSpanAppear);


function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top <= window.innerHeight && rect.bottom >= 0;
}

function handleFooterFadeIn() {
  const footer = document.querySelector('footer');
  if (footer && isInViewport(footer)) {
    footer.classList.add('in-view');
  }
}

window.addEventListener('scroll', handleFooterFadeIn);
window.addEventListener('load', handleFooterFadeIn);



document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(".text1");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target.querySelector(".imganimation");
        const cover = entry.target.querySelector(".imganimations");


        // img.style.animation = "scaleImg 1.5s cubic-bezier(1, 0.2, 0.2, 1) forwards";
        cover.style.animation = "slideIn 1.5s cubic-bezier(1, 0.2, 0.2, 1) forwards";

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  targets.forEach(target => observer.observe(target));
});



// ✅ Initialize Lenis
const lenis = new Lenis();
window.lenis = lenis;

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);




window.addEventListener("scroll", function () {
  document.querySelectorAll(".text1").forEach(section => {
    let img = section.querySelector(".imganimation");
    let rect = section.getBoundingClientRect();

    let progress = rect.top / window.innerHeight;

    img.style.transform = `translateY(${progress * -100}px)`;
  });
});

window.addEventListener("scroll", function () {
  document.querySelectorAll(".img-container").forEach(section => {
    let img = section.querySelector(".portimage");
    let rect = section.getBoundingClientRect();

    let progress = rect.top / window.innerHeight;

    img.style.transform = `translateY(${progress * -200}px)`;
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(".text1");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target.querySelector(".imganimationhome");


        img.style.animation = "scaleImg 1.5s cubic-bezier(1, 0.2, 0.2, 1) forwards";

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  targets.forEach(target => observer.observe(target));
});

