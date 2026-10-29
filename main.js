// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 50 ? 'rgba(8,11,20,0.98)' : 'rgba(8,11,20,0.8)';
});

// ===== ACTIVE NAV LINK + SECTION IN-VIEW CLASS =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + entry.target.id ? 'var(--accent2)' : '';
      });
      entry.target.classList.add('in-view');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' }).observe && sections.forEach(s =>
  new IntersectionObserver((e) => e.forEach(en => { if(en.isIntersecting) { navLinks.forEach(l => { l.style.color = l.getAttribute('href')==='#'+en.target.id?'var(--accent2)':''; }); en.target.classList.add('in-view'); } }), { rootMargin:'-40% 0px -55% 0px' }).observe(s)
);

// ===== MULTI-ROLE TYPING ANIMATION =====
(function() {
  var el = document.getElementById('typingText');
  if (!el) return;
  var roles = ['Software Engineer','DevOps Engineer','AWS Cloud Architect','Test Automation Engineer','CI/CD Pipeline Builder'];
  var ri = 0, ci = 0, del = false;
  function tick() {
    var cur = roles[ri];
    if (!del) { el.textContent = cur.slice(0, ci+1); ci++; if (ci===cur.length) { del=true; setTimeout(tick,2000); return; } }
    else { el.textContent = cur.slice(0, ci-1); ci--; if (ci===0) { del=false; ri=(ri+1)%roles.length; } }
    setTimeout(tick, del ? 45 : 80);
  }
  tick();
})();

// ===== COUNTER ANIMATION =====
(function() {
  var counters = document.querySelectorAll('.counter');
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (!e.isIntersecting) return;
      var el = e.target, target = parseInt(el.dataset.target,10), cur = 0;
      var step = Math.max(1, Math.ceil(target/40));
      var t = setInterval(function() {
        cur += step;
        if (cur >= target) { el.textContent = target+'+'; clearInterval(t); }
        else { el.textContent = cur+'+'; }
      }, 35);
      obs.unobserve(el);
    });
  }, {threshold:0.5});
  counters.forEach(function(c) { obs.observe(c); });
})();

// ===== SCROLL REVEAL =====
(function() {
  var els = document.querySelectorAll('.timeline-card,.project-card,.skill-group,.cert-card,.contact-link-card,.publication-card');
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e,i) {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = (i%4)*0.08+'s';
        e.target.style.opacity='1';
        e.target.style.transform='translateY(0)';
      }
    });
  }, {threshold:0.08});
  els.forEach(function(el) {
    el.style.opacity='0'; el.style.transform='translateY(32px)';
    el.style.transition='opacity 0.65s ease,transform 0.65s cubic-bezier(0.4,0,0.2,1)';
    obs.observe(el);
  });
})();

// ===== CONTACT FORM =====
(function() {
  var form = document.getElementById('contactForm');
  var btn  = document.getElementById('submitBtn');
  if (!form||!btn) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault(); btn.textContent='Sending... ⏳'; btn.disabled=true;
    fetch("https://formsubmit.co/ajax/tusharika0829@gmail.com",{
      method:"POST",
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify({name:document.getElementById('name').value,email:document.getElementById('email').value,message:document.getElementById('message').value})
    }).then(function(r){
      if(r.ok){btn.textContent='✅ Message Sent!';btn.style.background='linear-gradient(135deg,#22c55e,#16a34a)';form.reset();}
      else throw new Error();
    }).catch(function(){
      btn.textContent='❌ Failed';btn.style.background='linear-gradient(135deg,#ef4444,#dc2626)';
    }).finally(function(){
      setTimeout(function(){btn.textContent='Send Message ✉️';btn.disabled=false;btn.style.background='';},3000);
    });
  });
})();

// ===== NEON CURSOR GLOW =====
var _glow = document.createElement('div');
_glow.style.cssText='position:fixed;pointer-events:none;z-index:9999;width:340px;height:340px;border-radius:50%;background:radial-gradient(circle,rgba(108,99,255,0.07),transparent 70%);transform:translate(-50%,-50%);transition:left 0.12s,top 0.12s;';
document.body.appendChild(_glow);
document.addEventListener('mousemove',function(e){_glow.style.left=e.clientX+'px';_glow.style.top=e.clientY+'px';});

