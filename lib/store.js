import { JYANA } from "./data";

export const store = JYANA.store;
export const products = JYANA.products;
export const announcements = JYANA.announcements;

export const money = (n) => store.currency + Number(n).toLocaleString("en-IN");
export const getProduct = (id) => products.find((p) => p.id === id);
export const otherProduct = (id) => products.find((p) => p.id !== id);
export const productUrl = (p) => `/products/${p.id}`;
