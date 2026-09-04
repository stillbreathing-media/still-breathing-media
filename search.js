const SB_SEARCH_INDEX = [
  { title: "Home", desc: "Faith. Hope. Healing.", url: "index.html" },
  { title: "About Still Breathing", desc: "Our mission and story", url: "about.html" },
  { title: "Watch our stories", desc: "Cinematic short films", url: "index.html#watch" },
  { title: "Books", desc: "All Still Breathing books", url: "books.html" },
  { title: "The Note In His Pocket", desc: "Book — read Chapter 1 free", url: "note-in-his-pocket.html" },
  { title: "She Stopped Waiting for Permission", desc: "Book — coming soon", url: "books.html" },
  { title: "She Raised Him Alone", desc: "Book — coming soon", url: "books.html" },
  { title: "He Came Back With A Wife", desc: "Book — coming soon", url: "books.html" },
  { title: "He Saw The Worst of You", desc: "Book — coming soon", url: "books.html" },
  { title: "Nobody Knew", desc: "Book — coming soon", url: "books.html" },
  { title: "Prayers", desc: "Free prayers for every hour", url: "prayers.html" },
  { title: "The 3:00 AM Prayer", desc: "For sleepless nights", url: "prayers.html#am3" },
  { title: "Prayer for Lost Hope", desc: "When hope feels gone", url: "prayers.html#hope" },
  { title: "Prayer for a Job", desc: "For provision", url: "prayers.html#job" },
  { title: "Prayer for a Loved One", desc: "Covering someone you love", url: "prayers.html#loved" },
  { title: "Prayer for Depression", desc: "For heaviness", url: "prayers.html#depression" },
  { title: "Prayer for Feeling Forgotten", desc: "You are seen", url: "prayers.html#forgotten" },
  { title: "Casting Off the Enemy", desc: "Deliverance prayer", url: "prayers.html#deliverance" },
  { title: "Sanctuary Wall", desc: "Share what you're carrying, anonymously", url: "connect.html#wall" },
  { title: "Support & Membership", desc: "Ways to help this reach further", url: "connect.html#support" },
  { title: "The Still Breathing Journal", desc: "$9 guided journal", url: "connect.html#support" },
  { title: "Privacy Policy", desc: "How we handle your information", url: "privacy.html" },
];

function sbInitSearch(){
  const toggle = document.getElementById('searchToggle');
  const panel = document.getElementById('searchPanel');
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  if(!toggle || !panel || !input || !results) return;

  toggle.addEventListener('click', function(e){
    e.stopPropagation();
    panel.classList.toggle('open');
    if(panel.classList.contains('open')) input.focus();
  });
  document.addEventListener('click', function(e){
    if(!panel.contains(e.target) && e.target !== toggle) panel.classList.remove('open');
  });

  function render(items){
    if(items.length === 0){
      results.innerHTML = '<div class="empty">Nothing found. Try "prayer," "book," or "wall."</div>';
      return;
    }
    results.innerHTML = items.map(i =>
      '<a href="' + i.url + '"><strong>' + i.title + '</strong><br><span style="color:var(--muted);font-size:0.82rem;">' + i.desc + '</span></a>'
    ).join('');
  }

  input.addEventListener('input', function(){
    const q = input.value.trim().toLowerCase();
    if(q.length === 0){ results.innerHTML = ''; return; }
    const matches = SB_SEARCH_INDEX.filter(i =>
      i.title.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q)
    );
    render(matches);
  });
}
document.addEventListener('DOMContentLoaded', sbInitSearch);
