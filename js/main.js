// Asgard-Ops AI — Main JS

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Form submission handler
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    btn.textContent = 'Submitting...';
    btn.disabled = true;

    const data = Object.fromEntries(new FormData(form));
    data._plan = document.title.split('—')[0].trim();
    data._submitted_at = new Date().toISOString();

    // TODO: Replace with actual endpoint (Formspree, Netlify Forms, or custom webhook)
    const endpoint = 'https://formspree.io/f/REPLACE_WITH_YOUR_ID';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        form.innerHTML = `
          <div style="text-align:center; padding: 40px 0;">
            <div style="font-size:3rem; margin-bottom:16px;">✅</div>
            <h2 style="margin-bottom:12px;">We got it!</h2>
            <p style="color:var(--text-muted)">Thanks! We'll reach out within 24 hours to get you set up. Check your email for a confirmation.</p>
            <a href="../index.html" style="display:inline-block;margin-top:24px;color:var(--accent)">← Back to homepage</a>
          </div>
        `;
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      btn.textContent = 'Submit — Let\'s Get Started 🚀';
      btn.disabled = false;
      alert('Something went wrong. Please email us directly at contact@asgard-ops.com');
    }
  });
});
