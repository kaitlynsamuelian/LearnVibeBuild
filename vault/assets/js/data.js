/* Living index. Add a project or a card here, then drop a matching
   HTML file in content/<project-id>/<section-id>/<entry-id>.html */

window.VAULT = {
  site: {
    name: "Research Lab",
    owner: "Kaitlyn Samuelian",
    course: "ATLAS 4000  ·  Senior Capstone",
    blurb: "A living file for capstone ideas. Precedents and inspo, research online, research in person, and making.",
  },

  sections: [
    {
      id: "precedents",
      label: "Precedents / inspo",
      blurb: "Things. Products, photos, systems you steal logic from, or refuse to copy.",
    },
    {
      id: "online",
      label: "Research online",
      blurb: "Knowledge from a screen. Articles, reviews, papers, saved chats.",
    },
    {
      id: "in-person",
      label: "Research in person",
      blurb: "Knowledge from a body in a room. Interviews, store visits, watching someone air-dry.",
    },
    {
      id: "making",
      label: "Making",
      blurb: "Things you produced. Mockups, slides, sketches, prototypes.",
    },
  ],

  projects: [
    {
      id: "drying-rack",
      title: "Adaptable drying system",
      status: "active",
      course: "ATLAS 4000",
      blurb: "One core drying rack that could adapt to the space it lives in and to what someone needs to dry.",
      question: "How can one drying system adapt to different laundry loads and living spaces, instead of requiring several different racks?",
      entries: {
        precedents: [
          {
            id: "polder",
            title: "Polder Mountain Lock",
            date: "2026-09-19",
            blurb: "Over-door, no-drill, 40 lb official. Renter-safe + wet load already exists. It lives on a door.",
          },
          {
            id: "woolite",
            title: "Woolite wall accordion",
            date: "2026-09-15",
            blurb: "Fold-flat wall rack. People use these. They need a wall you can screw into. Do not quote 60 lb as official.",
          },
          {
            id: "zmbesup",
            title: "ZMBESUP foldable wall rack",
            date: "2026-09-15",
            blurb: "Seller claims 60 lb. Solid load-bearing wall. High capacity = drill.",
          },
          {
            id: "rebrilliant",
            title: "Rebrilliant collapsible wall rack",
            date: "2026-09-15",
            blurb: "Same family as Woolite. Well reviewed. Still a stud-mount accordion.",
          },
          {
            id: "anjuer",
            title: "Anjuer wall rack",
            date: "2026-09-15",
            blurb: "Apartment Therapy called it an instant closet. Wall-mount, fold away. One install.",
          },
          {
            id: "bakon",
            title: "BAKON over-door hangers",
            date: "2026-09-19",
            blurb: "No tools. About 20 lb each. Honest no-drill architecture: the door is the stud.",
          },
          {
            id: "black-decker",
            title: "BLACK+DECKER telescopic door rack",
            date: "2026-09-19",
            blurb: "Expands, folds thin. 11 lb max. Door, not laundry-scale.",
          },
          {
            id: "brabantia-door",
            title: "Brabantia over-door airer",
            date: "2026-09-19",
            blurb: "Nicer door rack. 17 lb. Still occupies a door.",
          },
          {
            id: "wallfix",
            title: "Brabantia WallFix",
            date: "2026-09-26",
            blurb: "Fold-out wall rack, long drying line. Solid wall, not typical rental drywall.",
          },
          {
            id: "baoyouni",
            title: "BAOYOUNI tension pole",
            date: "2026-09-26",
            blurb: "No-drill tension. Seller load is modest. Another way to hold something up without screws.",
          },
          {
            id: "foxydry",
            title: "Foxydry Duo",
            date: "2026-09-26",
            blurb: "Clamps to a railing. 15 kg claimed. Install = balcony, not apartment wall.",
          },
          {
            id: "gimi-lift",
            title: "Gimi Lift",
            date: "2026-09-26",
            blurb: "Ceiling pulley airer. Geometry goes up and out of the way. Needs a ceiling you can mount to.",
          },
          {
            id: "pressa",
            title: "IKEA PRESSA",
            date: "2026-09-26",
            blurb: "Hanging dryers and clips. Attachment / garment-type pieces, not a core rack.",
          },
          {
            id: "skadis",
            title: "IKEA SKÅDIS",
            date: "2026-09-26",
            blurb: "One core, one interface. Same logic as interchangeable mounts. Light stuff, usually a wall.",
          },
          {
            id: "boaxel",
            title: "IKEA BOAXEL / Elfa",
            date: "2026-09-26",
            blurb: "One backbone, swap the functions. That is attachments. Useful later, not the first concept.",
          },
          {
            id: "command",
            title: "3M Command strips",
            date: "2026-09-19",
            blurb: "Official Large strips: 15 lb for a flat picture, not a cantilevered wet rack.",
          },
        ],
        online: [
          {
            id: "research-agenda",
            title: "Research agenda (run list)",
            date: "2026-09-28",
            blurb: "Everything we still want to know. Run one ticket, one section, nightly, or the whole file.",
          },
          {
            id: "market-split",
            title: "Three product families, none combine the gap",
            date: "2026-09-19",
            blurb: "High capacity = drill. No-drill = door hook. Adhesive is a picture load. Written after the deeper pass.",
          },
          {
            id: "polder-correction",
            title: "Correction: renter-safe is not always too weak",
            date: "2026-09-19",
            blurb: "Do not say every renter-safe option is too weak. Polder is 40 lb. The gap is wall without drill, door, or floor.",
          },
          {
            id: "command-limit",
            title: "3M Command Large: 15 lb, picture load",
            date: "2026-09-19",
            source: "3M",
            blurb: "Official spec, not folk wisdom. Not a laundry mount.",
          },
          {
            id: "at-bakon",
            title: "Apartment Therapy on BAKON",
            date: "2026-09-19",
            source: "Apartment Therapy",
            blurb: "Review of the over-door hangers. Door as structure, about 20 lb each.",
          },
          {
            id: "at-anjuer",
            title: "Apartment Therapy on Anjuer",
            date: "2026-09-15",
            source: "Apartment Therapy",
            blurb: "Wall rack as instant closet. People like fold-flat once it is installed.",
          },
          {
            id: "homygear",
            title: "2026 wall-mount drying rack roundup",
            date: "2026-09-19",
            source: "Homy Gear",
            blurb: "Treats ZMBESUP-class ~60 lb stud-mount racks as the serious option.",
          },
          {
            id: "woolite-capacity",
            title: "Woolite: do not borrow 60 lb",
            date: "2026-09-19",
            blurb: "The Home Depot W-84156 page does not state capacity. Do not treat 60 as official.",
          },
          {
            id: "pitch-direction",
            title: "Draft pitch: install + geometry",
            date: "2026-09-27",
            source: "Cursor",
            blurb: "Working notes from the ATLAS 4000 draft pitch. Early concept, not locked.",
          },
          {
            id: "how-to-save",
            title: "How to file online research",
            date: "2026-09-28",
            blurb: "Articles, reviews, papers, chats. Knowledge from a screen.",
          },
        ],
        "in-person": [
          {
            id: "how-to-log",
            title: "How to log in-person research",
            date: "2026-09-28",
            blurb: "Interviews, store visits, watching someone air-dry.",
          },
        ],
        making: [
          {
            id: "chopra-notes",
            title: "Notes for sitting with Aidan",
            date: "2026-09-29",
            blurb: "Open-on-the-laptop notes: how the idea started, what already exists, space to catch his take.",
          },
          {
            id: "how-to-file",
            title: "How to file something you made",
            date: "2026-09-28",
            blurb: "Mockups, slides, sketches, prototypes. If you produced it, it lives here.",
          },
        ],
      },
    },
    {
      id: "parked",
      title: "Parked ideas",
      status: "parked",
      course: "ATLAS 4000",
      blurb: "Directions you are not pitching yet. Give each one its own project page when it grows up.",
      question: "What else is still interesting after the drying-rack direction?",
      entries: {
        precedents: [],
        online: [
          {
            id: "empty-on-purpose",
            title: "This shelf is empty on purpose",
            date: "2026-09-28",
            blurb: "When an idea gets real, promote it to its own project card on the home page.",
          },
        ],
        "in-person": [],
        making: [],
      },
    },
  ],
};
