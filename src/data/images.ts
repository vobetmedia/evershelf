/* Unsplash photography (Unsplash License: free for commercial use, no attribution required).
   Swap for EverShelf's own product shots when available — same shape, just change the URLs. */

const u = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const PRODUCT_IMAGES: Record<string, string[]> = {
  "6ft-fiddle-leaf-fig": [u("1545239705-1564e58b9e4a"), u("1531875985735-f135dac5f230"), u("1580133318324-f2f76d987dd8"), u("1596547612397-1432a7a7d37d")],
  "7ft-olive-tree": [u("1657790520920-3e6d94f9b81e"), u("1683320553264-e31acd4196e7"), u("1762542531473-ec9f86e0d86e"), u("1731275911977-2e24952c0932")],
  "5ft-areca-palm": [u("1615309363679-fed456ff8113"), u("1598531403144-43fdb36c9ae8"), u("1630565945904-7e4220cadd0e"), u("1709215992319-e10ecbbe3c98")],
  "6ft-kentia-palm": [u("1652954352097-29f2d0526f08"), u("1644996649409-b6d954d273e5"), u("1768692857070-e57811d9ccaa"), u("1655151071844-746b090106d2")],
  "monstera-deliciosa-potted": [u("1604866830513-d54766457f45"), u("1614594975525-e45190c55d0b"), u("1626929252164-27c26d107b00"), u("1605449670493-ca1d812d0488")],
  "bird-of-paradise": [u("1555803741-1ac759ac2f53"), u("1585598116402-c686b02ba581"), u("1607369816048-311ebd65f2ca"), u("1631122751597-cdc5d56d561e")],
  "4ft-boston-fern-hanging": [u("1704869727879-25ed3c235e7d"), u("1497877164981-9c2afdf31e9e"), u("1777835884249-cfde5138cfce"), u("1704869727879-25ed3c235e7d")],
  "snake-plant-potted": [u("1687552212914-03a30c82053c"), u("1593482892290-f54927ae1bb6"), u("1599009944997-3544a939813c"), u("1611211232932-da3113c5b960")],
  "8ft-faux-cypress-tree": [u("1766750188396-368f064c1c2c"), u("1767554865013-c491e680f3a3"), u("1769283431551-cedc0ec03314"), u("1677912997249-ad4bfbc3f1e8")],
  "eucalyptus-stem-bundle": [u("1618580747643-7ecc7240ba4e"), u("1546387903-6d82d96ccca6"), u("1510520745063-ceaa7314a820"), u("1494537449588-7f07cede2556")],
  "6ft-bamboo-palm": [u("1564312194822-feef3b607c88"), u("1728011279859-c4b3bc096035"), u("1569171221811-1a3ab28649b3"), u("1687269111857-3b398711c2f4")],
  "ceramic-planter-large-matte-black": [u("1765497178307-c843343ac313"), u("1765261221630-70f10fc301fa"), u("1643185706259-89ffef874600"), u("1617797835356-0d793140f64e")],
};

export const LIFESTYLE = {
  living: [u("1618220179428-22790b461013"), u("1616046229478-9901c5536a45"), u("1615876234886-fd9a39fda97f"), u("1632119580908-ae947d4c7691")],
  office: [u("1535957998253-26ae1ef29506"), u("1497215728101-856f4ea42174"), u("1497215641119-bbe6d71ebaae"), u("1511362328651-90cc517fbe31")],
  bedroom: [u("1556020685-ae41abfc9365"), u("1657040899594-34f4b6739988"), u("1599243075095-7199cae2c164"), u("1703407999298-bf1d6814c796")],
  outdoor: [u("1670697404808-9022a4015529"), u("1786727426623-dfcbe40d5dca"), u("1686156605287-fbb9401f95bb"), u("1716081931455-71df5dbd2d12")],
  editorial: [u("1618219944342-824e40a13285"), u("1521334884684-d80222895322"), u("1622763846204-5d0bf5031e06"), u("1600210492486-724fe5c67fb0")],
};

export const ROOM_IMAGE: Record<string, string> = {
  "Living Room": LIFESTYLE.living[0],
  Office: LIFESTYLE.office[0],
  Bedroom: LIFESTYLE.bedroom[0],
  Outdoor: LIFESTYLE.outdoor[0],
};

export const productImage = (slug: string, i = 0) => {
  const list = PRODUCT_IMAGES[slug] ?? LIFESTYLE.living;
  return list[i % list.length];
};
