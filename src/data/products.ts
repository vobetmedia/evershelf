export type Category = "Trees" | "Palms" | "Florals" | "Planters";
export type Room = "Living Room" | "Office" | "Bedroom" | "Outdoor";

export interface Review {
  name: string;
  rating: 4 | 5;
  quote: string;
}

export interface Product {
  slug: string;
  name: string;
  category: Category;
  room: Room | null;
  heightLabel: string;
  heightInches: number;
  price: number;
  approval: number;
  description: string;
  material: string;
  potIncluded: boolean;
  placement: "Indoor" | "Outdoor" | "Indoor / Outdoor";
  bestseller?: boolean;
  newArrival?: boolean;
  reviews: Review[];
}

export const CATEGORIES: Category[] = ["Trees", "Palms", "Florals", "Planters"];
export const ROOMS: Room[] = ["Living Room", "Office", "Bedroom", "Outdoor"];

export const products: Product[] = [
  {
    slug: "6ft-fiddle-leaf-fig",
    name: "6ft Fiddle Leaf Fig",
    category: "Trees",
    room: "Living Room",
    heightLabel: "6ft",
    heightInches: 72,
    price: 189,
    approval: 98,
    description:
      "Our signature fiddle leaf fig with hand-painted, individually wired leaves you can shape to your space. The one people ask if it's real.",
    material: "Real-touch polyester leaves, natural wood trunk",
    potIncluded: true,
    placement: "Indoor",
    bestseller: true,
    reviews: [
      { name: "Maya R.", rating: 5, quote: "My neighbor asked what fertilizer I use. I have never watered it once." },
      { name: "Daniel K.", rating: 5, quote: "The trunk is actual wood and the leaves have real veining. Finally a faux that doesn't look faux." },
      { name: "Priya S.", rating: 4, quote: "Took ten minutes of fluffing out of the box, then it looked like a $400 nursery tree." },
    ],
  },
  {
    slug: "7ft-olive-tree",
    name: "7ft Olive Tree",
    category: "Trees",
    room: "Living Room",
    heightLabel: "7ft",
    heightInches: 84,
    price: 219,
    approval: 97,
    description:
      "A tall, airy olive with silvery two-tone leaves and a gnarled natural trunk. Adds height to a corner without swallowing the room.",
    material: "Two-tone fabric leaves, natural olive-wood trunk",
    potIncluded: true,
    placement: "Indoor",
    bestseller: true,
    reviews: [
      { name: "Jordan L.", rating: 5, quote: "I killed two real olive trees before this one. This one is thriving, obviously." },
      { name: "Elena M.", rating: 5, quote: "The silvery leaves catch the afternoon light exactly like the real thing." },
    ],
  },
  {
    slug: "5ft-areca-palm",
    name: "5ft Areca Palm",
    category: "Palms",
    room: "Bedroom",
    heightLabel: "5ft",
    heightInches: 60,
    price: 149,
    approval: 96,
    description:
      "Full, feathery fronds with a soft arch. Brings the calm of a palm to a bedroom corner with zero humidity requirements.",
    material: "Soft-touch polyester fronds, bamboo-look stems",
    potIncluded: true,
    placement: "Indoor",
    bestseller: true,
    reviews: [
      { name: "Sam T.", rating: 5, quote: "Bedroom went from dorm room to hotel suite. No watering, no brown tips." },
      { name: "Lauren W.", rating: 4, quote: "Fronds are dense and soft. Would love a slightly heavier pot but it's stable." },
    ],
  },
  {
    slug: "6ft-kentia-palm",
    name: "6ft Kentia Palm",
    category: "Palms",
    room: "Office",
    heightLabel: "6ft",
    heightInches: 72,
    price: 179,
    approval: 95,
    description:
      "The office palm. Elegant, upright fronds that hold their shape under fluorescent lights and forgotten Fridays.",
    material: "Real-touch polyester fronds, natural fiber stems",
    potIncluded: true,
    placement: "Indoor",
    reviews: [
      { name: "Chris B.", rating: 5, quote: "We have thirty of these across two floors. Facilities has never been happier." },
      { name: "Aisha N.", rating: 5, quote: "Looks lush on Zoom calls and I never have to think about it." },
    ],
  },
  {
    slug: "monstera-deliciosa-potted",
    name: "Monstera Deliciosa (potted)",
    category: "Florals",
    room: "Office",
    heightLabel: "3ft",
    heightInches: 36,
    price: 79,
    approval: 97,
    description:
      "Glossy split leaves with natural fenestrations, potted and ready for a desk, sideboard, or shelf.",
    material: "Glossy real-touch leaves, weighted cement-look pot",
    potIncluded: true,
    placement: "Indoor",
    bestseller: true,
    reviews: [
      { name: "Nadia F.", rating: 5, quote: "The leaf splits are asymmetric like a real plant. That detail sold me." },
      { name: "Marcus H.", rating: 5, quote: "Sits on my desk under zero natural light and looks better than my real one ever did." },
      { name: "Kim D.", rating: 4, quote: "Slightly glossier than I expected but photographs beautifully." },
    ],
  },
  {
    slug: "bird-of-paradise",
    name: "Bird of Paradise",
    category: "Trees",
    room: "Living Room",
    heightLabel: "6.5ft",
    heightInches: 78,
    price: 199,
    approval: 96,
    description:
      "Broad, paddle-shaped leaves on tall stems. Tropical drama for a living room that gets no tropical sun.",
    material: "Real-touch polyester leaves, wrapped natural stems",
    potIncluded: true,
    placement: "Indoor",
    newArrival: true,
    reviews: [
      { name: "Tomas V.", rating: 5, quote: "Fills the empty corner by the window and the leaves have realistic tears." },
      { name: "Grace O.", rating: 5, quote: "Guests keep touching the leaves to check. Every single time." },
    ],
  },
  {
    slug: "4ft-boston-fern-hanging",
    name: "4ft Boston Fern (hanging)",
    category: "Florals",
    room: "Outdoor",
    heightLabel: "4ft",
    heightInches: 48,
    price: 69,
    approval: 94,
    description:
      "A cascading fern in a hanging basket, UV-treated so it holds color on a covered porch or patio.",
    material: "UV-resistant polyester fronds, woven hanging basket",
    potIncluded: true,
    placement: "Indoor / Outdoor",
    reviews: [
      { name: "Renee P.", rating: 5, quote: "Two summers on the porch and it's still the same green it arrived in." },
      { name: "Owen J.", rating: 4, quote: "Very full. Needed a sturdier hook than I expected, it's heavier than it looks." },
    ],
  },
  {
    slug: "snake-plant-potted",
    name: "Snake Plant (potted)",
    category: "Florals",
    room: "Bedroom",
    heightLabel: "2.5ft",
    heightInches: 30,
    price: 49,
    approval: 98,
    description:
      "Upright variegated blades in a matte ceramic pot. The easiest plant in the world, made even easier.",
    material: "Firm real-touch blades, matte ceramic pot",
    potIncluded: true,
    placement: "Indoor",
    newArrival: true,
    reviews: [
      { name: "Hannah C.", rating: 5, quote: "Nightstand plant that never needs anything. The variegation is spot on." },
      { name: "Leo G.", rating: 5, quote: "Bought three for the guest rooms. Nobody has noticed they're faux." },
    ],
  },
  {
    slug: "8ft-faux-cypress-tree",
    name: "8ft Faux Cypress Tree",
    category: "Trees",
    room: "Outdoor",
    heightLabel: "8ft",
    heightInches: 96,
    price: 249,
    approval: 95,
    description:
      "A slim, towering cypress for entryways and patios. UV-treated foliage and a weighted base for wind.",
    material: "UV-resistant foliage, weighted resin base",
    potIncluded: true,
    placement: "Indoor / Outdoor",
    newArrival: true,
    reviews: [
      { name: "Victor A.", rating: 5, quote: "Flanks our front door on both sides. Zero maintenance through a full winter." },
      { name: "Sofia R.", rating: 4, quote: "Tall and dense. Assembly is three stacked sections, took five minutes." },
    ],
  },
  {
    slug: "eucalyptus-stem-bundle",
    name: "Eucalyptus Stem Bundle",
    category: "Florals",
    room: "Living Room",
    heightLabel: "3ft",
    heightInches: 36,
    price: 39,
    approval: 96,
    description:
      "A dozen silver-dollar eucalyptus stems for a vase on the mantel or dining table. Never dries out, never drops leaves.",
    material: "Soft fabric leaves, wired stems",
    potIncluded: false,
    placement: "Indoor",
    reviews: [
      { name: "Isabel Q.", rating: 5, quote: "The dusty blue-green is exactly right. Stems bend so I could shape the arrangement." },
      { name: "Nathan E.", rating: 5, quote: "Replaced the fresh eucalyptus I was buying weekly. Paid for itself in a month." },
    ],
  },
  {
    slug: "6ft-bamboo-palm",
    name: "6ft Bamboo Palm",
    category: "Palms",
    room: "Living Room",
    heightLabel: "6ft",
    heightInches: 72,
    price: 169,
    approval: 96,
    description:
      "Multiple slim canes with fine, layered fronds. Softer and more delicate than an areca, ideal beside a sofa.",
    material: "Real-touch polyester fronds, bamboo-look canes",
    potIncluded: true,
    placement: "Indoor",
    newArrival: true,
    reviews: [
      { name: "Diego M.", rating: 5, quote: "Delicate fronds that move a little when the AC kicks on. Uncanny." },
      { name: "Bea L.", rating: 4, quote: "Lovely and full. I swapped the included pot for a basket and it's perfect." },
    ],
  },
  {
    slug: "ceramic-planter-large-matte-black",
    name: "Ceramic Planter (large, matte black)",
    category: "Planters",
    room: null,
    heightLabel: "16in",
    heightInches: 16,
    price: 59,
    approval: 97,
    description:
      "A heavy, hand-glazed matte black planter sized for our 5ft to 8ft trees. Drop the nursery pot straight in.",
    material: "Glazed stoneware ceramic",
    potIncluded: false,
    placement: "Indoor / Outdoor",
    reviews: [
      { name: "Farah Z.", rating: 5, quote: "Heavy enough to anchor the 7ft olive. The matte finish hides dust well." },
      { name: "Will S.", rating: 5, quote: "Fits the fiddle leaf's base with room for moss on top. Looks custom." },
    ],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const bestsellers = products.filter((p) => p.bestseller);
export const newArrivals = products.filter((p) => p.newArrival);

export const allReviews = products.flatMap((p) =>
  p.reviews.map((r) => ({ ...r, product: p.name, slug: p.slug })),
);

export const formatPrice = (n: number) => `$${n}`;
