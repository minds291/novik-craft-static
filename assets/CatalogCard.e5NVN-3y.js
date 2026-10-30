(() => {
  // static-site/assets/store.BZvuKnCc.js
  var e = `novik-store-v1`;
  var t = `novik:store-change`;
  var n = () => ({ favorites: [], cart: [] });
  var r = (() => {
    if (typeof window > `u`) return n();
    try {
      let t2 = JSON.parse(window.localStorage.getItem(e) ?? `{}`), n2 = (e2) => Array.isArray(e2) ? e2.map((e3) => ({ ...e3, quantity: Math.max(1, Number(e3.quantity ?? 1)) })) : [];
      return { favorites: n2(t2.favorites), cart: n2(t2.cart) };
    } catch {
      return n();
    }
  })();
  var i = () => {
    typeof window > `u` || (window.localStorage.setItem(e, JSON.stringify(r)), window.dispatchEvent(new CustomEvent(t, { detail: r })));
  };
  var a = (e2, t2, n2) => {
    let r3 = e2.filter((e3) => e3.id !== t2.id);
    return n2 ? [...r3, t2] : r3;
  };
  var o = () => ({ favorites: [...r.favorites], cart: [...r.cart] });
  var s = (e2) => r.favorites.some((t2) => t2.id === e2);
  var l = (e2) => {
    let t2 = { ...e2, quantity: Math.max(1, e2.quantity ?? 1) };
    r = { ...r, favorites: a(r.favorites, t2, !s(e2.id)) }, i();
  };
  var h = (e2) => {
    if (typeof window > `u`) return () => {
    };
    let n2 = (event) => { if (event.detail) r = event.detail; else { try { r = JSON.parse(window.localStorage.getItem(e) || "null") || n(); } catch {} } e2(o()); };
    return window.addEventListener(t, n2), window.addEventListener(`storage`, n2), () => {
      window.removeEventListener(t, n2), window.removeEventListener(`storage`, n2);
    };
  };

  // static-site/assets/CatalogCard.e5NVN-3y.js
  var r2 = document.querySelectorAll(`.catalog-card__favorite`);
  var i2 = () => r2.forEach((t2) => {
    let n2 = s(t2.dataset.productId ?? ``);
    t2.setAttribute(`aria-pressed`, String(n2)), t2.setAttribute(`aria-label`, `${n2 ? `\u0423\u0434\u0430\u043B\u0438\u0442\u044C` : `\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C`} ${t2.dataset.productName ?? ``} \u0432 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435`);
  });
  r2.forEach((e2) => {
    e2.addEventListener(`click`, () => {
      l({ id: e2.dataset.productId ?? ``, name: e2.dataset.productName ?? ``, price: Number(e2.dataset.productPrice ?? 0), image: e2.dataset.productImage ?? ``, alt: e2.dataset.productAlt ?? `` });
    });
  }), h(i2), i2();
})();
