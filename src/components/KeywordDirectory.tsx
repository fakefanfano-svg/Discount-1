import React, { useState } from 'react';
import { Search, Sparkles, BookOpen, Layers, Compass, ArrowUpRight, Hash, Tag } from 'lucide-react';

interface KeywordCluster {
  category: string;
  categoryEs: string;
  description: string;
  keywords: {
    term: string;
    englishTerm: string;
    searchIntent: string;
    description: string;
    relatedAction?: 'articles' | 'hook' | 'yarn' | 'row-counter';
    searchQuery?: string;
  }[];
}

const KEYWORD_CLUSTERS: KeywordCluster[] = [
  {
    category: "Patrones Populares & Proyectos",
    categoryEs: "Trending Crochet Patterns",
    description: "Términos de búsqueda con mayor volumen mensual en Google sobre proyectos y prendas de ganchillo.",
    keywords: [
      {
        term: "Granny Square Paso a Paso",
        englishTerm: "Classic & Modern Granny Square Patterns",
        searchIntent: "granny square tutorial paso a paso",
        description: "El icónico cuadro de la abuela. Diagramas, uniones invisibles, combinaciones de color y proyectos modernos como bolsos, mantas y cárdigans.",
        relatedAction: "articles",
        searchQuery: "granny"
      },
      {
        term: "Amigurumi Fáciles para Principiantes",
        englishTerm: "Beginner Amigurumi Patterns",
        searchIntent: "amigurumi faciles paso a paso gratis",
        description: "Muñecos tejidos en espiral con anillo mágico, aumentos y disminuciones invisibles. Ojos de seguridad y proporciones adorables.",
        relatedAction: "articles",
        searchQuery: "amigurumi"
      },
      {
        term: "Cárdigan & Suéteres a Crochet",
        englishTerm: "Crochet Sweaters & Cardigans",
        searchIntent: "como tejer un cardigan a crochet",
        description: "Patrones de prendas vestibles adaptables a cualquier talla, técnicas de sisa recta, mangas en ranglan y elásticos en punto canalé.",
        relatedAction: "articles",
        searchQuery: "wearables"
      },
      {
        term: "Mantas y Colchas Nórdicas",
        englishTerm: "Crochet Blankets & Throws",
        searchIntent: "patrones mantas crochet gratis",
        description: "Colchas de apego para bebés, mantas de punto waffle, mantas pesadas con lana merino y mantas continuas de esquina a esquina (C2C).",
        relatedAction: "articles",
        searchQuery: "blanket"
      },
      {
        term: "Bolsos de Mano y Tote Bags",
        englishTerm: "Crochet Tote Bags & Market Bags",
        searchIntent: "bolso tote bag crochet tutorial",
        description: "Bolsos de compras en algodón reforzado, mochilas resistentes, bolsas de red para playa y asas ergonómicas anti-estiramiento.",
        relatedAction: "articles",
        searchQuery: "tote"
      },
      {
        term: "Gorros Beanie y Pasamontañas",
        englishTerm: "Crochet Beanies & Balaclavas",
        searchIntent: "como tejer gorro a crochet",
        description: "Gorros elásticos acanalados, gorros pescador (bucket hats), boinas francesas y pasamontañas de tendencia invernal.",
        relatedAction: "articles",
        searchQuery: "beret"
      }
    ]
  },
  {
    category: "Puntos, Diagramas y Nomenclatura",
    categoryEs: "Stitches, Charts & Terminology",
    description: "Glosario bilingüe de puntos fundamentales y conversiones US vs UK indispensables para seguir cualquier patrón.",
    keywords: [
      {
        term: "Punto Bajo / Single Crochet (sc / pb)",
        englishTerm: "US Single Crochet = UK Double Crochet",
        searchIntent: "punto bajo crochet como hacer",
        description: "El punto estructural más denso y firme del ganchillo, base indispensable para amigurumis y cestas resistentes.",
        relatedAction: "articles",
        searchQuery: "sc"
      },
      {
        term: "Punto Alto / Double Crochet (dc / pa)",
        englishTerm: "US Double Crochet = UK Treble Crochet",
        searchIntent: "punto alto crochet explicacion",
        description: "Punto con altura y caída suave, el corazón de los granny squares clásicos y prendas ligeras de primavera.",
        relatedAction: "articles",
        searchQuery: "dc"
      },
      {
        term: "Medio Punto Alto (hdc / mpa)",
        englishTerm: "Half Double Crochet",
        searchIntent: "medio punto alto crochet tutorial",
        description: "Combina la densidad del punto bajo con la elasticidad del punto alto; ideal para bufandas, suéteres y mantas texturizadas.",
        relatedAction: "articles",
        searchQuery: "half double"
      },
      {
        term: "Anillo Mágico / Magic Ring",
        englishTerm: "Magic Ring & Adjustable Loop",
        searchIntent: "como hacer anillo magico crochet facil",
        description: "Técnica para iniciar labores circulares sin dejar un orificio visible en el centro, esencial en flores, gorros y amigurumis.",
        relatedAction: "articles",
        searchQuery: "ring"
      },
      {
        term: "Punto Cangrejo (Reverse Single Crochet)",
        englishTerm: "Crab Stitch Border",
        searchIntent: "punto cangrejo para bordes crochet",
        description: "Punto bajo trabajado de izquierda a derecha para rematar bordes de mantas, manteles y prendas con un cordón redondeado.",
        relatedAction: "articles",
        searchQuery: "crab"
      },
      {
        term: "Punto Waffle & Texturas 3D",
        englishTerm: "Waffle & Textured Raised Stitches",
        searchIntent: "punto waffle crochet paso a paso",
        description: "Relieve tridimensional conseguido mediante puntos altos tejidos en relieve por delante (FPdc) y por detrás (BPdc).",
        relatedAction: "articles",
        searchQuery: "waffle"
      }
    ]
  },
  {
    category: "Herramientas, Agujas y Medidas",
    categoryEs: "Hook Sizes & Estimator Tools",
    description: "Herramientas interactivas y tablas de conversión métrica para tejedores que buscan precisión en sus labores.",
    keywords: [
      {
        term: "Tabla Conversión Ganchillos mm / US / UK",
        englishTerm: "Crochet Hook Conversion Chart",
        searchIntent: "equivalencia agujas crochet mm us uk",
        description: "Correspondencia exacta de 2.0 mm (B-1) a 10.0 mm (N/P-15). Evita errores de tensión al tejer patrones internacionales.",
        relatedAction: "hook"
      },
      {
        term: "Calculadora de Lana y Metraje",
        englishTerm: "Yarn Yardage & Skein Estimator",
        searchIntent: "cuanta lana necesito para una manta crochet",
        description: "Calcula metros y gramos exactos según las dimensiones de tu labor, el grosor del hilo (Lace, Sport, DK, Worsted, Bulky) y la muestra.",
        relatedAction: "yarn"
      },
      {
        term: "Contador Digital de Vueltas e Hileras",
        englishTerm: "Online Row Counter for Crocheters",
        searchIntent: "contador de vueltas crochet online gratis",
        description: "Herramienta integrada para contar vueltas en tiempo real, marcar progreso por pasos y guardar el estado sin perder la cuenta.",
        relatedAction: "row-counter"
      },
      {
        term: "Muestra de Tensión / Gauge Swatch",
        englishTerm: "Crochet Tension & Gauge Swatch 10x10",
        searchIntent: "como medir muestra de tension crochet",
        description: "Aprende a medir tus 10x10 cm para que tus prendas queden exactamente en tu talla sin deformarse tras el lavado.",
        relatedAction: "hook"
      }
    ]
  },
  {
    category: "Fibras, Hilados y Cuidado de Labores",
    categoryEs: "Fibers, Blocking & Garment Care",
    description: "Guía de lanas naturales, hilados vegetales y técnicas de bloqueo para dar caída profesional a tus tejidos.",
    keywords: [
      {
        term: "Algodón Mercerizado vs Algodón Peinado",
        englishTerm: "Mercerized Cotton vs Combed Cotton",
        searchIntent: "diferencia algodon mercerizado crochet",
        description: "Por qué el algodón mercerizado aporta brillo satinado y resistencia a bolsas, mientras el algodón peinado es suave para bebés.",
        relatedAction: "articles",
        searchQuery: "cotton"
      },
      {
        term: "Lana Merino y Fibras Animales",
        englishTerm: "Merino Wool & Natural Fibers",
        searchIntent: "lana merino para tejer crochet caracteristicas",
        description: "Fibra termorreguladora de micraje fino (19-21 micras) perfecta para prendas de abrigo suaves que no pican en la piel.",
        relatedAction: "articles",
        searchQuery: "wool"
      },
      {
        term: "Técnicas de Bloqueo Húmedo y Vapor",
        englishTerm: "Wet Blocking & Steam Blocking Guide",
        searchIntent: "como bloquear una prenda de crochet",
        description: "Cómo fijar los puntos con alfileres inoxidables sobre alfombrillas para abrir el encaje y emparejar los bordes de cualquier labor.",
        relatedAction: "articles",
        searchQuery: "blocking"
      },
      {
        term: "Grosores de Lana (Lace a Super Bulky)",
        englishTerm: "Yarn Weight Standards #0 to #6",
        searchIntent: "grosores de hilo de tejer guia",
        description: "Estándar internacional del Craft Yarn Council: de hilo #0 (Lace/Fingering) a #6 (Super Bulky) y sus agujas recomendadas.",
        relatedAction: "yarn"
      }
    ]
  }
];

