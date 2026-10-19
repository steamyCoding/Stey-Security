"use client";

import { useSyncExternalStore } from "react";

type Preference = "system" | "light" | "dark";
const OPTIONS: { value: Preference; label: string }[] = [
  { value: "system", label: "Auto" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];
const STORAGE_KEY = "stey-theme";
const CHANGE_EVENT = "stey-theme-change";

function readStored(): Preference {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "light" || v === "dark" ? v : "system";
  } catch {
    return "system";
  }
}

function apply(preference: Preference) {
  const dark =
    preference === "dark" ||
    (preference === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  const root = document.documentElement;
  root.setAttribute("data-theme", dark ? "dark" : "light");
  root.setAttribute("data-theme-preference", preference);
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystemChange = () => {
    if (readStored() === "system") apply("system");
  };
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  media.addEventListener("change", onSystemChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
    media.removeEventListener("change", onSystemChange);
  };
}

export function ThemeToggle() {
  // Server and first client render both show "system"; the stored value applies right after hydration.
  const preference = useSyncExternalStore<Preference>(subscribe, readStored, () => "system");

  function choose(next: Preference) {
    apply(next);
    try {
      if (next === "system") localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage unavailable (private mode, blocked): the choice still applies for this page view.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  return (
    <div role="group" aria-label="Colour theme" className="flex items-center border border-line font-mono text-[0.68rem] uppercase tracking-[0.12em]">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={preference === option.value}
          onClick={() => choose(option.value)}
          className={`px-2.5 py-1.5 transition-colors ${
            preference === option.value ? "bg-inverse-bg text-inverse-text" : "text-muted hover:text-ink"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
