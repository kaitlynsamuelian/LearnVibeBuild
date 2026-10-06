(function () {
  "use strict";
  var bays = Array.prototype.slice.call(document.querySelectorAll(".bay"));
  var tags = Array.prototype.slice.call(document.querySelectorAll(".ridge a"));
  if (!bays.length) return;

  function mark(id) {
    tags.forEach(function (t) {
      t.classList.toggle("on", t.getAttribute("href") === "#" + id);
    });
    bays.forEach(function (b) {
      var now = b.id === id;
      b.classList.toggle("now", now);
      if (now) {
        b.classList.remove("drip");
        void b.offsetWidth;
        b.classList.add("drip");
      }
    });
  }

  if (location.hash) {
    var jump = document.querySelector(location.hash);
    if (jump) jump.scrollIntoView();
  }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        mark(entry.target.id);
      });
    }, { threshold: 0.55 });
    bays.forEach(function (b) { io.observe(b); });
  } else {
    mark(bays[0].id);
  }
})();
