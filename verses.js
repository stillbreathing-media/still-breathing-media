const SB_VERSES = [
  { ref: "Jeremiah 29:11", text: "\"I know the plans I have for you,\" says the Lord. \"Plans for good and not for harm, to give you hope and a future.\"", tags: ["hope","inspiration"] },
  { ref: "Isaiah 41:10", text: "Do not be afraid, for I am with you. Do not be discouraged, for I am your God. I will make you strong. I will help you.", tags: ["hope","depression","forgotten"] },
  { ref: "Psalm 34:18", text: "The Lord is close to those whose hearts are broken. He saves those whose spirits are crushed.", tags: ["depression","grief","forgotten"] },
  { ref: "Philippians 4:13", text: "I can do all things through Christ, who gives me strength.", tags: ["motivation","inspiration","work"] },
  { ref: "Proverbs 16:3", text: "Give the Lord your plans, and they will succeed.", tags: ["work","motivation"] },
  { ref: "Deuteronomy 8:18", text: "Remember the Lord your God. He is the one who gives you the power to earn what you have.", tags: ["wealth","provision"] },
  { ref: "Philippians 4:19", text: "My God will meet every need you have, from His great riches in Christ Jesus.", tags: ["wealth","job","provision"] },
  { ref: "1 Corinthians 13:4-7", text: "Love is patient and kind. It does not envy or boast. It is not proud... it protects, it trusts, it hopes, it never gives up.", tags: ["love"] },
  { ref: "John 15:13", text: "There is no greater love than this — to lay down your life for your friends.", tags: ["love","sacrifice"] },
  { ref: "Romans 12:1", text: "Give your whole self to God as a living offering — holy and pleasing to Him. That is true worship.", tags: ["sacrifice"] },
  { ref: "Isaiah 40:31", text: "Those who trust in the Lord will find new strength. They will fly like eagles. They will run and not grow tired.", tags: ["hope","motivation","3am"] },
  { ref: "Psalm 30:5", text: "Weeping may stay for the night, but joy comes in the morning.", tags: ["3am","grief","hope"] },
  { ref: "Psalm 121:3-4", text: "He will not let you fall. He who watches over you never sleeps.", tags: ["3am","loved"] },
  { ref: "Matthew 11:28", text: "Come to me, all of you who are tired and carrying heavy loads, and I will give you rest.", tags: ["3am","depression","hope"] },
  { ref: "Psalm 147:3", text: "He heals the brokenhearted and bandages their wounds.", tags: ["grief","depression"] },
  { ref: "Hebrews 13:5", text: "I will never leave you. I will never give up on you.", tags: ["forgotten","loved","3am"] },
  { ref: "Isaiah 43:2", text: "When you pass through deep water, I will be with you. Rivers of trouble will not sweep you away.", tags: ["hope","grief","job"] },
  { ref: "James 1:17", text: "Every good gift comes from above, from the Father of lights.", tags: ["wealth","provision","inspiration"] },
  { ref: "Proverbs 3:5-6", text: "Trust the Lord with your whole heart. Do not lean only on your own understanding. Let Him guide your path.", tags: ["job","hope","motivation"] },
  { ref: "1 Peter 5:7", text: "Give all your worries to Him, because He cares for you.", tags: ["depression","forgotten","3am"] },
  { ref: "2 Timothy 1:7", text: "God did not give us a spirit of fear, but of power, love, and a sound mind.", tags: ["deliverance","motivation"] },
  { ref: "James 4:7", text: "Give yourself to God. Stand against the devil, and he will run from you.", tags: ["deliverance"] },
  { ref: "Romans 8:38-39", text: "Nothing — not death, not life, nothing else in all creation — can separate us from the love of God in Christ Jesus our Lord.", tags: ["love","forgotten","hope"] },
  { ref: "Psalm 23:1", text: "The Lord is my shepherd. I will have everything I need.", tags: ["wealth","provision","hope"] },
  { ref: "Ecclesiastes 3:1", text: "There is a time for everything, a right time for every purpose under heaven.", tags: ["hope","inspiration"] },
  { ref: "Joshua 1:9", text: "Be strong and brave. Do not be afraid or lose hope, for the Lord your God is with you everywhere you go.", tags: ["motivation","job","inspiration"] },
  { ref: "Psalm 46:1", text: "God is our safe place and our strength, always ready to help in hard times.", tags: ["3am","grief","hope"] },
  { ref: "Lamentations 3:22-23", text: "God's love never ends. His mercy never runs out. It is new every single morning. He is always faithful.", tags: ["hope","3am","inspiration"] },
  { ref: "1 Corinthians 16:14", text: "Let everything you do be done in love.", tags: ["love"] },
  { ref: "Galatians 6:9", text: "Let us not get tired of doing good. In time, if we do not give up, we will have a harvest.", tags: ["work","motivation"] },
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
    const res = await fetch('https://bible-api.com/' + clean + '?translation=bbe');
    if(!res.ok) throw new Error('not found');
    const data = await res.json();
    return { ref: data.reference, text: data.text.trim() };
  } catch(e){
    return null;
  }
}
