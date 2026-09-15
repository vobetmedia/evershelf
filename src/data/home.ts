import { LIFESTYLE, PRODUCT_IMAGES } from "./images";

export const TRENDING = [
  { label: "Fiddle Leaf Fig", href: "/products/6ft-fiddle-leaf-fig", image: PRODUCT_IMAGES["6ft-fiddle-leaf-fig"][0] },
  { label: "Olive Tree", href: "/products/7ft-olive-tree", image: PRODUCT_IMAGES["7ft-olive-tree"][0] },
  { label: "Bird of Paradise", href: "/products/bird-of-paradise", image: PRODUCT_IMAGES["bird-of-paradise"][0] },
  { label: "Areca Palm", href: "/products/5ft-areca-palm", image: PRODUCT_IMAGES["5ft-areca-palm"][0] },
  { label: "Monstera", href: "/products/monstera-deliciosa-potted", image: PRODUCT_IMAGES["monstera-deliciosa-potted"][0] },
  { label: "See all", href: "/shop", image: LIFESTYLE.living[1] },
] as const;

export const FEATURED_HOMES = [
  {
    name: "Maya Reyes",
    handle: "@mayastyleshome",
    city: "Austin, TX",
    room: "Living Room",
    tree: "6ft Fiddle Leaf Fig",
    slug: "6ft-fiddle-leaf-fig",
    rating: 4.9,
    reviews: 212,
    detail: "2,400 sq ft · Mid-century",
  },
  {
    name: "Daniel Kim",
    handle: "@dk.interiors",
    city: "Brooklyn, NY",
    room: "Office",
    tree: "6ft Kentia Palm",
    slug: "6ft-kentia-palm",
    rating: 4.8,
    reviews: 148,
    detail: "Studio · North-facing",
  },
  {
    name: "Priya Shah",
    handle: "@priyaathome",
    city: "Seattle, WA",
    room: "Bedroom",
    tree: "5ft Areca Palm",
    slug: "5ft-areca-palm",
    rating: 4.9,
    reviews: 96,
    detail: "Townhouse · Low light",
  },
  {
    name: "Jordan Lee",
    handle: "@jordan.plants",
    city: "Denver, CO",
    room: "Outdoor",
    tree: "8ft Faux Cypress Tree",
    slug: "8ft-faux-cypress-tree",
    rating: 4.7,
    reviews: 71,
    detail: "Covered patio · Windy",
  },
];

export const EDITORIAL_SLIDES = [
  {
    title: "The real look. None of the upkeep.",
    kicker: "Statement trees that never wilt",
    body: "Real wood trunks, hand-painted leaves, and zero watering. Guests will touch them to check.",
    cta: { label: "Shop trees", href: "/shop?category=Trees" },
    seed: 2,
  },
  {
    title: "Tall. Full. Forever.",
    kicker: "New: the 8ft Faux Cypress",
    body: "UV-treated foliage and a weighted base built for entryways and windy patios.",
    cta: { label: "See the cypress", href: "/products/8ft-faux-cypress-tree" },
    seed: 5,
  },
  {
    title: "Palms for rooms with no sun.",
    kicker: "Areca, Kentia, Bamboo",
    body: "Soft, layered fronds that hold their shape under fluorescent lights and forgotten Fridays.",
    cta: { label: "Shop palms", href: "/shop?category=Palms" },
    seed: 8,
  },
];

export const SOCIAL_POSTS = [
  { label: "Olive corner", image: LIFESTYLE.living[2] },
  { label: "Fiddle by window", image: LIFESTYLE.living[3] },
  { label: "Office kentia", image: LIFESTYLE.office[1] },
  { label: "Nightstand snake plant", image: LIFESTYLE.bedroom[1] },
  { label: "Cypress entry", image: LIFESTYLE.outdoor[1] },
  { label: "Mantel eucalyptus", image: PRODUCT_IMAGES["eucalyptus-stem-bundle"][1] },
] as const;
