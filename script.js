
const items = document.querySelectorAll(".accordion-item");

if (items.length > 0) {
  const firstItem = items[0];
  const firstBody = firstItem.querySelector(".accordion-body");
  const firstToggle = firstItem.querySelector(".toggle");

  firstItem.classList.add("active");
  firstBody.style.maxHeight = firstBody.scrollHeight + "px";
  firstBody.style.paddingTop = "10px";
  firstBody.style.paddingBottom = "100px";
  firstToggle.textContent = "−";
}

items.forEach(item => {
  const header = item.querySelector(".accordion-header");
  const body = item.querySelector(".accordion-body");
  const toggle = item.querySelector(".toggle");

  header.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    items.forEach(i => {
      i.classList.remove("active");
      i.querySelector(".accordion-body").style.maxHeight = "0";
      i.querySelector(".accordion-body").style.paddingTop = "0";
      i.querySelector(".accordion-body").style.paddingBottom = "0";
      i.querySelector(".toggle").textContent = "+";
    });

    if (!isActive) {
      item.classList.add("active");
      body.style.maxHeight = body.scrollHeight + "px";
      body.style.paddingTop = "10px";
      body.style.paddingBottom = "100px";
      toggle.textContent = "−";
    }
  });
});


