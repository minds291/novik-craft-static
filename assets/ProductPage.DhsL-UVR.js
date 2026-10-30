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
    let r2 = e2.filter((e3) => e3.id !== t2.id);
    return n2 ? [...r2, t2] : r2;
  };
  var o = () => ({ favorites: [...r.favorites], cart: [...r.cart] });
  var s = (e2) => r.favorites.some((t2) => t2.id === e2);
  var c = (e2) => r.cart.some((t2) => t2.id === e2);
  var l = (e2) => {
    let t2 = { ...e2, quantity: Math.max(1, e2.quantity ?? 1) };
    r = { ...r, favorites: a(r.favorites, t2, !s(e2.id)) }, i();
  };
  var u = (e2) => {
    let t2 = r.cart.find((t3) => t3.id === e2.id);
    r = { ...r, cart: t2 ? r.cart.map((t3) => t3.id === e2.id ? { ...t3, quantity: t3.quantity + 1 } : t3) : [...r.cart, { ...e2, quantity: Math.max(1, e2.quantity ?? 1) }] }, i();
  };
  var p = (e2) => {
    r = { ...r, cart: r.cart.filter((t2) => t2.id !== e2) }, i();
  };
  var h = (e2) => {
    if (typeof window > `u`) return () => {
    };
    let n2 = (event) => { if (event.detail) r = event.detail; else { try { r = JSON.parse(window.localStorage.getItem(e) || "null") || n(); } catch {} } e2(o()); };
    return window.addEventListener(t, n2), window.addEventListener(`storage`, n2), () => {
      window.removeEventListener(t, n2), window.removeEventListener(`storage`, n2);
    };
  };

  // static-site/assets/ProductPage.DhsL-UVR.js
  var o2 = document.querySelector(`[data-product-gallery]`);
  var s2 = o2?.querySelector(`[data-gallery-main]`);
  var c2 = [{ src: s2?.src ?? ``, alt: s2?.alt ?? `` }, ...Array.from(o2?.querySelectorAll(`[data-gallery-src]`) ?? []).map((e2) => ({ src: e2.dataset.gallerySrc ?? ``, alt: e2.dataset.galleryAlt ?? `` }))];
  var l2 = 0;
  var u2 = (e2) => {
    if (!o2 || !s2 || c2.length === 0) return;
    l2 = (e2 + c2.length) % c2.length;
    let t2 = c2[l2];
    s2.src = t2.src, s2.alt = t2.alt, o2.querySelectorAll(`[data-gallery-src]`).forEach((e3, t3) => {
      let n2 = t3 + 1 === l2;
      e3.classList.toggle(`is-active`, n2), e3.setAttribute(`aria-current`, n2 ? `true` : `false`);
    });
  };
  o2?.querySelectorAll(`[data-gallery-src]`).forEach((e2) => {
    e2.addEventListener(`click`, () => {
      u2(Array.from(o2.querySelectorAll(`[data-gallery-src]`)).indexOf(e2) + 1);
    });
  }), o2?.querySelector(`[data-gallery-previous]`)?.addEventListener(`click`, () => u2(l2 - 1)), o2?.querySelector(`[data-gallery-next]`)?.addEventListener(`click`, () => u2(l2 + 1));
  var d = document.querySelectorAll(`.product-favorite, .recommendation-favorite`);
  var f = () => d.forEach((t2) => {
    let n2 = s(t2.dataset.productId ?? ``);
    t2.setAttribute(`aria-pressed`, String(n2)), t2.classList.toggle(`is-active`, n2), t2.setAttribute(`aria-label`, `${n2 ? `\u0423\u0434\u0430\u043B\u0438\u0442\u044C` : `\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C`} ${t2.dataset.productName ?? ``} \u0432 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435`);
  });
  d.forEach((e2) => {
    e2.addEventListener(`click`, () => {
      l({ id: e2.dataset.productId ?? ``, name: e2.dataset.productName ?? ``, price: Number(e2.dataset.productPrice ?? 0), image: e2.dataset.productImage ?? ``, alt: e2.dataset.productAlt ?? `` });
    });
  }), h(f), f();
  var p2 = document.querySelector(`[data-add-to-cart]`);
  p2?.addEventListener(`click`, () => {
    let e2 = p2.dataset.productId ?? ``;
    if (e2) {
      if (c(e2)) {
        p(e2);
        return;
      }
      u({ id: e2, name: p2.dataset.productName ?? ``, price: Number(p2.dataset.productPrice ?? 0), image: p2.dataset.productImage ?? ``, alt: p2.dataset.productAlt ?? `` });
    }
  });
  var m = () => {
    let e2 = c(p2?.dataset.productId ?? ``);
    p2 && (p2.dataset.added = String(e2), p2.textContent = e2 ? `\u0412 \u041A\u041E\u0420\u0417\u0418\u041D\u0415` : `\u0414\u041E\u0411\u0410\u0412\u0418\u0422\u042C \u0412 \u041A\u041E\u0420\u0417\u0418\u041D\u0423`, p2.classList.toggle(`is-added`, e2));
  };
  h(m), m();
  var h2 = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
  var g = Array.from(document.querySelectorAll(`.accordion-trigger`));
  var _ = (e2) => {
    let t2 = e2.closest(`.accordion-item`), n2 = t2?.querySelector(`.accordion-content`);
    if (!(!t2 || !n2 || e2.getAttribute(`aria-expanded`) !== `true`)) {
      if (e2.setAttribute(`aria-expanded`, `false`), t2.classList.remove(`is-open`), n2.ontransitionend = null, h2) {
        n2.hidden = true, n2.style.height = `0px`, n2.style.opacity = `0`;
        return;
      }
      n2.hidden = false, n2.style.height = `${n2.scrollHeight}px`, n2.style.opacity = `1`, requestAnimationFrame(() => {
        n2.style.height = `0px`, n2.style.opacity = `0`;
      }), n2.ontransitionend = (e3) => {
        e3.propertyName === `height` && (n2.hidden = true, n2.ontransitionend = null);
      };
    }
  };
  var v = (e2) => {
    let t2 = e2.closest(`.accordion-item`), n2 = t2?.querySelector(`.accordion-content`);
    if (!(!t2 || !n2 || e2.getAttribute(`aria-expanded`) === `true`)) {
      if (e2.setAttribute(`aria-expanded`, `true`), t2.classList.add(`is-open`), n2.ontransitionend = null, h2) {
        n2.hidden = false, n2.style.height = `auto`, n2.style.opacity = `1`;
        return;
      }
      n2.hidden = false, n2.style.height = `0px`, n2.style.opacity = `0`, requestAnimationFrame(() => {
        n2.style.height = `${n2.scrollHeight}px`, n2.style.opacity = `1`;
      }), n2.ontransitionend = (e3) => {
        e3.propertyName === `height` && (n2.style.height = `auto`, n2.ontransitionend = null);
      };
    }
  };
  g.forEach((e2) => {
    let t2 = e2.closest(`.accordion-item`), n2 = t2?.querySelector(`.accordion-content`);
    !t2 || !n2 || (e2.getAttribute(`aria-expanded`) === `true` && (n2.hidden = false, n2.style.height = `auto`, n2.style.opacity = `1`), e2.addEventListener(`click`, () => {
      if (e2.getAttribute(`aria-expanded`) === `true`) {
        _(e2);
        return;
      }
      g.forEach((t3) => {
        t3 !== e2 && _(t3);
      }), v(e2);
    }));
  });
})();
