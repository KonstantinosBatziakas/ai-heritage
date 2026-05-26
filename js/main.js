/* Language toggle (EL / EN) */
(function () {
  function applyLang(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-lang]").forEach(function (el) {
      if (el.getAttribute("data-lang") === lang) el.classList.add("lang-visible");
      else el.classList.remove("lang-visible");
    });
    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-set-lang") === lang);
    });
    try { localStorage.setItem("lang", lang); } catch (e) {}
  }

  function init() {
    var saved = "el";
    try { saved = localStorage.getItem("lang") || "el"; } catch (e) {}
    applyLang(saved);
    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.addEventListener("click", function () {
        applyLang(b.getAttribute("data-set-lang"));
      });
    });

    // Mobile menu
    var toggle = document.querySelector(".menu-toggle");
    var links = document.querySelector(".nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", function () { links.classList.toggle("open"); });
    }
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();

/* Slider */
(function () {
  var index = 0, timer;
  function show(n) {
    var slides = document.querySelectorAll(".slide");
    var dots = document.querySelectorAll(".dot");
    if (!slides.length) return;
    index = (n + slides.length) % slides.length;
    slides.forEach(function (s, i) { s.classList.toggle("active", i === index); });
    dots.forEach(function (d, i) { d.classList.toggle("active", i === index); });
  }
  function next() { show(index + 1); }
  window.goToSlide = function (n) { show(n); reset(); };
  function reset() { clearInterval(timer); timer = setInterval(next, 4500); }

  document.addEventListener("DOMContentLoaded", function () {
    if (document.querySelector(".slide")) { show(0); reset(); }
  });
})();

/* Alert For Distribution */
(function () {
  var alert = document.getElementById("distribution-alert");
  if (!alert) return;
  var dismissed = false;
  function show() { if (!dismissed) alert.style.display = "block"; }
  function hide() { alert.style.display = "none"; }
  alert.querySelector(".close-btn").addEventListener("click", function () {
    dismissed = true; hide();
  });
  setTimeout(show, 1000);
})();