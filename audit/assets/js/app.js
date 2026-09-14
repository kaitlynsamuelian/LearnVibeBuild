(function () {
  "use strict";

  var state = { parsed: null, sourceLabel: "" };

  var $ = function (id) { return document.getElementById(id); };

  function show(id, on) {
    var el = $(id);
    if (el) el.hidden = !on;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function statusLabel(st) {
    if (st === "ok") return "Done";
    if (st === "ip") return "In progress";
    return "Still open";
  }

  function pill(st) {
    return '<span class="status-pill ' + st + '">' + statusLabel(st) + "</span>";
  }

  function renderReq(r) {
    var details = (r.detail || []).slice(0, 6).map(function (d) {
      return "<li>" + escapeHtml(d) + "</li>";
    }).join("");
    return (
      '<article class="req-card">' +
        '<header><h3>' + escapeHtml(r.title) + "</h3>" + pill(r.status) + "</header>" +
        (details ? "<ul>" + details + "</ul>" : "") +
      "</article>"
    );
  }

  function courseStatusInfo(c) {
    if (c.status === "ip") return { cls: "ip", label: c.grade === "IP" ? "In progress" : "In progress", note: c.repeated ? "Repeat" : "" };
    if (c.status === "transfer") return { cls: "ok", label: "Transfer", note: "AP/transfer credit" };
    if (c.status === "withdrawn") return { cls: "no", label: "Withdrawn", note: "W — no credit earned" };
    if (c.status === "excluded") return { cls: "no", label: "Excluded", note: "Earlier attempt, dropped from GPA" };
    if (c.status === "low") return { cls: "no", label: c.grade, note: c.repeated ? "Repeated later" : "Low grade — may not count for the major" };
    return { cls: "ok", label: c.grade, note: c.repeated ? "Repeat that counts" : "" };
  }

  function renderCourse(c) {
    var info = courseStatusInfo(c);
    var meta = [c.term, c.credits + " cr"].filter(Boolean).join(" · ");
    return (
      '<article class="req-card">' +
        '<header><h3>' + escapeHtml(c.code) + " — " + escapeHtml(c.title || "") + "</h3>" +
          '<span class="status-pill ' + info.cls + '">' + escapeHtml(info.label) + "</span></header>" +
        "<ul><li>" + escapeHtml(meta) + (info.note ? " · " + escapeHtml(info.note) : "") + "</li></ul>" +
      "</article>"
    );
  }

  function renderSection(sec) {
    var cls = sec.status === "no" ? "no" : sec.status === "ip" ? "ip" : "ok";
    var label = sec.status === "no" ? "Still needed" : sec.status === "ip" ? "In progress" : "Satisfied";
    var facts = [];
    if (sec.target) {
      facts.push(sec.target.elective
        ? "Elective (up to " + sec.target.max + " hrs)"
        : (sec.target.min === sec.target.max ? sec.target.min : sec.target.min + "–" + sec.target.max) + " hrs required");
    }
    if (sec.earnedHours != null) facts.push(sec.earnedHours + " earned");
    if (sec.added != null && sec.earnedHours == null) facts.push(sec.added + " applied");
    if (sec.ipHours) facts.push(sec.ipHours + " in progress");
    if (sec.needs != null && sec.needs > 0) facts.push("<strong>" + sec.needs + " hrs still to go</strong>");

    var body = "";
    if (facts.length) body += "<ul><li>" + facts.join(" · ") + "</li></ul>";
    if (sec.shortfall && (sec.needs == null)) {
      body += '<p class="empty">Shows about ' + sec.shortfall + " hr(s) under the minimum — worth confirming with an advisor.</p>";
    }
    if (sec.select && sec.select.length) {
      var opts = sec.select.join(", ");
      if (opts.length > 160) opts = opts.slice(0, 160) + "…";
      body += '<p class="empty">Still to choose from: ' + escapeHtml(opts) + "</p>";
    }
    if (sec.courses && sec.courses.length) {
      var chips = sec.courses.slice(0, 10).map(function (c) {
        var g = c.grade === "***" ? "in-progress" : c.grade;
        return "<li>" + escapeHtml(c.code) + " (" + escapeHtml(g) + ")</li>";
      }).join("");
      body += "<ul class='course-chips'>" + chips + "</ul>";
    }
    return (
      '<article class="req-card">' +
        '<header><h3>' + escapeHtml(sec.title) + '</h3><span class="status-pill ' + cls + '">' + label + "</span></header>" +
        body +
      "</article>"
    );
  }

  function renderElectiveCard(hrs, minHours) {
    return (
      '<article class="req-card">' +
        '<header><h3>Free / general elective credit</h3><span class="status-pill no">Still needed</span></header>' +
        "<ul><li><strong>~" + hrs + " hrs still to go</strong></li></ul>" +
        '<p class="empty">Credit hours not tied to a specific named requirement — any approved course counts, to reach the ' +
        (minHours ? minHours + "-hour" : "degree") + " minimum.</p>" +
      "</article>"
    );
  }

  function setStat(i, value, label) {
    $("stat" + i).textContent = value == null || value === "" ? "—" : value;
    $("stat" + i + "label").textContent = label;
  }

  function setReqHead(title, descHtml) {
    $("reqHeadTitle").textContent = title;
    $("reqHeadDesc").innerHTML = descHtml;
    show("reqHead", true);
  }

  function setCol(i, label, count, html, emptyMsg) {
    $("col" + i + "label").textContent = label;
    $("count" + i).textContent = count;
    $("list" + i).innerHTML = html || '<p class="empty">' + emptyMsg + "</p>";
  }

  function applyParsed(parsed, label) {
    state.parsed = parsed;
    state.sourceLabel = label;
    $("sourceLabel").textContent = label;
    $("plainEnglish").textContent = window.plainEnglish(parsed);

    var h = parsed.header;
    var metaParts = [];
    if (parsed.mode === "sections") {
      if (h.student) metaParts.push(h.student);
      if (h.plan) metaParts.push(h.plan);
      if (h.college) metaParts.push(h.college);
      if (h.catalogYear) metaParts.push("Catalog " + h.catalogYear);
    } else {
      if (h.programs && h.programs.length) metaParts.push(h.programs.join(", "));
      if (parsed.mode === "courses") metaParts.push("Coursework-history view");
    }
    $("metaLine").textContent = metaParts.join(" · ") || "Program details weren’t labeled clearly in the text.";

    var note = $("modeNote");
    if (parsed.mode === "sections") {
      show("cols", true);
      setReqHead(
        "Requirement progress",
        "Each card is one degree requirement, a category like writing, math, or capstone. " +
        "It shows <strong>category completion</strong>, not credit hours. A full semester of classes " +
        "may not finish any single requirement, so a “Still needed” tag doesn’t mean you’re behind."
      );
      note.hidden = false;
      note.innerHTML = (h.gradEligible
        ? "The audit says you’re <strong>eligible to apply for graduation</strong>. "
        : "") +
        "Still unofficial. Confirm anything that affects your plan with your advisor.";

      setStat(1, h.earned, "Credits earned");
      setStat(2, h.inProgress, "Credits in progress");
      setStat(3, h.summaryNeeds, h.neededApprox ? "Credits still needed (est.)" : "Credits still needed");
      setStat(4, h.overallGpa, "Cumulative GPA");

      var s = parsed.summary;
      setCol(1, "Satisfied", s.ok.length, s.ok.map(renderSection).join(""), "Nothing marked satisfied yet.");
      setCol(2, "In progress", s.ip.length, s.ip.map(renderSection).join(""), "No in-progress requirements.");

      var noHtml = s.no.map(renderSection).join("");
      var noCount = s.no.length;
      if (h.electiveRemaining && h.electiveRemaining > 0.5) {
        noHtml += renderElectiveCard(h.electiveRemaining, h.minHours);
        noCount += 1;
      }
      setCol(3, "Still needed", noCount, noHtml, "Nothing flagged as still needed — confirm with your advisor.");
    } else if (parsed.mode === "courses") {
      show("reqHead", false);
      show("cols", true);
      note.hidden = false;
      note.innerHTML = "This is the <strong>Coursework History</strong> tab — it shows classes and grades, not requirement check-offs. " +
        "For a true “what’s left” list, run the audit’s <strong>requirements</strong> view (the one with green checks / red X’s) and upload that.";

      var t = parsed.totals;
      setStat(1, t.earned, "Credits earned (approx)");
      setStat(2, t.inProgress, "Credits in progress");
      setStat(3, parsed.courses.length, "Courses on record");
      var lastGpa = parsed.termGpas.length ? parsed.termGpas[parsed.termGpas.length - 1].gpa : null;
      setStat(4, lastGpa, "Most recent term GPA");

      var b = parsed.buckets;
      setCol(1, "Completed", b.done.length, b.done.map(renderCourse).join(""), "No completed courses detected.");
      setCol(2, "In progress", b.ip.length, b.ip.map(renderCourse).join(""), "No in-progress (***) courses found.");
      setCol(3, "Worth a second look", b.flagged.length, b.flagged.map(renderCourse).join(""), "No withdrawals, D/F, or excluded attempts. Nice.");
    } else {
      show("cols", true);
      setReqHead(
        "Requirement progress",
        "Each card is a degree requirement block marked <strong>done</strong>, <strong>in progress</strong>, or " +
        "<strong>still open</strong>. It shows requirement completion, not raw credit hours."
      );
      note.hidden = true;
      var hrs = parsed.hours;
      setStat(1, hrs.applied, "Hours applied");
      setStat(2, hrs.required, "Hours required");
      setStat(3, parsed.summary.neededHours, "Hours still needed");
      setStat(4, parsed.gpa.overall, "Overall GPA");

      var s = parsed.summary;
      setCol(1, "Done", s.ok.length, s.ok.map(renderReq).join(""), "No blocks clearly marked complete.");
      setCol(2, "In progress", s.ip.length, s.ip.map(renderReq).join(""), "No in-progress blocks found.");
      setCol(3, "Still open", s.no.length, s.no.map(renderReq).join(""), "Nothing marked incomplete.");
    }

    $("rawText").textContent = parsed.raw;
    $("scanWarn").hidden = !parsed.thin;

    $("chatLog").innerHTML = "";
    var greeting = "Ask me about leftovers, GPA, credits, or a course code. I only know what’s in this audit.";
    if (parsed.mode === "sections") greeting = "Ask what’s left, what’s in progress, about a specific requirement (e.g. “capstone”, “math”), credits, or GPA.";
    else if (parsed.mode === "courses") greeting = "Ask about your classes, credits, in-progress courses, or a course code. Heads up: this tab can’t tell which requirements are met.";
    addChat("assistant", greeting);

    show("landing", false);
    show("results", true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function addChat(role, text) {
    var log = $("chatLog");
    var div = document.createElement("div");
    div.className = "bubble " + role;
    div.textContent = text;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
  }

  // Rebuild visual lines from text-item positions so requirement sections stay intact.
  function itemsToLines(items) {
    var rows = [];
    items.forEach(function (it) {
      if (!it.str || !it.transform) return;
      var y = it.transform[5];
      var x = it.transform[4];
      var row = null;
      for (var i = 0; i < rows.length; i++) {
        if (Math.abs(rows[i].y - y) <= 2.5) { row = rows[i]; break; }
      }
      if (!row) { row = { y: y, items: [] }; rows.push(row); }
      row.items.push({ x: x, str: it.str });
    });
    rows.sort(function (a, b) { return b.y - a.y; });
    return rows.map(function (r) {
      r.items.sort(function (a, b) { return a.x - b.x; });
      return r.items.map(function (i) { return i.str; }).join(" ").replace(/\s+/g, " ").trim();
    }).filter(Boolean).join("\n");
  }

  async function extractPdfText(file) {
    if (!window.pdfjsLib) throw new Error("PDF library didn’t load. Check your network and refresh.");
    var buf = await file.arrayBuffer();
    var pdf = await window.pdfjsLib.getDocument({ data: buf }).promise;
    var pages = [];
    for (var i = 1; i <= pdf.numPages; i++) {
      var page = await pdf.getPage(i);
      var content = await page.getTextContent();
      pages.push(itemsToLines(content.items));
    }
    return pages.join("\n");
  }

  function handleText(text, label) {
    var parsed = window.parseAudit(text);
    applyParsed(parsed, label);
  }

  async function handleFile(file) {
    if (!file) return;
    $("uploadStatus").textContent = "Reading " + file.name + "…";
    try {
      var text = await extractPdfText(file);
      if (!text.trim()) throw new Error("No text came out of that PDF. It may be a scan. Paste the text instead, or re-save from the degree audit as a text PDF.");
      handleText(text, file.name);
      $("uploadStatus").textContent = "";
    } catch (err) {
      $("uploadStatus").textContent = err.message || String(err);
    }
  }

  function setupPdfJs() {
    if (window.pdfjsLib) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    }
  }

  function apiSettings() {
    var enabled = $("useApi").checked;
    var provider = $("apiProvider").value;
    var key = $("apiKey").value.trim();
    if (!enabled || !key) return null;
    return { provider: provider, key: key };
  }

  function buildCopyPrompt() {
    if (!state.parsed) return "";
    return "You are helping me understand MY degree audit. Only use this text. Do not invent requirements. " +
      "Give: (1) a plain-English summary, (2) what's done, (3) what's still needed, (4) anything in progress, " +
      "(5) questions I should ask a human advisor. Remind me this is unofficial.\n\nAUDIT:\n" +
      state.parsed.raw;
  }

  function bind() {
    setupPdfJs();

    $("fileInput").addEventListener("change", function (e) {
      var f = e.target.files && e.target.files[0];
      handleFile(f);
    });

    var drop = $("dropzone");
    ["dragenter", "dragover"].forEach(function (ev) {
      drop.addEventListener(ev, function (e) {
        e.preventDefault();
        drop.classList.add("over");
      });
    });
    ["dragleave", "drop"].forEach(function (ev) {
      drop.addEventListener(ev, function (e) {
        e.preventDefault();
        drop.classList.remove("over");
      });
    });
    drop.addEventListener("drop", function (e) {
      var f = e.dataTransfer.files && e.dataTransfer.files[0];
      handleFile(f);
    });
    drop.addEventListener("click", function () { $("fileInput").click(); });
    drop.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); $("fileInput").click(); }
    });

    $("sampleBtn").addEventListener("click", function () {
      handleText(window.SAMPLE_AUDIT, "Sample audit (fictional student — Alex Rivera)");
    });

    $("pasteBtn").addEventListener("click", function () {
      show("pastePanel", $("pastePanel").hidden);
    });
    $("parsePaste").addEventListener("click", function () {
      var t = $("pasteBox").value;
      if (!t.trim()) {
        $("uploadStatus").textContent = "Paste some audit text first.";
        return;
      }
      handleText(t, "Pasted audit text");
    });

    $("resetBtn").addEventListener("click", function () {
      state.parsed = null;
      $("fileInput").value = "";
      show("results", false);
      show("landing", true);
    });

    $("copyPrompt").addEventListener("click", async function () {
      try {
        await navigator.clipboard.writeText(buildCopyPrompt());
        $("copyPrompt").textContent = "Copied — paste into Claude or ChatGPT";
        setTimeout(function () { $("copyPrompt").textContent = "Copy a prompt for Claude / ChatGPT"; }, 2200);
      } catch (e) {
        $("promptFallback").hidden = false;
        $("promptFallback").value = buildCopyPrompt();
      }
    });

    $("askForm").addEventListener("submit", async function (e) {
      e.preventDefault();
      if (!state.parsed) return;
      var q = $("askInput").value.trim();
      if (!q) return;
      $("askInput").value = "";
      addChat("user", q);
      var api = apiSettings();
      addChat("assistant", api ? "Asking the model…" : "Looking through the audit…");
      var last = $("chatLog").lastChild;
      try {
        var reply = api
          ? await window.answerWithApi(q, state.parsed, api)
          : window.answerLocal(q, state.parsed);
        last.textContent = reply;
      } catch (err) {
        last.textContent = (err.message || String(err)) + " Falling back to the on-page explainer.\n\n" +
          window.answerLocal(q, state.parsed);
      }
    });

    document.querySelectorAll("[data-ask]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        $("askInput").value = btn.getAttribute("data-ask");
        $("askForm").dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
      });
    });
  }

  document.addEventListener("DOMContentLoaded", bind);
})();
