import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, RotateCcw, ChevronRight, ChevronLeft, 
  Sparkles, BookOpen, Layers, CheckCircle2, ArrowRight, 
  HelpCircle, Eye, Sliders
} from 'lucide-react';

export interface StitchDetail {
  id: string;
  name: string;
  abbreviationUS: string;
  abbreviationUK: string;
  ukEquivalent: string;
  turningChains: number;
  heightLevel: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Foundation & Flat' | 'Tall Stitches' | 'Relief & Texture' | 'Circular & Specialty';
  bestFor: string[];
  description: string;
  studioTip: string;
  steps: {
    stepNumber: number;
    title: string;
    instruction: string;
    hookPosition: string;
    loopsOnHook: number;
    svgGraphicType: 'start' | 'insert' | 'yarnover' | 'pullthrough' | 'complete';
  }[];
}

const STITCH_CATALOG: StitchDetail[] = [
  {
    id: 'single-crochet',
    name: 'Single Crochet',
    abbreviationUS: 'sc',
    abbreviationUK: 'dc',
    ukEquivalent: 'Double Crochet (UK)',
    turningChains: 1,
    heightLevel: 'Short & Dense (1 unit)',
    difficulty: 'Beginner',
    category: 'Foundation & Flat',
    bestFor: ['Amigurumi Toys', 'Sturdy Market Bags', 'Warm Winter Mittens', 'Dishcloths'],
    description: 'The workhorse of crochet. Single crochet produces a compact, sturdy, almost woven fabric with minimal holes, making it the supreme choice for plush toys and structural carryalls.',
    studioTip: 'When working row 1, try working into the bottom "back bump" of your foundation chain for a clean, elastic lower edge identical to the top.',
    steps: [
      {
        stepNumber: 1,
        title: 'Insert Hook Under Both Loops',
        instruction: 'Insert your hook from front to back through the designated stitch, catching both strands of the top "V".',
        hookPosition: 'Through both loops of stitch',
        loopsOnHook: 1,
        svgGraphicType: 'insert'
      },
      {
        stepNumber: 2,
        title: 'Yarn Over (YO)',
        instruction: 'Wind the working yarn over the hook throat from back to front.',
        hookPosition: 'Yarn resting in hook groove',
        loopsOnHook: 1,
        svgGraphicType: 'yarnover'
      },
      {
        stepNumber: 3,
        title: 'Draw Up a Loop',
        instruction: 'Rotate the hook slightly downward and pull the yarn through the stitch. You now have two distinct loops resting on the hook shaft.',
        hookPosition: '2 loops parallel on shaft',
        loopsOnHook: 2,
        svgGraphicType: 'pullthrough'
      },
      {
        stepNumber: 4,
        title: 'Yarn Over and Complete Stitch',
        instruction: 'Yarn over once more and draw through both loops simultaneously. One clean single crochet is complete with one loop remaining.',
        hookPosition: '1 active loop remaining',
        loopsOnHook: 1,
        svgGraphicType: 'complete'
      }
    ]
  },
  {
    id: 'double-crochet',
    name: 'Double Crochet',
    abbreviationUS: 'dc',
    abbreviationUK: 'tr',
    ukEquivalent: 'Treble Crochet (UK)',
    turningChains: 3,
    heightLevel: 'Classic Medium (2 units)',
    difficulty: 'Beginner',
    category: 'Tall Stitches',
    bestFor: ['Classic Granny Squares', 'Cozy Afghans & Throws', 'Summer Tops', 'Cardigans'],
    description: 'The foundation of traditional crochet. Double crochet is twice the height of single crochet and forms the clusters of iconic granny squares, offering fluid drape and quick project progression.',
    studioTip: 'To avoid the loose gap next to the turning chain, replace the initial 3 chains with a stacked chainless double crochet.',
    steps: [
      {
        stepNumber: 1,
        title: 'Initial Yarn Over (YO)',
        instruction: 'Before entering the stitch, yarn over the hook from back to front. You will enter the stitch with this loop already wrapped.',
        hookPosition: 'Working yarn wrapped once over hook',
        loopsOnHook: 2,
        svgGraphicType: 'yarnover'
      },
      {
        stepNumber: 2,
        title: 'Insert Hook and Draw Up Loop',
        instruction: 'Insert hook into the next stitch, yarn over again, and draw a loop through. You now have three loops on your hook.',
        hookPosition: '3 active loops on hook shaft',
        loopsOnHook: 3,
        svgGraphicType: 'insert'
      },
      {
        stepNumber: 3,
        title: 'First Draw-Through (Pillar Body)',
        instruction: 'Yarn over and carefully pull through the first TWO loops only. Two loops remain on your hook.',
        hookPosition: '2 loops remaining on hook',
        loopsOnHook: 2,
        svgGraphicType: 'pullthrough'
      },
      {
        stepNumber: 4,
        title: 'Final Draw-Through (Lock Stitch)',
        instruction: 'Yarn over and pull through the remaining two loops. The tall vertical double crochet post is locked in place.',
        hookPosition: '1 active loop ready for next stitch',
        loopsOnHook: 1,
        svgGraphicType: 'complete'
      }
    ]
  },
  {
    id: 'half-double-crochet',
    name: 'Half Double Crochet',
    abbreviationUS: 'hdc',
    abbreviationUK: 'htr',
    ukEquivalent: 'Half Treble Crochet (UK)',
    turningChains: 2,
    heightLevel: 'Balanced Hybrid (1.5 units)',
    difficulty: 'Beginner',
    category: 'Foundation & Flat',
    bestFor: ['Ribbed Beanies', 'Chunky Scarves', 'Baby Sweaters', 'Knit-Look Textures'],
    description: 'The goldilocks stitch: taller than single crochet, denser than double crochet. Unique for possessing a secret "third loop" on the back side that enables knit-like 1x1 accordion ribbing.',
    studioTip: 'Crochet into the horizontal "third loop" running directly behind the top V to force the V-stitches forward, producing faux-knitting ribs.',
    steps: [
      {
        stepNumber: 1,
        title: 'Yarn Over Before Insertion',
        instruction: 'Yarn over hook from back to front.',
        hookPosition: '1 loop + 1 yarnover wrap',
        loopsOnHook: 2,
        svgGraphicType: 'yarnover'
      },
      {
        stepNumber: 2,
        title: 'Insert Hook and Pull Up Loop',
        instruction: 'Insert hook into designated stitch, yarn over, and pull up a loop. Three loops now rest on your hook.',
        hookPosition: '3 loops spaced evenly on hook',
        loopsOnHook: 3,
        svgGraphicType: 'insert'
      },
      {
        stepNumber: 3,
        title: 'Smooth 3-Loop Single Sweep',
        instruction: 'Yarn over one final time and pull the working loop through ALL THREE loops on your hook in one smooth, sweeping motion.',
        hookPosition: 'Pulled through 3 loops at once',
        loopsOnHook: 1,
        svgGraphicType: 'complete'
      }
    ]
  },
  {
    id: 'treble-crochet',
    name: 'Treble / Triple Crochet',
    abbreviationUS: 'tr',
    abbreviationUK: 'dtr',
    ukEquivalent: 'Double Treble (UK)',
    turningChains: 4,
    heightLevel: 'Tall & Ethereal (3 units)',
    difficulty: 'Intermediate',
    category: 'Tall Stitches',
    bestFor: ['Openwork Lace Shawls', 'Beach Coverups', 'Airy Mandalas', 'Fast Expanding Ruffles'],
    description: 'A soaring, architectural stitch created with two yarn-overs. Generates open lattice grids with generous drape and breeze, perfect for summer shawls and delicate doilies.',
    studioTip: 'Keep your double yarn-overs close together on the hook shaft so the tall vertical columns do not bow or buckle sideways.',
    steps: [
      {
        stepNumber: 1,
        title: 'Double Yarn Over (YO × 2)',
        instruction: 'Yarn over twice around the hook shaft before entering the stitch.',
        hookPosition: '2 wraps + active loop = 3 loops',
        loopsOnHook: 3,
        svgGraphicType: 'yarnover'
      },
      {
        stepNumber: 2,
        title: 'Insert Hook & Pull Up Loop',
        instruction: 'Insert hook into stitch, yarn over, and draw up a loop. You now hold FOUR loops on your hook.',
        hookPosition: '4 loops lined up on hook',
        loopsOnHook: 4,
        svgGraphicType: 'insert'
      },
      {
        stepNumber: 3,
        title: 'Stepwise 2-by-2 Reductions',
        instruction: '*(Yarn over, pull through 2 loops)* three consecutive times to climb the tall column until only 1 loop remains.',
        hookPosition: 'Climbing the 3-tier pillar',
        loopsOnHook: 1,
        svgGraphicType: 'complete'
      }
    ]
  },
  {
    id: 'front-post-double-crochet',
    name: 'Front Post Double Crochet',
    abbreviationUS: 'fpdc',
    abbreviationUK: 'fptr',
    ukEquivalent: 'Front Post Treble (UK)',
    turningChains: 3,
    heightLevel: 'Architectural Relief',
    difficulty: 'Intermediate',
    category: 'Relief & Texture',
    bestFor: ['Waffle Stitch Cardigans', 'Aran Cables', 'Stretchy Cuffs & Collars', 'Basketweave Blankets'],
    description: 'Instead of inserting into the top loops, the hook embraces the vertical body post of the stitch below from front to back, pulling the stitch forward in bold, three-dimensional relief.',
    studioTip: 'Work front-post stitches loosely; because they do not stand on top of stitches, they naturally pull downward slightly.',
    steps: [
      {
        stepNumber: 1,
        title: 'Yarn Over & Approach the Post',
        instruction: 'Yarn over as for a normal double crochet. Identify the vertical post of the stitch one row below.',
        hookPosition: 'Yarn over ready to dive',
        loopsOnHook: 2,
        svgGraphicType: 'yarnover'
      },
      {
        stepNumber: 2,
        title: 'Embrace Post From Front to Back to Front',
        instruction: 'Insert hook from the front of the fabric, around behind the vertical post, and back out to the front on the other side. The post now rests horizontally across your hook.',
        hookPosition: 'Hook hugging around post body',
        loopsOnHook: 2,
        svgGraphicType: 'insert'
      },
      {
        stepNumber: 3,
        title: 'Draw Up Loop & Finish Standard dc',
        instruction: 'Yarn over, draw loop around the post to fabric surface. Complete standard double crochet: *(YO, pull through 2)* twice.',
        hookPosition: 'Raised 3D ridge formed on front',
        loopsOnHook: 1,
        svgGraphicType: 'complete'
      }
    ]
  },
  {
    id: 'bobble-stitch',
    name: '5-dc Bobble Stitch',
    abbreviationUS: 'bo / 5-dc cl',
    abbreviationUK: '5-tr cluster (UK)',
    ukEquivalent: '5-Treble Cluster (UK)',
    turningChains: 1,
    heightLevel: '3D Spherical Pop',
    difficulty: 'Intermediate',
    category: 'Relief & Texture',
    bestFor: ['Sensory Baby Blankets', 'Textured Pillows', 'Sheep & Animal Fur', 'Decorative Accent Edges'],
    description: 'A cluster of 5 incomplete double crochets worked into the exact same stitch and closed together with a single yarn-over. Pops outward on the reverse side like a rounded pebble.',
    studioTip: 'Always push the bobble forward with your non-dominant thumb as you work the subsequent single crochet to lock its round dome in place.',
    steps: [
      {
        stepNumber: 1,
        title: 'First Incomplete Double Crochet',
        instruction: 'YO, insert hook into stitch, YO, pull up loop, YO, pull through 2 loops. Leave remaining 2 loops on hook.',
        hookPosition: '1 half-closed dc on hook',
        loopsOnHook: 2,
        svgGraphicType: 'insert'
      },
      {
        stepNumber: 2,
        title: 'Repeat into Same Stitch (Total 5 Times)',
        instruction: 'Work 4 more incomplete double crochets into the exact same base stitch. You will have SIX loops crowded on your hook.',
        hookPosition: '6 loops bunched together on shaft',
        loopsOnHook: 6,
        svgGraphicType: 'yarnover'
      },
      {
        stepNumber: 3,
        title: 'Cluster Lock and Pop Outward',
        instruction: 'Yarn over one final time and pull through ALL SIX loops on your hook. Single crochet into the next stitch to secure the 3D sphere.',
        hookPosition: '3D bubble popping outward',
        loopsOnHook: 1,
        svgGraphicType: 'complete'
      }
    ]
  },
  {
    id: 'magic-ring',
    name: 'Double-Wrap Magic Ring',
    abbreviationUS: 'mr',
    abbreviationUK: 'magic loop (UK)',
    ukEquivalent: 'Adjustable Ring (UK)',
    turningChains: 1,
    heightLevel: 'Centripetal Core',
    difficulty: 'Beginner',
    category: 'Circular & Specialty',
    bestFor: ['Amigurumi Heads', 'Granny Square Centers', 'Hats Worked Top-Down', 'Circular Coasters'],
    description: 'The premier technique for starting circular crochet. Unlike a chain loop that leaves a hollow hole, an adjustable magic ring cinches shut like a drawstring for a 100% gap-free core.',
    studioTip: 'Crochet Simply recommends the double-wrap technique: wrap twice around your fingers so the central ring never slips or opens under machine wash tension.',
    steps: [
      {
        stepNumber: 1,
        title: 'Loop Twice Around Fingers',
        instruction: 'Drape yarn across your palm, wrap twice around your index and middle fingers, forming an "X" on the back of your fingers.',
        hookPosition: 'Holding double concentric yarn loops',
        loopsOnHook: 0,
        svgGraphicType: 'insert'
      },
      {
        stepNumber: 2,
        title: 'Hook Slide and Draw Up Loop',
        instruction: 'Slide hook under first strand, catch the second strand with hook throat, and pull up a loop. Chain 1 to lock the circle.',
        hookPosition: 'Anchored working ring ready for stitches',
        loopsOnHook: 1,
        svgGraphicType: 'yarnover'
      },
      {
        stepNumber: 3,
        title: 'Crochet Over Both Ring Strands & Cinch',
        instruction: 'Work your required stitches (e.g. 6 sc) working inside the ring and over both strands. Pull tail firmly to seal the center completely.',
        hookPosition: 'Zero-hole sealed center circle',
        loopsOnHook: 1,
        svgGraphicType: 'complete'
      }
    ]
  },
  {
    id: 'invisible-decrease',
    name: 'Invisible Decrease',
    abbreviationUS: 'inv dec',
    abbreviationUK: 'inv dec',
    ukEquivalent: 'Invisible Decrease (UK)',
    turningChains: 1,
    heightLevel: 'Seamless Shaping',
    difficulty: 'Intermediate',
    category: 'Circular & Specialty',
    bestFor: ['Amigurumi Sculpting', 'Stuffed Dolls', 'Tapered Hat Crowns', 'Seamless Spheres'],
    description: 'The secret of master amigurumi artists. By picking up only the front loops of two adjacent stitches, the decrease eliminates the bulky horizontal ridge and gaping holes of traditional reductions.',
    studioTip: 'Keep your tension snug on the final pull-through so the two condensed stitches blend invisibly into the surrounding fabric.',
    steps: [
      {
        stepNumber: 1,
        title: 'Front Loop 1 Insertion',
        instruction: 'Insert hook from down to up under the FRONT LOOP ONLY (FLO) of the first stitch. Do not yarn over yet.',
        hookPosition: '1 loop + 1 front loop on hook',
        loopsOnHook: 2,
        svgGraphicType: 'insert'
      },
      {
        stepNumber: 2,
        title: 'Front Loop 2 Continuous Pivot',
        instruction: 'Pivot the hook tip downward and immediately slip it under the FRONT LOOP ONLY of the second stitch. 3 strands now rest on hook.',
        hookPosition: 'Both front loops captured seamlessly',
        loopsOnHook: 3,
        svgGraphicType: 'yarnover'
      },
      {
        stepNumber: 3,
        title: 'Yarn Over & Draw Through Front Loops',
        instruction: 'Yarn over, draw through the two front loops. Yarn over again and draw through remaining two loops. 2 stitches are now 1.',
        hookPosition: 'Completely flat decrease without bumps',
        loopsOnHook: 1,
        svgGraphicType: 'complete'
      }
    ]
  }
];

