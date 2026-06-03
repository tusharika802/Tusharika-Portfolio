// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 50
    ? 'rgba(8,11,20,0.98)' : 'rgba(8,11,20,0.8)';
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + entry.target.id
          ? 'var(--accent2)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => observer.observe(s));

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll(
  '.timeline-card, .project-card, .skill-group, .cert-card, .contact-link-card, .about-grid > *'
);
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  submitBtn.textContent = 'Sending... ⏳';
  submitBtn.disabled = true;

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  fetch("https://formsubmit.co/ajax/tusharika0829@gmail.com", {
    method: "POST",
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email,
      message: message
    })
  })
  .then(response => {
    if (response.ok) {
      submitBtn.textContent = '✅ Message Sent!';
      submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
      form.reset();
    } else {
      throw new Error('FormSubmit rejection');
    }
  })
  .catch(error => {
    submitBtn.textContent = '❌ Failed to Send';
    submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    console.error('Contact Form Error:', error);
  })
  .finally(() => {
    setTimeout(() => {
      submitBtn.textContent = 'Send Message ✉️';
      submitBtn.disabled = false;
      submitBtn.style.background = '';
    }, 3000);
  });
});

// ===== CURSOR GLOW =====
const glow = document.createElement('div');
glow.style.cssText = `
  position:fixed;pointer-events:none;z-index:9999;
  width:300px;height:300px;border-radius:50%;
  background:radial-gradient(circle,rgba(108,99,255,0.08),transparent 70%);
  transform:translate(-50%,-50%);transition:left 0.1s,top 0.1s;
`;
document.body.appendChild(glow);
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});
