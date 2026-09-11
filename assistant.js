(function(){
  const KB = [
    { q: ["what is still breathing","about this site","what is this site","your mission","what do you do"],
      a: "Still Breathing Media makes films, books, and free prayers for anyone who feels lost, forgotten, or out of hope. If you're still breathing, your story isn't over — that's the whole idea. Read more on our About page." },
    { q: ["how do i pray","how to pray","teach me to pray"],
      a: "There's no perfect way — God isn't grading your grammar. Start with what's actually true: say what you're feeling, ask for what you need, and say thank you for something, even something small. Our Prayers page has ones you can read as a starting point." },
    { q: ["submit a prayer","sanctuary wall","share my prayer","prayer request"],
      a: "Head to the Connect page and find the Sanctuary Wall — you can share anonymously, and it's read and prayed over." },
    { q: ["buy a book","books","read a book","how much are the books"],
      a: "Check the Books page — some are free to read in full right now, others are $5 and being added one at a time. Chapter One is always free to preview." },
    { q: ["breathing room","what is the breathing room"],
      a: "The Breathing Room is our upcoming program — real testimonies, prayer, and hope, growing toward radio and TV. It's still forming. Check the Breathing Room page for where things stand." },
    { q: ["verse of the day","daily verse","bible verse"],
      a: "The homepage and Verses page both show a new verse every day, plus a place to look up any verse by name, and Bible stories you can pick from." },
    { q: ["donate","give","support you","how can i help","fund"],
      a: "Every gift funds getting the next story or prayer in front of someone who needs it. Check the Connect page for Mobile Money, bank transfer, and the guided journal." },
    { q: ["contact","whatsapp","reach you","talk to someone"],
      a: "Join our WhatsApp Channel from the homepage, or reach out directly — the number is on the memoir page. We read what comes in." },
    { q: ["why did god let this happen","why is god silent","why do bad things happen"],
      a: "That's one of the oldest, most honest questions there is, and we won't pretend to have a tidy answer. What we believe is that silence isn't the same as absence — read \"But Heaven Felt Silent\" on our Books page, or the prayer for lost hope. You're not wrong to ask." },
    { q: ["is this free","cost money","do i have to pay"],
      a: "Prayers, Bible stories, bedtime stories, and at least one full book are completely free. Some books cost $5 to support the mission — always clearly marked." },
    { q: ["who runs this","who made this","who are you"],
      a: "Still Breathing Media was built by Sumeyi Rogers, whose own story of survival is one of the books on this site — read it on the Books page." },
    { q: ["feeling hopeless","i feel lost","i feel alone","no one cares"],
      a: "I'm glad you said that out loud, even here. You're not the only one who feels this way tonight. Read the prayer \"For Lost Hope\" on our Prayers page, or share what you're carrying on the Sanctuary Wall — it's read, and it's prayed over." },
  ];

  const CRISIS_WORDS = ["kill myself","suicide","end my life","want to die","hurt myself","self harm","self-harm","no reason to live"];

  const CRISIS_RESPONSE = "I'm really glad you're telling me this, and I want to be straight with you: what you're feeling matters, and you shouldn't carry it alone right now. Please reach out to a crisis line or someone you trust immediately — in Uganda, you can contact Mental Health Uganda or a local emergency service, or reach out to someone near you right now. You can also message us on WhatsApp from the homepage. Please don't wait on that.";

  function findAnswer(text){
    const lower = text.toLowerCase();
    for(const word of CRISIS_WORDS){
      if(lower.includes(word)) return CRISIS_RESPONSE;
    }
    let best = null, bestScore = 0;
    for(const entry of KB){
      for(const phrase of entry.q){
        if(lower.includes(phrase)){ return entry.a; }
        const words = phrase.split(' ');
        const score = words.filter(w => lower.includes(w)).length;
        if(score > bestScore){ bestScore = score; best = entry.a; }
      }
    }
    if(best && bestScore >= 2) return best;
    return "I don't have a ready answer for that yet — try our Prayers, Verses, or Books pages, or message us directly on WhatsApp from the homepage. A real person will see it.";
  }

  function buildWidget(){
    const bubble = document.createElement('button');
    bubble.id = 'sbAssistantBubble';
    bubble.setAttribute('aria-label', 'Ask a question');
    bubble.style.cssText = 'position:fixed;bottom:20px;right:20px;width:56px;height:56px;border-radius:50%;background:#E8A33D;color:#14100D;border:none;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,0.4);z-index:500;display:flex;align-items:center;justify-content:center;';
    bubble.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.4 8.4 0 0 1-8.9 8.4A8.7 8.7 0 0 1 8 19l-4 1 1-3.6a8.4 8.4 0 0 1-1-4A8.4 8.4 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5Z"/></svg>';

    const panel = document.createElement('div');
    panel.id = 'sbAssistantPanel';
    panel.style.cssText = 'position:fixed;bottom:86px;right:20px;width:320px;max-width:calc(100vw - 40px);height:420px;max-height:60vh;background:#1D0E08;border:1px solid rgba(242,233,221,0.15);border-radius:10px;z-index:500;display:none;flex-direction:column;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.5);font-family:"Work Sans",sans-serif;';
    panel.innerHTML = `
      <div style="background:#2B140A;padding:14px 16px;border-bottom:1px solid rgba(242,233,221,0.1);display:flex;justify-content:space-between;align-items:center;">
        <div style="color:#F2E9DD;font-family:'Lora',serif;font-size:0.95rem;">Ask Still Breathing</div>
        <button id="sbAssistantClose" style="background:none;border:none;color:#A89A8C;cursor:pointer;font-size:1.1rem;">&times;</button>
      </div>
      <div id="sbAssistantMsgs" style="flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;"></div>
      <div style="padding:10px;border-top:1px solid rgba(242,233,221,0.1);display:flex;gap:8px;">
        <input id="sbAssistantInput" type="text" placeholder="Ask about prayers, books, faith..." style="flex:1;background:rgba(242,233,221,0.05);border:1px solid rgba(242,233,221,0.15);color:#F2E9DD;padding:9px 12px;border-radius:6px;font-size:0.85rem;">
        <button id="sbAssistantSend" style="background:#E8A33D;color:#14100D;border:none;padding:9px 14px;border-radius:6px;cursor:pointer;font-size:0.85rem;font-weight:600;">Send</button>
      </div>
    `;

    document.body.appendChild(bubble);
    document.body.appendChild(panel);

    function addMsg(text, fromUser){
      const msgs = document.getElementById('sbAssistantMsgs');
      const row = document.createElement('div');
      row.style.cssText = 'max-width:85%;padding:9px 12px;border-radius:8px;font-size:0.87rem;line-height:1.5;' +
        (fromUser ? 'align-self:flex-end;background:#E8A33D;color:#14100D;' : 'align-self:flex-start;background:rgba(242,233,221,0.06);color:#EDE3D3;');
      row.textContent = text;
      msgs.appendChild(row);
      msgs.scrollTop = msgs.scrollHeight;
    }

    let greeted = false;
    bubble.addEventListener('click', () => {
      const open = panel.style.display === 'flex';
      panel.style.display = open ? 'none' : 'flex';
      if(!open && !greeted){
        addMsg("Hi — ask me about prayers, our books, the mission, or just about life and faith. I'll do my best.", false);
        greeted = true;
      }
    });
    document.getElementById('sbAssistantClose').addEventListener('click', () => { panel.style.display = 'none'; });

    function send(){
      const input = document.getElementById('sbAssistantInput');
      const text = input.value.trim();
      if(!text) return;
      addMsg(text, true);
      input.value = '';
      setTimeout(() => addMsg(findAnswer(text), false), 300);
    }
    document.getElementById('sbAssistantSend').addEventListener('click', send);
    document.getElementById('sbAssistantInput').addEventListener('keydown', e => { if(e.key === 'Enter') send(); });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', buildWidget);
  } else {
    buildWidget();
  }
})();
