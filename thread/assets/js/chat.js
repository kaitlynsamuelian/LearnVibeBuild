/* =========================================================
   Campus Thread — play the scene, then let the student in
   ========================================================= */

(function () {
  "use strict";

  var thread = document.getElementById("thread");
  var playBtn = document.getElementById("play-btn");
  var form = document.getElementById("composer");
  var input = document.getElementById("student-input");
  var sendBtn = document.getElementById("send-btn");
  var live = document.getElementById("live");
  var clock = document.getElementById("clock");

  var playing = false;
  var token = 0;
  var queued = null;
  var reduceMotion = false;
  try {
    reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) {}

  function announce(text) {
    if (live) live.textContent = text;
  }

  function setClock() {
    if (!clock) return;
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var suffix = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    clock.textContent = h + ":" + (m < 10 ? "0" : "") + m + " " + suffix;
  }

  function wait(ms) {
    if (reduceMotion) return Promise.resolve();
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  function scrollBottom() {
    thread.scrollTop = thread.scrollHeight;
  }

  function clearThread() {
    thread.innerHTML = "";
  }

  function addSystem(text) {
    var p = document.createElement("p");
    p.className = "sys";
    p.textContent = text;
    thread.appendChild(p);
    scrollBottom();
  }

  function addBubble(id, text) {
    var voice = VOICES[id];
    var row = document.createElement("div");
    row.className = "row" + (id === "me" ? " me" : "");

    if (id !== "me") {
      var av = document.createElement("span");
      av.className = "av " + id;
      av.textContent = voice.letter;
      av.setAttribute("aria-hidden", "true");
      row.appendChild(av);
    }

    var stack = document.createElement("div");
    stack.className = "stack";

    if (id !== "me") {
      var who = document.createElement("span");
      who.className = "who";
      who.textContent = voice.name;
      stack.appendChild(who);
    }

    var bubble = document.createElement("div");
    bubble.className = "bubble " + (id === "me" ? "mine" : id);
    bubble.textContent = text;
    stack.appendChild(bubble);
    row.appendChild(stack);
    thread.appendChild(row);
    scrollBottom();
    return row;
  }

  function addTyping(id) {
    var voice = VOICES[id];
    var row = document.createElement("div");
    row.className = "row typing-row";
    row.dataset.typing = id;

    var av = document.createElement("span");
    av.className = "av " + id;
    av.textContent = voice.letter;
    av.setAttribute("aria-hidden", "true");
    row.appendChild(av);

    var stack = document.createElement("div");
    stack.className = "stack";
    var who = document.createElement("span");
    who.className = "who";
    who.textContent = voice.name + " is typing";
    var bubble = document.createElement("div");
    bubble.className = "bubble typing " + id;
    bubble.innerHTML = "<span></span><span></span><span></span>";
    stack.appendChild(who);
    stack.appendChild(bubble);
    row.appendChild(stack);
    thread.appendChild(row);
    scrollBottom();
    return row;
  }

  function removeTyping(row) {
    if (row && row.parentNode) row.parentNode.removeChild(row);
  }

  function topicOf(text) {
    var t = text.toLowerCase();
    if (/(home\s*work|essay|paper|due|deadline|class|exam|quiz|assignment|project|studio)/.test(t)) return "homework";
    if (/(food|eat|hungry|dinner|lunch|breakfast|omelet|pizza|c4c|tray|coffee)/.test(t)) return "food";
    if (/(tired|sleep|nap|exhausted|all.?nighter|insomnia)/.test(t)) return "tired";
    if (/(weather|cold|snow|rain|wind|sun|hot|coat)/.test(t)) return "weather";
    return "def";
  }

  function say(id, text, my) {
    return wait(reduceMotion ? 0 : 420).then(function () {
      if (my !== token) return;
      var dots = addTyping(id);
      announce(VOICES[id].name + " is typing");
      return wait(reduceMotion ? 0 : 520 + Math.min(text.length * 12, 700)).then(function () {
        removeTyping(dots);
        if (my !== token) return;
        addBubble(id, text);
        announce(VOICES[id].name + ": " + text);
      });
    });
  }

  function playScene() {
    var my = ++token;
    playing = true;
    queued = null;
    playBtn.disabled = true;
    clearThread();
    addSystem("campus (4) · tonight");
    input.focus();

    var chain = Promise.resolve();
    SCRIPT.forEach(function (line) {
      chain = chain.then(function () {
        if (my !== token) return;
        return say(line.id, line.text, my);
      });
    });

    return chain.then(function () {
      if (my !== token) return;
      addSystem("You can text them. They will answer. They will not help.");
      playBtn.textContent = "Replay the scene";
      playBtn.disabled = false;
      playing = false;
      flushQueue();
    });
  }

  function replyTo(clean, my) {
    playing = true;
    var topic = topicOf(clean);
    var chain = Promise.resolve();
    ORDER.forEach(function (id) {
      chain = chain.then(function () {
        if (my !== token) return;
        return say(id, VOICES[id].replies[topic], my);
      });
    });
    return chain.then(function () {
      if (my !== token) return;
      playing = false;
      flushQueue();
    });
  }

  function flushQueue() {
    if (playing || !queued) return;
    var next = queued;
    queued = null;
    replyTo(next, token);
  }

  function sendStudent(text) {
    var clean = text.replace(/\s+/g, " ").trim();
    if (!clean) return;
    addBubble("me", clean);
    announce("You: " + clean);
    if (playing) {
      queued = clean;
      return;
    }
    replyTo(clean, token);
  }

  playBtn.addEventListener("click", playScene);
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    sendStudent(input.value);
    input.value = "";
  });

  setClock();
  setInterval(setClock, 30000);
  input.focus();
})();
