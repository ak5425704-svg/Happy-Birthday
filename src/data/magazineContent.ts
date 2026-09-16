import {
  MagazineFact,
  QuoteCard,
  CravingItem,
  RoamPlace,
  MemoryPhoto,
  AwardItem,
  HypotheticalItem,
  BucketListItem,
  WishItem
} from '../types';

export const MAGAZINE_FACTS: MagazineFact[] = [
  { label: 'NAME', value: 'Ramsha', subtext: 'The one and only' },
  { label: 'AGE', value: '18', subtext: 'Official Chapter 18' },
  { label: 'VIBE', value: 'Cute + Chaotic', subtext: '99% mischief, 1% innocent' },
  { label: 'FAVOURITE COLOUR', value: 'Black', subtext: 'Whole personality & aesthetic' },
  { label: 'FAVOURITE FOOD', value: 'Biryani', subtext: 'Non-negotiable comfort fuel' },
  { label: 'SECOND LOVE', value: 'Pizza', subtext: 'Extra cheese & pure happiness' },
  { label: 'FAVOURITE SONG', value: 'Teri Deewani', subtext: 'On repeat in every mood' },
  { label: 'FAVOURITE THING TO DO', value: 'Ghoomna', subtext: 'Born with wheels on her feet' },
];

export const PERSONALITY_QUOTES: QuoteCard[] = [
  { id: 'q1', quote: 'Sweet face. Questionable decisions.', context: 'Every single day without fail.', tag: 'FACT' },
  { id: 'q2', quote: 'Born to create chaos.', context: 'Calmness was never an option.', tag: 'ICONIC' },
  { id: 'q3', quote: 'Professional overthinker.', context: 'Analyzes a 3-word message for 4 hours.', tag: 'MOOD' },
  { id: 'q4', quote: 'Cute enough to escape every crime.', context: 'Weapon of mass distraction.', tag: 'DANGER' },
  { id: 'q5', quote: 'Somehow, she turns ordinary moments into memories.', context: 'The heart behind the madness.', tag: 'SOUL' },
];

export const FOOD_CRAVINGS: CravingItem[] = [
  {
    id: 'biryani',
    icon: '🍗',
    title: 'BIRYANI',
    subtitle: 'THE UNDISPUTED QUEEN OF DISHES',
    description: "Because some cravings don't need an explanation. If you ever want to win her over or end an argument, bring a plate of hot fragrant biryani and watch all complaints evaporate.",
    humorNote: 'Priority #1 in life hierarchy.',
    highlight: true,
  },
  {
    id: 'pizza',
    icon: '🍕',
    title: 'PIZZA',
    subtitle: 'HER SECOND ETERNAL LOVE',
    description: 'Cheese, chaos and happiness — basically her formula. Whether it is late night food cravings or post-adventure treats, pizza solves 90% of her worldly troubles.',
    humorNote: 'Crust left behind? Never.',
  },
  {
    id: 'dimag',
    icon: '🧠',
    title: 'THODA SA DIMAG',
    subtitle: 'THE URGENT REFILL REQUIRED',
    description: 'Sometimes what she genuinely needs in life is just "thoda sa dimag". The brain works at 300km/h for making spontaneous plans and plotting mischief, but takes a sudden nap during sensible adulting.',
    humorNote: 'Stock currently under backorder.',
  },
];

export const ROAM_QUOTES = [
  'Some people collect things. She collects places and memories.',
  'Give her a destination and she’ll find a reason to go.',
  'Her favourite place? Probably somewhere she hasn\'t been yet.',
];

export const DEFAULT_ROAM_PLACES: RoamPlace[] = [
  {
    id: 'r1',
    location: 'Midnight Car Rides & Neon Streets',
    dateOrTag: 'VIBES',
    caption: 'Windows down, music playing, wind blowing, zero destinations in mind.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'r2',
    location: 'Cafe Corners & Hidden Bakeries',
    dateOrTag: 'EXPLORATION',
    caption: 'Searching for the best cold coffee and aesthetic spots across town.',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'r3',
    location: 'Golden Hour Horizons',
    dateOrTag: 'MEMORIES',
    caption: 'Sunset skies and endless talking about life, dreams, and random kand.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
  },
];

