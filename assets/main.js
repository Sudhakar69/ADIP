// ---------------------------------------------------------------------
// Shared behaviour: mobile nav, incident-ticket accordions, tag filters,
// and a tiny "live" status bar readout (uptime + clock) for atmosphere.
// ---------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  // Incident ticket accordions
  document.querySelectorAll('.ticket-head').forEach(head => {
    head.addEventListener('click', () => {
      const ticket = head.closest('.ticket');
      ticket.classList.toggle('open');
    });
  });

  // "Expand all / collapse all" controls, if present
  const expandAllBtn = document.querySelector('[data-action="expand-all"]');
  const collapseAllBtn = document.querySelector('[data-action="collapse-all"]');
  if (expandAllBtn) expandAllBtn.addEventListener('click', () => {
    document.querySelectorAll('.ticket').forEach(t => t.classList.add('open'));
  });
  if (collapseAllBtn) collapseAllBtn.addEventListener('click', () => {
    document.querySelectorAll('.ticket').forEach(t => t.classList.remove('open'));
  });

  // Tag filter bar: buttons with data-filter, tickets with data-tags="a,b,c"
  const filterBar = document.querySelector('.ticket-filterbar');
  if (filterBar) {
    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.ticket').forEach(t => {
        const tags = (t.dataset.tags || '').split(',');
        t.style.display = (filter === 'all' || tags.includes(filter)) ? '' : 'none';
      });
      document.querySelectorAll('.bank-subhead').forEach(h => {
        h.style.display = (filter === 'all' || h.dataset.group === filter) ? '' : 'none';
      });
    });
  }

  // Status bar live clock (cosmetic — reinforces the "ops console" feel)
  const clockEl = document.querySelector('[data-live-clock]');
  if (clockEl) {
    const tick = () => {
      const now = new Date();
      clockEl.textContent = now.toUTCString().slice(17, 25) + ' UTC';
    };
    tick();
    setInterval(tick, 1000);
  }

  // Highlight active nav link based on current file name
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
  });

});
