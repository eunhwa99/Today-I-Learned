const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
  } else {
    form.classList.add("hidden");
  }
});
const factsList = document.querySelector(".facts-list");
factsList.innerHTML = "";