// ===== 3D HERO PARTICLE NETWORK CANVAS =====
(function() {
  var cv=document.getElementById('heroCanvas'); if(!cv) return;
  var ctx=cv.getContext('2d'),W,H,pts=[];
  var C=['#6c63ff','#22d3ee','#ec4899','#a78bfa','#34d399'];
  function rsz(){W=cv.width=cv.offsetWidth;H=cv.height=cv.offsetHeight;}
  rsz(); window.addEventListener('resize',rsz);
  function Pt(){
    var self=this;
    self.reset=function(){
      self.x=Math.random()*W; self.y=Math.random()*H;
      self.z=Math.random()*400+100;
      self.vx=(Math.random()-.5)*.4; self.vy=(Math.random()-.5)*.4;
      self.r=(Math.random()*1.5+.5)*(400/self.z);
      self.col=C[Math.floor(Math.random()*C.length)];
      self.al=Math.random()*.5+.2; self.lf=0; self.ml=200+Math.random()*200;
    };
    self.reset();
    self.u=function(){self.x+=self.vx;self.y+=self.vy;self.lf++;if(self.lf>self.ml||self.x<0||self.x>W||self.y<0||self.y>H)self.reset();};
    self.d=function(){
      var fd=self.lf<30?self.lf/30:self.lf>self.ml-30?(self.ml-self.lf)/30:1;
      ctx.beginPath();ctx.arc(self.x,self.y,self.r,0,Math.PI*2);
      ctx.fillStyle=self.col+Math.round(fd*self.al*255).toString(16).padStart(2,'0');ctx.fill();
    };
  }
  for(var i=0;i<90;i++) pts.push(new Pt());
  function lines(){
    for(var a=0;a<pts.length;a++) for(var b=a+1;b<pts.length;b++){
      var dx=pts[a].x-pts[b].x,dy=pts[a].y-pts[b].y,d=Math.sqrt(dx*dx+dy*dy);
      if(d<130){ctx.strokeStyle='rgba(108,99,255,'+((1-d/130)*.12)+')';ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(pts[a].x,pts[a].y);ctx.lineTo(pts[b].x,pts[b].y);ctx.stroke();}
    }
  }
  function hl(){ctx.clearRect(0,0,W,H);lines();pts.forEach(function(p){p.u();p.d();});requestAnimationFrame(hl);}
  hl();
})();

