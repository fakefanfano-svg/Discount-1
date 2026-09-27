const fs = require('fs');

const mapping = {
  'scalloped-summer-bralette-top': '/src/assets/images/crochet_summer_bralette_1790499380617.jpg',
  'chubby-baby-blue-whale-amigurumi': '/src/assets/images/crochet_whale_amigurumi_1790499368237.jpg',
  'crochet-hook-size-conversion-chart-guide': '/src/assets/images/crochet_hooks_collection_1790499392162.jpg',
  'how-to-read-crochet-charts-symbols-guide': '/src/assets/images/crochet_chart_diagram_1790499404376.jpg',
  'crochet-vs-knitting-complete-comparison-guide': '/src/assets/images/crochet_versus_knitting_1790499416871.jpg',
  'best-yarn-for-crochet-summer-tops-blankets-guide': '/src/assets/images/crochet_yarn_skeins_1790499429513.jpg',
  'hand-ergonomics-prevent-crochet-wrist-pain': '/src/assets/images/crochet_hands_ergonomics_1790499441471.jpg',
  'rustic-waffle-spa-washcloth-set': '/src/assets/images/crochet_spa_washcloths_1790499451367.jpg',
  'french-market-net-grocery-bag': '/src/assets/images/crochet_market_bag_1790499463408.jpg',
  'alpine-textured-infinity-cowl': '/src/assets/images/crochet_infinity_cowl_1790499476249.jpg',
  'sleepy-forest-bear-cub-amigurumi': '/src/assets/images/crochet_bear_amigurumi_1790499488101.jpg',
  'enchanted-toadstool-mushroom-cluster': '/src/assets/images/crochet_mushroom_cluster_1790499500241.jpg',
  'chunky-cord-standing-storage-basket': '/src/assets/images/crochet_storage_basket_1790499512489.jpg',
  'definitive-blocking-steam-wet-spray-guide': '/src/assets/images/crochet_blocking_mats_1790499524683.jpg',
  'how-to-price-handmade-crochet-formula': '/src/assets/images/crochet_pricing_workspace_1790499536792.jpg'
};

let content = fs.readFileSync('src/data/crochetData.ts', 'utf8');

for (const [id, newImg] of Object.entries(mapping)) {
  const marker = "id: '" + id + "'";
  const idx = content.indexOf(marker);
  if (idx !== -1) {
    const nextCoverImage = content.indexOf("coverImage: '", idx);
    if (nextCoverImage !== -1 && nextCoverImage - idx < 500) {
      const quoteStart = nextCoverImage + "coverImage: '".length;
      const quoteEnd = content.indexOf("'", quoteStart);
      content = content.substring(0, quoteStart) + newImg + content.substring(quoteEnd);
      console.log('Successfully updated image for:', id);
    } else {
      console.error('Could not find coverImage near id:', id);
    }
  } else {
    console.error('Could not find id in file:', id);
  }
}

// Remove "in 2026" from titles
content = content.replace('Crochet vs. Knitting: Which is Easier to Learn in 2026? A Complete Guide', 'Crochet vs. Knitting: Which is Easier to Learn? A Complete Guide');
content = content.replace('The Science of Natural Fiber Dyeing & Ethical Wool Sourcing in 2026', 'The Science of Natural Fiber Dyeing & Ethical Wool Sourcing');

fs.writeFileSync('src/data/crochetData.ts', content, 'utf8');
console.log('Finished updating crochetData.ts');
