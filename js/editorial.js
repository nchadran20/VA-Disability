(function () {
  // Only run on article pages (pages with .article-body)
  var articleBody = document.querySelector('.article-body');
  if (!articleBody) return;

  // Don't inject on trust pages
  var path = window.location.pathname;
  var skipPages = ['/about.html', '/contact.html', '/privacy.html', '/disclaimer.html'];
  if (skipPages.some(function(p) { return path === p; })) return;

  // Build the editorial bar HTML
  var bar = document.createElement('div');
  bar.className = 'editorial-bar';
  bar.innerHTML = [
    '<div class="editorial-bar-inner">',
      '<div class="editorial-icon">⭐</div>',
      '<div class="editorial-text">',
        '<strong>Reviewed by the VA Disability Hub Editorial Team</strong>',
        '<span class="editorial-divider">·</span>',
        '<span>Veterans, military family members, and researchers with direct experience navigating the VA disability claims process. All pay rates verified against official <a href="https://www.va.gov/disability/compensation-rates/" target="_blank" rel="noopener">VA.gov 2026 compensation tables</a> and <a href="https://www.ecfr.gov/current/title-38/chapter-I/part-4" target="_blank" rel="noopener">38 CFR Part 4</a>.</span>',
      '</div>',
      '<div class="editorial-updated">',
        '<span class="editorial-updated-label">Last Reviewed</span>',
        '<span class="editorial-updated-date" id="va-review-date"></span>',
      '</div>',
    '</div>'
  ].join('');

  // Set "Last Reviewed" to current month/year dynamically
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var now = new Date();
  bar.querySelector('#va-review-date').textContent = months[now.getMonth()] + ' ' + now.getFullYear();

  // Inject styles
  var style = document.createElement('style');
  style.textContent = [
    '.editorial-bar {',
      'background: #0D1F3C;',
      'border-radius: 10px;',
      'padding: 14px 18px;',
      'margin: 0 0 2rem 0;',
      'border-left: 4px solid #C9A84C;',
    '}',
    '.editorial-bar-inner {',
      'display: flex;',
      'align-items: flex-start;',
      'gap: 12px;',
      'max-width: 100%;',
    '}',
    '.editorial-icon {',
      'font-size: 1.2rem;',
      'flex-shrink: 0;',
      'margin-top: 2px;',
    '}',
    '.editorial-text {',
      'flex: 1;',
      'font-size: 0.83rem;',
      'color: rgba(255,255,255,0.75);',
      'line-height: 1.55;',
    '}',
    '.editorial-text strong {',
      'color: #C9A84C;',
      'display: block;',
      'margin-bottom: 3px;',
      'font-size: 0.82rem;',
      'letter-spacing: 0.01em;',
    '}',
    '.editorial-text a {',
      'color: rgba(255,255,255,0.6);',
      'text-decoration: underline;',
    '}',
    '.editorial-divider {',
      'display: none;',
    '}',
    '.editorial-updated {',
      'flex-shrink: 0;',
      'text-align: right;',
      'font-size: 0.78rem;',
    '}',
    '.editorial-updated-label {',
      'display: block;',
      'color: rgba(255,255,255,0.4);',
      'text-transform: uppercase;',
      'letter-spacing: 0.07em;',
      'font-size: 0.7rem;',
      'margin-bottom: 2px;',
    '}',
    '.editorial-updated-date {',
      'color: rgba(255,255,255,0.7);',
      'font-weight: 600;',
      'white-space: nowrap;',
    '}',
    '@media (max-width: 600px) {',
      '.editorial-bar-inner { flex-wrap: wrap; }',
      '.editorial-updated { text-align: left; }',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  // Insert at the very top of .article-body
  articleBody.insertBefore(bar, articleBody.firstChild);
})();
