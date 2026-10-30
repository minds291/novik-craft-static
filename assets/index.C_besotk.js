(() => {
  // static-site/assets/index.C_besotk.js
  var e = Array.from(document.querySelectorAll(`[data-catalog-card]`));
  var t = Array.from(document.querySelectorAll(`[data-catalog-category]`));
  var n = document.querySelector(`[data-catalog-colors]`);
  var r = document.querySelector(`[data-catalog-search]`);
  var i = document.querySelector(`[data-catalog-min]`);
  var a = document.querySelector(`[data-catalog-max]`);
  var o = document.querySelector(`[data-catalog-audience]`);
  var s = document.querySelector(`[data-catalog-reset]`);
  var c = document.querySelector(`[data-catalog-load-more]`);
  var l = document.querySelector(`[data-catalog-count]`);
  var u = document.querySelector(`[data-catalog-no-results]`);
  var d = document.querySelector(`[data-catalog-pagination]`);
  var f = document.querySelector(`[data-catalog-pages]`);
  var p = document.querySelector(`[data-catalog-prev]`);
  var m = document.querySelector(`[data-catalog-next]`);
  var h = document.querySelector(`.catalog-filter-panel`);
  var g = window.matchMedia(`(max-width: 767px)`);
  var _ = 6;
  var v = t.find((e2) => e2.classList.contains(`is-active`))?.dataset.catalogCategory ?? ``;
  var y = Number(document.querySelector(`.catalog-pagination__numbers .is-current`)?.textContent ?? 1) || 1;
  var b = _;
  var x = (e2) => {
    let t2 = e2 % 10, n2 = e2 % 100;
    return `${e2} ${t2 === 1 && n2 !== 11 ? `\u0442\u043E\u0432\u0430\u0440` : t2 >= 2 && t2 <= 4 && (n2 < 10 || n2 >= 20) ? `\u0442\u043E\u0432\u0430\u0440\u0430` : `\u0442\u043E\u0432\u0430\u0440\u043E\u0432`}`;
  };
  var S = (t2) => e.filter((e2) => !t2 || e2.dataset.productCatalog === t2);
  var C = () => {
    let e2 = S(v).map((e3) => Number(e3.dataset.productPrice)).filter(Number.isFinite), t2 = e2.length ? Math.min(...e2) : 0, n2 = e2.length ? Math.max(...e2) : 0;
    i && (i.placeholder = t2 ? String(t2) : ``, i.max = n2 ? String(n2) : ``), a && (a.placeholder = n2 ? String(n2) : ``, a.min = t2 ? String(t2) : `0`);
  };
  var w = () => {
    if (!n) return;
    let e2 = [...new Set(S(v).map((e3) => e3.dataset.productColor ?? ``).filter(Boolean))].sort((e3, t2) => e3.localeCompare(t2, `ru`));
    n.replaceChildren(), e2.forEach((e3) => {
      let t2 = document.createElement(`label`), r2 = document.createElement(`input`);
      r2.type = `checkbox`, r2.name = `color`, r2.value = e3, r2.dataset.catalogColor = ``, r2.addEventListener(`change`, () => {
        y = 1, b = _, k();
      });
      let i2 = document.createElement(`span`);
      i2.textContent = e3, t2.className = `catalog-filter-choice`, t2.append(r2, document.createTextNode(` `), i2), n.append(t2);
    });
  };
  var T = () => new Set(Array.from(document.querySelectorAll(`[data-catalog-color]:checked`)).map((e2) => e2.value));
  var E = () => {
    let t2 = r?.value.trim().toLocaleLowerCase(`ru-RU`) ?? ``, n2 = T(), s2 = o?.checked ? `men` : ``, c2 = i?.value ? Number(i.value) : null, l2 = a?.value ? Number(a.value) : null;
    return e.filter((e2) => {
      let r2 = (e2.dataset.productName ?? ``).toLocaleLowerCase(`ru-RU`), i2 = Number(e2.dataset.productPrice ?? 0), a2 = e2.dataset.productColor ?? ``;
      return (!v || e2.dataset.productCatalog === v) && (!t2 || r2.includes(t2)) && (n2.size === 0 || n2.has(a2)) && (!s2 || e2.dataset.productAudience === s2) && (c2 === null || i2 >= c2) && (l2 === null || i2 <= l2);
    });
  };
  var D = (e2) => {
    let t2 = new URL(window.location.href);
    return v ? t2.searchParams.set(`category`, v) : t2.searchParams.delete(`category`), e2 > 1 ? t2.searchParams.set(`page`, String(e2)) : t2.searchParams.delete(`page`), `${t2.pathname}${t2.search}`;
  };
  var O = (e2) => {
    if (!(!d || !f || !p || !m)) {
      d.hidden = e2 <= 1, f.replaceChildren();
      for (let t2 = 1; t2 <= e2; t2 += 1) {
        let e3 = document.createElement(t2 === y ? `span` : `a`);
        e3.textContent = String(t2), e3 instanceof HTMLAnchorElement ? (e3.href = D(t2), e3.dataset.catalogPage = String(t2)) : (e3.className = `is-current`, e3.setAttribute(`aria-current`, `page`)), f.append(e3);
      }
      p.href = D(Math.max(1, y - 1)), m.href = D(Math.min(e2, y + 1)), p.classList.toggle(`is-disabled`, y <= 1), m.classList.toggle(`is-disabled`, y >= e2), p.setAttribute(`aria-disabled`, String(y <= 1)), m.setAttribute(`aria-disabled`, String(y >= e2));
    }
  };
  var k = () => {
    let t2 = E(), n2 = new Set(t2), r2 = Math.max(1, Math.ceil(t2.length / _));
    y = Math.min(y, r2);
    let i2 = g.matches;
    e.forEach((e2) => {
      e2.classList.remove(`catalog-card--filtered-out`, `catalog-card--page-extra`, `catalog-card--mobile-extra`);
      let r3 = t2.indexOf(e2), a2 = n2.has(e2) && (i2 ? r3 < b : r3 >= (y - 1) * _ && r3 < y * _);
      e2.classList.toggle(`catalog-card--client-hidden`, !a2);
    }), l && (l.textContent = x(t2.length)), u && (u.hidden = t2.length > 0), c && (c.hidden = !i2 || b >= t2.length), O(r2);
  };
  t.forEach((e2) => e2.addEventListener(`click`, (n2) => {
    n2.preventDefault(), v = e2.dataset.catalogCategory ?? ``, y = 1, b = _, t.forEach((t2) => t2.classList.toggle(`is-active`, t2 === e2)), r && (r.value = ``), i && (i.value = ``), a && (a.value = ``), o && (o.checked = false), w(), C(), h && (h.open = false), window.history.replaceState({}, ``, D(1)), k();
  })), [r, i, a].forEach((e2) => e2?.addEventListener(`input`, () => {
    y = 1, b = _, k();
  })), o?.addEventListener(`change`, () => {
    y = 1, b = _, k();
  }), s?.addEventListener(`click`, () => {
    window.setTimeout(() => {
      y = 1, b = _, k();
    }, 0);
  }), c?.addEventListener(`click`, () => {
    b += _, k();
  }), d?.addEventListener(`click`, (e2) => {
    let t2 = e2.target.closest(`a`);
    if (!t2 || t2.getAttribute(`aria-disabled`) === `true`) {
      t2 && e2.preventDefault();
      return;
    }
    let n2 = Number(t2.dataset.catalogPage ?? (t2 === p ? y - 1 : y + 1));
    if (!Number.isInteger(n2) || n2 < 1) {
      e2.preventDefault();
      return;
    }
    e2.preventDefault(), y = n2, window.history.replaceState({}, ``, D(y)), k();
  }), g.addEventListener?.(`change`, k), w(), C(), k();
})();
