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
  var f = (e2) => {
    r = { ...r, favorites: r.favorites.filter((t2) => t2.id !== e2) }, i();
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
  var g = (e2) => `${e2.toLocaleString(`ru-RU`)} \u20BD`;

  // static-site/assets/FavoritesCartSidebar.B6Jwl61F.js
  var o2 = document.querySelector(`[data-store-sidebar]`);
  var s = o2?.querySelector(`.store-sidebar__panel`);
  var c = o2?.querySelector(`[data-sidebar-title]`);
  var l = o2?.querySelector(`[data-sidebar-empty]`);
  var u = o2?.querySelector(`[data-sidebar-list]`);
  var d2 = o2?.querySelector(`[data-sidebar-total]`);
  var f2 = o2?.querySelector(`[data-sidebar-total-value]`);
  var p2 = `favorites`;
  var m = null;
  var h2 = () => {
    let e2 = o(), t2 = e2.favorites.length, r2 = e2.cart.reduce((e3, t3) => e3 + t3.quantity, 0);
    document.querySelectorAll(`[data-favorites-count]`).forEach((e3) => {
      e3.textContent = String(t2);
    }), document.querySelectorAll(`[data-store-count]`).forEach((e3) => {
      e3.textContent = String(r2);
    }), document.querySelectorAll(`[data-sidebar-open="favorites"]`).forEach((e3) => {
      e3.setAttribute(`aria-label`, `\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435, ${t2} \u0442\u043E\u0432\u0430\u0440\u043E\u0432`);
    }), document.querySelectorAll(`[data-sidebar-open="cart"]`).forEach((e3) => {
      e3.setAttribute(`aria-label`, `\u041A\u043E\u0440\u0437\u0438\u043D\u0430, ${r2} \u0442\u043E\u0432\u0430\u0440\u043E\u0432`);
    }), document.querySelectorAll(`[data-sidebar-open="favorites"] img`).forEach((t3) => {
      t3.classList.toggle(`is-store-active`, e2.favorites.length > 0);
    });
  };
  var g2 = () => {
    if (h2(), !u || !l || !c || !d2 || !f2) return;
    let r2 = o(), o3 = r2[p2];
    c.textContent = p2 === `favorites` ? `\u0418\u0417\u0411\u0420\u0410\u041D\u041D\u041E\u0415` : `\u041A\u041E\u0420\u0417\u0418\u041D\u0410`, l.hidden = o3.length > 0, u.innerHTML = o3.map((e2) => `
      <article class="store-sidebar__item">
        <img src="${e2.image}" alt="${e2.alt}">
        <div class="store-sidebar__item-info">
          <h3>${e2.name}</h3>
          <p>${g(e2.price)}</p>
          ${p2 === `cart` ? `<div class="store-sidebar__quantity"><button type="button" data-quantity-action="decrease" data-quantity-id="${e2.id}" aria-label="\u0423\u043C\u0435\u043D\u044C\u0448\u0438\u0442\u044C \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E">\u2212</button><span>${e2.quantity}</span><button type="button" data-quantity-action="increase" data-quantity-id="${e2.id}" aria-label="\u0423\u0432\u0435\u043B\u0438\u0447\u0438\u0442\u044C \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E">+</button></div>` : ``}
        </div>
        <button class="store-sidebar__remove" type="button" data-remove-id="${e2.id}" aria-label="\u0423\u0434\u0430\u043B\u0438\u0442\u044C ${e2.name}">\xD7</button>
      </article>
    `).join(``), u.querySelectorAll(`[data-remove-id]`).forEach((t2) => {
      t2.addEventListener(`click`, () => {
        let n2 = t2.dataset.removeId;
        n2 && (p2 === `favorites` ? f(n2) : p(n2));
      });
    }), u.querySelectorAll(`[data-quantity-action]`).forEach((e2) => {
      e2.addEventListener(`click`, () => d(e2.dataset.quantityId ?? ``, e2.dataset.quantityAction === `increase` ? 1 : -1));
    });
    let s2 = r2.cart.reduce((e2, t2) => e2 + t2.price * t2.quantity, 0);
    d2.hidden = p2 !== `cart` || r2.cart.length === 0, f2.textContent = g(s2);
  };
  var _ = () => {
    o2 && (o2.classList.remove(`is-open`), o2.setAttribute(`aria-hidden`, `true`), document.body.classList.remove(`store-sidebar-open`), window.setTimeout(() => {
      o2.classList.contains(`is-open`) || (o2.hidden = true);
    }, 320), m?.focus());
  };
  var v = (e2, t2) => {
    o2 && (p2 = e2, m = t2, g2(), o2.hidden = false, requestAnimationFrame(() => {
      o2.classList.add(`is-open`), o2.setAttribute(`aria-hidden`, `false`), document.body.classList.add(`store-sidebar-open`), s?.focus();
    }));
  };
  document.querySelectorAll(`[data-sidebar-open]`).forEach((e2) => {
    e2.addEventListener(`click`, () => v(e2.dataset.sidebarOpen === `cart` ? `cart` : `favorites`, e2));
  }), o2?.querySelectorAll(`[data-sidebar-close]`).forEach((e2) => e2.addEventListener(`click`, _)), document.addEventListener(`keydown`, (e2) => {
    if (e2.key === `Escape` && o2?.classList.contains(`is-open`) && _(), e2.key !== `Tab` || !o2?.classList.contains(`is-open`) || !s) return;
    let t2 = Array.from(s.querySelectorAll(`button, [href], input, [tabindex]:not([tabindex="-1"])`)).filter((e3) => !e3.hasAttribute(`disabled`));
    if (t2.length === 0) return;
    let n2 = t2[0], r2 = t2[t2.length - 1];
    e2.shiftKey && document.activeElement === n2 ? (e2.preventDefault(), r2.focus()) : !e2.shiftKey && document.activeElement === r2 && (e2.preventDefault(), n2.focus());
  }), h(g2), g2();
})();