export const StitchLibrary: React.FC = () => {
  const [selectedStitch, setSelectedStitch] = useState<StitchDetail>(STITCH_CATALOG[0]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentStep = selectedStitch.steps[currentStepIndex];
  const totalSteps = selectedStitch.steps.length;

  // Auto-playing loop when active
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= totalSteps - 1) {
            return 0; // loop back
          }
          return prev + 1;
        });
      }, 2400 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, totalSteps]);

  // When changing stitch, reset step and pause
  const handleSelectStitch = (stitch: StitchDetail) => {
    setSelectedStitch(stitch);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handleNextStep = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => (prev < totalSteps - 1 ? prev + 1 : 0));
  };

  const handlePrevStep = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => (prev > 0 ? prev - 1 : totalSteps - 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  // Filter stitches
  const categories = ['All', 'Foundation & Flat', 'Tall Stitches', 'Relief & Texture', 'Circular & Specialty'];

  const filteredStitches = STITCH_CATALOG.filter((s) => {
    if (selectedFilterCategory !== 'All' && s.category !== selectedFilterCategory) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = s.name.toLowerCase().includes(q);
      const matchUS = s.abbreviationUS.toLowerCase().includes(q);
      const matchUK = s.abbreviationUK.toLowerCase().includes(q);
      const matchDesc = s.description.toLowerCase().includes(q);
      if (!matchName && !matchUS && !matchUK && !matchDesc) return false;
    }
    return true;
  });

  return (
    <section id="stitch-library" className="py-14 sm:py-20 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/90 border border-amber-200/80 text-[11px] font-sans font-semibold text-amber-900 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Interactive CrochetSimply Academy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-stone-900 tracking-tight">
              Interactive Stitch Library & Step Demonstrator
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-2xl font-sans leading-relaxed">
              Examine loop movements, yarn-over positions, and turning chains in real time with our step-by-step vector demonstrator. Ideal for visual learners and bilingual US/UK pattern translation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-stone-500 bg-white border border-stone-300 px-3 py-1.5 rounded-lg shadow-2xs">
              {STITCH_CATALOG.length} Essential Stitches
            </span>
          </div>
        </div>

        {/* Categories Bar & Search */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/60 rounded-lg">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilterCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  selectedFilterCategory === cat
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search stitch name (e.g. hdc, bobble)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-amber-600"
          />
        </div>

        {/* Main Interactive Stage: 2 Columns */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Stitch Selector Grid */}
          <div className="lg:col-span-4 space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
            <span className="text-[11px] font-sans uppercase tracking-widest text-stone-400 font-semibold block mb-1">
              Select Stitch to Demonstrate:
            </span>

            {filteredStitches.map((stitch) => {
              const isSelected = selectedStitch.id === stitch.id;
              return (
                <div
                  key={stitch.id}
                  onClick={() => handleSelectStitch(stitch)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-amber-700/80 shadow-sm ring-1 ring-amber-600/30'
                      : 'bg-white/70 hover:bg-white border-stone-200 text-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {stitch.abbreviationUS}
                      </span>
                      <h4 className="font-serif text-sm font-semibold text-stone-900">
                        {stitch.name}
                      </h4>
                    </div>

                    <span className="text-[10px] font-sans text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
                      {stitch.difficulty}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[11px] text-stone-500 font-sans">
                    <span>UK: {stitch.ukEquivalent}</span>
                    <span className="text-stone-400">· {stitch.steps.length} steps</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Interactive Animated Demonstration Studio */}
          <div className="lg:col-span-8 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            
            {/* Header with Title and Bilingual Conversion */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-200">
              <div>
                <div className="flex items-center gap-2.5 mb-1">
                  <span className="font-mono text-sm font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                    US: {selectedStitch.abbreviationUS}
                  </span>
                  <span className="text-stone-300">|</span>
                  <span className="font-mono text-xs font-semibold text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded">
                    UK: {selectedStitch.abbreviationUK} ({selectedStitch.ukEquivalent})
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">
                  {selectedStitch.name}
                </h3>
              </div>

              {/* Turning chain badge */}
              <div className="flex items-center gap-2 font-sans text-xs text-stone-600 sm:text-right">
                <span className="text-stone-400">Turning Chain:</span>
                <span className="font-mono font-bold text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded">
                  ch {selectedStitch.turningChains}
                </span>
                <span className="text-stone-400 hidden sm:inline">· {selectedStitch.heightLevel}</span>
              </div>
            </div>

            {/* Description & Best For Tags */}
            <p className="mt-4 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
              {selectedStitch.description}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-sans text-stone-400 font-medium mr-1">Best for:</span>
              {selectedStitch.bestFor.map((item, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-sans px-2 py-0.5 bg-stone-100 text-stone-700 rounded-md border border-stone-200/60"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Visual Vector Demonstration Stage */}
            <div className="mt-6 rounded-xl bg-[#FAF8F5] border border-stone-200 p-5 sm:p-8 relative overflow-hidden">
              
              {/* Top Step Progress Bar */}
              <div className="flex items-center justify-between gap-2 mb-6">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-stone-900 bg-white px-2.5 py-1 rounded-md border border-stone-300 shadow-2xs">
                    Step {currentStep.stepNumber} of {totalSteps}
                  </span>
                  <span className="text-xs font-serif font-medium text-stone-800">
                    {currentStep.title}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-mono text-stone-500 bg-white/80 px-2.5 py-1 rounded border border-stone-200">
                  <span>Loops on hook:</span>
                  <span className="font-bold text-amber-900">{currentStep.loopsOnHook}</span>
                </div>
              </div>

              {/* Vector Graphic Canvas */}
              <div className="relative aspect-[16/9] max-h-[260px] w-full flex items-center justify-center bg-white rounded-xl border border-stone-200/80 shadow-inner p-4 overflow-hidden">
                
                {/* Dynamic SVG Demonstration based on active step */}
                <svg
                  viewBox="0 0 400 200"
                  className="w-full h-full max-w-md transition-all duration-300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Background fabric row guidelines */}
                  <line x1="40" y1="150" x2="360" y2="150" stroke="#E7E5E4" strokeWidth="4" strokeLinecap="round" strokeDasharray="6 6" />
                  <path d="M 60 150 Q 80 130 100 150 Q 120 130 140 150 Q 160 130 180 150 Q 200 130 220 150 Q 240 130 260 150 Q 280 130 300 150 Q 320 130 340 150" stroke="#D6D3D1" strokeWidth="3" fill="none" />
                  
                  {/* Previous V-stitch focus target */}
                  <ellipse cx="200" cy="150" rx="22" ry="10" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
                  <text x="200" y="180" textAnchor="middle" fill="#78716C" fontSize="10" fontFamily="sans-serif">Target Stitch V</text>

                  {/* Dynamic Staging Elements */}
                  {currentStep.svgGraphicType === 'insert' && (
                    <g className="animate-in fade-in zoom-in-95 duration-200">
                      {/* Hook diving down into stitch */}
                      <path d="M 120 40 L 195 140" stroke="#78716C" strokeWidth="9" strokeLinecap="round" />
                      {/* Hook head throat curving down */}
                      <path d="M 195 140 C 205 152 215 148 210 135 C 208 128 202 125 198 130" stroke="#44403C" strokeWidth="6" strokeLinecap="round" fill="none" />
                      
                      {/* Active loop on hook */}
                      <ellipse cx="140" cy="65" rx="8" ry="14" fill="#FED7AA" stroke="#EA580C" strokeWidth="2.5" transform="rotate(-40 140 65)" />
                      
                      {/* Direction arrow */}
                      <path d="M 170 80 L 190 115 M 190 115 L 180 112 M 190 115 L 192 105" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
                      <text x="250" y="60" fill="#C2410C" fontSize="11" fontFamily="sans-serif" fontWeight="bold">1. Hook entering V-loop</text>
                    </g>
                  )}

                  {currentStep.svgGraphicType === 'yarnover' && (
                    <g className="animate-in fade-in zoom-in-95 duration-200">
                      {/* Hook horizontal above fabric */}
                      <path d="M 100 80 L 220 80" stroke="#78716C" strokeWidth="9" strokeLinecap="round" />
                      <path d="M 220 80 C 235 80 238 65 226 65 C 218 65 215 75 220 80" stroke="#44403C" strokeWidth="6" strokeLinecap="round" fill="none" />
                      
                      {/* Working yarn swirling over hook from back to front */}
                      <path d="M 260 20 C 230 40 200 60 224 82 C 240 95 210 115 170 120" stroke="#D97706" strokeWidth="4" strokeDasharray="3 3" fill="none" />
                      <circle cx="260" cy="20" r="4" fill="#D97706" />
                      <text x="270" y="24" fill="#B45309" fontSize="10" fontFamily="sans-serif">Working Yarn (from skein)</text>

                      {/* Directional rotation arrow */}
                      <path d="M 235 50 A 15 15 0 0 1 245 85" stroke="#D97706" strokeWidth="2" markerEnd="url(#arrow)" fill="none" />
                      <text x="250" y="75" fill="#B45309" fontSize="11" fontFamily="sans-serif" fontWeight="bold">2. Yarn Over (back to front)</text>
                    </g>
                  )}

                  {currentStep.svgGraphicType === 'pullthrough' && (
                    <g className="animate-in fade-in zoom-in-95 duration-200">
                      {/* Hook pulling loop upward */}
                      <path d="M 130 50 L 205 130" stroke="#78716C" strokeWidth="9" strokeLinecap="round" />
                      <path d="M 205 130 C 215 140 220 130 212 120" stroke="#44403C" strokeWidth="6" strokeLinecap="round" fill="none" />

                      {/* Two distinct loops on hook */}
                      <ellipse cx="160" cy="80" rx="9" ry="16" fill="#FEF3C7" stroke="#D97706" strokeWidth="3" transform="rotate(-35 160 80)" />
                      <ellipse cx="185" cy="105" rx="9" ry="16" fill="#FED7AA" stroke="#EA580C" strokeWidth="3" transform="rotate(-35 185 105)" />

                      <text x="135" y="110" fill="#78716C" fontSize="10" fontFamily="sans-serif">Loop 1</text>
                      <text x="220" y="115" fill="#78716C" fontSize="10" fontFamily="sans-serif">Loop 2 (drawn up)</text>
                      <text x="250" y="60" fill="#B45309" fontSize="11" fontFamily="sans-serif" fontWeight="bold">3. Draw loop through</text>
                    </g>
                  )}

                  {currentStep.svgGraphicType === 'complete' && (
                    <g className="animate-in fade-in zoom-in-95 duration-200">
                      {/* Completed stitch vertical pillar */}
                      <path d="M 200 150 L 200 90" stroke="#D97706" strokeWidth="7" strokeLinecap="round" />
                      {/* Top V loop resting ready */}
                      <ellipse cx="200" cy="80" rx="14" ry="7" fill="#FEF3C7" stroke="#B45309" strokeWidth="3" />
                      
                      {/* Hook standing ready at top */}
                      <path d="M 150 40 L 200 80" stroke="#78716C" strokeWidth="8" strokeLinecap="round" />
                      <path d="M 200 80 C 208 86 214 80 208 74" stroke="#44403C" strokeWidth="5" strokeLinecap="round" fill="none" />

                      {/* Checkmark icon badge */}
                      <circle cx="280" cy="70" r="16" fill="#ECFDF5" stroke="#059669" strokeWidth="2" />
                      <path d="M 273 70 L 278 75 L 287 64" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <text x="280" y="105" textAnchor="middle" fill="#047857" fontSize="11" fontFamily="sans-serif" fontWeight="bold">Stitch Complete!</text>
                    </g>
                  )}
                </svg>

                {/* Subtle watermark */}
                <span className="absolute bottom-2 right-3 text-[10px] font-mono text-stone-300">
                  CrochetSimply Interactive Engine
                </span>
              </div>

              {/* Step Instruction Card */}
              <div className="mt-5 p-4 bg-white rounded-xl border border-stone-200 shadow-2xs">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-800 text-white flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                    {currentStep.stepNumber}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-serif text-base font-semibold text-stone-900">
                      {currentStep.title}
                    </h5>
                    <p className="mt-1 text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                      {currentStep.instruction}
                    </p>
                    <div className="mt-2 text-[11px] font-sans text-stone-500">
                      <strong className="text-stone-700">Hook position:</strong> {currentStep.hookPosition}
                    </div>
                  </div>
                </div>
              </div>

              {/* Playback & Step Scrubbing Controls */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-200/80">
                
                {/* Step navigation buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePrevStep}
                    className="p-2 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 rounded-lg transition-colors cursor-pointer"
                    title="Previous step"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer shadow-2xs"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                    <span>{isPlaying ? 'Pause Auto' : 'Auto Play'}</span>
                  </button>

                  <button
                    onClick={handleNextStep}
                    className="p-2 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 rounded-lg transition-colors cursor-pointer"
                    title="Next step"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleReset}
                    className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer ml-1"
                    title="Restart from step 1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Speed toggle */}
                <div className="flex items-center gap-2 text-xs font-sans text-stone-500">
                  <span>Speed:</span>
                  <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-stone-200">
                    {[0.75, 1, 1.5].map((speed) => (
                      <button
                        key={speed}
                        onClick={() => setPlaybackSpeed(speed)}
                        className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer transition-colors ${
                          playbackSpeed === speed
                            ? 'bg-amber-100 font-bold text-amber-900'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Step indicator dots */}
              <div className="mt-4 flex items-center justify-center gap-2">
                {selectedStitch.steps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsPlaying(false);
                      setCurrentStepIndex(idx);
                    }}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentStepIndex === idx
                        ? 'w-8 bg-amber-800'
                        : 'w-2 bg-stone-300 hover:bg-stone-400'
                    }`}
                    title={`Jump to step ${idx + 1}`}
                  />
                ))}
              </div>

            </div>

            {/* Studio Pro Tip Callout */}
            <div className="mt-6 p-4 bg-amber-50/70 border-l-4 border-amber-800 rounded-r-xl text-xs text-stone-700 font-sans leading-relaxed">
              <strong className="text-amber-950 font-semibold block mb-0.5">
                CrochetSimply Studio Tip for {selectedStitch.name}:
              </strong>
              {selectedStitch.studioTip}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
