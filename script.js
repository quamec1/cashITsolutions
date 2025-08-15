// Lightweight interactions: typing effect, smooth scroll, nav toggle, progress bars, lightbox, form handling.

document.addEventListener('DOMContentLoaded', () => {
  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Simple typing effect
  const phrases = ['Frontend engineer', 'IT specialist', 'Performance-minded', 'Accessible by design'];
  let i = 0, j = 0, forward = true;
  const typedEl = document.getElementById('typed');
  const tick = () => {
    const current = phrases[i];
    if (forward) {
      j++;
      typedEl.textContent = current.slice(0, j);
      if (j === current.length) { forward = false; setTimeout(tick, 1000); return; }
    } else {
      j--;
      typedEl.textContent = current.slice(0, j);
      if (j === 0) { forward = true; i = (i + 1) % phrases.length; }
    }
    setTimeout(tick, forward ? 60 : 30);
  };
  tick();

  // Nav toggle (mobile)
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  navToggle && navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.style.display = expanded ? 'none' : 'flex';
  });

  // Smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href === '#' || href === '#!') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile nav if open
        if (window.innerWidth < 920 && nav.style.display === 'flex') {
          nav.style.display = 'none';
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Animate skill bars when in viewport
  const progressEls = document.querySelectorAll('.progress');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const val = el.getAttribute('data-progress') || '80';
        el.style.width = val + '%';
        obs.unobserve(el);
      }
    });
  }, {threshold: 0.25});
  progressEls.forEach(el => obs.observe(el));

  // Project lightbox
  const lb = document.getElementById('lightbox');
  const lbTitle = document.getElementById('lb-title');
  const lbDesc = document.getElementById('lb-desc');
  const lbImage = document.getElementById('lb-image');
  const projects = document.querySelectorAll('.project');
  const openLightbox = (title, desc) => {
    lbTitle.textContent = title;
    lbDesc.textContent = desc;
    lbImage.innerHTML = ''; // placeholder for image or demo
    lb.classList.remove('hidden');
    lb.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    // focus management
    const closeBtn = lb.querySelector('.lightbox-close');
    closeBtn && closeBtn.focus();
  };
  const closeLightbox = () => {
    lb.classList.add('hidden');
    lb.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  };
  projects.forEach(p => {
    const title = p.dataset.title || 'Project';
    const desc = p.dataset.desc || '';
    p.addEventListener('click', () => openLightbox(title, desc));
    p.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(title, desc); }
    });
  });
  document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !lb.classList.contains('hidden')) closeLightbox(); });

  // Contact form (client-only demo)
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = fd.get('name').trim();
    const email = fd.get('email').trim();
    const message = fd.get('message').trim();
    if (!name || !email || !message) {
      status.textContent = 'Please complete all fields.';
      return;
    }
    status.textContent = 'Thanks! This demo form does not send — wire up your backend or email service.';
    form.reset();
    setTimeout(()=> status.textContent = '', 5000);
  });

});

<script>
function openModal(project) {
  document.getElementById('modal-${project}').style.display = "block"
}

function closeModal(project) {
  document.getElementById('modal-${project}').style.display = "none"
}


window.onclick = function(event) {
  document.querySelectorAll('.modal').forEach(modal => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  })
}

function openModal(id) {
  document.getElementById(id).style.display = "block"
}

function closeModal(id) {
  document.getElementById(id).style.display = "none"
}

// Close modal when clicking outside
window.onclick = function(event) {
  document.querySelectorAll('.modal').forEach(modal => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  })
}
</script>