/* Parser for CU / Degree Works / CollegeSource audit text.
   Handles three shapes:
   (A) CollegeSource requirements view: named sections with EARNED / NEEDS / IN PROGRESS hours.
   (B) Degree Works requirements view: OK / NO / IP requirement blocks.
   (C) Coursework History view: term-by-term course list with grades.
   PDF text may arrive line-broken (good) or as one blob (pasted). */
(function (global) {
  "use strict";

  var TERM = "(FA|SP|SU|WI|MA)";
  var COURSE_TOKEN = "[A-Z]{2,6}\\d{3,4}[A-Z]{0,3}";
  var HOURS_SUFFIX = /\(\s*(?:up to\s*)?\d+(?:\s*[-\u2013]\s*\d+)?\s*(?:hours|hrs|credit hrs|credit hours)\s*\)/i;
  var BARE_HOURS = /^\(\s*(?:up to\s*)?\d+(?:\s*[-\u2013]\s*\d+)?\s*(?:hours|hrs|credit hrs|credit hours)\s*\)\s*$/i;

  function fixLigatures(text) {
    var t = text || "";
    for (var i = 0; i < 2; i++) {
      t = t.replace(/([a-z]) (ffi|ffl|fi|fl|ff) ([a-z])/g, "$1$2$3");
    }
    return t;
  }

  function normalize(text) {
    return (text || "").replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
  }

  function round(n) { return Math.round(n * 10) / 10; }

  // How many more semesters the remaining hours imply, assuming a 12–18 credit load.
  function semestersLeft(needs) {
    if (needs == null || needs <= 0) return null;
    var low = Math.ceil(needs / 18);   // heaviest load → fewest semesters
    var high = Math.ceil(needs / 12);  // lightest load → most semesters
    return { low: low, high: high, text: low === high ? String(low) : low + "\u2013" + high };
  }

  /* ---------- Course line ---------- */
  function classify(grade, flags) {
    var g = grade.toUpperCase();
    if (g === "***" || g === "IP") return "ip";
    if (g === "TC" || g === "T*") return "transfer";
    if (g === "W" || g === "WF") return "withdrawn";
    if (flags.indexOf(">E") !== -1) return "excluded";
    if (/^D/.test(g) || g === "F" || g === "NC" || g === "U") return "low";
    return "done";
  }

  var COURSE_RE = new RegExp(
    "^" + TERM + "(\\d{2})\\s+(" + COURSE_TOKEN + ")\\s+(\\d+\\.\\d)\\s+" +
    "(\\*\\*\\*|W|WF|TC|T\\*|NC|IP|P|S|U|[A-DF][+\\-]?)" +
    "((?:\\s*>[A-Z])*)\\s*(.*)$"
  );

  function parseCourseLine(line) {
    var m = line.match(COURSE_RE);
    if (!m) return null;
    var flags = (m[6] || "").trim().split(/\s+/).filter(Boolean);
    var title = (m[7] || "").trim();
    title = title.split(/\s+(?:END OF ANALYSIS|Open All|Close All|Download Adobe|Copyright)/i)[0].trim();
    title = title.replace(/\s*\(\s*\d+\.\d\s*HOURS.*$/i, "").trim();
    title = title.replace(/\s*\*{3,}.*$/, "").trim();
    title = title.replace(/\s+(?:FA|SP|SU|WI|MA)\d{2,4}\s*$/i, "").trim();
    title = title.replace(/\s+(?:PROCESSED AS|AP|MATCHED AS)\s*:.*$/i, "").trim();
    var grade = m[5].toUpperCase();
    return {
      term: m[1] + m[2],
      code: m[3],
      credits: parseFloat(m[4]),
      grade: grade,
      flags: flags,
      title: title,
      status: classify(grade, flags),
      repeated: flags.indexOf(">R") !== -1
    };
  }

  function extractCourses(flat) {
    var boundary = new RegExp("(?=\\b" + TERM + "\\d{2}\\s+" + COURSE_TOKEN + "\\s+\\d+\\.\\d)", "g");
    var chunks = flat.split(boundary);
    var courses = [];
    chunks.forEach(function (chunk) {
      var c = parseCourseLine(chunk.trim());
      if (c) courses.push(c);
    });
    return courses;
  }

  function dedupeCourses(courses) {
    var seen = {};
    return courses.filter(function (c) {
      var key = c.term + "|" + c.code + "|" + c.grade + "|" + c.title;
      if (seen[key]) return false;
      seen[key] = true;
      return true;
    });
  }

  function extractTermGpas(flat) {
    var re = new RegExp(TERM + "\\d{2,4}\\s*\\(\\s*([\\d.]+)\\s*HOURS TAKEN\\)\\s*(\\d+)\\s*COURSES?\\s*TAKEN\\s*([\\d.]+)\\s*GPA", "gi");
    var out = [];
    var m;
    while ((m = re.exec(flat))) {
      out.push({ hours: parseFloat(m[2]), courses: parseInt(m[3], 10), gpa: parseFloat(m[4]) });
    }
    return out;
  }

  function courseTotals(courses, flat) {
    var earned = 0, inProgress = 0, transfer = 0;
    courses.forEach(function (c) {
      if (c.status === "done") earned += c.credits;
      else if (c.status === "transfer") { earned += c.credits; transfer += c.credits; }
      else if (c.status === "ip") inProgress += c.credits;
    });
    var ipHit = flat.match(/IN-?P\s*-*>?\s*([\d.]+)\s*HOURS/i);
    if (ipHit) inProgress = parseFloat(ipHit[1]);
    return { earned: round(earned), inProgress: round(inProgress), transfer: round(transfer) };
  }

  /* ---------- Sections (view A) ---------- */
  var HEADING_EXCLUDE = /^(Complete|SELECT|Grade of|For a|All |Additional|Note|NOTE|Here is|This |A minimum|A cumulative|Only|Listing|Students|The |Credit|GPA|EARNED|NEEDS|IN |IN-?P|\d|\*|AP:|PROCESSED|>>|>|Program|Admission|Prepared|University|To earn|Requirements subject|Overall|At least|-|\u25c4|~|Open All|Download|Copyright|Explanation)/i;

  /* ---------- Per-college adapters ----------
     Every CU audit comes out of the same CollegeSource engine, so one generic
     parser does most of the work. Colleges differ in small ways (default credit
     minimums, a few section headings that should be treated as dividers, phrases
     that look like headings but aren't). Each profile can layer those tweaks on
     top of the generic engine. Add a college by dropping a new object in the list. */
  var SCHOOL_PROFILES = [
    {
      id: "engineering",
      label: "College of Engineering & Applied Science",
      test: /Engineering and Applied Science|EN[A-Z]{2,}-[A-Z]{3,}|ENGRU/i,
      minHoursDefault: 128,
      extraDividers: [],
      extraHeadingExcludes: []
    },
    {
      id: "arts-sciences",
      label: "College of Arts & Sciences",
      test: /College of Arts and Sciences|Arts and Sciences|ASGRU|A&S GPA/i,
      minHoursDefault: 120,
      extraDividers: [],
      extraHeadingExcludes: []
    },
    {
      id: "business",
      label: "Leeds School of Business",
      test: /Leeds School of Business|BUSU|Leeds/i,
      minHoursDefault: 120,
      extraDividers: [],
      extraHeadingExcludes: []
    },
    {
      id: "music",
      label: "College of Music",
      test: /College of Music|MUSU/i,
      minHoursDefault: 120,
      extraDividers: [],
      extraHeadingExcludes: []
    }
  ];

  var GENERIC_PROFILE = {
    id: "generic",
    label: null,
    minHoursDefault: null,
    extraDividers: [],
    extraHeadingExcludes: []
  };

  function detectSchool(flat) {
    for (var i = 0; i < SCHOOL_PROFILES.length; i++) {
      if (SCHOOL_PROFILES[i].test.test(flat)) return SCHOOL_PROFILES[i];
    }
    return GENERIC_PROFILE;
  }

  function isHeading(line, profile) {
    if (!HOURS_SUFFIX.test(line)) return false;
    // "+ Complete ..." / "- Complete ..." are sub-requirements of the current block, not headings.
    if (/^[+\u2022\-]\s/.test(line.trim())) return false;
    if (HEADING_EXCLUDE.test(line)) return false;
    if (new RegExp("^" + TERM + "\\d{2}\\b").test(line)) return false;
    // A line ending in a conjunction is part of a combined descriptor, not a standalone requirement.
    if (/\b(?:and|or)\s*$/i.test(line.trim())) return false;
    if (profile && profile.extraHeadingExcludes) {
      for (var i = 0; i < profile.extraHeadingExcludes.length; i++) {
        if (profile.extraHeadingExcludes[i].test(line)) return false;
      }
    }
    var before = line.split("(")[0].trim();
    if (before.length < 3 || before.length > 72) return false;
    return /[A-Za-z]/.test(before);
  }

  function parseTarget(line) {
    var m = line.match(/\(\s*(up to\s*)?(\d+)(?:\s*[-\u2013]\s*(\d+))?\s*(hours|hrs|credit hrs|credit hours)\s*\)/i);
    if (!m) return null;
    return {
      elective: !!m[1],
      min: m[1] ? null : parseInt(m[2], 10),
      max: m[3] ? parseInt(m[3], 10) : parseInt(m[2], 10)
    };
  }

  function cleanTitle(line) {
    var t = line.replace(/\s*\((?:up to\s*)?\d+(?:\s*[-\u2013]\s*\d+)?\s*(?:hours|hrs|credit hrs|credit hours)\s*\).*$/i, "").trim();
    // The native PDF export prefixes each requirement with its status code (OK/NO/IP).
    t = t.replace(/^(?:OK|NO|IP)\s+/, "").trim();
    // The print/paste view labels blocks "Requirement: Title" and repeats the title.
    t = t.replace(/^Requirement:\s*/i, "").trim();
    var dbl = t.match(/^(.+?)\s+\1$/); // collapse an exact doubled title "Foo Foo" -> "Foo"
    if (dbl) t = dbl[1].trim();
    return t;
  }

  // Sub-blocks that end the current requirement section (but don't start a new one).
  function isDivider(line, profile) {
    // A GPA sub-block heading, e.g. "Aerospace Engineering Sciences GPA" or "... GPA FA2023"
    // (but NOT a stat line like "EARNED: 15.0 HOURS 2.080 GPA").
    if (/^[A-Za-z][A-Za-z &/'\-]+GPA(?:\s+(?:FA|SP|SU|WI)\d{4})?$/.test(line) ||
      /^Overall .*(Requirement|GPA)/i.test(line) ||
      /Residency$/i.test(line) ||
      /:\s*Math Requirements$/i.test(line) ||
      /Requirement Term$/i.test(line)) return true;
    if (profile && profile.extraDividers) {
      for (var i = 0; i < profile.extraDividers.length; i++) {
        if (profile.extraDividers[i].test(line)) return true;
      }
    }
    return false;
  }

  function computeSectionStatus(sec) {
    var text = sec.lines.join(" ");
    var needsM = text.match(/NEEDS:\s*([\d.]+)\s*HOURS/i);
    var earnedM = text.match(/EARNED:\s*([\d.]+)\s*HOURS/i);
    var addedM = text.match(/([\d.]+)\s*HOURS ADDED/i);
    var ipTok = /IN PROGRESS\s*[\d.]+\s*HOURS|IN-?P\s*-*>?\s*[\d.]+\s*HOURS/i.test(text);
    var hasIpCourse = sec.courses.some(function (c) { return c.status === "ip"; });

    sec.needs = needsM ? parseFloat(needsM[1]) : null;
    sec.earnedHours = earnedM ? parseFloat(earnedM[1]) : null;
    sec.added = addedM ? parseFloat(addedM[1]) : null;

    var doneHours = 0, ipHours = 0;
    sec.courses.forEach(function (c) {
      if (c.status === "ip") ipHours += c.credits;
      else if (c.status !== "excluded" && c.status !== "withdrawn") doneHours += c.credits;
    });
    sec.doneHours = round(doneHours);
    sec.ipHours = round(ipHours);

    // Hours that definitely count now, vs. hours once in-progress courses finish.
    var covered = Math.max(sec.earnedHours || 0, sec.added || 0, sec.doneHours);
    var coveredAfterIp = round(covered + sec.ipHours);
    sec.coveredHours = round(covered);
    sec.hasIp = ipTok || hasIpCourse;

    var min = (sec.target && sec.target.min && !sec.target.elective) ? sec.target.min : null;
    sec.remaining = null; // hours you still have to register for (beyond what's in progress)

    // The native export states each requirement's status (OK/NO/IP) directly — trust it.
    if (sec.code) {
      sec.status = sec.code;
      if (sec.code === "no") {
        sec.remaining = (sec.needs != null && sec.needs > 0)
          ? sec.needs
          : (min != null ? round(Math.max(0, min - coveredAfterIp)) : null);
        if (sec.needs == null && sec.remaining != null) sec.needs = sec.remaining;
      }
      return;
    }

    if (sec.needs != null && sec.needs > 0) {
      // The registrar printed an explicit shortfall — treat it as authoritative.
      sec.status = "no";
      sec.remaining = sec.needs;
    } else if (min != null && coveredAfterIp < min - 0.5) {
      // Even after in-progress courses finish, this requirement is still short:
      // you have to register for more (e.g. a second capstone course). Still needed.
      sec.status = "no";
      sec.remaining = round(min - coveredAfterIp);
      if (sec.needs == null) sec.needs = sec.remaining;
    } else if (sec.hasIp && !(min != null && covered >= min - 0.5)) {
      // In progress and the in-progress hours bring it up to the bar (or no target):
      // it clears once those grades post.
      sec.status = "ip";
    } else {
      sec.status = "ok";
    }
  }

  function parseSections(lines, profile) {
    var startIdx = 0;
    for (var i = 0; i < lines.length; i++) {
      if (/SUMMARY$/.test(lines[i]) || /Summary\s*\(/i.test(lines[i])) { startIdx = i; break; }
    }
    var endIdx = lines.length;
    for (var j = startIdx + 1; j < lines.length; j++) {
      if (/Other Coursework Not Applied|END OF ANALYSIS|Legend|Coursework History/i.test(lines[j])) { endIdx = j; break; }
    }
    var region = lines.slice(startIdx, endIdx);

    // Merge a lone "(6 hours)" onto the previous line.
    var merged = [];
    region.forEach(function (l) {
      if (BARE_HOURS.test(l) && merged.length) merged[merged.length - 1] += " " + l;
      else merged.push(l);
    });

    var sections = [];
    var cur = null;
    merged.forEach(function (l) {
      if (isHeading(l, profile)) {
        var codeM = l.match(/^(OK|NO|IP)\s+/);
        var code = codeM ? (codeM[1] === "OK" ? "ok" : codeM[1] === "IP" ? "ip" : "no") : null;
        cur = { title: cleanTitle(l), target: parseTarget(l), lines: [], courses: [], select: [], code: code };
        sections.push(cur);
      } else if (isDivider(l, profile)) {
        cur = null;
      } else if (cur) {
        cur.lines.push(l);
        var c = parseCourseLine(l);
        if (c) cur.courses.push(c);
        var sf = l.match(/SELECT FROM:\s*(.+)/i);
        if (sf) cur.select.push(sf[1].replace(/\s+/g, " ").trim());
      }
    });

    // Dedupe by title (merge duplicate headings, keep the richer one).
    var byTitle = {};
    var ordered = [];
    sections.forEach(function (s) {
      // Normalize so "Technical Elective" and "Technical Electives" merge into one card.
      var key = s.title.toLowerCase().replace(/\s+/g, " ").trim().replace(/s$/, "");
      if (byTitle[key]) {
        var t = byTitle[key];
        t.lines = t.lines.concat(s.lines);
        t.courses = t.courses.concat(s.courses);
        t.select = t.select.concat(s.select);
      } else {
        byTitle[key] = s;
        ordered.push(s);
      }
    });
    ordered.forEach(computeSectionStatus);
    return ordered;
  }

  function extractSectionsHeader(lines, flat, profile) {
    profile = profile || GENERIC_PROFILE;
    var name = (flat.match(/^([A-Z][A-Za-z'\-]+,\s*[A-Z][A-Za-z'\- ]+?)(?:\s+[A-Z][a-z])/) || [])[1];
    var plan = null;
    // The plan name is usually the second non-empty line.
    if (lines[1] && !/prepared on/i.test(lines[1])) plan = lines[1];
    var codeM = flat.match(/([A-Z]{3,}-[A-Z]{3,})\s+(Fall|Spring|Summer)\s+(\d{4})/);
    var earned = (flat.match(/EARNED:\s*([\d.]+)\s*HOURS/) || [])[1];
    var inProgress = (flat.match(/IN PROGRESS\s*([\d.]+)\s*HOURS/) || [])[1];
    var gpa = (flat.match(/POINTS\s*([\d.]+)\s*GPA/) || [])[1];
    var minHours = (flat.match(/minimum total of (\d+)/) || flat.match(/at least (\d+)/) || [])[1];

    // Summary NEEDS: a NEEDS that belongs to the summary block itself —
    // i.e. it appears before the first requirement heading after the summary.
    var summaryNeeds = null;
    for (var i = 0; i < lines.length; i++) {
      if (/SUMMARY$/.test(lines[i]) || /Summary\s*\(/i.test(lines[i])) {
        for (var k = i + 1; k < Math.min(i + 12, lines.length); k++) {
          if (isHeading(lines[k], profile)) break; // stop before a requirement's own NEEDS
          var nm = lines[k].match(/NEEDS:\s*([\d.]+)\s*HOURS/i);
          if (nm) { summaryNeeds = parseFloat(nm[1]); break; }
        }
        break;
      }
    }

    // Fallback: if the audit didn't print a total NEEDS, estimate from the minimum
    // (using the college's default credit floor when the audit omits one).
    var earnedN = earned != null ? parseFloat(earned) : null;
    var inProgN = inProgress != null ? parseFloat(inProgress) : null;
    var minN = minHours != null ? parseInt(minHours, 10) : (profile.minHoursDefault != null ? profile.minHoursDefault : null);
    var neededApprox = false;
    if (summaryNeeds == null && minN != null && earnedN != null) {
      summaryNeeds = Math.max(0, Math.round((minN - earnedN - (inProgN || 0)) * 10) / 10);
      neededApprox = true;
    }

    var programs = [];
    var progLine = flat.match(/Program:\s*([A-Z0-9,\-\s]+?)\s+(?:AT LEAST ONE|ALL REQUIREMENTS)/);
    if (progLine) programs = progLine[1].split(/,\s*/).map(function (s) { return s.trim(); }).filter(Boolean);

    var overallStatus = /ALL REQUIREMENTS.*(HAVE BEEN|ARE) SATISFIED/i.test(flat) ? "complete"
      : /HAS NOT BEEN SATISFIED|AT LEAST ONE REQUIREMENT/i.test(flat) ? "incomplete" : null;

    return {
      student: name ? name.trim() : null,
      plan: plan,
      programCode: codeM ? codeM[1] : null,
      catalogYear: codeM ? codeM[2] + " " + codeM[3] : null,
      programs: programs,
      earned: earned != null ? parseFloat(earned) : null,
      inProgress: inProgress != null ? parseFloat(inProgress) : null,
      overallGpa: gpa != null ? parseFloat(gpa) : null,
      minHours: minN,
      minHoursApprox: minHours == null && minN != null,
      college: profile.label,
      summaryNeeds: summaryNeeds,
      neededApprox: neededApprox,
      overallStatus: overallStatus,
      gradEligible: /eligible to Apply for Graduation/i.test(flat)
    };
  }

  /* ---------- Requirements (view B: OK / NO / IP) ---------- */
  function parseRequirements(text) {
    var lines = text.split(/\r?\n/).map(function (l) { return l.replace(/\s+/g, " ").trim(); }).filter(Boolean);
    var reqs = [];
    var current = null;
    function looksLikeReq(line) { return /^(OK|NO|IP)\s+\S/.test(line); }
    function status(line) { return /^IP\b/.test(line) ? "ip" : /^NO\b/.test(line) ? "no" : "ok"; }
    function flush() { if (current) { reqs.push(current); current = null; } }
    lines.forEach(function (line) {
      if (looksLikeReq(line)) {
        flush();
        current = { title: line.replace(/^(OK|NO|IP)\s+/, "").trim(), status: status(line), detail: [] };
      } else if (current) { current.detail.push(line); }
    });
    flush();
    return reqs.filter(function (r) { return r.title.length > 2 && r.title.length < 140; });
  }

  function extractHoursReq(text) {
    var hours = {};
    var re = /Hours?\s+(required|applied|needed|earned)\s*:\s*([\d.]+)/gi;
    var m;
    while ((m = re.exec(text))) {
      var key = m[1].toLowerCase();
      if (hours[key] == null) hours[key] = parseFloat(m[2]);
    }
    return hours;
  }

  function extractOverallGpa(text) {
    var required = (text.match(/GPA required:\s*([\d.]+)/i) || [])[1];
    var overall = (text.match(/Overall GPA:\s*([\d.]+)/i) || [])[1];
    return { required: required != null ? parseFloat(required) : null, overall: overall != null ? parseFloat(overall) : null };
  }

  /* ---------- Public ---------- */
  function parseAudit(text) {
    var raw = fixLigatures((text || "").replace(/\u00a0/g, " "));
    var flat = normalize(raw);
    var lines = raw.split(/\r?\n/).map(function (l) { return l.replace(/\s+/g, " ").trim(); }).filter(Boolean);

    var profile = detectSchool(flat);
    var courses = dedupeCourses(extractCourses(flat));
    var termGpas = extractTermGpas(flat);
    var totals = courseTotals(courses, flat);

    var sections = (lines.length > 15 && /NEEDS:/i.test(flat) && /EARNED:/i.test(flat)) ? parseSections(lines, profile) : [];
    var reqs = parseRequirements(raw);

    var mode = sections.length >= 3 ? "sections" : (reqs.length >= 3 ? "requirements" : "courses");

    var result = {
      raw: raw,
      flat: flat,
      mode: mode,
      courses: courses,
      termGpas: termGpas,
      totals: totals,
      school: { id: profile.id, label: profile.label },
      thin: flat.length < 60
    };

    if (mode === "sections") {
      result.header = extractSectionsHeader(lines, flat, profile);
      result.sections = sections;
      result.summary = {
        ok: sections.filter(function (s) { return s.status === "ok"; }),
        ip: sections.filter(function (s) { return s.status === "ip"; }),
        no: sections.filter(function (s) { return s.status === "no"; })
      };
      // Reconcile the big "credits still needed" number with the flagged requirements.
      // Total still-needed = hours from named requirements + leftover free/elective hours.
      var namedRemaining = 0;
      result.summary.no.forEach(function (s) { namedRemaining += (s.remaining || 0); });
      namedRemaining = round(namedRemaining);
      var hdr = result.header;
      hdr.namedRemaining = namedRemaining;
      hdr.electiveRemaining = (hdr.summaryNeeds != null)
        ? Math.max(0, round(hdr.summaryNeeds - namedRemaining))
        : null;
      hdr.semesters = semestersLeft(hdr.summaryNeeds);
    } else if (mode === "requirements") {
      result.header = { programs: [], overallStatus: /HAS NOT BEEN SATISFIED/i.test(flat) ? "incomplete" : null };
      result.requirements = reqs;
      result.hours = extractHoursReq(flat);
      result.gpa = extractOverallGpa(flat);
      var s = {
        ok: reqs.filter(function (r) { return r.status === "ok"; }),
        ip: reqs.filter(function (r) { return r.status === "ip"; }),
        no: reqs.filter(function (r) { return r.status === "no"; })
      };
      if (result.hours.required != null && result.hours.applied != null) {
        s.neededHours = Math.max(0, result.hours.required - result.hours.applied);
      }
      result.summary = s;
    } else {
      var progMatch = flat.match(/Program:\s*([A-Z0-9,\-\s]+?)\s+(?:AT LEAST ONE|ALL REQUIREMENTS)/) ||
        flat.match(/^(.*?)\s+AT LEAST ONE REQUIREMENT/);
      var programs = [];
      if (progMatch && progMatch[1].length < 120) {
        programs = progMatch[1].split(/,\s*/).map(function (x) { return x.trim(); }).filter(function (x) {
          return /^[A-Z0-9][A-Z0-9\- ]{1,20}$/.test(x);
        });
      }
      result.header = {
        programs: programs,
        overallStatus: /HAS NOT BEEN SATISFIED|AT LEAST ONE REQUIREMENT/i.test(flat) ? "incomplete"
          : /ALL REQUIREMENTS.*(HAVE BEEN|ARE) SATISFIED/i.test(flat) ? "complete" : null
      };
      result.buckets = {
        done: courses.filter(function (c) { return c.status === "done" || c.status === "transfer"; }),
        ip: courses.filter(function (c) { return c.status === "ip"; }),
        flagged: courses.filter(function (c) { return c.status === "withdrawn" || c.status === "low" || c.status === "excluded"; })
      };
    }

    return result;
  }

  function plainEnglish(parsed) {
    var bits = [];
    var h = parsed.header;

    if (parsed.mode === "sections") {
      // Student is stored "Last, First" — greet with the first name.
      var parts = h.student ? h.student.split(",") : [];
      var name = parts.length > 1 ? parts[1].trim() : (parts[0] ? parts[0].trim() : null);
      bits.push((name ? "Hi " + name + ". This" : "This") + " is your full requirements audit" +
        (h.plan ? " for " + h.plan : "") + (h.catalogYear ? " (catalog " + h.catalogYear + ")" : "") + ".");
      var creditBits = [];
      if (h.earned != null) creditBits.push(h.earned + " earned");
      if (h.inProgress != null) creditBits.push(h.inProgress + " in progress");
      if (h.summaryNeeds != null) creditBits.push((h.neededApprox ? "about " : "") + h.summaryNeeds + " still needed" + (h.neededApprox ? " (estimated)" : ""));
      if (h.minHours) creditBits.push("of " + h.minHours + " required");
      if (creditBits.length) bits.push("Credit hours: " + creditBits.join(", ") + ".");
      if (h.semesters) {
        var plural = h.semesters.high === 1 ? "semester" : "semesters";
        var tail = h.inProgress ? " beyond the courses you\u2019re taking now" : " of coursework";
        bits.push("Assuming a full-time semester is 12\u201318 credit hours, that\u2019s about " +
          h.semesters.text + " more " + plural + tail + ".");
      }
      if (h.overallGpa != null) bits.push("Cumulative GPA: " + h.overallGpa + ".");
      var s = parsed.summary;
      bits.push("Across " + parsed.sections.length + " requirement groups: " + s.ok.length + " look satisfied, " +
        s.ip.length + " in progress, and " + s.no.length + " still need attention.");
      if (s.no.length) {
        bits.push("Still open: " + s.no.map(function (x) {
          return x.title + (x.remaining != null ? " (needs " + x.remaining + " hrs)" : "");
        }).join("; ") + ".");
      }
      // Reconcile the total-hours number with the individual requirements above.
      if (h.summaryNeeds != null && h.summaryNeeds > 0) {
        var pieces = s.no.filter(function (x) { return x.remaining != null; }).map(function (x) {
          return x.remaining + " for " + x.title;
        });
        if (h.electiveRemaining && h.electiveRemaining > 0.5) {
          pieces.push("about " + h.electiveRemaining + " of free/elective credit to reach " + (h.minHours || "the minimum"));
        }
        if (pieces.length > 1) {
          bits.push("Those " + h.summaryNeeds + " hours break down as: " + pieces.join("; ") + ".");
        }
      }
      if (h.gradEligible) bits.push("Good news: the audit says you are eligible to apply for graduation.");
      if (h.overallStatus === "incomplete") bits.push("The header still reads \u201cat least one requirement has not been satisfied,\u201d which usually clears once your in-progress and remaining courses are done.");
      bits.push("This is a reading of the PDF, not an official registrar decision. Confirm anything high-stakes with your advisor.");
      return bits.join(" ");
    }

    if (parsed.mode === "courses") {
      if (h.programs && h.programs.length) bits.push("Program/college codes: " + h.programs.join(", ") + ".");
      if (h.overallStatus === "incomplete") bits.push("The header says at least one requirement is still open.");
      var t = parsed.totals;
      bits.push("This is your coursework-history view, so it lists classes and grades \u2014 not which requirements are checked off.");
      bits.push("I read " + parsed.courses.length + " courses: about " + t.earned + " credits earned" +
        (t.transfer ? " (including " + t.transfer + " transfer)" : "") + " and " + t.inProgress + " in progress.");
      bits.push(parsed.buckets.done.length + " completed, " + parsed.buckets.ip.length + " in progress, " +
        parsed.buckets.flagged.length + " worth a second look.");
      bits.push("For met vs. not-met requirements, export the audit's requirements view (Print \u2192 save as PDF) and drop that in.");
      bits.push("This is a reading of the PDF text, not an official registrar decision \u2014 confirm anything high-stakes with a human advisor.");
      return bits.join(" ");
    }

    var hrs = parsed.hours;
    if (hrs.applied != null || hrs.required != null) {
      bits.push("Credits: about " + (hrs.applied != null ? hrs.applied : "?") + " applied of " +
        (hrs.required != null ? hrs.required : "?") + " required.");
    }
    if (parsed.gpa.overall != null) bits.push("Overall GPA listed: " + parsed.gpa.overall + ".");
    var sm = parsed.summary;
    bits.push("Requirement blocks: " + sm.ok.length + " done, " + sm.ip.length + " in progress, " + sm.no.length + " still open.");
    if (sm.no.length) bits.push("Biggest leftovers: " + sm.no.slice(0, 4).map(function (r) { return r.title; }).join("; ") + ".");
    bits.push("This is a reading of the PDF text, not an official registrar decision \u2014 confirm anything high-stakes with a human advisor.");
    return bits.join(" ");
  }

  global.parseAudit = parseAudit;
  global.plainEnglish = plainEnglish;
})(window);
