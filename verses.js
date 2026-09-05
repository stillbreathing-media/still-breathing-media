const SB_VERSES = [
  { ref: "Jeremiah 29:11", text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.", tags: ["hope","inspiration"] },
  { ref: "Isaiah 41:10", text: "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee.", tags: ["hope","depression","forgotten"] },
  { ref: "Psalm 34:18", text: "The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.", tags: ["depression","grief","forgotten"] },
  { ref: "Philippians 4:13", text: "I can do all things through Christ which strengtheneth me.", tags: ["motivation","inspiration","work"] },
  { ref: "Proverbs 16:3", text: "Commit thy works unto the LORD, and thy thoughts shall be established.", tags: ["work","motivation"] },
  { ref: "Deuteronomy 8:18", text: "But thou shalt remember the LORD thy God: for it is he that giveth thee power to get wealth.", tags: ["wealth","provision"] },
  { ref: "Philippians 4:19", text: "But my God shall supply all your need according to his riches in glory by Christ Jesus.", tags: ["wealth","job","provision"] },
  { ref: "1 Corinthians 13:4-7", text: "Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up... beareth all things, believeth all things, hopeth all things, endureth all things.", tags: ["love"] },
  { ref: "John 15:13", text: "Greater love hath no man than this, that a man lay down his life for his friends.", tags: ["love","sacrifice"] },
  { ref: "Romans 12:1", text: "I beseech you therefore, brethren, by the mercies of God, that ye present your bodies a living sacrifice, holy, acceptable unto God, which is your reasonable service.", tags: ["sacrifice"] },
  { ref: "Isaiah 40:31", text: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary.", tags: ["hope","motivation","3am"] },
  { ref: "Psalm 30:5", text: "Weeping may endure for a night, but joy cometh in the morning.", tags: ["3am","grief","hope"] },
  { ref: "Psalm 121:3-4", text: "He will not suffer thy foot to be moved: he that keepeth thee will not slumber. Behold, he that keepeth Israel shall neither slumber nor sleep.", tags: ["3am","loved"] },
  { ref: "Matthew 11:28", text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.", tags: ["3am","depression","hope"] },
  { ref: "Psalm 147:3", text: "He healeth the broken in heart, and bindeth up their wounds.", tags: ["grief","depression"] },
  { ref: "Hebrews 13:5", text: "I will never leave thee, nor forsake thee.", tags: ["forgotten","loved","3am"] },
  { ref: "Isaiah 43:2", text: "When thou passest through the waters, I will be with thee; and through the rivers, they shall not overflow thee.", tags: ["hope","grief","job"] },
  { ref: "James 1:17", text: "Every good gift and every perfect gift is from above, and cometh down from the Father of lights.", tags: ["wealth","provision","inspiration"] },
  { ref: "Proverbs 3:5-6", text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.", tags: ["job","hope","motivation"] },
  { ref: "1 Peter 5:7", text: "Casting all your care upon him; for he careth for you.", tags: ["depression","forgotten","3am"] },
  { ref: "2 Timothy 1:7", text: "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.", tags: ["deliverance","motivation"] },
  { ref: "James 4:7", text: "Submit yourselves therefore to God. Resist the devil, and he will flee from you.", tags: ["deliverance"] },
  { ref: "Romans 8:38-39", text: "Nor death, nor life... nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord.", tags: ["love","forgotten","hope"] },
  { ref: "Psalm 23:1", text: "The LORD is my shepherd; I shall not want.", tags: ["wealth","provision","hope"] },
  { ref: "Ecclesiastes 3:1", text: "To every thing there is a season, and a time to every purpose under the heaven.", tags: ["hope","inspiration"] },
  { ref: "Joshua 1:9", text: "Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.", tags: ["motivation","job","inspiration"] },
  { ref: "Psalm 46:1", text: "God is our refuge and strength, a very present help in trouble.", tags: ["3am","grief","hope"] },
  { ref: "Lamentations 3:22-23", text: "It is of the LORD's mercies that we are not consumed... they are new every morning: great is thy faithfulness.", tags: ["hope","3am","inspiration"] },
  { ref: "1 Corinthians 16:14", text: "Let all your things be done with charity.", tags: ["love"] },
  { ref: "Galatians 6:9", text: "And let us not be weary in well doing: for in due season we shall reap, if we faint not.", tags: ["work","motivation"] },
];

function sbDayOfYear(d){
  const start = new Date(d.getFullYear(), 0, 0);
  const diff = d - start;
  return Math.floor(diff / 86400000);
}

const SB_THEMES = ["inspiration","motivation","work","wealth","love","sacrifice","hope"];

function sbVerseOfDay(){
  const day = sbDayOfYear(new Date());
  const theme = SB_THEMES[day % SB_THEMES.length];
  const pool = SB_VERSES.filter(v => v.tags.includes(theme));
  const verse = pool[day % pool.length];
  return { verse, theme };
}

function sbVerseForTag(tag, seed){
  const pool = SB_VERSES.filter(v => v.tags.includes(tag));
  if(pool.length === 0) return null;
  return pool[seed % pool.length];
}

async function sbLookupVerse(query){
  const clean = encodeURIComponent(query.trim());
  try{
    const res = await fetch('https://bible-api.com/' + clean + '?translation=kjv');
    if(!res.ok) throw new Error('not found');
    const data = await res.json();
    return { ref: data.reference, text: data.text.trim() };
  } catch(e){
    return null;
  }
}
