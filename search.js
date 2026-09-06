const SB_SEARCH_INDEX = [
  { title: "Home", desc: "Faith. Hope. Healing.", url: "index.html" },
  { title: "About Still Breathing", desc: "Our mission and story", url: "about.html" },
  { title: "Watch our stories", desc: "Cinematic short films", url: "index.html#watch" },
  { title: "Books", desc: "All Still Breathing books", url: "books.html" },
  { title: "The Note In His Pocket", desc: "Free — read the full book", url: "note-in-his-pocket.html" },
  { title: "Breathing Room", desc: "Our upcoming program — testimonies, prayer, hope", url: "breathing-room.html" },
  { title: "Still Breathing: My Story", desc: "True story by Sumeyi Rogers — read Chapter 1 free", url: "still-breathing-my-story.html" },
  { title: "She Stopped Waiting for Permission", desc: "Book — read Chapter 1 free", url: "stopped-waiting-for-permission.html" },
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

function sbInitMenu(){
  const toggle = document.getElementById('menuToggle');
  const panel = document.getElementById('menuPanel');
  if(!toggle || !panel) return;
  toggle.addEventListener('click', function(e){
    e.stopPropagation();
    panel.classList.toggle('open');
  });
  document.addEventListener('click', function(e){
    if(!panel.contains(e.target) && e.target !== toggle && !toggle.contains(e.target)) panel.classList.remove('open');
  });
}
document.addEventListener('DOMContentLoaded', sbInitMenu);

async function sbShare(title, text, url, anchorEl){
  const shareUrl = url || window.location.href;
  sbOpenShareMenu(anchorEl, title, text, shareUrl);
}

function sbCloseShareMenus(){
  document.querySelectorAll('.sb-share-menu').forEach(m => m.remove());
}

function sbOpenShareMenu(anchorEl, title, text, url){
  sbCloseShareMenus();
  const encText = encodeURIComponent(text ? (text + ' — ' + url) : url);
  const encTitle = encodeURIComponent(title || '');
  const menu = document.createElement('div');
  menu.className = 'sb-share-menu';
  menu.style.cssText = 'position:absolute;z-index:200;background:#1D0E08;border:1px solid rgba(242,233,221,0.15);border-radius:6px;padding:8px;min-width:180px;box-shadow:0 8px 24px rgba(0,0,0,0.4);';
  menu.innerHTML = `
    <a href="https://wa.me/?text=${encText}" target="_blank" rel="noopener" style="display:block;padding:10px 12px;color:#F2E9DD;text-decoration:none;font-size:0.9rem;border-radius:4px;">WhatsApp</a>
    <a href="mailto:?subject=${encTitle}&body=${encText}" style="display:block;padding:10px 12px;color:#F2E9DD;text-decoration:none;font-size:0.9rem;border-radius:4px;">Email</a>
    <a href="https://x.com/intent/tweet?text=${encText}" target="_blank" rel="noopener" style="display:block;padding:10px 12px;color:#F2E9DD;text-decoration:none;font-size:0.9rem;border-radius:4px;">X (Twitter)</a>
    <a href="#" data-copy-link="${url}" style="display:block;padding:10px 12px;color:#F2E9DD;text-decoration:none;font-size:0.9rem;border-radius:4px;">Copy Link</a>
  `;
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('mouseenter', () => a.style.background = 'rgba(232,163,61,0.12)');
    a.addEventListener('mouseleave', () => a.style.background = 'transparent');
  });
  const copyLink = menu.querySelector('[data-copy-link]');
  copyLink.addEventListener('click', function(e){
    e.preventDefault();
    const link = this.dataset.copyLink;
    if(navigator.clipboard){
      navigator.clipboard.writeText(link).then(() => { copyLink.textContent = 'Copied!'; setTimeout(sbCloseShareMenus, 800); });
    } else {
      prompt('Copy this link:', link);
    }
  });

  document.body.appendChild(menu);
  const rect = anchorEl.getBoundingClientRect();
  const top = window.scrollY + rect.bottom + 6;
  let left = window.scrollX + rect.left;
  const menuWidth = 190;
  if(left + menuWidth > window.innerWidth - 10) left = window.innerWidth - menuWidth - 10;
  menu.style.top = top + 'px';
  menu.style.left = left + 'px';

  setTimeout(() => {
    document.addEventListener('click', function closeOnClickOutside(e){
      if(!menu.contains(e.target) && e.target !== anchorEl){
        sbCloseShareMenus();
        document.removeEventListener('click', closeOnClickOutside);
      }
    });
  }, 10);
}

document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('[data-share]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      sbShare(
        btn.dataset.shareTitle || document.title,
        btn.dataset.shareText || '',
        btn.dataset.shareUrl || undefined,
        btn
      );
    });
  });
});
