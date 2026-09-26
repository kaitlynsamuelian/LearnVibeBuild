/* =========================================================
   Campus Thread — four buildings, one scene, canned replies
   ========================================================= */

var VOICES = {
  atlas: {
    id: "atlas",
    name: "ATLAS",
    letter: "A",
    replies: {
      homework: "already opening Cursor. we could ship a worse version in 12 minutes and call it a draft.",
      food: "C4C is being dramatic. I have a granola bar in a drawer that might be from last semester.",
      tired: "tired is a design constraint. keep going. or don't. I have a template either way.",
      weather: "the studio doesn't have windows that matter. that's why we stay.",
      def: "say the assignment out loud. if it sounds fake, it is. make a smaller one."
    }
  },
  norlin: {
    id: "norlin",
    name: "Norlin",
    letter: "N",
    replies: {
      homework: "overdue is a kind of weather. bring the book back and then we'll talk about your paper.",
      food: "no food on the third floor. I can hear your granola bar from here.",
      tired: "the carrels have held worse. twenty minutes. head down. not on the journals.",
      weather: "it is always slightly too cold in here. that is policy, not climate.",
      def: "lower your voice. the question is fine. the panic is loud."
    }
  },
  c4c: {
    id: "c4c",
    name: "C4C",
    letter: "C",
    replies: {
      homework: "take a tray. sit under the lights. the homework will not taste better but you will be less annoying.",
      food: "we have something that was an omelet. we have something that is still pizza. pick a lane.",
      tired: "the chairs are designed to keep you upright. that is not kindness. eat something orange.",
      weather: "wet coats. that is the whole weather report. they steam by the door.",
      def: "i am a dining hall. i do not grade you. i just watch you try to live."
    }
  },
  flatirons: {
    id: "flatirons",
    name: "Flatirons",
    letter: "F",
    replies: {
      homework: "it will erode. so will the deadline, in a way that does not help you.",
      food: "we do not eat. you should.",
      tired: "we have been tired since the sandstone settled. you may sleep.",
      weather: "we are the weather.",
      def: "we heard you."
    }
  }
};

var SCRIPT = [
  { id: "atlas", text: "still here. studio lights don't count as \"going home\" right" },
  { id: "norlin", text: "going home is a rumor people tell on the first floor." },
  { id: "c4c", text: "i closed. i can still hear a blender in my soul." },
  { id: "atlas", text: "new folder. 30 minutes. we could just make the thing." },
  { id: "norlin", text: "you said that in September. someone is sleeping on a novel in the stacks. do not wake them with \"the thing.\"" },
  { id: "c4c", text: "if the thing is food i already failed you. if the thing is homework, take a tray anyway." },
  { id: "flatirons", text: "we are the thing. you are a semester." },
  { id: "atlas", text: "it's an artifact. vibe coding. the class is literally called that." },
  { id: "norlin", text: "whisper. your italicized class name is still a noise." },
  { id: "c4c", text: "wet coats by the door. that is the weather. that is also the students." },
  { id: "atlas", text: "i'm going to let them talk. that's the bit. that's the whole bit." },
  { id: "norlin", text: "fourth wall. overdue." },
  { id: "flatirons", text: "sit down." }
];

var ORDER = ["atlas", "norlin", "c4c", "flatirons"];
