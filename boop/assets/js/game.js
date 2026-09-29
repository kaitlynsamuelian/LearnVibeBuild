/* =========================================================
   My Boop — care, decay, shop, three minigames, local save
   ========================================================= */

(function () {
  "use strict";

  var KEY = "lvb-my-boop-v1";
  var HOUR = 60 * 60 * 1000;
  var DECAY = { hunger: 9, clean: 6, energy: 7, happy: 4 };

  var COLORS = [
    { id: "sky", label: "Sky", price: 0, swatch: "#6ec6ff" },
    { id: "peach", label: "Peach", price: 25, swatch: "#ff9b8a" },
    { id: "mint", label: "Mint", price: 25, swatch: "#7ee0b8" },
    { id: "grape", label: "Grape", price: 30, swatch: "#b79bff" },
    { id: "butter", label: "Butter", price: 30, swatch: "#ffd56a" },
    { id: "ink", label: "Ink", price: 35, swatch: "#3a3648" }
  ];
  var HATS = [
    { id: "none", label: "Bare", price: 0 },
    { id: "sprout", label: "Sprout", price: 20 },
    { id: "bow", label: "Bow", price: 28 },
    { id: "party", label: "Party", price: 32 },
    { id: "beanie", label: "Beanie", price: 36 }
  ];
  var ROOMS = [
    { id: "day", label: "Day", price: 0 },
    { id: "dusk", label: "Dusk", price: 22 },
    { id: "meadow", label: "Meadow", price: 28 },
    { id: "night", label: "Night", price: 28 }
  ];

  var LINES = {
    happy: ["boop.", "i am a very normal creature.", "the floor is lava. just kidding. it is floor.", "you came back!"],
    hungry: ["snack?", "a berry would fix this.", "my belly is doing a sad trombone."],
    dirty: ["i have been... living.", "bath? bold of you to notice.", "these spots are art. no they aren't."],
    sleepy: ["five more minutes.", "my eyes voted no.", "horizontal sounds good."],
    asleep: ["z z z", "dreaming of snacks.", "do not perceive me."],
    sad: ["hey.", "i could use a little everything.", "this is a cry for snacks and also love."],
    poke: ["boop!", "hey!!", "ok that was rude. do it again.", "i felt that in my soul."]
  };

  var state;
  var sleepTimer = null;
  var toastTimer = null;
  var playCleanup = null;

  function mountPet(host) {
    var tpl = document.getElementById("pet-markup");
    if (!host || !tpl || host.querySelector(".pet-svg")) return;
    host.insertBefore(tpl.content.cloneNode(true), host.firstChild);
  }

  var nameBtn = document.getElementById("name-btn");
  var ageEl = document.getElementById("age");
  var coinsEl = document.getElementById("coins");
  var pet = document.getElementById("pet");
  var room = document.getElementById("room");
  var bubble = document.getElementById("bubble");
  var live = document.getElementById("live");
  var toast = document.getElementById("toast");
  var snackFly = document.getElementById("snack-fly");
  var playfield = document.getElementById("playfield");
  var playTitle = document.getElementById("play-title");
  var playStat = document.getElementById("play-stat");
  var playHint = document.getElementById("play-hint");

  function clamp(n) {
    return Math.max(0, Math.min(100, n));
  }

  function fresh() {
    var now = Date.now();
    return {
      name: "Boop",
      hunger: 82,
      clean: 80,
      energy: 78,
      happy: 84,
      coins: 40,
      color: "sky",
      hat: "none",
      room: "day",
      lastTick: now,
      born: now,
      napping: false,
      seenStories: [],
      owned: {
        colors: ["sky"],
        hats: ["none"],
        rooms: ["day"]
      }
    };
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return fresh();
      var data = JSON.parse(raw);
      var base = fresh();
      var next = Object.assign(base, data);
      next.owned = Object.assign(base.owned, data.owned || {});
      next.seenStories = data.seenStories || [];
      next.napping = false;
      return next;
    } catch (err) {
      return fresh();
    }
  }

  function save() {
    state.lastTick = Date.now();
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (err) {}
  }

  function applyDecay() {
    var now = Date.now();
    var hours = (now - state.lastTick) / HOUR;
    if (hours <= 0) return;
    if (hours > 18) hours = 18;
    state.hunger = clamp(state.hunger - DECAY.hunger * hours);
    state.clean = clamp(state.clean - DECAY.clean * hours);
    state.energy = clamp(state.energy - DECAY.energy * hours);
    var extra = (state.hunger < 35 || state.clean < 35 || state.energy < 35) ? 3 : 0;
    state.happy = clamp(state.happy - (DECAY.happy + extra) * hours);
    state.lastTick = now;
  }

  function mood() {
    if (state.napping || state.energy < 18) return "asleep";
    if (state.hunger < 28 && state.clean < 28 && state.happy < 35) return "sad";
    if (state.hunger < 34) return "hungry";
    if (state.clean < 34) return "dirty";
    if (state.energy < 36) return "sleepy";
    if (state.happy > 72 && state.hunger > 55) return "happy";
    return "ok";
  }

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function say(kind) {
    var lines = LINES[kind] || LINES.happy;
    bubble.textContent = pick(lines);
  }

  function announce(text) {
    if (live) live.textContent = text;
  }

  function showToast(text) {
    toast.hidden = false;
    toast.textContent = text;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.hidden = true;
    }, 1800);
  }

  function setBar(id, value) {
    var el = document.getElementById(id);
    el.style.width = value + "%";
    el.className = value < 34 ? "low" : value < 62 ? "mid" : "";
  }

  function ageLabel() {
    var hours = (Date.now() - state.born) / HOUR;
    if (hours < 1) return "just hatched";
    if (hours < 24) return Math.floor(hours) + "h old";
    var days = Math.floor(hours / 24);
    return days === 1 ? "1 day old" : days + " days old";
  }

  function render() {
    nameBtn.textContent = state.name;
    ageEl.textContent = ageLabel();
    coinsEl.textContent = "◎ " + Math.floor(state.coins);
    pet.dataset.color = state.color;
    pet.dataset.hat = state.hat;
    pet.dataset.mood = mood();
    room.dataset.room = state.room;
    setBar("bar-hunger", state.hunger);
    setBar("bar-clean", state.clean);
    setBar("bar-energy", state.energy);
    setBar("bar-happy", state.happy);
    document.getElementById("sleep-btn").innerHTML =
      '<span class="emoji">🌙</span>' + (mood() === "asleep" ? "Wake" : "Sleep");
    renderShop();
  }

  function ownedHas(kind, id) {
    return state.owned[kind].indexOf(id) !== -1;
  }

  function buyOrWear(kind, item, wearKey) {
    if (ownedHas(kind, item.id)) {
      state[wearKey] = item.id;
      say("happy");
      save();
      render();
      return;
    }
    if (state.coins < item.price) {
      showToast("need " + item.price + " coins");
      announce("Not enough coins");
      return;
    }
    state.coins -= item.price;
    state.owned[kind].push(item.id);
    state[wearKey] = item.id;
    state.happy = clamp(state.happy + 6);
    showToast("new look!");
    say("happy");
    save();
    render();
  }

  function shopButton(item, kind, wearKey) {
    var have = ownedHas(kind, item.id);
    var on = state[wearKey] === item.id;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "shop-item" + (on ? " on" : "");
    var swatch = item.swatch
      ? '<span class="swatch" style="background:' + item.swatch + '"></span>'
      : "";
    btn.innerHTML = swatch + item.label + (have ? "" : " · " + item.price);
    btn.addEventListener("click", function () {
      buyOrWear(kind, item, wearKey);
    });
    return btn;
  }

  function renderShop() {
    fillShop("shop-colors", COLORS, "colors", "color");
    fillShop("shop-hats", HATS, "hats", "hat");
    fillShop("shop-rooms", ROOMS, "rooms", "room");
  }

  function fillShop(id, catalog, kind, wearKey) {
    var row = document.getElementById(id);
    row.innerHTML = "";
    catalog.forEach(function (item) {
      row.appendChild(shopButton(item, kind, wearKey));
    });
  }

  function showTab(name) {
    ["home", "games", "shop", "play", "stories", "story"].forEach(function (id) {
      document.getElementById(id).hidden = id !== name;
    });
    document.querySelectorAll(".tab").forEach(function (tab) {
      var key = tab.getAttribute("data-tab");
      tab.classList.toggle(
        "on",
        key === name ||
          (name === "play" && key === "games") ||
          (name === "story" && key === "stories")
      );
    });
    document.getElementById("phone").classList.toggle("watching", name === "story");
    if (name !== "play" && playCleanup) {
      playCleanup();
      playCleanup = null;
    }
    if (name !== "story" && window.stopBoopStory) {
      window.stopBoopStory();
    }
  }

  function feed() {
    if (state.napping || mood() === "asleep") {
      say("asleep");
      return;
    }
    state.hunger = clamp(state.hunger + 26);
    state.happy = clamp(state.happy + 4);
    state.coins += 2;
    snackFly.hidden = false;
    snackFly.textContent = pick(["🍓", "🍪", "🫐", "🥐"]);
    snackFly.style.animation = "none";
    void snackFly.offsetWidth;
    snackFly.style.animation = "";
    setTimeout(function () { snackFly.hidden = true; }, 700);
    say("happy");
    showToast("+2 coins");
    save();
    render();
    announce("Fed " + state.name);
  }

  function bathe() {
    if (state.napping || mood() === "asleep") {
      say("asleep");
      return;
    }
    state.clean = clamp(state.clean + 34);
    state.happy = clamp(state.happy + 5);
    state.coins += 2;
    say("happy");
    bubble.textContent = "squeaky.";
    showToast("+2 coins");
    save();
    render();
    announce("Bathed " + state.name);
  }

  function sleepToggle() {
    if (state.napping) return;
    if (state.energy < 18) {
      state.energy = clamp(state.energy + 22);
      bubble.textContent = "fine. i am up.";
      save();
      render();
      return;
    }
    state.napping = true;
    document.getElementById("feed-btn").disabled = true;
    document.getElementById("bath-btn").disabled = true;
    say("asleep");
    announce(state.name + " is sleeping");
    render();
    sleepTimer = setTimeout(function () {
      state.napping = false;
      state.energy = clamp(state.energy + 38);
      state.happy = clamp(state.happy + 4);
      state.coins += 2;
      sleepTimer = null;
      document.getElementById("feed-btn").disabled = false;
      document.getElementById("bath-btn").disabled = false;
      bubble.textContent = "i dreamed i was a snack.";
      showToast("+2 coins");
      save();
      render();
    }, 2600);
  }

  function poke() {
    if (state.napping) {
      say("asleep");
      return;
    }
    pet.classList.remove("squish");
    void pet.offsetWidth;
    pet.classList.add("squish");
    state.happy = clamp(state.happy + 2);
    say("poke");
    save();
    render();
  }

  function rename() {
    var next = window.prompt("Name your pet", state.name);
    if (!next) return;
    next = next.trim().slice(0, 16);
    if (!next) return;
    state.name = next;
    save();
    render();
    bubble.textContent = "ok. i am " + state.name + " now.";
  }

  function reward(coins, happy, line) {
    state.coins += coins;
    state.happy = clamp(state.happy + happy);
    state.energy = clamp(state.energy - 6);
    showToast("+" + coins + " coins");
    bubble.textContent = line;
    save();
    render();
  }

  function miniPetSvg() {
    var color = getComputedStyle(pet).getPropertyValue("--pet").trim() || "#7ad4ff";
    return '<svg viewBox="0 0 80 80" aria-hidden="true">' +
      '<ellipse cx="26" cy="24" rx="7" ry="9" fill="' + color + '"/>' +
      '<ellipse cx="54" cy="24" rx="7" ry="9" fill="' + color + '"/>' +
      '<ellipse cx="40" cy="44" rx="26" ry="24" fill="' + color + '"/>' +
      '<ellipse cx="27" cy="42" rx="6" ry="4" fill="#ff9bb8" opacity="0.8"/>' +
      '<ellipse cx="53" cy="42" rx="6" ry="4" fill="#ff9bb8" opacity="0.8"/>' +
      '<circle cx="32" cy="40" r="5" fill="#fff"/><circle cx="48" cy="40" r="5" fill="#fff"/>' +
      '<circle cx="33" cy="41" r="2.4" fill="#1c1a17"/><circle cx="49" cy="41" r="2.4" fill="#1c1a17"/>' +
      '<path d="M34 51c3 5 6 5 6 0c3 5 6 5 6 0" fill="none" stroke="#1c1a17" stroke-width="2.2" stroke-linecap="round"/>' +
      '</svg>';
  }

  function startCatch() {
    var score = 0;
    var left = 12;
    var falling = [];
    playTitle.textContent = "Snack Catch";
    playStat.textContent = "0";
    playHint.textContent = "Tap the snacks. 12 seconds.";
    playfield.innerHTML = "";
    showTab("play");

    var clock = setInterval(function () {
      left -= 1;
      playHint.textContent = left + "s left · " + score + " snacks";
      if (left <= 0) {
        end();
      }
    }, 1000);

    var spawn = setInterval(function () {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "falling";
      btn.textContent = pick(["🍓", "🍪", "🫐", "🥐", "🍒"]);
      btn.style.left = 8 + Math.random() * 78 + "%";
      btn.style.top = "-10%";
      var y = -10;
      var speed = 0.9 + Math.random() * 0.8;
      playfield.appendChild(btn);
      var move = setInterval(function () {
        y += speed;
        btn.style.top = y + "%";
        if (y > 92) {
          clearInterval(move);
          btn.remove();
        }
      }, 30);
      btn.addEventListener("click", function () {
        score += 1;
        playStat.textContent = String(score);
        clearInterval(move);
        btn.remove();
      });
      falling.push(move);
    }, 480);

    function end() {
      clearInterval(clock);
      clearInterval(spawn);
      falling.forEach(clearInterval);
      playfield.innerHTML = "";
      var coins = 3 + score;
      reward(coins, Math.min(18, score * 2), score ? "i could eat forever." : "i watched them all fall. iconic.");
      playHint.textContent = "Caught " + score + ". Back to games whenever.";
      showTab("games");
      playCleanup = null;
    }

    playCleanup = function () {
      clearInterval(clock);
      clearInterval(spawn);
      falling.forEach(clearInterval);
    };
  }

  function startMemory() {
    var faces = ["🍓", "🫧", "🌙", "🍓", "🫧", "🌙"];
    for (var i = faces.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = faces[i];
      faces[i] = faces[j];
      faces[j] = tmp;
    }
    var open = [];
    var matched = 0;
    var lock = false;
    playTitle.textContent = "Memory";
    playStat.textContent = "0 / 3";
    playHint.textContent = "Match the pairs.";
    playfield.innerHTML = "";
    playfield.className = "playfield";
    var grid = document.createElement("div");
    grid.className = "memory-grid";
    playfield.appendChild(grid);
    showTab("play");

    faces.forEach(function (face, index) {
      var card = document.createElement("button");
      card.type = "button";
      card.className = "mem-card";
      card.textContent = "?";
      card.setAttribute("data-face", face);
      card.setAttribute("data-i", String(index));
      card.addEventListener("click", function () {
        if (lock || card.classList.contains("up") || card.classList.contains("gone")) return;
        card.classList.add("up");
        card.textContent = face;
        open.push(card);
        if (open.length < 2) return;
        lock = true;
        var a = open[0];
        var b = open[1];
        open = [];
        if (a.getAttribute("data-face") === b.getAttribute("data-face")) {
          matched += 1;
          playStat.textContent = matched + " / 3";
          setTimeout(function () {
            a.classList.add("gone");
            b.classList.add("gone");
            lock = false;
            if (matched >= 3) {
              reward(12, 16, "i remember things now. briefly.");
              showTab("games");
              playCleanup = null;
            }
          }, 280);
        } else {
          setTimeout(function () {
            a.classList.remove("up");
            b.classList.remove("up");
            a.textContent = "?";
            b.textContent = "?";
            lock = false;
          }, 620);
        }
      });
      grid.appendChild(card);
    });

    playCleanup = function () {
      playfield.innerHTML = "";
    };
  }

  function startHop() {
    var score = 0;
    var left = 10;
    playTitle.textContent = "Boop Hop";
    playStat.textContent = "0";
    playHint.textContent = "Tap Boop. 10 seconds.";
    playfield.innerHTML = "";
    showTab("play");

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "hopper";
    btn.setAttribute("aria-label", "Tap Boop");
    btn.innerHTML = miniPetSvg();
    playfield.appendChild(btn);

    function move() {
      var maxX = playfield.clientWidth - 80;
      var maxY = playfield.clientHeight - 80;
      btn.style.left = Math.max(8, Math.random() * maxX) + "px";
      btn.style.top = Math.max(8, Math.random() * maxY) + "px";
    }
    move();

    btn.addEventListener("click", function () {
      score += 1;
      playStat.textContent = String(score);
      move();
    });

    var clock = setInterval(function () {
      left -= 1;
      playHint.textContent = left + "s left · " + score + " boops";
      if (left <= 0) {
        clearInterval(clock);
        playfield.innerHTML = "";
        reward(3 + score, Math.min(16, score), score ? "dizzy. worth it." : "you just... watched?");
        showTab("games");
        playCleanup = null;
      }
    }, 1000);

    playCleanup = function () {
      clearInterval(clock);
      playfield.innerHTML = "";
    };
  }

  function resetAll() {
    if (!window.confirm("Start over? Boop will forget this life.")) return;
    localStorage.removeItem(KEY);
    state = fresh();
    say("happy");
    bubble.textContent = "hello. i am new.";
    save();
    render();
    showTab("home");
  }

  mountPet(document.getElementById("intro-pet"));
  mountPet(pet);

  state = load();
  applyDecay();
  save();
  say(mood() === "ok" ? "happy" : mood());
  render();

  function finishIntro() {
    var intro = document.getElementById("intro");
    if (!intro || intro.hidden || intro.classList.contains("leaving")) return;
    intro.classList.add("leaving");
    document.body.classList.remove("introing");
    window.clearTimeout(introTimer);
    window.setTimeout(function () {
      intro.hidden = true;
      announce(state.name + " is ready");
    }, 560);
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var introTimer = window.setTimeout(finishIntro, reduceMotion ? 700 : 4000);
  document.getElementById("intro-skip").addEventListener("click", finishIntro);
  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    if (!document.getElementById("intro").hidden) finishIntro();
    else if (!document.getElementById("story").hidden && window.stopBoopStory) {
      window.stopBoopStory();
      showTab("stories");
    }
  });

  document.getElementById("feed-btn").addEventListener("click", feed);
  document.getElementById("bath-btn").addEventListener("click", bathe);
  document.getElementById("sleep-btn").addEventListener("click", sleepToggle);
  document.getElementById("pet-hit").addEventListener("click", poke);
  nameBtn.addEventListener("click", rename);
  document.getElementById("reset-btn").addEventListener("click", resetAll);
  document.getElementById("play-back").addEventListener("click", function () {
    showTab("games");
  });

  document.querySelectorAll(".tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      showTab(tab.getAttribute("data-tab"));
    });
  });

  document.querySelectorAll(".game-card").forEach(function (card) {
    card.addEventListener("click", function () {
      var game = card.getAttribute("data-game");
      if (game === "catch") startCatch();
      if (game === "memory") startMemory();
      if (game === "hop") startHop();
    });
  });

  document.getElementById("story-atlas").addEventListener("click", function () {
    if (window.playBoopStory) window.playBoopStory("atlas");
  });
  document.getElementById("story-hail").addEventListener("click", function () {
    if (window.playBoopStory) window.playBoopStory("hail");
  });
  document.getElementById("story-back").addEventListener("click", function () {
    if (window.stopBoopStory) window.stopBoopStory();
    showTab("stories");
  });
  document.getElementById("story-skip").addEventListener("click", function () {
    if (window.skipBoopStory) window.skipBoopStory();
  });

  window.BoopApp = {
    showTab: showTab,
    mountPet: mountPet,
    getState: function () { return state; },
    save: save,
    render: render,
    clamp: clamp,
    announce: announce,
    toast: showToast,
    markStory: function (id) {
      if (state.seenStories.indexOf(id) !== -1) return;
      state.seenStories.push(id);
      state.coins += 8;
      state.happy = clamp(state.happy + 12);
      save();
      render();
      showToast("+8 coins · a story");
    }
  };

  setInterval(function () {
    applyDecay();
    save();
    render();
  }, 30000);
})();
