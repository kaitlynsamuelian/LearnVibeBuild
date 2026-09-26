/* =========================================================
   Buff Trivia — start, lock, score, roast, play again
   ========================================================= */

(function () {
  "use strict";

  var deck = [];
  var index = 0;
  var score = 0;
  var locked = false;
  var recap = [];

  var startScreen = document.getElementById("start");
  var quizScreen = document.getElementById("quiz");
  var resultScreen = document.getElementById("result");
  var questionEl = document.getElementById("question");
  var choicesEl = document.getElementById("choices");
  var factEl = document.getElementById("fact");
  var nextBtn = document.getElementById("next-btn");
  var progressLabel = document.getElementById("progress");
  var progressBar = document.getElementById("progress-bar");
  var liveScore = document.getElementById("live-score");
  var plusOne = document.getElementById("plus-one");
  var scoreEl = document.getElementById("score");
  var roastTitle = document.getElementById("roast-title");
  var roastEl = document.getElementById("roast");
  var recapEl = document.getElementById("recap");
  var live = document.getElementById("live");

  function shuffle(list) {
    var copy = list.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  function show(screen) {
    startScreen.hidden = screen !== "start";
    quizScreen.hidden = screen !== "quiz";
    resultScreen.hidden = screen !== "result";
  }

  function announce(text) {
    if (live) live.textContent = text;
  }

  function buildDeck() {
    deck = QUESTIONS.map(function (q) {
      var order = q.choices.map(function (_, i) { return i; });
      order = shuffle(order);
      return {
        q: q.q,
        choices: order.map(function (i) { return q.choices[i]; }),
        answer: order.indexOf(q.answer),
        fact: q.fact
      };
    });
    deck = shuffle(deck);
  }

  function roastFor(n) {
    var pick = ROASTS[0];
    for (var i = 0; i < ROASTS.length; i++) {
      if (n >= ROASTS[i].min) pick = ROASTS[i];
    }
    return pick;
  }

  function renderQuestion() {
    var item = deck[index];
    locked = false;
    questionEl.textContent = item.q;
    progressLabel.textContent = "Question " + (index + 1) + " of " + deck.length;
    progressBar.style.width = ((index) / deck.length * 100) + "%";
    liveScore.textContent = score + " / " + deck.length;
    factEl.hidden = true;
    factEl.textContent = "";
    nextBtn.hidden = true;
    nextBtn.textContent = index === deck.length - 1 ? "See the roast" : "Next question";
    choicesEl.classList.remove("is-shake");
    choicesEl.innerHTML = "";

    item.choices.forEach(function (label, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice";
      btn.dataset.index = String(i);
      btn.innerHTML =
        '<span class="choice-key">' + (i + 1) + "</span>" +
        '<span class="choice-label"></span>';
      btn.querySelector(".choice-label").textContent = label;
      btn.addEventListener("click", function () { pick(i); });
      choicesEl.appendChild(btn);
    });

    announce("Question " + (index + 1) + " of " + deck.length);
  }

  function pick(choiceIndex) {
    if (locked) return;
    locked = true;

    var item = deck[index];
    var buttons = choicesEl.querySelectorAll(".choice");
    var correct = choiceIndex === item.answer;

    if (correct) {
      score += 1;
      liveScore.textContent = score + " / " + deck.length;
      popPlus();
    } else {
      choicesEl.classList.remove("is-shake");
      void choicesEl.offsetWidth;
      choicesEl.classList.add("is-shake");
    }

    buttons.forEach(function (btn, i) {
      btn.disabled = true;
      if (i === item.answer) btn.classList.add("is-right");
      else if (i === choiceIndex) btn.classList.add("is-wrong");
    });

    recap.push({
      q: item.q,
      ok: correct
    });

    factEl.textContent = item.fact;
    factEl.hidden = false;
    nextBtn.hidden = false;
    nextBtn.focus();
    progressBar.style.width = ((index + 1) / deck.length * 100) + "%";
    announce(correct ? "Correct. " + item.fact : "Not quite. " + item.fact);
  }

  function popPlus() {
    if (!plusOne) return;
    plusOne.classList.remove("is-on");
    void plusOne.offsetWidth;
    plusOne.classList.add("is-on");
  }

  function next() {
    if (!locked) return;
    index += 1;
    if (index >= deck.length) finish();
    else renderQuestion();
  }

  function finish() {
    var roast = roastFor(score);
    scoreEl.textContent = score + " / " + deck.length;
    roastTitle.textContent = roast.title;
    roastEl.textContent = roast.body;
    recapEl.innerHTML = "";
    recap.forEach(function (row) {
      var li = document.createElement("li");
      li.className = row.ok ? "ok" : "no";
      var mark = document.createElement("span");
      mark.className = "mark";
      mark.setAttribute("aria-hidden", "true");
      mark.textContent = row.ok ? "✓" : "✗";
      var text = document.createElement("span");
      text.textContent = row.q;
      li.appendChild(mark);
      li.appendChild(text);
      recapEl.appendChild(li);
    });
    show("result");
    announce("Finished. " + score + " out of " + deck.length + ". " + roast.title);
  }

  function start() {
    index = 0;
    score = 0;
    locked = false;
    recap = [];
    buildDeck();
    show("quiz");
    renderQuestion();
  }

  document.getElementById("start-btn").addEventListener("click", start);
  document.getElementById("again-btn").addEventListener("click", start);
  nextBtn.addEventListener("click", next);

  document.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (quizScreen.hidden) {
      if ((e.key === "Enter" || e.key === " ") && !startScreen.hidden) {
        e.preventDefault();
        start();
      }
      return;
    }
    if (e.key === "Enter" && locked && !nextBtn.hidden) {
      e.preventDefault();
      next();
      return;
    }
    var n = parseInt(e.key, 10);
    if (n >= 1 && n <= 4) pick(n - 1);
  });
})();
