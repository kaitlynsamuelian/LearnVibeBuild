/* Question answering over a parsed audit. Local first; optional cloud model. */
(function (global) {
  "use strict";

  function lower(s) { return (s || "").toLowerCase(); }

  function listReqs(reqs) {
    if (!reqs.length) return "I didn't find any in that group.";
    return reqs.map(function (r) {
      var extra = "";
      if (r.hours && r.hours.needed != null) extra += " (" + r.hours.needed + " hours still listed)";
      if (r.selectFrom && r.selectFrom.length) extra += " — options include " + r.selectFrom.slice(0, 5).join(", ");
      return "• " + r.title + extra;
    }).join("\n");
  }

  function searchRaw(raw, q) {
    var words = q.split(/\s+/).filter(function (w) { return w.length > 3; });
    if (!words.length) return null;
    var lines = raw.split(/\r?\n/);
    var hits = lines.filter(function (line) {
      var L = lower(line);
      return words.some(function (w) { return L.indexOf(w) !== -1; });
    }).slice(0, 8);
    return hits.length ? hits.join("\n") : null;
  }

  function listCourses(courses) {
    if (!courses.length) return "None found in this audit.";
    return courses.map(function (c) {
      var g = c.grade === "***" ? "in progress" : c.grade;
      return "• " + c.code + " — " + (c.title || "") + " (" + c.term + ", " + c.credits + " cr, " + g + ")";
    }).join("\n");
  }

  function answerCourses(question, parsed) {
    var q = lower(question);
    var b = parsed.buckets;
    var t = parsed.totals;

    // Direct course-code lookup.
    var codeHit = question.toUpperCase().match(/[A-Z]{2,6}\s?\d{3,4}/);
    if (codeHit) {
      var code = codeHit[0].replace(/\s+/g, "");
      var found = parsed.courses.filter(function (c) { return c.code.indexOf(code) === 0; });
      if (found.length) {
        return "Here's what the audit shows for " + code + ":\n\n" + listCourses(found);
      }
    }

    if (/in progress|this semester|currently taking|right now|\bip\b/.test(q)) {
      return b.ip.length
        ? "Courses in progress (marked ***):\n\n" + listCourses(b.ip) +
          "\n\nThose add up to about " + t.inProgress + " credits."
        : "I don't see any in-progress (***) courses in this text.";
    }
    if (/what.*(left|remain|still need|need to take|missing)|leftover|not met|what do i need/.test(q)) {
      return "Honest answer: this is your Coursework History tab, so it lists classes you've taken — it does NOT list which degree requirements are still unmet.\n\n" +
        "What I can tell you: you have about " + t.earned + " credits earned and " + t.inProgress + " in progress.\n\n" +
        "To get a real \"what's left\" list, run the audit's requirements view (the one with green checks and red X's for each requirement group) and upload that instead.";
    }
    if (/gpa|grade point/.test(q)) {
      if (!parsed.termGpas.length) return "No GPA was printed on this tab. The requirements view sometimes shows a cumulative GPA.";
      var last = parsed.termGpas[parsed.termGpas.length - 1];
      return "This tab shows GPA per term, not one cumulative number. Your most recent term GPA is " + last.gpa +
        ". Term GPAs on record: " + parsed.termGpas.map(function (x) { return x.gpa; }).join(", ") + ".";
    }
    if (/credit|hour|how many/.test(q)) {
      return "From the courses listed: about " + t.earned + " credits earned" +
        (t.transfer ? " (" + t.transfer + " of that transfer/AP)" : "") +
        " and " + t.inProgress + " credits in progress. Most CU bachelor's degrees need ~120 total — but confirm your exact number in the requirements view.";
    }
    if (/withdraw|failed|\bd\b|repeat|second look|problem|flag/.test(q)) {
      return b.flagged.length
        ? "Courses worth a second look (withdrawals, D/F grades, or repeated/excluded attempts):\n\n" + listCourses(b.flagged) +
          "\n\nRepeated courses usually count on the later attempt, but ask an advisor how a low grade affects your major GPA."
        : "Nothing jumps out as a withdrawal, D/F, or excluded attempt. Nice.";
    }
    if (/done|completed|finished|passed|taken/.test(q)) {
      return "You've completed " + b.done.length + " courses (~" + t.earned + " credits). A few:\n\n" +
        listCourses(b.done.slice(0, 12)) + (b.done.length > 12 ? "\n…and more." : "");
    }
    if (/abroad|study abroad/.test(q)) {
      return "This tab won't show study-abroad planning. That's a conversation for your college advisor — abroad timing can shift which required courses you take when.";
    }
    if (/next semester|what should i take|enroll|register/.test(q)) {
      return "I can't schedule you from a coursework list. Your in-progress courses this term are:\n\n" + listCourses(b.ip) +
        "\n\nFor what to take next, use the requirements view to see open groups, then check Buff Portal.";
    }
    if (/program|major|degree/.test(q)) {
      return parsed.header.programs && parsed.header.programs.length
        ? "The audit is coded for: " + parsed.header.programs.join(", ") + ". Those are CU program/college codes (e.g. a bachelor's -BS…, a minor -MIN)."
        : "I couldn't cleanly read the program codes from this text.";
    }

    var snippet = searchRaw(parsed.raw, q);
    if (snippet) return "Closest lines I found in the text:\n\n" + snippet;
    return "I can answer about your completed classes, in-progress courses, credits, a specific course code, or flagged grades. Try “what's in progress?” or a code like “CSCI 3155”.";
  }

  function sectionLine(s) {
    var bits = [];
    if (s.target) bits.push(s.target.elective ? "elective, up to " + s.target.max + " hrs" : (s.target.min === s.target.max ? s.target.min : s.target.min + "-" + s.target.max) + " hrs required");
    var stillToGo = s.remaining != null ? s.remaining : s.needs;
    if (stillToGo != null && stillToGo > 0) bits.push(stillToGo + " still to go");
    if (s.ipHours) bits.push(s.ipHours + " in progress");
    if (s.select && s.select.length) bits.push("choose from: " + s.select.join(", ").slice(0, 80));
    return "• " + s.title + (bits.length ? " (" + bits.join("; ") + ")" : "");
  }

  function answerSections(question, parsed) {
    var q = lower(question);
    var h = parsed.header;
    var s = parsed.summary;

    // Named requirement lookup.
    var match = parsed.sections.filter(function (sec) {
      var t = lower(sec.title);
      return q.split(/\s+/).some(function (w) { return w.length > 3 && t.indexOf(w) !== -1; });
    });
    if (match.length && /capstone|math|science|writing|elective|minor|foundation|core|humanities|h&ss|focus|natural|engineering|perspective/.test(q)) {
      return "Here’s what the audit shows for that:\n\n" + match.map(function (sec) {
        var status = sec.status === "no" ? "STILL NEEDED" : sec.status === "ip" ? "IN PROGRESS" : "satisfied";
        var courses = sec.courses.length ? "\n   Courses applied: " + sec.courses.map(function (c) { return c.code + " (" + (c.grade === "***" ? "in progress" : c.grade) + ")"; }).join(", ") : "";
        var sel = sec.select.length ? "\n   Still to choose from: " + sec.select.join(", ").slice(0, 120) : "";
        return "[" + status + "] " + sectionLine(sec).slice(2) + courses + sel;
      }).join("\n\n");
    }

    if (/what.*(left|remain|still need|to take|missing|do i need)|leftover|not satisf|not met|not done/.test(q)) {
      var out = "Here’s what still needs attention:\n\n";
      out += s.no.length ? s.no.map(sectionLine).join("\n") : "Nothing is explicitly flagged as unmet.";
      if (h.electiveRemaining && h.electiveRemaining > 0.5) {
        out += "\n• Free / general elective credit (~" + h.electiveRemaining + " hrs to reach " + (h.minHours || "the minimum") + ")";
      }
      if (s.ip.length) out += "\n\nIn progress (finishes these terms):\n" + s.ip.map(sectionLine).join("\n");
      if (h.summaryNeeds != null) out += "\n\nOverall the audit says you still need about " + h.summaryNeeds + " credit hours to reach " + (h.minHours || "the minimum") + ".";
      out += "\n\nThis is from the PDF, not the registrar — confirm with your advisor.";
      return out;
    }
    if (/in progress|this semester|currently|right now/.test(q)) {
      return s.ip.length
        ? "In-progress requirements:\n\n" + s.ip.map(sectionLine).join("\n") + (h.inProgress != null ? "\n\nThat’s about " + h.inProgress + " credits in progress." : "")
        : "No requirements are marked in progress.";
    }
    if (/gpa|grade point/.test(q)) {
      return h.overallGpa != null
        ? "Your cumulative GPA on this audit is " + h.overallGpa + " (the degree minimum is usually 2.0)."
        : "I couldn’t find a cumulative GPA on this audit.";
    }
    if (/credit|hour|how many/.test(q)) {
      var parts = [];
      if (h.earned != null) parts.push(h.earned + " earned");
      if (h.inProgress != null) parts.push(h.inProgress + " in progress");
      if (h.summaryNeeds != null) parts.push(h.summaryNeeds + " still needed");
      if (h.minHours) parts.push("toward a " + h.minHours + "-hour minimum");
      return parts.length ? "Credit hours: " + parts.join(", ") + "." : "I couldn’t read the credit-hour totals.";
    }
    if (/graduat|done|finish|eligible/.test(q)) {
      return (h.gradEligible ? "The audit says you ARE eligible to apply for graduation" : "The audit doesn’t show graduation eligibility yet") +
        (h.summaryNeeds != null ? ", with about " + h.summaryNeeds + " credits still needed" : "") +
        ". The header verdict is “" + (h.overallStatus === "incomplete" ? "at least one requirement not yet satisfied" : "requirements satisfied") +
        ".” Apply for graduation in Buff Portal and confirm with your advisor.";
    }
    if (/done|satisf|complete/.test(q)) {
      return "Requirements that look satisfied:\n\n" + s.ok.map(sectionLine).join("\n");
    }
    if (/abroad/.test(q)) {
      return "Study-abroad planning isn’t a line on this audit — talk to your advisor, since abroad timing can shift when you take required courses.";
    }

    var snippet = searchRaw(parsed.raw, q);
    if (snippet) return "Closest lines in the audit text:\n\n" + snippet;
    return "I can tell you what’s left, what’s in progress, credits, GPA, graduation eligibility, or details on a requirement (try “capstone” or “math”).";
  }

  function answerLocal(question, parsed) {
    if (parsed.mode === "sections") return answerSections(question, parsed);
    if (parsed.mode === "courses") return answerCourses(question, parsed);
    var q = lower(question);
    var s = parsed.summary;

    if (/what.*(left|remain|still need|need to take|missing)|leftover|incomplete|not met|not done/.test(q)) {
      return "Here's what's still open on this audit:\n\n" + listReqs(s.no) +
        (s.ip.length ? "\n\nIn progress (counts if you pass):\n" + listReqs(s.ip) : "") +
        "\n\nThat list comes from requirement blocks marked incomplete. Your advisor can confirm substitutions.";
    }
    if (/in progress|this semester|currently taking|\bip\b/.test(q)) {
      return s.ip.length
        ? "In-progress items I found:\n\n" + listReqs(s.ip)
        : "I didn't clearly mark any in-progress requirement blocks. Check the raw text for grades like *** or IP.";
    }
    if (/gpa|grade point/.test(q)) {
      if (parsed.gpa.overall == null) return "I couldn't find a clearly labeled overall GPA on this audit.";
      var extra = parsed.gpa.required != null ? " The listed minimum is " + parsed.gpa.required + "." : "";
      return "Overall GPA on the audit: " + parsed.gpa.overall + "." + extra;
    }
    if (/credit|hour|how many/.test(q) && /need|left|remain|applied|required|total/.test(q) || /how many credit/.test(q)) {
      var h = parsed.hours;
      var parts = [];
      if (h.applied != null) parts.push(h.applied + " applied");
      if (h.required != null) parts.push(h.required + " required");
      if (s.neededHours != null) parts.push(s.neededHours + " still needed");
      return parts.length
        ? "Credit hours I could read: " + parts.join(", ") + "."
        : "I couldn't find a clear hours required / applied / needed line. Try asking about a specific requirement.";
    }
    if (/abroad|study abroad|international/.test(q)) {
      var hit = searchRaw(parsed.raw, "abroad semester residence capstone");
      return hit
        ? "Here's what the audit text says related to abroad / residence:\n\n" + hit + "\n\nTreat this as a flag to talk to an advisor — abroad timing can move graduation."
        : "This audit text doesn't mention study abroad. That's a planning question for your college advisor; capstone and in-residence rules often matter.";
    }
    if (/next semester|what should i take|enroll|register/.test(q)) {
      var open = s.no.slice(0, 5).map(function (r) { return r.title; });
      var opts = [];
      s.no.forEach(function (r) {
        (r.selectFrom || []).forEach(function (c) { if (opts.indexOf(c) === -1) opts.push(c); });
      });
      return "I can't officially schedule you, but the open requirement blocks suggest focusing on: " +
        (open.join("; ") || "whatever your advisor flagged") + "." +
        (opts.length ? " Course codes that showed up as options: " + opts.slice(0, 8).join(", ") + "." : "") +
        " Cross-check Buff Portal / the live audit before you enroll.";
    }
    if (/done|completed|finished|what have i/.test(q)) {
      return s.ok.length
        ? "Requirement blocks that look complete:\n\n" + listReqs(s.ok)
        : "I didn't find blocks clearly marked complete. The PDF may use symbols that didn't survive as text.";
    }
    if (/program|major|what degree/.test(q)) {
      return parsed.header.program
        ? "Program listed: " + parsed.header.program + (parsed.header.catalog ? " (catalog " + parsed.header.catalog + ")." : ".")
        : "I couldn't find a Program: line. It may be on a cover page the PDF didn't extract.";
    }

    var snippet = searchRaw(parsed.raw, q);
    if (snippet) {
      return "I searched the audit text for your words. Closest lines:\n\n" + snippet + "\n\nIf that's not it, try asking about leftovers, GPA, or credits.";
    }
    return "I can answer leftovers, in-progress classes, GPA, credit hours, the program name, or study-abroad notes — or I can search the text for a course code. Try “what do I still need?”";
  }

  async function answerWithApi(question, parsed, settings) {
    var system = "You explain university degree audits in plain English for the student who owns this audit. " +
      "Only use the audit text. If something is missing, say so. Never invent course offerings or promise a graduation date. " +
      "Remind them this is unofficial and an advisor should confirm high-stakes decisions. Be concise.";
    var user = "AUDIT TEXT:\n" + parsed.raw.slice(0, 24000) + "\n\nQUESTION:\n" + question;

    if (settings.provider === "anthropic") {
      var aRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": settings.key,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 800,
          system: system,
          messages: [{ role: "user", content: user }]
        })
      });
      if (!aRes.ok) throw new Error("Anthropic request failed (" + aRes.status + "). Check the key and CORS/browser access.");
      var aJson = await aRes.json();
      return (aJson.content || []).map(function (b) { return b.text || ""; }).join("\n").trim();
    }

    var oRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + settings.key
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user }
        ]
      })
    });
    if (!oRes.ok) throw new Error("OpenAI request failed (" + oRes.status + "). Check the key.");
    var oJson = await oRes.json();
    return oJson.choices[0].message.content.trim();
  }

  global.answerLocal = answerLocal;
  global.answerWithApi = answerWithApi;
})(window);
