import it from '../i18n/it.js';
import en from '../i18n/en.js';

const dictionaries = { it, en };
export const languages = Object.keys(dictionaries);

const STORAGE_KEY = 'crelugia:lang';
const listeners = new Set();

let current = detect();

function detect() {
  const fromUrl = new URLSearchParams(location.search).get('lang');
  if (languages.includes(fromUrl)) return fromUrl;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (languages.includes(saved)) return saved;
  } catch {
    /* storage non disponibile: si prosegue con la lingua del browser */
  }
  const browser = (navigator.language || 'it').slice(0, 2);
  return languages.includes(browser) ? browser : 'it';
}

export const getLang = () => current;

export function setLang(lang) {
  if (!languages.includes(lang) || lang === current) return;
  current = lang;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* ignorato */
  }
  listeners.forEach((fn) => fn(lang));
}

export function onLangChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/**
 * Traduce una chiave puntata ("hero.title"). Supporta interpolazione {var}.
 * Restituisce la chiave stessa se manca, così gli errori sono visibili.
 */
export function t(key, vars) {
  const value = key.split('.').reduce((node, part) => node?.[part], dictionaries[current]);
  if (typeof value !== 'string') return value ?? key;
  return vars ? value.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? '') : value;
}
