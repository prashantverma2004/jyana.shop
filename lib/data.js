/* =====================================================================
   JYANA — EDITABLE SITE CONTENT
   ---------------------------------------------------------------------
   Everything customers read lives here: prices, product copy,
   ingredients, announcement bar, contact details.
   Edit the values, save, refresh. No build step needed.

   Anything marked  // TODO  is a placeholder that should be replaced
   with real, verified information before going live.
   ===================================================================== */

export const JYANA = {

  /* ---------- Store settings ---------- */
  store: {
    name: "JYANA",
    tagline: "Personal Care",
    currency: "₹",              // TODO: change if you sell in another currency
    email: "hello@yourdomain.com", // TODO: real customer-care email
    phone: "",                  // TODO: optional, e.g. "+91 00000 00000" (hidden when empty)
    instagram: "",              // TODO: optional, full URL (hidden when empty)
    address: ""                 // TODO: optional registered address (hidden when empty)
  },

  /* ---------- Announcement bar (rotates if more than one) ---------- */
  announcements: [
    "Two roll-ons. Made for everyday confidence.",
    "Now available — Underarm Roll On & Active Sweat Guard"
  ],

  /* ---------- Products ----------
     image   : path to the real product photo
     gallery : extra views of the SAME photo, cropped & zoomed
               pos  = focal point (CSS object-position)
               zoom = how far to zoom in (1 = full photo)
  -------------------------------------------------------------- */
  products: [
    {
      id: "underarm-roll-on",
      name: "Underarm Roll On",
      subtitle: "For All Skin Types",
      tagline: "Long lasting freshness & confidence",
      price: 349,               // TODO: real price
      compareAt: null,          // optional strike-through price, e.g. 399
      size: "50 ml",
      tone: "ivory",            // card/background tone: "ivory" or "sage"
      image: "/images/underarm-roll-on.jpg",
      gallery: [
        { pos: "50% 50%", zoom: 1,   label: "Pack & bottle" },
        { pos: "73% 52%", zoom: 1.9, label: "Bottle" },
        { pos: "30% 48%", zoom: 1.7, label: "Carton" },
        { pos: "70% 72%", zoom: 2.6, label: "Detail" }
      ],
      short: "Your everyday roll-on, made for all skin types. Controls odour and sweat for long lasting freshness.",
      description: "A clean underarm roll-on designed for daily use and made for all skin types. It helps control odour and sweat, leaving you feeling fresh and confident from morning to evening — without fuss.",
      benefits: [
        { icon: "drop", title: "Controls odour & sweat", text: "Helps keep underarms feeling dry and fresh through the day." },
        { icon: "leaf", title: "Gentle & skin friendly", text: "Made for all skin types, for comfortable everyday wear." },
        { icon: "sun",  title: "Long lasting freshness", text: "A light layer that keeps you feeling confident, all day." }
      ],
      keyIngredients: [],       // TODO: add hero ingredients, same format as the Active Sweat Guard below
      ingredientsFull: "Full ingredient list coming soon. Please refer to the pack for complete ingredient information.", // TODO
      howToUse: [
        "Apply to clean, dry underarms.",
        "Roll on two to three strokes.",
        "Allow a moment to dry before dressing.",
        "Use daily, or as needed."
      ],
      caution: "For external use only. Avoid applying on broken or irritated skin. Discontinue use if irritation occurs. Keep out of reach of children."
    },
    {
      id: "active-sweat-guard",
      name: "Active Sweat Guard",
      subtitle: "Natural Deodorant Roll-On",
      tagline: "Potash Alum + Witch Hazel + Tea Tree Oil",
      price: 399,               // TODO: real price
      compareAt: null,
      size: "50 ml",
      tone: "sage",
      image: "/images/active-sweat-guard.jpg",
      gallery: [
        { pos: "50% 50%", zoom: 1,   label: "Pack & bottle" },
        { pos: "74% 50%", zoom: 1.8, label: "Bottle" },
        { pos: "28% 45%", zoom: 1.7, label: "Carton" },
        { pos: "30% 72%", zoom: 2.4, label: "Claims" }
      ],
      short: "A natural deodorant roll-on with potash alum, witch hazel and tea tree oil for active days.",
      description: "Made for active days. Active Sweat Guard pairs potash alum with witch hazel and tea tree oil in a natural deodorant roll-on that helps control excess sweat and odour, and fights odour-causing bacteria.",
      benefits: [
        { icon: "drop",   title: "Controls excess sweat & odour", text: "Built for busy, active days when you need more." },
        { icon: "shield", title: "Fights odour-causing bacteria", text: "Targets odour where it starts, not just the scent of it." },
        { icon: "leaf",   title: "Natural deodorant", text: "A short, readable list of hero ingredients up front." }
      ],
      keyIngredients: [
        { name: "Potash Alum", text: "A mineral salt long used in traditional deodorant care." },
        { name: "Witch Hazel", text: "A botanical extract valued for its light, toning feel on skin." },
        { name: "Tea Tree Oil", text: "An essential oil with a fresh, clean, herbaceous character." }
      ],
      ingredientsFull: "Key ingredients: Potash Alum, Witch Hazel, Tea Tree Oil. Full ingredient list coming soon — please refer to the pack for complete ingredient information.", // TODO
      howToUse: [
        "Apply to clean, dry underarms.",
        "Roll on two to three strokes.",
        "Allow a moment to dry before dressing.",
        "Reapply after workouts or as needed."
      ],
      caution: "For external use only. Avoid applying on broken or freshly shaved skin. Discontinue use if irritation occurs. Keep out of reach of children."
    }
  ],
};