interface KeywordDirectoryProps {
  onSearchKeyword?: (query: string) => void;
  onOpenHookConverter?: () => void;
  onOpenYarnCalculator?: () => void;
  onOpenRowCounter?: () => void;
}

export const KeywordDirectory: React.FC<KeywordDirectoryProps> = ({
  onSearchKeyword,
  onOpenHookConverter,
  onOpenYarnCalculator,
  onOpenRowCounter,
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...KEYWORD_CLUSTERS.map(c => c.category)];

  const handleKeywordClick = (kw: typeof KEYWORD_CLUSTERS[0]['keywords'][0]) => {
    if (kw.relatedAction === 'hook' && onOpenHookConverter) {
      onOpenHookConverter();
      return;
    }
    if (kw.relatedAction === 'yarn' && onOpenYarnCalculator) {
      onOpenYarnCalculator();
      return;
    }
    if (kw.relatedAction === 'row-counter' && onOpenRowCounter) {
      onOpenRowCounter();
      return;
    }
    if (onSearchKeyword) {
      onSearchKeyword(kw.searchQuery || kw.term);
    }
  };

  const filteredClusters = KEYWORD_CLUSTERS.map(cluster => {
    if (activeCategory !== 'All' && cluster.category !== activeCategory) {
      return null;
    }
    const matchingKeywords = cluster.keywords.filter(kw => {
      if (!filterQuery.trim()) return true;
      const q = filterQuery.toLowerCase();
      return (
        kw.term.toLowerCase().includes(q) ||
        kw.englishTerm.toLowerCase().includes(q) ||
        kw.searchIntent.toLowerCase().includes(q) ||
        kw.description.toLowerCase().includes(q)
      );
    });
    if (matchingKeywords.length === 0) return null;
    return {
      ...cluster,
      keywords: matchingKeywords
    };
  }).filter(Boolean) as KeywordCluster[];

  return (
    <section id="keyword-index" className="py-16 sm:py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-[11px] font-semibold text-amber-900 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Directorio de Conocimiento & Técnicas</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-stone-900 tracking-tight">
            Directorio de Consultas & Glosario de Crochet
          </h2>

          <p className="mt-3 text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            Explora las técnicas, puntadas y conceptos esenciales del tejido artesanal. Accede a explicaciones detalladas, tablas de conversión y calculadoras especializadas.
          </p>

          {/* Quick Realtime Filter Input */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar palabra clave (ej. granny square, punto alto, merino, aguja 4mm)..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-800/30 focus:border-amber-800 transition-all"
            />
          </div>

          {/* Category Tabs */}
          <div className="mt-5 flex items-center justify-center gap-2 flex-wrap text-xs">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Keyword Cluster Grids */}
        <div className="space-y-12">
          {filteredClusters.map((cluster, cIdx) => (
            <div key={cIdx} className="bg-[#FAF8F5] border border-stone-200/90 rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 mb-6 border-b border-stone-200">
                <div>
                  <h3 className="font-serif text-2xl font-medium text-stone-900">
                    {cluster.category}
                  </h3>
                  <span className="text-xs font-mono text-amber-900/80 block mt-0.5">
                    {cluster.categoryEs}
                  </span>
                </div>
                <p className="text-xs text-stone-500 max-w-md font-sans">
                  {cluster.description}
                </p>
              </div>

              {/* Keyword Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cluster.keywords.map((kw, kIdx) => (
                  <div
                    key={kIdx}
                    onClick={() => handleKeywordClick(kw)}
                    className="group bg-white hover:bg-amber-50/30 border border-stone-200 hover:border-amber-300 rounded-xl p-4 shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded">
                          <Hash className="w-2.5 h-2.5" />
                          Tema Clave
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-amber-800 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>

                      <h4 className="font-serif text-base font-semibold text-stone-900 group-hover:text-amber-900 transition-colors">
                        {kw.term}
                      </h4>

                      <div className="text-[11px] font-mono text-stone-400 italic mb-2">
                        {kw.englishTerm}
                      </div>

                      <p className="text-xs text-stone-600 font-sans leading-relaxed line-clamp-3">
                        {kw.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-sans text-stone-500">
                      <span className="truncate text-stone-400 font-mono">
                        "{kw.searchIntent}"
                      </span>
                      <span className="text-amber-800 font-medium group-hover:underline shrink-0 ml-2">
                        Ver tema →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Invisible SEO crawlable index - hidden from page view as requested */}
        <div className="sr-only" aria-hidden="true">
          <p>Índice Semántico Optimizado para Indexación Web de Google &amp; Motores de Búsqueda</p>
          <p>
            Todos los artículos, esquemas y tablas de CrochetSimply cuentan con datos estructurados Schema.org (JSON-LD), etiquetas canónicas, mapas de sitio XML (/sitemap.xml) y directivas de rastreo amigables para robots (/robots.txt).
          </p>
        </div>

      </div>
    </section>
  );
};