export const DEFAULT_MEMORIES: MemoryPhoto[] = [
  {
    id: 'm1',
    title: 'Pure Aesthetic',
    caption: 'Little moments. Big memories.',
    date: 'Chapter 18',
    type: 'polaroid',
    rotation: -2,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'm2',
    title: 'The Golden Laughter',
    caption: 'Mid-laugh right after doing something she specifically promised not to do.',
    date: 'Unfiltered',
    type: 'polaroid',
    rotation: 3,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'm3',
    title: 'The Roamer',
    caption: 'Always searching for the next city corner and road trip.',
    date: 'On The Move',
    type: 'magazine',
    rotation: -1,
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'm4',
    title: 'Chaos Master',
    caption: 'That signature look right before she says "Bhyyi ek idea hai".',
    date: 'Classic Ramsha',
    type: 'polaroid',
    rotation: 2,
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop',
  },
];

export const ICONIC_QUOTES = [
  { text: '“Bhyyi!”', tone: 'Signature Catchphrase', note: 'Can be heard from 3 blocks away whenever something dramatic occurs.' },
  { text: '“Ye kya ho raha hai?”', tone: 'Default State of Confusion', note: 'Spoken while usually being the exact person causing what is happening.' },
  { text: '“Bas ek baar aur…”', tone: 'Dangerous Lie', note: 'Never just one more time. It means 14 more rounds of chaos.' },
  { text: '“Main nahi karungi.”', tone: 'Immediate Irony', note: 'She said she wouldn\'t create chaos... 5 seconds later, she created chaos.' },
];

export const AWARDS: AwardItem[] = [
  { id: 'a1', title: 'Queen of Randomness', category: 'LIFESTYLE', citation: 'For switching topics 6 times inside a 2-minute conversation.' },
  { id: 'a2', title: 'Professional Kand Creator', category: 'CRIMINOLOGY', citation: 'Mastermind behind plans that start innocent and end in hysteria.' },
  { id: 'a3', title: 'Biryani Enthusiast of the Year', category: 'GASTRONOMY', citation: 'Has never turned down a plate, regardless of time or fullness.' },
  { id: 'a4', title: 'Pizza Department Head', category: 'NUTRITION', citation: 'Believes all four food groups can be substituted by extra mozzarella.' },
  { id: 'a5', title: 'Most Likely To Say “Bhyyi”', category: 'VOCAL ARTS', citation: 'Awarded unconditionally with zero competing nominees.' },
  { id: 'a6', title: 'Best Smile During Chaos', category: 'DIPLOMACY', citation: 'Uses innocence to neutralize any lecture or scolding instantly.' },
  { id: 'a7', title: 'Official Travel Planner', category: 'TOURISM', citation: 'Always has 12 Google Maps pins ready for the weekend.' },
  { id: 'a8', title: 'CEO of Unnecessary Drama', category: 'EXECUTIVE', citation: 'For making ordering ice cream feel like an Oscar-nominated screenplay.' },
];

export const HYPOTHETICALS: HypotheticalItem[] = [
  { prompt: 'If Ramsha were a colour', answer: 'Black', iconName: 'Sparkles', comment: 'Moody, classy, unapologetic, and timeless.' },
  { prompt: 'If Ramsha were a food', answer: 'Biryani', iconName: 'Flame', comment: 'Full of spices, rich layers, and beloved by everyone.' },
  { prompt: 'If Ramsha were a place', answer: 'Somewhere worth travelling to', iconName: 'Compass', comment: 'A road trip with great views and unexpected detours.' },
  { prompt: 'If Ramsha were a weather', answer: 'A calm evening with unexpected chaos', iconName: 'CloudRain', comment: 'Pleasant cool breeze followed by a sudden lightning strike.' },
  { prompt: 'If Ramsha were a song', answer: 'Teri Deewani', iconName: 'Music', comment: 'Raw passion, poetic depth, and unforgettable soul.' },
  { prompt: 'If Ramsha were a movie genre', answer: 'Comedy with unnecessary plot twists', iconName: 'Film', comment: 'You never know what happens next, but it\'s always entertaining.' },
];

