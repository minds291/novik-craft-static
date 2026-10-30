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
  var o = () => ({ favorites: [...r.favorites], cart: [...r.cart] });
  var d = (e2, t2) => {
    r = { ...r, cart: r.cart.flatMap((n2) => {
      if (n2.id !== e2) return [n2];
      let r2 = n2.quantity + t2;
      return r2 > 0 ? [{ ...n2, quantity: r2 }] : [];
    }) }, i();
  };
  var p = (e2) => {
    r = { ...r, cart: r.cart.filter((t2) => t2.id !== e2) }, i();
  };
  var m = () => {
    r.cart.length !== 0 && (r = { ...r, cart: [] }, i());
  };
  var h = (e2) => {
    if (typeof window > `u`) return () => {
    };
    let n2 = (event) => { if (event.detail) r = event.detail; else { try { r = JSON.parse(window.localStorage.getItem(e) || "null") || n(); } catch {} } e2(o()); };
    return window.addEventListener(t, n2), window.addEventListener(`storage`, n2), () => {
      window.removeEventListener(t, n2), window.removeEventListener(`storage`, n2);
    };
  };
  var g = (e2) => `${e2.toLocaleString(`ru-RU`)} \u20BD`;

  // static-site/assets/checkout.BPXMMES2.js
  var o2 = document.querySelector(`[data-checkout-list]`);
  var s = document.querySelector(`[data-checkout-empty]`);
  var c = document.querySelector(`[data-checkout-summary]`);
  var l = document.querySelector(`[data-checkout-total]`);
  var u = document.querySelector(`[data-checkout-total-value]`);
  var d2 = document.querySelector(`[data-checkout-item-count]`);
  var f = document.querySelector(`[data-checkout-form]`);
  var p2 = document.querySelector(`[data-checkout-form-status]`);
  var m2 = document.querySelector(`[data-checkout-submit]`);
  var h2 = false;
  var g2 = document.activeElement;
  g2 instanceof HTMLElement && g2.matches(`.checkout-form input, .checkout-form select, .checkout-form textarea`) && g2.blur();
  var _ = (e2) => e2 % 10 == 1 && e2 % 100 != 11 ? `\u043F\u043E\u0437\u0438\u0446\u0438\u044F` : e2 % 10 >= 2 && e2 % 10 <= 4 && (e2 % 100 < 10 || e2 % 100 >= 20) ? `\u043F\u043E\u0437\u0438\u0446\u0438\u0438` : `\u043F\u043E\u0437\u0438\u0446\u0438\u0439`;
  var v = (e2) => String(e2).replace(/[&<>"']/g, (e3) => ({ "&": `&amp;`, "<": `&lt;`, ">": `&gt;`, '"': `&quot;`, "'": `&#39;` })[e3] ?? e3);
  var y = () => {
    let { cart: r2 } = o();
    if (!o2 || !s || !c || !l || !u || !f) return;
    let i2 = r2.reduce((e2, t2) => e2 + t2.quantity, 0), p3 = r2.reduce((e2, t2) => e2 + t2.price * t2.quantity, 0), m3 = r2.length > 0;
    s.hidden = m3, o2.hidden = !m3, c.hidden = !m3, f.hidden = !m3, d2 && (d2.textContent = `${i2} ${_(i2)}`), u.textContent = g(p3), o2.innerHTML = r2.map((e2) => `
      <article class="checkout-item">
        <a class="checkout-item__image" href="${window.NOVIK_ROOT}catalog/${v(e2.id)}/index.html" aria-label="\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0442\u043E\u0432\u0430\u0440 ${v(e2.name)}">
          <img src="${v(e2.image)}" alt="${v(e2.alt)}">
        </a>
        <div class="checkout-item__info">
          <h3><a href="${window.NOVIK_ROOT}catalog/${v(e2.id)}/index.html">${v(e2.name)}</a></h3>
          <p>${g(e2.price)}</p>
        </div>
        <div class="checkout-item__controls">
          <div class="checkout-quantity" aria-label="\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0442\u043E\u0432\u0430\u0440\u0430 ${v(e2.name)}">
            <button type="button" data-quantity-action="decrease" data-quantity-id="${v(e2.id)}" aria-label="\u0423\u043C\u0435\u043D\u044C\u0448\u0438\u0442\u044C \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E ${v(e2.name)}">\u2212</button>
            <span aria-live="polite">${e2.quantity}</span>
            <button type="button" data-quantity-action="increase" data-quantity-id="${v(e2.id)}" aria-label="\u0423\u0432\u0435\u043B\u0438\u0447\u0438\u0442\u044C \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E ${v(e2.name)}">+</button>
          </div>
          <button class="checkout-remove" type="button" data-remove-checkout="${v(e2.id)}">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>
        </div>
        <strong class="checkout-item__subtotal">${g(e2.price * e2.quantity)}</strong>
      </article>
    `).join(``), o2.querySelectorAll(`[data-quantity-action]`).forEach((e2) => {
      e2.addEventListener(`click`, () => d(e2.dataset.quantityId ?? ``, e2.dataset.quantityAction === `increase` ? 1 : -1));
    }), o2.querySelectorAll(`[data-remove-checkout]`).forEach((t2) => {
      t2.addEventListener(`click`, () => p(t2.dataset.removeCheckout ?? ``));
    });
  };
  var b = () => {
    f?.querySelectorAll(`[data-field-error]`).forEach((e2) => {
      e2.textContent = ``;
    }), f?.querySelectorAll(`[aria-invalid="true"]`).forEach((e2) => e2.removeAttribute(`aria-invalid`));
  };
  f?.addEventListener(`submit`, async (e2) => {
    if (e2.preventDefault(), !f.reportValidity() || h2) return;
    b(), h2 = true, p2 && (p2.textContent = `\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C \u0442\u043E\u0432\u0430\u0440\u044B \u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C \u0437\u0430\u044F\u0432\u043A\u0443\u2026`), m2 && (m2.disabled = true);
    let t2 = new FormData(f), r2 = o().cart;
    try {
      let n2 = { orderNumber: "DEMO" };
      m();
      try {
        sessionStorage.setItem(`novik-order-number`, n2.orderNumber ?? ``);
      } catch {
      }
      window.location.assign(`${window.NOVIK_ROOT}order-success/index.html`);
    } catch {
      p2 && (p2.textContent = `\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u0432\u044F\u0437\u0430\u0442\u044C\u0441\u044F \u0441 \u0441\u0435\u0440\u0432\u0435\u0440\u043E\u043C. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437.`);
    } finally {
      h2 = false, m2 && (m2.disabled = false);
    }
  }), h(y), y();
})();

