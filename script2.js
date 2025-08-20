const track = document.getElementById("headTrack");
const headings = ["GYM","MUSIC","TRAVELLING"];

const REPEATS = 10; // more repeats for infinite feel
let tabs;

function buildTrack() {
  const frag = document.createDocumentFragment();
  for (let r = 0; r < REPEATS; r++) {
    headings.forEach((txt, idx) => {
      const div = document.createElement("div");
      div.className = "head-item";
      div.dataset.idx = idx;

      // wrap letters in spans
      [...txt].forEach((ch, i) => {
        const span = document.createElement("span");
        span.textContent = ch;
        span.style.animationDelay = `${i * 0.08}s`;
        div.appendChild(span);
      });

      frag.appendChild(div);
    });
  }
  track.innerHTML = "";
  track.appendChild(frag);
  tabs = track.querySelectorAll(".head-item");
}
buildTrack();

// ===== Helpers =====
function getOffset(idx){
  let offset=0;
  for(let i=0;i<idx;i++){
    const el = tabs[i];
    const cs = getComputedStyle(el);
    offset += el.offsetWidth + parseInt(cs.marginLeft) + parseInt(cs.marginRight);
  }
  return offset;
}

function setContent(realIdx){
  document.querySelectorAll(".text-content").forEach(el=>{
    el.classList.toggle("active", el.dataset.idx == realIdx);
  });
  document.querySelectorAll(".imageaboutab img").forEach(el=>{
    el.classList.toggle("active", el.dataset.idx == realIdx);
  });
}

// ===== Slider logic (looping) =====
const BLOCK = headings.length;
const MIDDLE_START = BLOCK * Math.floor(REPEATS / 2);
let activeIdx = MIDDLE_START;     
let allowTransition = false;

function activate(i){
  activeIdx = i;
  const realIdx = tabs[i].dataset.idx;

  tabs.forEach(t=> t.classList.remove("active"));
  tabs[i].classList.add("active");

  setContent(realIdx);

  const offset = getOffset(i);
  track.style.transition = allowTransition ? "transform .8s cubic-bezier(0.62,0.05,0.01,0.99)" : "none";
  requestAnimationFrame(()=> {
    track.style.transform = `translateX(-${offset}px)`;
  });
}

// Click any visible heading
tabs.forEach((tab,i)=>{
  tab.addEventListener("click", ()=>{
    allowTransition = true;
    activate(i);
  });
});

track.addEventListener("transitionend", ()=>{
  const total = tabs.length;
  if (activeIdx < BLOCK || activeIdx >= total - BLOCK) {
    allowTransition = false;
    const middleIdx = MIDDLE_START + (activeIdx % BLOCK);
    activate(middleIdx);
  }
});

// Init
activate(activeIdx);

// ==== Animate letters ONCE when in viewport ====
const headingSection = document.getElementById("headingSection");
const observer = new IntersectionObserver((entries, obs)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      tabs.forEach(t=>{
        t.classList.add("animate"); // trigger span animations
      });
      obs.disconnect(); // run only once
    }
  });
},{threshold:0.3});

observer.observe(headingSection);

