/* =========================================================
   Buff Trivia — questions + roast bands
   answer is the index into choices (before any shuffle).
   ========================================================= */

var QUESTIONS = [
  {
    q: "What are CU Boulder students actually called?",
    choices: ["The Bears", "The Buffs", "The Rams", "The Yaks"],
    answer: 1,
    fact: "Short for Buffaloes. The live mascot is Ralphie — she, not a costume, runs the field."
  },
  {
    q: "CU's official colors are…",
    choices: ["Silver and blue", "Crimson and cream", "Gold and black", "Green and white"],
    answer: 2,
    fact: "The gold is a specific dusty CU gold, not generic mustard. People still get it wrong on merch."
  },
  {
    q: "The live buffalo mascot is named…",
    choices: ["Bucky", "Chip", "Boulder", "Ralphie"],
    answer: 3,
    fact: "Ralphie V is the current live buffalo. Home games start with her sprint, not a guy in a suit."
  },
  {
    q: "The Flatirons are…",
    choices: [
      "Huge slanted sandstone slabs west of campus",
      "CU's dining halls",
      "The intramural fields",
      "A pretzel stand on Pearl Street"
    ],
    answer: 0,
    fact: "They're why every Boulder Zoom background looks like a postcard someone bought at the bookstore."
  },
  {
    q: "Folsom Field is…",
    choices: [
      "The rec center",
      "The football stadium",
      "The engineering building",
      "A parking garage everyone pretends is architecture"
    ],
    answer: 1,
    fact: "Buffs football, tucked against the foothills. If you can see mountains from your seat, you're in the right place."
  },
  {
    q: "When someone says \"the Hill,\" they mean…",
    choices: [
      "The tallest Flatiron",
      "The president's house",
      "The strip of shops and bars just west of campus",
      "The basement of Norlin"
    ],
    answer: 2,
    fact: "College-town block between campus and the mountains. You have walked it for a late burrito. You will again."
  },
  {
    q: "C4C is…",
    choices: [
      "CU for Credit",
      "Campus 4 Coffee",
      "The climbing gym",
      "The Center for Community — the big dining hall"
    ],
    answer: 3,
    fact: "Official name: Center for Community. Nobody says that out loud. Everybody says C4C."
  },
  {
    q: "CU Boulder football currently plays in which conference?",
    choices: ["The Pac-12", "The Big 12", "The Big Ten", "The Mountain West"],
    answer: 1,
    fact: "CU left the Pac-12 and joined the Big 12 in 2024. If you still said Pac-12, that's a very 2023 answer."
  }
];

var ROASTS = [
  {
    min: 0,
    title: "Tourist energy.",
    body: "You have never been to Boulder. You have only seen it on a Patagonia ad and a white Jeep."
  },
  {
    min: 3,
    title: "You've been to Pearl Street.",
    body: "You could find campus if someone circled it first. Respectable tourist arc. Sit on a patio and try again."
  },
  {
    min: 5,
    title: "Certified Buff-adjacent.",
    body: "You know C4C is a dining hall. You have suffered. You belong a little."
  },
  {
    min: 7,
    title: "Okay Flatiron.",
    body: "Someone left a light on in the Norlin stacks and it was you. Ralphie already did the victory lap. Sit down."
  }
];
