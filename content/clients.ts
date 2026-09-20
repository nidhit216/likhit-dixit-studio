// -----------------------------------------------------------------------------
// CLIENT METADATA
//
// One entry per folder in /public/work. The folder name is the key ("slug").
// To add a client: create /public/work/<slug>/ with images, then add a block here.
// A folder WITHOUT an entry here still shows up — it just uses a title-cased name
// and the "Work" category until you fill in details.
//
// Image ORDER and COVER are controlled by filename (sorted). Name files like
// 01-*, 02-*, … — the first image is used as the cover on the grid and as the
// lead on the project page.
// -----------------------------------------------------------------------------

export type ClientMeta = {
  name: string;
  cat: string; // single word used on cards + as a filter
  tags: string[]; // used by the Work filters
  order?: number; // lower = earlier
  year?: string;
  services?: string;
  deliverables?: string;
  summary?: string;
  approach?: string; // may contain one <b>…</b>
};

export const CLIENT_META: Record<string, ClientMeta> = {
  tanishq: {
    name: "Tanishq Jewellery",
    cat: "Jewellery",
    tags: ["Jewellery", "Product"],
    order: 3,
    year: "2025",
    services: "Product · Jewellery still life",
    deliverables: "Campaign · 30 images",
    summary:
      "A jewellery campaign built on controlled light — gold and metal shot to keep their shine and fine detail, clean enough for print and e-commerce alike.",
    approach:
      "Jewellery is the hardest thing to light — every surface is a mirror. The set was built around <b>reflection control</b> and macro detail, so the gold reads warm and the engraving stays crisp, with one consistent grade across the range.",
  },
  "genki-cafe": {
    name: "Genki Cafe",
    cat: "Food",
    tags: ["Food"],
    order: 2,
    year: "2024",
    services: "Food · Café menu",
    deliverables: "Menu · 24 images",
    summary:
      "Menu and product photography for a healthy-eating café — smoothie bowls, cold-pressed juices and fresh plates, shot bright and clean.",
    approach:
      "Genki's food is <b>fresh and colourful</b>, so we shot bright with minimal fuss and let the ingredients and packaging do the work. Built to carry across the menu, delivery apps and social.",
  },
  "spoon-me": {
    name: "Spoon Me",
    cat: "Food",
    tags: ["Food"],
    order: 1,
    year: "2024",
    services: "Food · Dessert & café",
    deliverables: "Menu & social",
    summary:
      "Dessert and café photography for Spoon Me — cheesecakes, crumble and caramel, shot to make you want the next bite.",
    approach:
      "Dessert is all <b>texture and colour</b>. We worked close and slightly overhead to catch every crumb and drip, keeping the light bright and the palette rich. Every frame doubles as a social post.",
  },
  "royal-dairy": {
    name: "Royal Dairy Farm",
    cat: "Food",
    tags: ["Food", "Product"],
    order: 5,
    year: "2023",
    services: "Product · Mithai still life",
    deliverables: "Product · 18 images",
    summary:
      "Product photography for a dairy and sweets brand — laddoo, jalebi and rasgulla shot rich and appetising, with the shine of saffron and silver leaf.",
    approach:
      "Traditional mithai needs to read <b>rich and fresh</b> at once. We shot on dark sets so the gold and silver leaf glow and the syrup catches the light — one appetising world across the range.",
  },
  dhc: {
    name: "DHC",
    cat: "Food",
    tags: ["Food"],
    order: 4,
    year: "2023",
    services: "Food · Milkshakes & beverages",
    deliverables: "Menu · beverages",
    summary:
      "Beverage photography for DHC — a flight of milkshakes served in a warm café setting, shot to show off colour and freshness across the range.",
    approach:
      "Drinks are about <b>colour and freshness</b>. We lined the shakes up so the whole range reads at a glance and kept the light warm and inviting, so every flavour is clear on the menu and on social.",
  },
};

// Preferred order for the Work-page filters. Any tag not listed here is appended.
export const FILTER_ORDER = ["Jewellery", "Food", "Product"];
