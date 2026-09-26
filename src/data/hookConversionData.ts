export interface HookSizeData {
  id: string;
  metric: number; // in mm
  metricLabel: string;
  usSize: string;
  ukSize: string;
  japaneseSize?: string;
  yarnWeightCategory: string; // e.g. "4 - Medium / Worsted"
  yarnWeightNumber: number; // 0 to 7
  yarnStandardName: string; // Lace, Super Fine, Fine, Light, Medium, Bulky, Super Bulky, Jumbo
  typicalGauge: string; // e.g. "12-15 sc per 4 inches"
  bestProjects: string[];
  category: 'steel' | 'standard' | 'jumbo';
  notes: string;
  commonInEurope: boolean;
}

export const HOOK_CONVERSION_DATA: HookSizeData[] = [
  // Steel Lace Thread Hooks (Micro / Fine Lace)
  {
    id: 'hook-0-60',
    metric: 0.60,
    metricLabel: '0.60 mm',
    usSize: '14 Steel',
    ukSize: '6 Steel',
    japaneseSize: 'No. 14',
    yarnWeightCategory: '0 - Lace (Size 80-100 Thread)',
    yarnWeightNumber: 0,
    yarnStandardName: 'Lace / Micro Thread',
    typicalGauge: '36-40+ sc per 4 inches',
    bestProjects: ['Micro-crochet jewelry', 'Antique tatting lace', 'Heirloom christening handkerchief edgings'],
    category: 'steel',
    notes: 'Micro steel hook. Requires high-magnification lamp and gentle finger tension. Best with glazed cotton thread.',
    commonInEurope: true
  },
  {
    id: 'hook-0-75',
    metric: 0.75,
    metricLabel: '0.75 mm',
    usSize: '12 / 13 Steel',
    ukSize: '5 Steel',
    japaneseSize: 'No. 12',
    yarnWeightCategory: '0 - Lace (Size 60-80 Thread)',
    yarnWeightNumber: 0,
    yarnStandardName: 'Lace / Micro Thread',
    typicalGauge: '34-38 sc per 4 inches',
    bestProjects: ['Fine floral jewelry', 'Irish lace motifs', 'Delicate doily filigree'],
    category: 'steel',
    notes: 'Standard fine lace hook. Handle grips prevent wrist cramping with such tiny steel shafts.',
    commonInEurope: true
  },
  {
    id: 'hook-1-00',
    metric: 1.00,
    metricLabel: '1.00 mm',
    usSize: '10 Steel',
    ukSize: '4 Steel',
    japaneseSize: 'No. 10',
    yarnWeightCategory: '0 - Lace (Size 30-40 Thread)',
    yarnWeightNumber: 0,
    yarnStandardName: 'Lace / Cotton Thread',
    typicalGauge: '32-36 sc per 4 inches',
    bestProjects: ['Size 30 crochet cotton doilies', 'Lace bookmark ribbons', 'Bridal veil borders'],
    category: 'steel',
    notes: 'Ideal gauge for vintage French and Belgian lace reproductions in Mercerized cotton.',
    commonInEurope: true
  },
  {
    id: 'hook-1-25',
    metric: 1.25,
    metricLabel: '1.25 mm',
    usSize: '8 Steel',
    ukSize: '3 Steel',
    japaneseSize: 'No. 8',
    yarnWeightCategory: '0 - Lace (Size 20 Thread)',
    yarnWeightNumber: 0,
    yarnStandardName: 'Lace / Cotton Thread',
    typicalGauge: '30-34 sc per 4 inches',
    bestProjects: ['Table runners', 'Victorian collar ornaments', 'Micro amigurumi dolls'],
    category: 'steel',
    notes: 'Standard hook for classic size 20 crochet threads. Balances stiffness with delicate drape.',
    commonInEurope: true
  },
  {
    id: 'hook-1-50',
    metric: 1.50,
    metricLabel: '1.50 mm',
    usSize: '7 Steel',
    ukSize: '2.5 Steel',
    japaneseSize: 'No. 6',
    yarnWeightCategory: '0 - Lace (Size 10 Bedspread Thread)',
    yarnWeightNumber: 0,
    yarnStandardName: 'Lace / Bedspread Thread',
    typicalGauge: '28-32 sc per 4 inches',
    bestProjects: ['Size 10 bedspread thread coasters', 'Pineapple lace mandalas', 'Snowflake ornaments'],
    category: 'steel',
    notes: 'The universal standard size for classic Size 10 crochet cotton (Aunt Lydia, Cebelia, DMC).',
    commonInEurope: true
  },
  {
    id: 'hook-1-75',
    metric: 1.75,
    metricLabel: '1.75 mm',
    usSize: '4 / 5 Steel',
    ukSize: '2 Steel',
    japaneseSize: 'No. 4',
    yarnWeightCategory: '0 - Lace / 1 - Super Fine',
    yarnWeightNumber: 0,
    yarnStandardName: 'Lace / Heavy Thread',
    typicalGauge: '26-30 sc per 4 inches',
    bestProjects: ['Heavy thread lace shawls', 'Size 5 pearl cotton collars', 'Intricate pouch bags'],
    category: 'steel',
    notes: 'Bridges the gap between fine steel thread work and fine fingering wool.',
    commonInEurope: true
  },

  // Standard Regular Yarn Hooks (2.00 mm - 10.00 mm)
  {
    id: 'hook-2-00',
    metric: 2.00,
    metricLabel: '2.00 mm',
    usSize: '0 / B-0 (or 0 Steel)',
    ukSize: '14',
    japaneseSize: '2/0',
    yarnWeightCategory: '1 - Super Fine (Fingering / Sock / 3-Ply)',
    yarnWeightNumber: 1,
    yarnStandardName: 'Super Fine / Fingering',
    typicalGauge: '25-28 sc per 4 inches',
    bestProjects: ['Tight-stitch amigurumi', 'Fingering-weight socks', 'Lace wrist warmers'],
    category: 'standard',
    notes: 'Common European size. Produces zero-gap stitches when working miniature amigurumi with sock yarn.',
    commonInEurope: true
  },
  {
    id: 'hook-2-25',
    metric: 2.25,
    metricLabel: '2.25 mm',
    usSize: 'B-1',
    ukSize: '13',
    japaneseSize: '—',
    yarnWeightCategory: '1 - Super Fine (Sock / Fingering)',
    yarnWeightNumber: 1,
    yarnStandardName: 'Super Fine / Sock',
    typicalGauge: '24-27 sc per 4 inches',
    bestProjects: ['Fine wool mittens', 'Detailed amigurumi limbs', 'Baby booties'],
    category: 'standard',
    notes: 'Official US B-1 standard. Slightly more supple fabric than 2.0mm while keeping stuffing hidden.',
    commonInEurope: false
  },
  {
    id: 'hook-2-50',
    metric: 2.50,
    metricLabel: '2.50 mm',
    usSize: 'C-2 (Alternative)',
    ukSize: '12',
    japaneseSize: '4/0',
    yarnWeightCategory: '1 - Super Fine / 2 - Fine (Sport / Baby)',
    yarnWeightNumber: 1,
    yarnStandardName: 'Super Fine / Sport',
    typicalGauge: '23-26 sc per 4 inches',
    bestProjects: ['Standard plush amigurumi toys', 'Lightweight baby cardigans', 'Intricate granny squares'],
    category: 'standard',
    notes: 'Extremely popular in UK, Japan, and European pattern archives for 4-ply mercerized cottons.',
    commonInEurope: true
  },
  {
    id: 'hook-2-75',
    metric: 2.75,
    metricLabel: '2.75 mm',
    usSize: 'C-2',
    ukSize: '11 (or 12)',
    japaneseSize: '—',
    yarnWeightCategory: '2 - Fine (Sport / Baby / 5-Ply)',
    yarnWeightNumber: 2,
    yarnStandardName: 'Fine / Sport',
    typicalGauge: '21-24 sc per 4 inches',
    bestProjects: ['Sport-weight baby blankets', 'Structured sun hats', 'Fitted gloves'],
    category: 'standard',
    notes: 'Standard US C-2. Great for achieving crisp stitch definition with multi-ply sport yarns.',
    commonInEurope: false
  },
  {
    id: 'hook-3-00',
    metric: 3.00,
    metricLabel: '3.00 mm',
    usSize: 'D-3 (Alternative) / 2.5',
    ukSize: '11',
    japaneseSize: '5/0',
    yarnWeightCategory: '2 - Fine / 3 - Light (Sport to DK)',
    yarnWeightNumber: 2,
    yarnStandardName: 'Fine / Sport / DK',
    typicalGauge: '20-23 sc per 4 inches',
    bestProjects: ['Lightweight summer tops', 'Cotton market bag mesh', 'Heirloom baby layettes'],
    category: 'standard',
    notes: 'A staple millimeter size worldwide. Often labeled 5/0 in Japanese clover and tulip hook sets.',
    commonInEurope: true
  },
  {
    id: 'hook-3-25',
    metric: 3.25,
    metricLabel: '3.25 mm',
    usSize: 'D-3',
    ukSize: '10',
    japaneseSize: '—',
    yarnWeightCategory: '3 - Light (DK / Light Worsted / 8-Ply)',
    yarnWeightNumber: 3,
    yarnStandardName: 'Light / DK',
    typicalGauge: '19-22 sc per 4 inches',
    bestProjects: ['DK yarn adult beanies', 'Dense textured dishcloths', 'Structured bags'],
    category: 'standard',
    notes: 'Standard US D-3. Recommended when a pattern requires firm gauge in DK weight.',
    commonInEurope: false
  },
  {
    id: 'hook-3-50',
    metric: 3.50,
    metricLabel: '3.50 mm',
    usSize: 'E-4',
    ukSize: '9',
    japaneseSize: '6/0',
    yarnWeightCategory: '3 - Light (DK / 8-Ply)',
    yarnWeightNumber: 3,
    yarnStandardName: 'Light / DK',
    typicalGauge: '18-20 sc per 4 inches',
    bestProjects: ['DK wearable cardigans', 'Modern granny square blankets', 'Berets and bucket hats'],
    category: 'standard',
    notes: 'Universal gold standard for DK yarn. Exceptional drape without losing stitch sharpness.',
    commonInEurope: true
  },
  {
    id: 'hook-3-75',
    metric: 3.75,
    metricLabel: '3.75 mm',
    usSize: 'F-5',
    ukSize: '9 (Alternative)',
    japaneseSize: '—',
    yarnWeightCategory: '3 - Light / 4 - Medium',
    yarnWeightNumber: 3,
    yarnStandardName: 'Light / Worsted',
    typicalGauge: '17-19 sc per 4 inches',
    bestProjects: ['Transition-weight garments', 'Lacy summer cardigans', 'Chevron shawls'],
    category: 'standard',
    notes: 'Standard US F-5. Perfect middle ground between DK and Worsted weight yarns.',
    commonInEurope: false
  },
  {
    id: 'hook-4-00',
    metric: 4.00,
    metricLabel: '4.00 mm',
    usSize: 'G-6',
    ukSize: '8',
    japaneseSize: '7/0',
    yarnWeightCategory: '3 - Light / 4 - Medium (DK or Light Worsted / Aran)',
    yarnWeightNumber: 4,
    yarnStandardName: 'Medium / Light Worsted',
    typicalGauge: '16-18 sc per 4 inches',
    bestProjects: ['Cotton tote bags', 'Granny square motifs', 'Cozy slippers', 'Placemats'],
    category: 'standard',
    notes: 'One of the most frequently used hooks in all of crochet. High versatility across acrylics and wools.',
    commonInEurope: true
  },
  {
    id: 'hook-4-50',
    metric: 4.50,
    metricLabel: '4.50 mm',
    usSize: '7 (US)',
    ukSize: '7',
    japaneseSize: '7.5/0',
    yarnWeightCategory: '4 - Medium (Worsted / Afghan / Aran / 10-Ply)',
    yarnWeightNumber: 4,
    yarnStandardName: 'Medium / Worsted',
    typicalGauge: '15-17 sc per 4 inches',
    bestProjects: ['Textured cable sweaters', 'Warm winter cowls', 'Textured afghan panels'],
    category: 'standard',
    notes: 'The famous "Size 7". Fills the gap between G-6 (4mm) and H-8 (5mm), essential for tight crocheters.',
    commonInEurope: true
  },
  {
    id: 'hook-5-00',
    metric: 5.00,
    metricLabel: '5.00 mm',
    usSize: 'H-8',
    ukSize: '6',
    japaneseSize: '8/0',
    yarnWeightCategory: '4 - Medium (Worsted / Aran / 10-Ply)',
    yarnWeightNumber: 4,
    yarnStandardName: 'Medium / Worsted / Aran',
    typicalGauge: '13-15 sc per 4 inches',
    bestProjects: ['Classic winter beanies', 'Throw blankets', 'Pullover sweaters', 'Scarves'],
    category: 'standard',
    notes: 'The undisputed king of crochet hooks. The most common size recommended on yarn skein ball bands.',
    commonInEurope: true
  },
  {
    id: 'hook-5-50',
    metric: 5.50,
    metricLabel: '5.50 mm',
    usSize: 'I-9',
    ukSize: '5',
    japaneseSize: '9/0',
    yarnWeightCategory: '4 - Medium / 5 - Bulky',
    yarnWeightNumber: 4,
    yarnStandardName: 'Worsted / Heavy Aran',
    typicalGauge: '12-14 sc per 4 inches',
    bestProjects: ['Fluid drape garments', 'Cozy sofa blankets', 'Slouchy pompom beanies'],
    category: 'standard',
    notes: 'US I-9 creates lovely fluid fabric with worsted yarn without stiff cardboard-like tension.',
    commonInEurope: true
  },
  {
    id: 'hook-6-00',
    metric: 6.00,
    metricLabel: '6.00 mm',
    usSize: 'J-10',
    ukSize: '4',
    japaneseSize: '10/0',
    yarnWeightCategory: '5 - Bulky (Chunky / Craft / Rug / 12-Ply)',
    yarnWeightNumber: 5,
    yarnStandardName: 'Bulky / Chunky',
    typicalGauge: '10-12 sc per 4 inches',
    bestProjects: ['Thick wool cardigans', 'Chunky winter cowls', 'Cozy slippers with double soles'],
    category: 'standard',
    notes: 'Standard US J-10. Works up projects rapidly with chunky spun yarns and roving blends.',
    commonInEurope: true
  },
  {
    id: 'hook-6-50',
    metric: 6.50,
    metricLabel: '6.50 mm',
    usSize: 'K-10.5',
    ukSize: '3',
    japaneseSize: '—',
    yarnWeightCategory: '5 - Bulky (Chunky)',
    yarnWeightNumber: 5,
    yarnStandardName: 'Bulky / Chunky',
    typicalGauge: '9-11 sc per 4 inches',
    bestProjects: ['One-weekend throws', 'Chunky basket weave totes', 'Oversized cardigans'],
    category: 'standard',
    notes: 'Standard US K-10.5. Perfect for makers seeking lofty, breathable chunky stitches.',
    commonInEurope: false
  },
  {
    id: 'hook-7-00',
    metric: 7.00,
    metricLabel: '7.00 mm',
    usSize: 'K-10.5+ / 7mm',
    ukSize: '2',
    japaneseSize: '7mm',
    yarnWeightCategory: '5 - Bulky / 6 - Super Bulky',
    yarnWeightNumber: 5,
    yarnStandardName: 'Bulky / Super Bulky',
    typicalGauge: '8-10 sc per 4 inches',
    bestProjects: ['Chunky rug projects', 'Heavy knit-look ribbed scarves', 'Hygge pouf covers'],
    category: 'standard',
    notes: 'Standard metric size in Europe and the UK. Less common in historic vintage US charts but widely sold today.',
    commonInEurope: true
  },
  {
    id: 'hook-8-00',
    metric: 8.00,
    metricLabel: '8.00 mm',
    usSize: 'L-11',
    ukSize: '0',
    japaneseSize: '8mm',
    yarnWeightCategory: '6 - Super Bulky (Roving / Wool-Ease Thick & Quick)',
    yarnWeightNumber: 6,
    yarnStandardName: 'Super Bulky',
    typicalGauge: '7-9 sc per 4 inches',
    bestProjects: ['Quick 3-hour gift scarves', 'Chunky floor pillows', 'Structured rope plant baskets'],
    category: 'standard',
    notes: 'Standard US L-11. Great for two strands of worsted yarn held together.',
    commonInEurope: true
  },
  {
    id: 'hook-9-00',
    metric: 9.00,
    metricLabel: '9.00 mm',
    usSize: 'M-13 (or N-13)',
    ukSize: '00',
    japaneseSize: '9mm',
    yarnWeightCategory: '6 - Super Bulky',
    yarnWeightNumber: 6,
    yarnStandardName: 'Super Bulky',
    typicalGauge: '6-8 sc per 4 inches',
    bestProjects: ['Heavy winter hoods', 'Plush chunky pet beds', 'Rustic wool afghans'],
    category: 'standard',
    notes: 'Fast-moving hook size for oversized statement garments.',
    commonInEurope: true
  },
  {
    id: 'hook-10-00',
    metric: 10.00,
    metricLabel: '10.00 mm',
    usSize: 'N-15 (or P-15)',
    ukSize: '000',
    japaneseSize: '10mm',
    yarnWeightCategory: '6 - Super Bulky / 7 - Jumbo',
    yarnWeightNumber: 6,
    yarnStandardName: 'Super Bulky / Jumbo',
    typicalGauge: '5-7 sc per 4 inches',
    bestProjects: ['T-shirt yarn baskets', 'Macrame cord carryalls', 'Weekend chunky throws'],
    category: 'standard',
    notes: 'Standard US N-15. Ideal for recycled cotton rope and upcycled fabric ribbon.',
    commonInEurope: true
  },

  // Jumbo / Giant Hooks (12 mm - 25 mm)
  {
    id: 'hook-12-00',
    metric: 12.00,
    metricLabel: '12.00 mm',
    usSize: 'P-16',
    ukSize: '—',
    japaneseSize: '12mm',
    yarnWeightCategory: '7 - Jumbo (Giant / Roving / T-shirt Ribbon)',
    yarnWeightNumber: 7,
    yarnStandardName: 'Jumbo',
    typicalGauge: '4-6 sc per 4 inches',
    bestProjects: ['Sturdy storage baskets', 'Thick bath rugs', 'Oversized statement throws'],
    category: 'jumbo',
    notes: 'Usually crafted from lightweight birch wood, bamboo, or hollow acrylic to reduce wrist fatigue.',
    commonInEurope: true
  },
  {
    id: 'hook-15-00',
    metric: 15.00,
    metricLabel: '15.00 mm',
    usSize: 'Q / 19',
    ukSize: '—',
    japaneseSize: '15mm',
    yarnWeightCategory: '7 - Jumbo (Chenille Velvet / Thick Roving)',
    yarnWeightNumber: 7,
    yarnStandardName: 'Jumbo',
    typicalGauge: '3-5 sc per 4 inches',
    bestProjects: ['Fluffy velvet blankets', 'Floor cushions', 'Cat caves and dog nests'],
    category: 'jumbo',
    notes: 'Works up projects in record time. Excellent for plush chenille yarns (Bernat Blanket Extra).',
    commonInEurope: true
  },
  {
    id: 'hook-19-00',
    metric: 19.00,
    metricLabel: '19.00 mm',
    usSize: 'S / 35',
    ukSize: '—',
    japaneseSize: '19mm',
    yarnWeightCategory: '7 - Jumbo (Extreme Wool Roving / Multi-Strand)',
    yarnWeightNumber: 7,
    yarnStandardName: 'Jumbo / Extreme',
    typicalGauge: '2-4 sc per 4 inches',
    bestProjects: ['Giant chain blankets', 'Photographic prop blankets', 'Wall hangings'],
    category: 'jumbo',
    notes: 'Smooth carved wood hooks prevent snagging on unspun roving fibers.',
    commonInEurope: true
  },
  {
    id: 'hook-25-00',
    metric: 25.00,
    metricLabel: '25.00 mm',
    usSize: 'U / 50 (Giant)',
    ukSize: '—',
    japaneseSize: '25mm',
    yarnWeightCategory: '7 - Jumbo (Gigantic Cloud Roving / Tube Yarn)',
    yarnWeightNumber: 7,
    yarnStandardName: 'Extreme Jumbo',
    typicalGauge: '1-3 sc per 4 inches',
    bestProjects: ['Extreme chunky arm-knitting style throws', 'Architectural braided mats'],
    category: 'jumbo',
    notes: 'The largest standard crochet hook. Often worked sitting on the floor or wide crafting table.',
    commonInEurope: true
  }
];

