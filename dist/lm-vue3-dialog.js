import { defineComponent as b, mergeModels as g, useCssVars as w, useModel as y, ref as d, watch as h, onMounted as k, onBeforeUnmount as M, openBlock as D, createElementBlock as _, normalizeClass as u, createElementVNode as v, renderSlot as T } from "vue";
const B = /* @__PURE__ */ b({
  __name: "Dialog",
  props: /* @__PURE__ */ g({
    width: { default: () => "24rem" },
    maxWidth: { default: () => "calc(100vw - 4rem)" },
    animationTime: { default: () => 150 },
    backdropClass: {},
    contentClass: {}
  }, {
    open: { type: Boolean, required: !0 },
    openModifiers: {}
  }),
  emits: /* @__PURE__ */ g(["update:open", "open:begin", "open:end", "close:begin", "close:end"], ["update:open"]),
  setup(a, { emit: s }) {
    w((e) => ({
      "16665a79": e.width,
      "1b87092f": e.maxWidth,
      "3119e20b": e.animationTime + "ms"
    }));
    const t = y(a, "open"), o = s, l = a, n = d(), i = d(!1), c = d(!1);
    h(t, (e) => e ? C() : r());
    function p(e) {
      return new Promise((f) => setTimeout(f, Math.max(e, 0)));
    }
    async function C() {
      var e;
      try {
        o("open:begin"), i.value = !0, (e = n.value) == null || e.showModal(), await p(l.animationTime), o("open:end");
      } finally {
        i.value = !1;
      }
    }
    async function r() {
      var e;
      try {
        o("close:begin"), c.value = !0, await p(l.animationTime - 10), (e = n.value) == null || e.close(), o("update:open", !1), o("close:end");
      } finally {
        c.value = !1;
      }
    }
    function m(e) {
      e.preventDefault(), e.stopImmediatePropagation(), i.value || r();
    }
    return k(() => {
      var e;
      (e = n.value) == null || e.addEventListener("cancel", m);
    }), M(() => {
      var e;
      (e = n.value) == null || e.removeEventListener("cancel", m);
    }), (e, f) => (D(), _("dialog", {
      class: u(["dialog", { isClosing: c.value }]),
      ref_key: "dialog",
      ref: n
    }, [
      v("div", {
        class: u(["dialog-backdrop", e.backdropClass]),
        onClick: r
      }, null, 2),
      v("div", {
        class: u(["dialog-content", e.contentClass])
      }, [
        T(e.$slots, "default", {}, void 0, !0)
      ], 2)
    ], 2));
  }
}), E = (a, s) => {
  const t = a.__vccOpts || a;
  for (const [o, l] of s)
    t[o] = l;
  return t;
}, I = /* @__PURE__ */ E(B, [["__scopeId", "data-v-a7333af9"]]);
export {
  I as LMDialog
};
