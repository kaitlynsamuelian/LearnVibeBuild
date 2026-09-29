/* =========================================================
   Boop stories — little campus films. Start with Late to ATLAS.
   ========================================================= */

(function () {
  "use strict";

  var timers = [];
  var playing = false;
  var current = "atlas";
  var stage = document.getElementById("story-stage");
  var storyScreen = document.getElementById("story");

  var cards = {
    atlas: { title: "Late to ATLAS", end: "you made it. kind of." },
    hail: { title: "hail on the hill", end: "the ice was free." }
  };

  function later(ms, fn) {
    timers.push(window.setTimeout(fn, ms));
  }

  function clearTimers() {
    timers.forEach(function (id) { window.clearTimeout(id); });
    timers = [];
  }

  function castBoop(el, mood) {
    var app = window.BoopApp;
    var s = app.getState();
    el.classList.add("pet");
    el.dataset.color = s.color;
    el.dataset.hat = s.hat;
    el.dataset.mood = mood || "happy";
    app.mountPet(el);
  }

  function fillCast() {
    stage.querySelectorAll("[data-cast]").forEach(function (el) {
      castBoop(el, el.getAttribute("data-cast"));
    });
  }

  function scene(html, cls) {
    stage.className = "story-stage " + (cls || "");
    stage.innerHTML = html;
    fillCast();
  }

  function stopStory() {
    clearTimers();
    playing = false;
    if (storyScreen) storyScreen.classList.remove("ended");
  }

  function showEnd() {
    var id = current;
    var card = cards[id];
    clearTimers();
    playing = false;
    storyScreen.classList.add("ended");
    scene(
      '<div class="st st-end">' +
        '<p class="st-kicker">a Boop story</p>' +
        "<h3>" + card.title + "</h3>" +
        '<p class="st-sub">' + card.end + "</p>" +
        '<button type="button" class="care-btn st-replay" id="story-replay"><span class="emoji">↻</span>Watch again</button>' +
      "</div>",
      "is-end"
    );
    var replay = document.getElementById("story-replay");
    if (replay) {
      replay.addEventListener("click", function () {
        playStory(id);
      });
    }
    window.BoopApp.markStory(id);
    window.BoopApp.announce("End of " + card.title);
  }

  function playAtlas() {
    var app = window.BoopApp;
    stopStory();
    playing = true;
    current = "atlas";
    storyScreen.classList.remove("ended");
    app.showTab("story");
    app.announce("Late to ATLAS");

    scene(
      '<div class="st st-title">' +
        '<p class="st-kicker">a Boop story</p>' +
        "<h3>Late to ATLAS</h3>" +
        '<p class="st-sub">Boulder · a weekday</p>' +
      "</div>",
      "is-title"
    );

    later(2600, function () {
      scene(
        '<div class="st st-bed">' +
          '<div class="st-window"><span></span></div>' +
          '<div class="st-bedframe"></div>' +
          '<div class="st-boop st-sleeper" data-cast="asleep"></div>' +
          '<p class="st-zzz">z z z</p>' +
          '<div class="st-alarm"><span>ATLAS 4519</span><b>in 12 min</b></div>' +
          '<p class="st-caption st-caption-late">no.</p>' +
        "</div>",
        "is-bed"
      );
    });

    later(5000, function () {
      var sleeper = stage.querySelector("[data-cast]");
      if (sleeper) sleeper.dataset.mood = "hungry";
      stage.classList.add("awake");
    });

    later(7200, function () {
      scene(
        '<div class="st st-walk">' +
          '<div class="st-sky"></div>' +
          '<div class="st-iron i1"></div>' +
          '<div class="st-iron i2"></div>' +
          '<div class="st-iron i3"></div>' +
          '<div class="st-cloud c1"></div>' +
          '<div class="st-cloud c2"></div>' +
          '<div class="st-tree t1"></div>' +
          '<div class="st-tree t2"></div>' +
          '<div class="st-tree t3"></div>' +
          '<div class="st-ground"></div>' +
          '<div class="st-boop st-walker" data-cast="happy"></div>' +
          '<p class="st-caption">campus is being extremely campus.</p>' +
        "</div>",
        "is-walk"
      );
    });

    later(13800, function () {
      scene(
        '<div class="st st-wonder">' +
          '<div class="st-sky dusk"></div>' +
          '<div class="st-iron big i1"></div>' +
          '<div class="st-iron big i2"></div>' +
          '<div class="st-iron big i3"></div>' +
          '<div class="st-leaf l1">✦</div>' +
          '<div class="st-leaf l2">✧</div>' +
          '<div class="st-leaf l3">✦</div>' +
          '<div class="st-note">📓</div>' +
          '<div class="st-ground still"></div>' +
          '<div class="st-boop st-still" data-cast="happy"></div>' +
          '<p class="st-caption">the mountains said wait.</p>' +
        "</div>",
        "is-wonder"
      );
    });

    later(16800, function () {
      stage.classList.add("chasing");
      var line = stage.querySelector(".st-caption");
      if (line) line.textContent = "the notebook did not wait.";
    });

    later(19600, function () {
      scene(
        '<div class="st st-studio">' +
          '<div class="st-studio-wall"></div>' +
          '<div class="st-lamp"></div>' +
          '<div class="st-desk"></div>' +
          '<div class="st-laptop"><i></i></div>' +
          '<div class="st-boop st-sit" data-cast="happy"></div>' +
          '<p class="st-caption">i have a creature.</p>' +
        "</div>",
        "is-studio"
      );
    });

    later(24600, showEnd);
  }

  function hailStones() {
    var out = "";
    var i;
    for (i = 0; i < 10; i++) out += "<span></span>";
    return '<div class="hl-stones">' + out + "</div>";
  }

  function hillShops() {
    return (
      '<div class="hl-shop s1"><i></i></div>' +
      '<div class="hl-shop s2"><i></i></div>' +
      '<div class="hl-shop s3"><i></i></div>' +
      '<div class="hl-shop s4"><i></i></div>'
    );
  }

  function caption(text) {
    var line = stage.querySelector(".st-caption");
    if (line) line.textContent = text;
  }

  function mood(name) {
    var boop = stage.querySelector("[data-cast]");
    if (boop) boop.dataset.mood = name;
  }

  function playHail() {
    var app = window.BoopApp;
    stopStory();
    playing = true;
    current = "hail";
    storyScreen.classList.remove("ended");
    app.showTab("story");
    app.announce("hail on the hill");

    scene(
      '<div class="st st-title">' +
        '<p class="st-kicker">a Boop story</p>' +
        "<h3>hail on the hill</h3>" +
        '<p class="st-sub">13th street · 4:10 pm</p>' +
      "</div>",
      "is-title"
    );

    later(2600, function () {
      scene(
        '<div class="st hl-hill">' +
          '<div class="hl-sky"></div>' +
          '<div class="hl-lid"></div>' +
          '<div class="hl-sun"></div>' +
          '<div class="hl-bank"></div>' +
          hillShops() +
          '<div class="hl-curb"></div>' +
          '<div class="hl-boop hl-climber" data-cast="happy">' +
            '<span class="hl-cup"><i></i></span>' +
          "</div>" +
          '<p class="st-caption">68 degrees. i wore shorts. i was smug about it.</p>' +
        "</div>",
        "is-hill"
      );
    });

    later(5900, function () {
      stage.classList.add("turning");
      caption("that cloud came over the flatirons in about a minute.");
    });

    later(8300, function () {
      scene(
        '<div class="st hl-hail">' +
          '<div class="hl-front"></div>' +
          '<div class="hl-awning"></div>' +
          hailStones() +
          '<div class="hl-ping g1"></div>' +
          '<div class="hl-ping g2"></div>' +
          '<div class="hl-ping g3"></div>' +
          '<div class="hl-curb wet"></div>' +
          '<div class="hl-boop hl-pelted" data-cast="sad">' +
            '<span class="hl-cup"><i></i></span>' +
          "</div>" +
          '<p class="st-caption">pea sized. sideways. absolutely rude.</p>' +
        "</div>",
        "is-hail"
      );
    });

    later(11500, function () {
      stage.classList.add("sheltered");
      mood("dirty");
      caption("the awning outside the pizza place took the rest of it.");
    });

    later(15500, function () {
      scene(
        '<div class="st hl-clear">' +
          '<div class="hl-sky bright"></div>' +
          '<div class="hl-sun big"></div>' +
          '<div class="hl-bow"><i></i><i></i><i></i><i></i></div>' +
          hillShops() +
          '<div class="hl-curb wet"></div>' +
          '<div class="hl-drift d1"></div>' +
          '<div class="hl-drift d2"></div>' +
          '<div class="hl-steam p1"></div>' +
          '<div class="hl-steam p2"></div>' +
          '<div class="hl-steam p3"></div>' +
          '<div class="hl-boop hl-stand" data-cast="ok">' +
            '<span class="hl-cup"><i></i><b></b></span>' +
            '<span class="hl-spark">✦</span>' +
          "</div>" +
          '<div class="hl-puddle"></div>' +
          '<p class="st-caption">and then it just stopped. four minutes, total.</p>' +
        "</div>",
        "is-clear"
      );
    });

    later(18700, function () {
      stage.classList.add("iced");
      mood("happy");
      caption("boulder refilled my ice for free.");
    });

    later(22900, showEnd);
  }

  function playStory(id) {
    if (id === "atlas") playAtlas();
    if (id === "hail") playHail();
  }

  function skipStory() {
    if (!playing || storyScreen.classList.contains("ended")) return;
    showEnd();
  }

  window.playBoopStory = playStory;
  window.stopBoopStory = stopStory;
  window.skipBoopStory = skipStory;
})();