export const EIGHTEEN_FACTS: string[] = [
  'Can spot a Biryani handi from 500 meters away with terrifying precision.',
  'Has a wardrobe dominated by 50 shades of black, yet says she has nothing to wear.',
  'Says "Bhyyi" with at least 8 distinct tonal variations depending on the disaster level.',
  'Her sense of direction exists in a mystical quantum dimension.',
  'Spends 40 minutes choosing what to eat, then orders the exact same thing as always.',
  'Will defend her questionable decisions with absolute judicial confidence.',
  'Has the rarest superpower: turning the simplest boring day into an adventure.',
  'Master of making puppy dog eyes to escape being scolded.',
  'Listens to "Teri Deewani" like it’s a spiritual awakening.',
  'Claims she loves staying home, but is out the door the second someone says "chal chalein".',
  'Protective, fiercely loyal, and stands like a fortress for her people.',
  'Her phone camera roll is 90% memes, screenshots, and candid chaos.',
  'Acts tough, but has one of the softest, most caring hearts you will ever know.',
  'Laughs at her own jokes before even finishing the sentence.',
  'Can turn a 5-minute errand into a 3-hour saga.',
  'The undisputed sister of the crew who makes everyone feel like family.',
  'Entering 18 with unmatched grace, unstoppable dreams, and infinite sparkle.',
  'Officially stepping into adulthood at 18 with the exact same unhinged charm and golden heart.'
];
export const SEVENTEEN_FACTS = EIGHTEEN_FACTS;

export const EIGHTEEN_WISHES: WishItem[] = [
  { year: 1, wish: 'May you always find genuine reasons to smile even on cloudy days.' },
  { year: 2, wish: 'May every road you travel bring you unforgettable scenery and peace.' },
  { year: 3, wish: 'May your laughter continue to light up every room you walk into.' },
  { year: 4, wish: 'May you always have an endless supply of hot, perfect biryani.' },
  { year: 5, wish: 'May your heart stay as pure, kind, and fearless as it is today.' },
  { year: 6, wish: 'May you never lose your crazy, playful spark that makes you Ramsha.' },
  { year: 7, wish: 'May you achieve every single secret ambition you dream about at night.' },
  { year: 8, wish: 'May you always be surrounded by people who cherish you like family.' },
  { year: 9, wish: 'May your overthinking turn into brilliant creative breakthroughs.' },
  { year: 10, wish: 'May life give you passport stamps from every country on your wish list.' },
  { year: 11, wish: 'May you always have someone to laugh with when plans go completely wrong.' },
  { year: 12, wish: 'May every single year add more elegance, confidence, and wisdom.' },
  { year: 13, wish: 'May you always know that you have an elder brother/friend who always has your back.' },
  { year: 14, wish: 'May your aesthetic stay forever effortless and unmatched.' },
  { year: 15, wish: 'May all your "kand" turn into the best stories you tell for decades.' },
  { year: 16, wish: 'May you never doubt your worth, your talent, and your bright future.' },
  { year: 17, wish: 'May you always walk through life with your head held high and convictions unshakeable.' },
  { year: 18, wish: 'May Chapter 18 be your most extraordinary, magical, and unforgettable milestone year yet.' },
];
export const SEVENTEEN_WISHES = EIGHTEEN_WISHES;

export const INITIAL_BUCKET_LIST: BucketListItem[] = [
  { id: 'b1', text: 'Explore new places & untrodden roads', completed: true },
  { id: 'b2', text: 'Try new exotic food (and rate it against biryani)', completed: false },
  { id: 'b3', text: 'Make unforgettable core memories with chosen family', completed: true },
  { id: 'b4', text: 'Watch beautiful golden-hour sunsets from rooftop vantage points', completed: false },
  { id: 'b5', text: 'Take random spontaneous road trips with no fixed itinerary', completed: true },
  { id: 'b6', text: 'Laugh until stomach hurts and tears start flowing', completed: true },
  { id: 'b7', text: 'Create more legendary kand to talk about forever', completed: false },
  { id: 'b8', text: 'Make Chapter 18 completely, undeniably unforgettable', completed: false },
];
