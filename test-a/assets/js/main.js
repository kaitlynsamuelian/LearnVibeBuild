(function () {
  "use strict";
  var panels = Array.prototype.slice.call(document.querySelectorAll(".panel"));
  var dots = Array.prototype.slice.call(document.querySelectorAll(".dots a"));
  if (!panels.length || !("IntersectionObserver" in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var id = entry.target.id;
      dots.forEach(function (d) {
        d.classList.toggle("on", d.getAttribute("href") === "#" + id);
      });
    });
  }, { threshold: 0.55 });
  panels.forEach(function (p) { io.observe(p); });
})();