// ===== GLOBAL 3D TECH STACK LOGO RAIN CANVAS =====
(function() {
  var cv = document.getElementById('globalTechRainCanvas');
  if (!cv) return;
  var ctx = cv.getContext('2d');
  var W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  var mouse = { x: -9999, y: -9999 };

  var TECHS = [
    {
      name: 'Docker',
      color: '#2496ED',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22"><path fill="#2496ED" d="M13.98 11.08h2.12c.1 0 .19-.08.19-.19V9.01c0-.1-.09-.19-.19-.19h-2.12c-.1 0-.18.09-.18.19v1.88c0 .1.08.19.18.19m-2.95-5.43h2.12c.1 0 .18-.08.18-.18V3.58c0-.1-.08-.19-.18-.19h-2.12c-.1 0-.19.09-.19.19v1.89c0 .1.09.18.19.18m0 2.71h2.12c.1 0 .18-.08.18-.18V6.29c0-.1-.08-.18-.18-.18h-2.12c-.1 0-.19.08-.19.18v1.89c0 .1.09.18.19.18m-2.93 0h2.12c.1 0 .18-.08.18-.18V6.29c0-.1-.08-.18-.18-.18H8.1c-.1 0-.18.08-.18.18v1.89c0 .1.08.18.18.18m-2.97 0h2.12c.1 0 .19-.08.19-.18V6.29c0-.1-.09-.18-.19-.18H5.14c-.1 0-.19.08-.19.18v1.89c0 .1.09.18.19.18m5.9 2.72h2.11c.11 0 .19-.09.19-.19V9.01c0-.1-.08-.19-.19-.19h-2.11c-.11 0-.19.09-.19.19v1.88c0 .1.08.19.19.19m-2.93 0h2.12c.1 0 .18-.09.18-.19V9.01c0-.1-.08-.19-.18-.19H8.1c-.1 0-.18.09-.18.19v1.88c0 .1.08.19.18.19m-2.97 0h2.12c.1 0 .19-.09.19-.19V9.01c0-.1-.09-.19-.19-.19H5.14c-.1 0-.19.09-.19.19v1.88c0 .1.09.19.19.19m-2.93 0h2.12c.1 0 .18-.09.18-.19V9.01c0-.1-.08-.19-.18-.19H2.21c-.1 0-.19.09-.19.19v1.88c0 .1.09.19.19.19m21.75 1.54c-.49-.37-1.62-.54-2.61-.34-.23-.75-.73-1.4-1.39-1.85l-.49-.34-.34.48c-.52.74-.76 1.62-.72 2.51-.34.09-1.16.34-1.65.42-.54.09-4.47.14-5.69.15a.26.26 0 01-.26-.26V4.31a.26.26 0 00-.26-.26H5.22a.26.26 0 00-.26.26v7.05c-1.35.11-2.48.53-3.24 1.15-.94.76-1.47 1.83-1.49 3.03-.05 1.88 1.19 3.65 3.48 4.98 2.4 1.38 5.87 2.15 9.78 2.15 3.32 0 6.37-.56 8.58-1.57 2.14-.98 3.52-2.4 3.9-4 .43-1.78-.04-3.8-2-5.27"/></svg>'
    },
    {
      name: 'AWS Cloud',
      color: '#FF9900',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22"><path fill="#FF9900" d="M6.76 10.03c0 .22.12.43.34.43.14 0 .28-.05.42-.14 1.48-1.01 3.42-1.57 5.49-1.57s4 .56 5.49 1.57c.14.08.28.14.42.14.22 0 .33-.22.33-.43 0-.14-.08-.28-.19-.37-1.65-1.14-3.78-1.79-6.05-1.79s-4.4.65-6.05 1.79a.56.56 0 00-.2.37zm15.15 6.13c-.31-.42-1.39-.19-1.95-.08-.2.03-.22-.14-.05-.26 1.09-.78 2.88-.56 3.19-.16.31.39-.2 2.21-1.23 3.08-.17.14-.31.05-.23-.12.26-.47.58-2.04.27-2.46zm-19.82.11c.17.14.36.23.56.23.28 0 .53-.14.67-.4 1.37-2.38 3.95-3.89 6.72-3.89 2.77 0 5.35 1.51 6.72 3.89.14.26.39.4.67.4.2 0 .4-.09.56-.23.37-.31.42-.84.12-1.2-1.66-2.86-4.74-4.68-8.07-4.68-3.33 0-6.41 1.82-8.06 4.68-.31.36-.26.89.11 1.2z"/></svg>'
    },
    {
      name: 'Kubernetes',
      color: '#326CE5',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22"><path fill="#326CE5" d="M12 0l-9.82 5.67v11.34L12 22.68l9.82-5.67V5.67L12 0zm0 2.22l8.03 4.64v9.28L12 20.78 3.97 16.14V6.86L12 2.22zm-.9 3.5v3.13l-2.7-1.56-1.07 1.85 2.7 1.56-2.7 1.56 1.07 1.85 2.7-1.56v3.13h2.14v-3.13l2.7 1.56 1.07-1.85-2.7-1.56 2.7-1.56-1.07-1.85-2.7 1.56V5.72H11.1z"/></svg>'
    },
    {
      name: 'Python',
      color: '#3776AB',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22"><path fill="#3776AB" d="M11.91 0C5.8 0 6.16 2.66 6.16 2.66l.01 2.75h5.83v.83H3.84S0 5.8 0 11.95c0 6.16 3.4 5.95 3.4 5.95h2.03v-2.85s-.11-3.4 3.34-3.4h5.75v-.86H8.76s-2.9-.03-2.9-2.84c0-2.81 2.52-2.72 2.52-2.72h8.06s2.72.07 2.72-2.61c0-2.69-2.37-2.62-2.37-2.62h-4.88V0zm-1.74 1.71a.86.86 0 110 1.71.86.86 0 010-1.71z"/><path fill="#FFD43B" d="M12.09 24c6.11 0 5.75-2.66 5.75-2.66l-.01-2.75h-5.83v-.83h8.16S24 18.2 24 12.05c0-6.16-3.4-5.95-3.4-5.95h-2.03v2.85s.11 3.4-3.34 3.4H9.48v.86h5.76s2.9.03 2.9 2.84c0 2.81-2.52 2.72-2.52 2.72H7.56s-2.72-.07-2.72 2.61c0 2.69 2.37 2.62 2.37 2.62h4.88V24zm1.74-1.71a.86.86 0 110-1.71.86.86 0 010 1.71z"/></svg>'
    },
    {
      name: 'Linux',
      color: '#FCC624',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22"><path fill="#FCC624" d="M12 2C9.5 2 7.5 4 7.5 6.5c0 1.2.5 2.3 1.3 3-.3.8-.8 2-1 3.5-.4 2.5-.2 4.5.7 5.8-1 .4-2 1.2-2 2.2 0 1.7 3.5 1.5 5.5 1 2 .5 5.5.7 5.5-1 0-1-1-1.8-2-2.2.9-1.3 1.1-3.3.7-5.8-.2-1.5-.7-2.7-1-3.5.8-.7 1.3-1.8 1.3-3C16.5 4 14.5 2 12 2zm-1.5 4a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zm-1.5 2.5c.8 0 1.5.3 1.5.7 0 .5-.7 1-1.5 1s-1.5-.5-1.5-1c0-.4.7-.7 1.5-.7z"/></svg>'
    },
    {
      name: 'Terraform',
      color: '#844FBA',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22"><path fill="#844FBA" d="M1.44 0v7.58l6.56 3.79V3.79L1.44 0zm7.64 4.41v7.57l6.57 3.79V8.2L9.08 4.41zm7.65 4.41v7.58l6.56 3.79V12.6l-6.56-3.79zM1.44 8.72v7.57l6.56 3.79V12.5L1.44 8.72z"/></svg>'
    },
    {
      name: 'GitHub Actions',
      color: '#22D3EE',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22"><path fill="#E6EDF3" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.43 9.8 8.2 11.39.6.1.83-.26.83-.57 0-.29-.02-1.23-.02-2.24-3.01.56-3.8-.73-4.03-1.41-.14-.34-.72-1.41-1.23-1.7-.42-.22-1.02-.78-.02-.79.95-.02 1.62.87 1.85 1.23 1.08 1.81 2.8 1.3 3.5.99.1-.78.42-1.3.76-1.6-2.67-.3-5.46-1.34-5.46-5.93 0-1.3.46-2.38 1.23-3.22-.12-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.41 3-.41s2.04.14 3 .41c2.3-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.23 0 4.6-2.81 5.62-5.48 5.92.44.38.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.3 0 .32.22.7.83.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>'
    },
    {
      name: 'Git',
      color: '#F05032',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22"><path fill="#F05032" d="M23.55 10.93L13.07.45a1.5 1.5 0 00-2.13 0L8.7 2.7l3.2 3.2a1.78 1.78 0 012.28 2.3l3.07 3.07a1.78 1.78 0 012.34 2.28l3.96-3.96a1.5 1.5 0 000-2.13l-.001-.001zm-5.41 6.26a1.78 1.78 0 01-2.27-2.34l-3.08-3.08a1.78 1.78 0 01-1.39.45l-3.21 3.21a1.78 1.78 0 01.45 1.39c0 .98-.8 1.78-1.78 1.78s-1.78-.8-1.78-1.78.8-1.78 1.78-1.78c.49 0 .94.2 1.26.52l3.17-3.17a1.78 1.78 0 01-.45-1.39c0-.49.2-.93.52-1.26L8.68 4.67l-8.23 8.23a1.5 1.5 0 000 2.13l10.48 10.48a1.5 1.5 0 002.13 0l10.47-10.48z"/></svg>'
    },
    {
      name: 'Jenkins',
      color: '#D33833',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22"><path fill="#D33833" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3.2c1.6 0 2.9 1.3 2.9 2.9s-1.3 2.9-2.9 2.9-2.9-1.3-2.9-2.9 1.3-2.9 2.9-2.9zm-3 7.8h6c1.1 0 2 .9 2 2v2.5H7V15c0-1.1.9-2 2-2z"/></svg>'
    },
    {
      name: 'PostgreSQL',
      color: '#4169E1',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22"><path fill="#4169E1" d="M12.02 1.48c-3.1 0-5.78 1.47-7.23 3.73-.59.92-.98 1.99-1.12 3.12-.13 1.04.02 2.13.43 3.15.54 1.34 1.47 2.47 2.66 3.25-.09.67-.06 1.36.08 2.03.22 1.05.75 2.01 1.5 2.76 1.28 1.28 3.03 2.02 4.88 2.02 1.68 0 3.29-.62 4.54-1.72 1.15-1.01 1.88-2.39 2.07-3.9.59-.44 1.12-.96 1.58-1.55 1.14-1.47 1.73-3.28 1.67-5.11-.08-2.34-1.14-4.51-2.92-5.97-2.09-1.72-4.88-2.58-7.7-2.58l-.44.77z"/></svg>'
    },
    {
      name: 'Selenium',
      color: '#43B02A',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22"><rect width="22" height="22" x="1" y="1" rx="4" fill="#43B02A"/><text x="12" y="16" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="#FFF" text-anchor="middle">Se</text></svg>'
    },
    {
      name: 'PyTest',
      color: '#0A9EDC',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22"><path fill="#0A9EDC" d="M9.5 2h5v3h-5zm-1 4h7l5.5 12a3 3 0 01-2.7 4H5.7a3 3 0 01-2.7-4z"/><circle cx="10" cy="16" r="1.5" fill="#fff"/><circle cx="14" cy="14" r="1" fill="#fff"/></svg>'
    },
    {
      name: 'LangChain',
      color: '#34D399',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22"><path fill="#34D399" d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.93V17a1 1 0 11-2 0v-.07A7 7 0 015.07 13H5a1 1 0 110-2h.07A7 7 0 0111 5.07V5a1 1 0 112 0v.07A7 7 0 0118.93 11H19a1 1 0 110 2h-.07A7 7 0 0113 16.93zM12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>'
    },
    {
      name: 'CI/CD Pipelines',
      color: '#EC4899',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22"><path fill="#EC4899" d="M4 6h16v2H4zm0 5h10v2H4zm0 5h16v2H4zm14-4l4 3-4 3v-6z"/></svg>'
    },
    {
      name: 'n8n Workflows',
      color: '#EA4B71',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22"><path fill="#EA4B71" d="M18 3a3 3 0 00-2.83 2H8.83A3 3 0 106 8.83V15.17A3 3 0 108.83 18h6.34A3 3 0 1018 15.17V8.83A3 3 0 0018 3zm-12 3a1 1 0 110 2 1 1 0 010-2zm0 12a1 1 0 110-2 1 1 0 010 2zm12 0a1 1 0 110-2 1 1 0 010 2zm0-10a1 1 0 110-2 1 1 0 010 2z"/></svg>'
    },
    {
      name: 'Bash Shell',
      color: '#38BDF8',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22"><rect width="22" height="18" x="1" y="3" rx="3" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/><path fill="none" stroke="#22d3ee" stroke-width="2" stroke-linecap="round" d="M5 8l4 3-4 3m6 0h4"/></svg>'
    },
    {
      name: 'Node.js',
      color: '#5FA04E',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22"><path fill="#5FA04E" d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm0 2.3l8.4 4.85v9.7L12 21.7 3.6 16.85v-9.7L12 2.3z"/></svg>'
    }
  ];

  function drawRoundRect(c, x, y, w, h, r) {
    c.beginPath();
    c.moveTo(x + r, y);
    c.lineTo(x + w - r, y);
    c.quadraticCurveTo(x + w, y, x + w, y + r);
    c.lineTo(x + w, y + h - r);
    c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    c.lineTo(x + r, y + h);
    c.quadraticCurveTo(x, y + h, x, y + h - r);
    c.lineTo(x, y + r);
    c.quadraticCurveTo(x, y, x + r, y);
    c.closePath();
  }

  // Pre-render badge canvases
  TECHS.forEach(function(item) {
    var img = new Image();
    img.onload = function() {
      var off = document.createElement('canvas');
      var oc = off.getContext('2d');
      oc.font = '600 13px "JetBrains Mono", monospace';
      var textW = oc.measureText(item.name).width;
      var pad = 12, iconSize = 20, gap = 8;
      var w = pad * 2 + iconSize + gap + textW;
      var h = 36;
      off.width = w * 2;
      off.height = h * 2;
      oc.scale(2, 2);

      // Pill Glassmorphic Body
      drawRoundRect(oc, 1.5, 1.5, w - 3, h - 3, 18);
      oc.fillStyle = 'rgba(11, 16, 30, 0.88)';
      oc.fill();

      // Glowing Accent Border
      oc.lineWidth = 1.3;
      oc.strokeStyle = item.color + 'aa';
      oc.stroke();

      // SVG Icon
      try {
        oc.drawImage(img, pad, (h - iconSize) / 2, iconSize, iconSize);
      } catch (err) {}

      // Readable High-Contrast Tech Name
      oc.font = '600 13px "JetBrains Mono", monospace';
      oc.fillStyle = '#ffffff';
      oc.textBaseline = 'middle';
      oc.fillText(item.name, pad + iconSize + gap, h / 2 + 0.5);

      item.badge = off;
      item.bw = w;
      item.bh = h;
    };
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(item.svg);
  });

  function rsz() {
    W = window.innerWidth;
    H = window.innerHeight;
    cv.width = W * dpr;
    cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  rsz();
  window.addEventListener('resize', rsz);
  window.addEventListener('mousemove', function(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // Drops creation - distributed columns for perfect spacing
  var drops = [];
  function createDrops() {
    drops = [];
    var colWidth = 140;
    var numCols = Math.max(8, Math.floor(W / colWidth));
    for (var c = 0; c < numCols; c++) {
      var countInCol = Math.random() < 0.6 ? 2 : 1;
      for (var k = 0; k < countInCol; k++) {
        var tech = TECHS[Math.floor(Math.random() * TECHS.length)];
        drops.push({
          col: c,
          baseX: (c + 0.5) * (W / numCols),
          y: Math.random() * (H + 200) - 100,
          // SLOW & READABLE SPEED: ~0.35 to 0.65 px/frame
          speed: 0.35 + Math.random() * 0.35,
          scale: 0.85 + Math.random() * 0.25,
          alpha: 0.55 + Math.random() * 0.35,
          swayAmp: 10 + Math.random() * 15,
          swaySpeed: 0.0008 + Math.random() * 0.0008,
          phase: Math.random() * Math.PI * 2,
          tech: tech
        });
      }
    }
  }
  createDrops();

  var time = 0;
  function renderRain() {
    ctx.clearRect(0, 0, W, H);
    time++;

    for (var i = 0; i < drops.length; i++) {
      var d = drops[i];
      d.y += d.speed;

      // Wrap around when falling past bottom of screen
      if (d.y > H + 60) {
        d.y = -60 - Math.random() * 60;
        d.tech = TECHS[Math.floor(Math.random() * TECHS.length)];
        d.speed = 0.35 + Math.random() * 0.35;
      }

      var sway = Math.sin(time * d.swaySpeed + d.phase) * d.swayAmp;
      var curX = d.baseX + sway;
      var curY = d.y;

      // Mouse gentle hover reaction
      var mdx = curX - mouse.x;
      var mdy = curY - mouse.y;
      var mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      var hoverBoost = 0;
      if (mdist < 100) {
        hoverBoost = (1 - mdist / 100) * 0.45;
        curX += (mdx / mdist) * 10 * hoverBoost;
        curY += (mdy / mdist) * 10 * hoverBoost;
      }

      ctx.save();
      ctx.globalAlpha = Math.min(1, d.alpha + hoverBoost);

      if (d.tech && d.tech.badge) {
        var bw = d.tech.bw * d.scale;
        var bh = d.tech.bh * d.scale;
        ctx.drawImage(d.tech.badge, curX - bw / 2, curY - bh / 2, bw, bh);
      } else {
        // Fallback text while SVG badge finishes rendering
        ctx.font = '600 ' + Math.round(13 * d.scale) + 'px "JetBrains Mono", monospace';
        ctx.fillStyle = d.tech.color;
        ctx.fillText(d.tech.name, curX, curY);
      }
      ctx.restore();
    }

    requestAnimationFrame(renderRain);
  }
  renderRain();
})();

// ===== PROJECT CARD 3D TILT & SPOTLIGHT =====
document.querySelectorAll('.project-card').forEach(function(card) {
  card.addEventListener('mousemove',function(e){
    var r=card.getBoundingClientRect();
    card.style.setProperty('--mx',((e.clientX-r.left)/r.width*100).toFixed(1)+'%');
    card.style.setProperty('--my',((e.clientY-r.top)/r.height*100).toFixed(1)+'%');
    var dx=(e.clientX-r.left-r.width/2)/r.width,dy=(e.clientY-r.top-r.height/2)/r.height;
    card.style.transform='perspective(700px) rotateX('+(-dy*8)+'deg) rotateY('+(dx*10)+'deg) translateY(-4px)';
  });
  card.addEventListener('mouseleave',function(){card.style.transform='';});
});