export interface HookMaterialGuide {
  material: string;
  glideSpeed: 'Fast' | 'Moderate' | 'Grippy';
  bestForFibers: string[];
  advantages: string[];
  makerTip: string;
}

export const HOOK_MATERIALS_GUIDE: HookMaterialGuide[] = [
  {
    material: 'Anodized Aluminum',
    glideSpeed: 'Fast',
    bestForFibers: ['Wool', 'Acrylic', 'Cotton Blends', 'Alpaca'],
    advantages: ['Silky-smooth speed', 'Ultra durable and rigid', 'Precision-carved throat'],
    makerTip: 'The classic workhorse hook. If you crochet tightly, aluminum helps stitches slide off effortlessly.'
  },
  {
    material: 'Natural Bamboo & Hardwood (Birch / Rosewood)',
    glideSpeed: 'Moderate',
    bestForFibers: ['Slippery Silk', 'Mercerized Cotton', 'Rayon / Bamboo Yarn'],
    advantages: ['Warm in the hand', 'Natural organic grip prevents dropped loops', 'Extremely lightweight'],
    makerTip: 'Ideal for makers with arthritis or joint sensitivity. The wood warms up to body temperature quickly.'
  },
  {
    material: 'Tempered Steel (Lace Hooks)',
    glideSpeed: 'Fast',
    bestForFibers: ['Crochet Thread #10-#100', 'Pearl Cotton', 'Embroidery Floss'],
    advantages: ['Zero flex under tension', 'Micro-fine hook lips without breaking', 'Precision points'],
    makerTip: 'Always choose steel hooks with cushioned ergonomic thumb-rests to prevent finger indentations.'
  },
  {
    material: 'Soft Ergonomic Polymer & Silicone Handles',
    glideSpeed: 'Fast',
    bestForFibers: ['All fiber types (All-purpose)'],
    advantages: ['Significantly reduces repetitive strain', 'Wider grip for palm or knife grip', 'Color-coded by size'],
    makerTip: 'Clover Amour and Tulip Etimo are world favorites because their silicone barrels relieve wrist tension.'
  }
];

export const HOOK_ANATOMY_PARTS = [
  {
    name: 'Point / Tip',
    desc: 'Can be rounded (prevents yarn splitting) or pointed (easily penetrates dense amigurumi stitches).'
  },
  {
    name: 'Throat & Lip',
    desc: 'Inline (straight cylinder like Susan Bates) creates uniform loops; Tapered (slanted neck like Boye) slides fast into stitches.'
  },
  {
    name: 'Shaft / Shank',
    desc: 'The official measurement zone! The diameter of this cylindrical section defines the true millimeter hook size.'
  },
  {
    name: 'Thumb Rest & Grip',
    desc: 'Provides balance and lever action for both knife-grip (overhand) and pencil-grip (underhand) crocheters.'
  },
  {
    name: 'Handle',
    desc: 'Standard 5 to 6 inches, or extended 7+ inches for ergonomic palm distribution and Tunisian crochet.'
  }
];
