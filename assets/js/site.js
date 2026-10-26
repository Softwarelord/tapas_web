/*
  Tapas Infosolutions wireframe (REQ-9) — shared behaviour.

  Renders the global header (FS section 6), footer (section 7), CTA bands (8.10)
  and enquiry forms (8.11) from the single data set below, so that contact
  details, menu groups and quick links are defined in one place (FR-130, FR-132).
*/
(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // Site data — the one place to change names, contact details and links.
  // ---------------------------------------------------------------------------

  // Open point (FS 1.1, 7.4): "Tapas Infosolutions" (profile) vs "Tapas Infosolutions LLP" (request).
  var ENTITY_NAME = 'Tapas Infosolutions';
  var ENTITY_NAME_CONFIRMED = false;

  var CONTACT = {
    address: [
      '11/C/512, Swapnapurti CHS,',
      'Behind Pop Tates Hotel, Kailash Complex Road,',
      'Vikhroli West, Mumbai 400079'
    ],
    phones: ['+91 98709 89154', '+91 9422224828'],
    email: 'contact@tapasinfo.com'
  };

  // Open point (FR-116, FR-466): Helpdesk Portal URL not supplied. Until it is,
  // links point at the portal panel on the SAP System Support page.
  var HELPDESK_URL = null;
  var HELPDESK_FALLBACK = '/services/sap-system-support/#helpdesk';

  // Open point (FR-137–139): no social profile URLs supplied, so no icons are shown.
  var SOCIAL = [
    // { network: 'LinkedIn', url: 'https://www.linkedin.com/company/...' }
  ];

  var CTA_LABEL = 'Talk to an SAP & AI Expert'; // FR-115 (label to be confirmed)

  // Header mega-menu groups (FR-099, FR-103 – FR-110).
  var NAV = [
    {
      id: 'ai', label: 'AI', section: '/ai/',
      intro: 'AI capabilities already delivered to clients.', // FR-104
      links: [
        { label: 'AI Capabilities', href: '/ai/', note: 'Hub page' },
        { label: 'SAP Joule and SAP BTP AI', href: '/ai/sap-joule-btp-ai/', note: 'Delivered' },
        { label: 'Custom AI Agents', href: '/ai/custom-ai-agents/', note: 'Delivered' }
      ]
    },
    {
      id: 'sap-solutions', label: 'SAP Solutions', section: '/sap-solutions/',
      intro: 'The latest SAP offerings.',
      links: [
        { label: 'RISE with SAP', href: '/sap-solutions/rise-with-sap/', note: 'Migration · Implementation · Support · Enhancement · Integrations · Automations' },
        { label: 'GROW with SAP', href: '/sap-solutions/grow-with-sap/', note: 'Migration · Implementation · Support · Enhancement · Integrations · Automations' },
        { label: 'SAP S/4HANA Services', href: '/services/sap-s4hana/' }
      ]
    },
    {
      id: 'services', label: 'Services', section: '/services/',
      intro: 'Core SAP services.',
      links: [
        { label: 'Services Overview', href: '/services/' },
        { label: 'SAP Business Process Control Audit and Recommendation', href: '/services/sap-process-control-audit/' },
        { label: 'SAP System Support', href: '/services/sap-system-support/' },
        { label: 'SAP Testing and Training', href: '/services/sap-testing-training/' },
        { label: 'SAP Business Improvement', href: '/services/sap-business-improvement/' },
        { label: 'SAP Integration Services', href: '/services/sap-integration-services/' }
      ]
    },
    {
      id: 'accelerators', label: 'Accelerators', section: '/accelerators/',
      intro: 'Automation / accelerators developed in SAP.',
      links: [
        { label: 'Accelerators', href: '/accelerators/', note: 'Listing page' },
        { label: 'Auto Invoice Verification', href: '/accelerators/auto-invoice-verification/' },
        { label: 'Transport Management Systems (TMS)', href: '/accelerators/transport-management-system/' },
        { label: 'Master Data Management', href: '/accelerators/master-data-management/' },
        { label: 'BOM Automation', href: '/accelerators/bom-automation/' },
        { label: 'Automation of Complete Production Process by Integration with SCADA', href: '/accelerators/scada-production-integration/' }
      ]
    },
    {
      id: 'industries', label: 'Industries', section: '/industries/',
      intro: 'Industries we serve.',
      links: [
        { label: 'Industries', href: '/industries/', note: 'Overview page' },
        { label: 'Pharmaceutical', href: '/industries/#pharmaceutical' },
        { label: 'Chemical', href: '/industries/#chemical' },
        { label: 'Engineering', href: '/industries/#engineering' },
        { label: 'FMCG', href: '/industries/#fmcg' },
        { label: 'Dairy / Milk', href: '/industries/#dairy-milk' },
        { label: 'Diamond', href: '/industries/#diamond' },
        { label: 'Power & Energy', href: '/industries/#power-energy' },
        { label: 'Education', href: '/industries/#education' },
        { label: 'Government & Public Sector (Digital India)', href: '/industries/government-public-sector/' }
      ]
    },
    {
      id: 'company', label: 'Company', section: '/company/',
      intro: 'Who we are and how we deliver.',
      links: [
        { label: 'About Us', href: '/company/about-us/' },
        { label: 'Company Snapshot and Differentiators', href: '/company/about-us/#why-tapas' },
        { label: 'Implementation Methodology', href: '/company/implementation-methodology/' },
        { label: 'Project Governance', href: '/company/project-governance/' },
        { label: 'Case Studies', href: '/company/case-studies/' },
        { label: 'Clients', href: '/company/clients/' }
      ]
    }
  ];

  // Footer quick links (FS 7.3 table).
  var FOOTER_GROUPS = [
    { label: 'AI', links: [['AI Capabilities', '/ai/'], ['SAP Joule and SAP BTP AI', '/ai/sap-joule-btp-ai/'], ['Custom AI Agents', '/ai/custom-ai-agents/']] },
    { label: 'SAP Solutions', links: [['RISE with SAP', '/sap-solutions/rise-with-sap/'], ['GROW with SAP', '/sap-solutions/grow-with-sap/'], ['SAP S/4HANA Services', '/services/sap-s4hana/']] },
    { label: 'Services', links: [['Services Overview', '/services/'], ['SAP Business Process Control Audit and Recommendation', '/services/sap-process-control-audit/'], ['SAP System Support', '/services/sap-system-support/'], ['SAP Testing and Training', '/services/sap-testing-training/'], ['SAP Business Improvement', '/services/sap-business-improvement/'], ['SAP Integration Services', '/services/sap-integration-services/']] },
    { label: 'Accelerators', links: [['Accelerators', '/accelerators/']] },
    { label: 'Industries', links: [['Industries', '/industries/'], ['Government and Public Sector (Digital India)', '/industries/government-public-sector/']] },
    { label: 'Company', links: [['About Us', '/company/about-us/'], ['Implementation Methodology', '/company/implementation-methodology/'], ['Project Governance', '/company/project-governance/'], ['Case Studies', '/company/case-studies/'], ['Clients', '/company/clients/'], ['Contact Us', '/contact-us/']] }
  ];

  // Enquiry form "area of interest" values (assumed; FS section 31 not supplied).
  var INTERESTS = [
    ['ai', 'AI Capabilities'],
    ['sap-joule-btp-ai', 'SAP Joule and SAP BTP AI'],
    ['custom-ai-agents', 'Custom AI Agents'],
    ['rise-with-sap', 'RISE with SAP'],
    ['grow-with-sap', 'GROW with SAP'],
    ['sap-s4hana', 'SAP S/4HANA Services'],
    ['sap-process-control-audit', 'SAP Business Process Control Audit and Recommendation'],
    ['sap-system-support', 'SAP System Support'],
    ['sap-testing-training', 'SAP Testing and Training'],
    ['sap-business-improvement', 'SAP Business Improvement'],
    ['sap-integration-services', 'SAP Integration Services'],
    ['digital-india', 'Digital India / Government and Public Sector'],
    ['accelerators', 'Automation / Accelerators'],
    ['other', 'Something else']
  ];

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function tel(n) { return 'tel:' + n.replace(/[^\d+]/g, ''); }
  function helpdeskHref() { return HELPDESK_URL || HELPDESK_FALLBACK; }
  function helpdeskAttrs() { return HELPDESK_URL ? ' target="_blank" rel="noopener"' : ''; }
  function entityName() {
    return esc(ENTITY_NAME) + (ENTITY_NAME_CONFIRMED ? '' : ' <span class="tbc" title="Legal entity name to be confirmed (FS section 37)">[legal name TBC]</span>');
  }
  var path = location.pathname.replace(/index\.html$/, '');

  function contactHref(interest) {
    var q = [];
    if (interest) q.push('interest=' + encodeURIComponent(interest));
    if (path !== '/contact-us/') q.push('from=' + encodeURIComponent(path));
    return '/contact-us/' + (q.length ? '?' + q.join('&') : '') + '#enquiry';
  }

  // ---------------------------------------------------------------------------
  // Header (section 6)
  // ---------------------------------------------------------------------------

  function renderHeader() {
    var mount = document.querySelector('[data-site-header]');
    if (!mount) return;

    // SAP S/4HANA Services lives at /services/sap-s4hana/ but is listed under SAP Solutions (FR-105).
    var isS4 = path.indexOf('/services/sap-s4hana/') === 0;
    var items = NAV.map(function (g) {
      var inSection = g.id === 'sap-solutions' ? (path.indexOf(g.section) === 0 || isS4)
        : g.id === 'services' ? (path.indexOf(g.section) === 0 && !isS4)
        : path.indexOf(g.section) === 0;
      var active = inSection ? ' is-active' : '';
      var links = g.links.map(function (l) {
        return '<li><a href="' + l.href + '">' + esc(l.label) +
          (l.note ? '<small>' + esc(l.note) + '</small>' : '') + '</a></li>';
      }).join('');
      return '<li class="primary-nav__item' + active + '" data-group="' + g.id + '">' +
        '<button class="primary-nav__trigger" aria-expanded="false" aria-controls="mega-' + g.id + '">' + esc(g.label) + '</button>' +
        '<div class="mega" id="mega-' + g.id + '" hidden><div class="container mega__inner">' +
        '<div class="mega__intro"><strong>' + esc(g.label) + '</strong>' + esc(g.intro) + '</div>' +
        '<ul class="mega__links">' + links + '</ul></div></div></li>';
    }).join('');

    var contactActive = path.indexOf('/contact-us/') === 0 ? ' is-active' : '';

    mount.outerHTML =
      '<a class="skip-link" href="#main">Skip to content</a>' +
      '<header class="site-header"><div class="container site-header__inner">' +
      '<a class="logo" href="/" aria-label="' + esc(ENTITY_NAME) + ' – home">' +
      '<span aria-hidden="true">[LOGO]<br>' + esc(ENTITY_NAME) + '</span></a>' +
      '<nav class="primary-nav" aria-label="Primary"><ul>' + items +
      '<li class="primary-nav__item' + contactActive + '"><a class="primary-nav__link" href="/contact-us/">Contact Us</a></li>' +
      '</ul></nav>' +
      '<div class="header-actions">' +
      '<a class="helpdesk" href="' + helpdeskHref() + '"' + helpdeskAttrs() + '>Support Helpdesk</a>' +
      '<a class="btn" href="' + contactHref() + '">' + esc(CTA_LABEL) + '</a></div>' +
      '<button class="menu-toggle" aria-expanded="false" aria-controls="drawer">Menu</button>' +
      '</div></header>' +
      renderDrawer();

    bindMegaMenus();
    bindDrawer();
  }

  function bindMegaMenus() {
    var items = Array.prototype.slice.call(document.querySelectorAll('.primary-nav__item[data-group]'));
    var hoverCapable = window.matchMedia('(hover: hover)').matches;

    function close(item, focusTrigger) {
      var btn = item.querySelector('.primary-nav__trigger');
      if (btn.getAttribute('aria-expanded') === 'false') return;
      btn.setAttribute('aria-expanded', 'false');
      item.querySelector('.mega').hidden = true;
      if (focusTrigger) btn.focus();
    }
    function open(item) {
      items.forEach(function (o) { if (o !== item) close(o); });
      item.querySelector('.primary-nav__trigger').setAttribute('aria-expanded', 'true');
      item.querySelector('.mega').hidden = false;
    }
    function closeAll() { items.forEach(function (i) { close(i); }); }

    items.forEach(function (item) {
      var btn = item.querySelector('.primary-nav__trigger');
      btn.addEventListener('click', function () {
        if (btn.getAttribute('aria-expanded') === 'true') close(item); else open(item);
      });
      // Down arrow from the trigger moves into the panel (FR-112).
      btn.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          open(item);
          var first = item.querySelector('.mega a');
          if (first) first.focus();
        }
      });
      item.querySelector('.mega').addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
        var links = Array.prototype.slice.call(item.querySelectorAll('.mega a'));
        var i = links.indexOf(document.activeElement);
        if (i < 0) return;
        e.preventDefault();
        links[(i + (e.key === 'ArrowDown' ? 1 : links.length - 1)) % links.length].focus();
      });
      if (hoverCapable) {
        // FR-111: open on hover, close when the pointer leaves the panel.
        item.addEventListener('mouseenter', function () { open(item); });
        item.addEventListener('mouseleave', function () { close(item); });
      }
      // Close when focus leaves the item entirely (Tab out).
      item.addEventListener('focusout', function (e) {
        if (!item.contains(e.relatedTarget)) close(item);
      });
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.primary-nav')) closeAll();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var openItem = items.filter(function (i) {
        return i.querySelector('.primary-nav__trigger').getAttribute('aria-expanded') === 'true';
      })[0];
      if (openItem) close(openItem, openItem.contains(document.activeElement));
    });
  }

  // Mobile drawer (FR-117 – FR-121)
  function renderDrawer() {
    var groups = NAV.map(function (g) {
      return '<li class="drawer__group"><button aria-expanded="false" aria-controls="drawer-' + g.id + '">' + esc(g.label) + '</button>' +
        '<ul id="drawer-' + g.id + '" hidden>' + g.links.map(function (l) {
          return '<li><a href="' + l.href + '">' + esc(l.label) + '</a></li>';
        }).join('') + '</ul></li>';
    }).join('');
    return '<div class="drawer-backdrop" hidden></div>' +
      '<div class="drawer" id="drawer" role="dialog" aria-modal="true" aria-label="Site menu" hidden>' +
      '<div class="drawer__head"><span class="logo" aria-hidden="true">[LOGO]</span>' +
      '<button class="menu-toggle drawer__close" style="display:inline-block">Close</button></div>' +
      '<nav class="drawer__body" aria-label="Mobile"><ul>' + groups +
      '<li><a href="/contact-us/">Contact Us</a></li></ul></nav>' +
      '<div class="drawer__foot"><a class="btn" href="' + contactHref() + '">' + esc(CTA_LABEL) + '</a>' +
      '<a class="btn btn--secondary" href="' + helpdeskHref() + '"' + helpdeskAttrs() + '>Support Helpdesk</a></div>' +
      '</div>';
  }

  function bindDrawer() {
    var drawer = document.getElementById('drawer');
    var backdrop = document.querySelector('.drawer-backdrop');
    var toggle = document.querySelector('.site-header .menu-toggle');
    if (!drawer || !toggle) return;

    function setOpen(isOpen) {
      drawer.hidden = !isOpen;
      backdrop.hidden = !isOpen;
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
      if (isOpen) drawer.querySelector('.drawer__close').focus(); else toggle.focus();
    }
    toggle.addEventListener('click', function () { setOpen(true); });
    drawer.querySelector('.drawer__close').addEventListener('click', function () { setOpen(false); });
    backdrop.addEventListener('click', function () { setOpen(false); });
    drawer.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    drawer.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });

    // Accordion: only one group open at a time (FR-119).
    var buttons = Array.prototype.slice.call(drawer.querySelectorAll('.drawer__group > button'));
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var willOpen = btn.getAttribute('aria-expanded') !== 'true';
        buttons.forEach(function (b) {
          b.setAttribute('aria-expanded', 'false');
          document.getElementById(b.getAttribute('aria-controls')).hidden = true;
        });
        if (willOpen) {
          btn.setAttribute('aria-expanded', 'true');
          document.getElementById(btn.getAttribute('aria-controls')).hidden = false;
        }
      });
    });
  }

  // ---------------------------------------------------------------------------
  // Footer (section 7)
  // ---------------------------------------------------------------------------

  function contactBlockHtml() {
    return '<address>' +
      '<p>' + CONTACT.address.map(esc).join('<br>') + '</p>' +
      '<p>' + CONTACT.phones.map(function (p) {
        return '<a href="' + tel(p) + '">' + esc(p) + '</a>';
      }).join('<br>') + '</p>' +
      '<p><a href="mailto:' + CONTACT.email + '">' + esc(CONTACT.email) + '</a></p>' +
      '</address>';
  }

  function renderFooter() {
    var mount = document.querySelector('[data-site-footer]');
    if (!mount) return;

    var groups = FOOTER_GROUPS.map(function (g, i) {
      return '<div><h3><button aria-expanded="false" aria-controls="fl-' + i + '">' + esc(g.label) + '</button></h3>' +
        '<ul id="fl-' + i + '">' + g.links.map(function (l) {
          return '<li><a href="' + l[1] + '">' + esc(l[0]) + '</a></li>';
        }).join('') + '</ul></div>';
    }).join('');

    var social = SOCIAL.length
      ? '<ul class="social">' + SOCIAL.map(function (s) {
          return '<li><a href="' + s.url + '" target="_blank" rel="noopener" aria-label="' +
            esc(ENTITY_NAME + ' on ' + s.network) + '">[' + esc(s.network) + ']</a></li>';
        }).join('') + '</ul>'
      : '<p class="wf-note">Social icons hidden: no profile URLs supplied yet (FR-139).</p>';

    mount.outerHTML =
      '<footer class="site-footer"><div class="container">' +
      '<div class="site-footer__main">' +
      '<div><a class="logo" href="/" aria-label="' + esc(ENTITY_NAME) + ' – home"><span aria-hidden="true">[LOGO]</span></a>' +
      '<p class="mt-2">We succeed when our customers succeed.</p>' +
      '<p class="footer-note">Brand line to be confirmed (FS 7.1).</p></div>' +
      '<div><h3 class="visually-hidden">Contact</h3>' + contactBlockHtml() +
      '<p><a href="' + helpdeskHref() + '"' + helpdeskAttrs() + '>Support Helpdesk</a></p>' + social + '</div>' +
      '<nav class="footer-links" aria-label="Footer">' + groups + '</nav>' +
      '</div>' +
      '<div class="legal-bar"><p class="mt-0">© <span data-year></span> ' + entityName() + '. All rights reserved.</p>' +
      '<ul><li><a href="/privacy-policy/">Privacy Policy</a></li>' +
      '<li><span class="tbc" title="Terms of Use page is not in the sitemap (FR-090/FR-136)">Terms of Use [page TBC]</span></li></ul></div>' +
      '<p class="footer-note">SAP, SAP S/4HANA, SAP BTP, SAP Joule, RISE with SAP and GROW with SAP are trademarks of SAP SE. Trademark notice wording to be confirmed (FR-308).</p>' +
      '</div></footer>';

    var year = document.querySelector('[data-year]');
    if (year) year.textContent = new Date().getFullYear(); // FR-135

    bindFooterAccordion();
  }

  // Quick-link groups collapse on mobile (FR-141).
  function bindFooterAccordion() {
    var mq = window.matchMedia('(max-width: 640px)');
    var buttons = Array.prototype.slice.call(document.querySelectorAll('.footer-links h3 button'));
    function apply() {
      buttons.forEach(function (b) {
        var list = document.getElementById(b.getAttribute('aria-controls'));
        list.hidden = mq.matches && b.getAttribute('aria-expanded') !== 'true';
      });
    }
    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        if (!mq.matches) return;
        b.setAttribute('aria-expanded', String(b.getAttribute('aria-expanded') !== 'true'));
        apply();
      });
    });
    if (mq.addEventListener) mq.addEventListener('change', apply); else mq.addListener(apply);
    apply();
  }

  // ---------------------------------------------------------------------------
  // CTA band (8.10) — <section data-cta-band data-heading data-text data-button data-interest>
  // ---------------------------------------------------------------------------

  function renderCtaBands() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-cta-band]'), function (el) {
      var heading = el.getAttribute('data-heading') || 'Talk to us about your SAP and AI plans';
      var text = el.getAttribute('data-text') || '<span class="ph">[Supporting line – content to be supplied by client]</span>';
      var button = el.getAttribute('data-button') || 'Contact us';
      var target = el.hasAttribute('data-inline-form') ? '#enquiry' : contactHref(el.getAttribute('data-interest'));
      el.className = 'cta-band';
      el.setAttribute('aria-label', 'Contact');
      el.innerHTML = '<div class="container cta-band__inner"><div>' +
        '<h2 data-slot="CTA headline">' + esc(heading) + '</h2>' +
        '<p class="mt-0" data-slot="Supporting text (1 line)">' + text + '</p>' +
        '<div class="cta-band__contact">' +
        '<a href="mailto:' + CONTACT.email + '">' + esc(CONTACT.email) + '</a>' +
        CONTACT.phones.map(function (p) { return '<a href="' + tel(p) + '">' + esc(p) + '</a>'; }).join('') +
        '</div></div>' +
        '<a class="btn" href="' + target + '">' + esc(button) + '</a></div>';
    });
  }

  // Elements that just need the shared contact block (Contact Us page, FR-130).
  function renderContactBlocks() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-contact-block]'), function (el) {
      el.innerHTML = contactBlockHtml();
    });
  }

  // Links whose target is the Contact Us enquiry form with a preset interest.
  function wireContactLinks() {
    Array.prototype.forEach.call(document.querySelectorAll('a[data-contact]'), function (a) {
      a.setAttribute('href', contactHref(a.getAttribute('data-contact')));
    });
    Array.prototype.forEach.call(document.querySelectorAll('a[data-helpdesk]'), function (a) {
      a.setAttribute('href', helpdeskHref());
      if (HELPDESK_URL) { a.target = '_blank'; a.rel = 'noopener'; }
    });
  }

  // ---------------------------------------------------------------------------
  // Enquiry form (8.11) — <div data-enquiry-form data-interest="...">
  // Fields are assumed until FS section 31 is supplied.
  // ---------------------------------------------------------------------------

  function renderForms() {
    var params = new URLSearchParams(location.search);
    Array.prototype.forEach.call(document.querySelectorAll('[data-enquiry-form]'), function (mount, idx) {
      var preset = params.get('interest') || mount.getAttribute('data-interest') || '';
      var source = mount.getAttribute('data-interest') ? path : (params.get('from') || path);
      var id = 'f' + idx + '-';
      var options = '<option value="">Select…</option>' + INTERESTS.map(function (o) {
        return '<option value="' + o[0] + '"' + (o[0] === preset ? ' selected' : '') + '>' + esc(o[1]) + '</option>';
      }).join('');

      function field(name, label, type, required, full, extra) {
        var input = type === 'textarea'
          ? '<textarea id="' + id + name + '" name="' + name + '"' + (required ? ' required' : '') + '></textarea>'
          : type === 'select'
            ? '<select id="' + id + name + '" name="' + name + '"' + (required ? ' required' : '') + '>' + extra + '</select>'
            : '<input id="' + id + name + '" name="' + name + '" type="' + type + '"' + (required ? ' required' : '') + (extra || '') + '>';
        return '<div class="form__field' + (full ? ' form__field--full' : '') + '">' +
          '<label for="' + id + name + '">' + esc(label) + (required ? ' *' : ' (optional)') + '</label>' + input +
          '<span class="form__error" id="' + id + name + '-err" aria-live="polite"></span></div>';
      }

      mount.innerHTML =
        '<form class="form" novalidate>' +
        '<input type="hidden" name="source_page" value="' + esc(source) + '">' +
        field('name', 'Full name', 'text', true, false, ' autocomplete="name"') +
        field('organisation', 'Organisation', 'text', true, false, ' autocomplete="organization"') +
        field('email', 'Work email', 'email', true, false, ' autocomplete="email"') +
        field('phone', 'Phone', 'tel', false, false, ' autocomplete="tel"') +
        field('interest', 'Area of interest', 'select', true, true, options) +
        field('message', 'How can we help?', 'textarea', true, true) +
        '<div class="form__field form__field--full form__check">' +
        '<input id="' + id + 'consent" name="consent" type="checkbox" required>' +
        '<label for="' + id + 'consent">I agree that ' + esc(ENTITY_NAME) + ' may use these details to respond to my enquiry, as described in the <a href="/privacy-policy/">Privacy Policy</a>. *</label></div>' +
        '<span class="form__error form__field--full" id="' + id + 'consent-err" aria-live="polite"></span>' +
        '<div class="form__field--full btn-row"><button class="btn" type="submit">Send enquiry</button>' +
        '<label class="wf-note" style="margin:0"><input type="checkbox" name="wf_fail"> Wireframe only: simulate a failed submission</label></div>' +
        '<div class="form__status" role="status" hidden></div>' +
        '<p class="wf-note form__field--full">Assumed field set — FS section 31 (fields, validation, confirmation text, routing to ' + esc(CONTACT.email) + ') was not supplied. Source page recorded: <code>' + esc(source) + '</code> (FR-179).</p>' +
        '</form>';

      bindForm(mount.querySelector('form'));
    });
  }

  function bindForm(form) {
    var status = form.querySelector('.form__status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstInvalid = null;
      Array.prototype.forEach.call(form.querySelectorAll('[required]'), function (el) {
        var err = document.getElementById(el.id + '-err');
        var msg = '';
        if (el.type === 'checkbox' ? !el.checked : !el.value.trim()) msg = 'This field is required.';
        else if (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) msg = 'Enter a valid email address.';
        el.setAttribute('aria-invalid', msg ? 'true' : 'false');
        el.setAttribute('aria-describedby', err.id);
        err.textContent = msg;
        if (msg && !firstInvalid) firstInvalid = el;
      });
      if (firstInvalid) { firstInvalid.focus(); return; }

      // No backend in the wireframe. On failure the entered data is kept (8.11 CAUTION).
      status.hidden = false;
      if (form.elements.wf_fail.checked) {
        status.className = 'form__status form__status--error';
        status.textContent = 'Sorry, your enquiry could not be sent. Your details are still in the form — please try again, or email ' + CONTACT.email + '. [Final error message: FS section 31]';
      } else {
        status.className = 'form__status';
        status.textContent = 'Thank you — your enquiry has been sent. We will be in touch shortly. [Wireframe: confirmation text and routing to ' + CONTACT.email + ' per FS section 31]';
        form.reset();
        form.elements.wf_fail.checked = false;
      }
      status.setAttribute('tabindex', '-1');
      status.focus();
    });
  }

  // ---------------------------------------------------------------------------
  // Page widgets
  // ---------------------------------------------------------------------------

  // Selectable phase flow (FR-439): selecting a phase highlights its row; full table stays visible (FR-440).
  function bindPhaseFlows() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-phase-flow]'), function (flow) {
      var table = document.getElementById(flow.getAttribute('data-phase-flow'));
      var steps = Array.prototype.slice.call(flow.querySelectorAll('li'));
      steps.forEach(function (li) {
        li.querySelector('button').addEventListener('click', function () {
          steps.forEach(function (s) { s.setAttribute('aria-selected', 'false'); });
          li.setAttribute('aria-selected', 'true');
          Array.prototype.forEach.call(table.querySelectorAll('tbody tr'), function (tr) {
            tr.classList.toggle('is-highlighted', tr.getAttribute('data-phase') === li.getAttribute('data-phase'));
          });
          var row = table.querySelector('tr[data-phase="' + li.getAttribute('data-phase') + '"]');
          if (row) row.scrollIntoView({ block: 'nearest' });
        });
      });
    });
  }

  // Filter bars (FR-303): <div class="filter-bar" data-filter-target="id"><button data-filter="all">…
  function bindFilters() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-filter-target]'), function (bar) {
      var grid = document.getElementById(bar.getAttribute('data-filter-target'));
      var buttons = Array.prototype.slice.call(bar.querySelectorAll('button'));
      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var f = btn.getAttribute('data-filter');
          buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
          Array.prototype.forEach.call(grid.children, function (card) {
            var tags = (card.getAttribute('data-tech') || '').split(' ');
            card.hidden = f !== 'all' && tags.indexOf(f) === -1;
          });
        });
      });
    });
  }

  function init() {
    renderHeader();
    renderFooter();
    renderCtaBands();
    renderContactBlocks();
    wireContactLinks();
    renderForms();
    bindPhaseFlows();
    bindFilters();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
