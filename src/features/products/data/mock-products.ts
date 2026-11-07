import type { Product } from "../types";

type Seed = Omit<Product, "imageUrl" | "currency">;

const seeds: readonly Seed[] = [
  { id: "p-001", slug: "aurora-wireless-headphones", name: "Aurora Wireless Headphones", description: "Over-ear noise cancelling headphones with 40 hour battery life.", price: 18900, category: "electronics", rating: 4.7, reviewCount: 842, popularity: 98, stock: 14, tags: ["audio", "bluetooth"] },
  { id: "p-002", slug: "pulse-smartwatch", name: "Pulse Smartwatch", description: "Fitness tracking, sleep insights and a bright always-on display.", price: 24900, category: "electronics", rating: 4.4, reviewCount: 531, popularity: 90, stock: 8, tags: ["wearable", "fitness"] },
  { id: "p-003", slug: "lumen-desk-lamp", name: "Lumen Desk Lamp", description: "Dimmable LED lamp with adjustable colour temperature.", price: 5900, category: "home", rating: 4.6, reviewCount: 233, popularity: 71, stock: 25, tags: ["lighting", "office"] },
  { id: "p-004", slug: "linen-throw-blanket", name: "Linen Throw Blanket", description: "Stonewashed European linen, soft and breathable.", price: 7900, category: "home", rating: 4.8, reviewCount: 312, popularity: 77, stock: 30, tags: ["bedding", "living room"] },
  { id: "p-005", slug: "trailblazer-daypack", name: "Trailblazer 24L Daypack", description: "Water-resistant daypack with a padded laptop sleeve.", price: 8900, category: "outdoors", rating: 4.5, reviewCount: 405, popularity: 84, stock: 19, tags: ["hiking", "bag"] },
  { id: "p-006", slug: "summit-insulated-bottle", name: "Summit Insulated Bottle", description: "Keeps drinks cold for 24 hours or hot for 12.", price: 3200, category: "outdoors", rating: 4.9, reviewCount: 1190, popularity: 95, stock: 60, tags: ["bottle", "hydration"] },
  { id: "p-007", slug: "everyday-organic-tee", name: "Everyday Organic Tee", description: "Midweight organic cotton t-shirt with a relaxed fit.", price: 2800, category: "apparel", rating: 4.2, reviewCount: 678, popularity: 88, stock: 120, tags: ["cotton", "basics"] },
  { id: "p-008", slug: "coastline-rain-jacket", name: "Coastline Rain Jacket", description: "Packable waterproof shell with taped seams.", price: 12900, category: "apparel", rating: 4.5, reviewCount: 289, popularity: 69, stock: 11, tags: ["waterproof", "jacket"] },
  { id: "p-009", slug: "heritage-leather-wallet", name: "Heritage Leather Wallet", description: "Full-grain leather bifold with RFID protection.", price: 6500, category: "accessories", rating: 4.6, reviewCount: 354, popularity: 66, stock: 40, tags: ["leather", "wallet"] },
  { id: "p-010", slug: "meridian-sunglasses", name: "Meridian Sunglasses", description: "Polarised lenses in a lightweight recycled-acetate frame.", price: 9500, category: "accessories", rating: 4.1, reviewCount: 147, popularity: 58, stock: 0, tags: ["eyewear", "polarised"] },
  { id: "p-011", slug: "nimbus-bluetooth-speaker", name: "Nimbus Bluetooth Speaker", description: "Portable speaker with 360 degree sound and IP67 rating.", price: 7400, category: "electronics", rating: 4.3, reviewCount: 620, popularity: 82, stock: 33, tags: ["audio", "portable"] },
  { id: "p-012", slug: "ceramic-pour-over-set", name: "Ceramic Pour-Over Set", description: "Hand-glazed dripper and server for a perfect morning brew.", price: 4600, category: "home", rating: 4.7, reviewCount: 198, popularity: 62, stock: 17, tags: ["coffee", "kitchen"] },
];

export const MOCK_PRODUCTS: readonly Product[] = seeds.map((seed) => ({
  ...seed,
  currency: "EUR",
  imageUrl: `https://picsum.photos/seed/${seed.slug}/800/800`,
}));
