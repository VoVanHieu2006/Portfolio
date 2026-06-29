import type { Locale } from "@/lib/i18n";

export function splitList(value: FormDataEntryValue | null) {
  if (!value || typeof value !== "string") {
    return [];
  }

  return value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export function getRequiredString(formData: FormData, key: string) {
  const value = getString(formData, key);
  if (!value) {
    throw new Error(`${key} is required`);
  }
  return value;
}

export function getNumber(formData: FormData, key: string) {
  const value = formData.get(key);
  if (typeof value !== "string" || value.trim() === "") {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function isChecked(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

export function formatDate(date: string | null | undefined, locale: Locale = "vi") {
  if (!date) {
    return locale === "vi" ? "Chưa đặt ngày" : "No date";
  }

  return new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export function absoluteUrl(url: string | null | undefined) {
  if (!url) {
    return null;
  }

  const trimmed = url.trim();
  if (!trimmed) {
    return null;
  }

  if (
    /^(https?:)?\/\//i.test(trimmed) ||
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("/")
  ) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export function isImageUrl(url: string | null | undefined) {
  return Boolean(url?.match(/\.(png|jpe?g|webp|gif|avif)(\?.*)?$/i));
}

export function normalizeSkillGroup(category: string | null | undefined) {
  const value = (category ?? "").toLowerCase();

  if (
    value.includes("soft") ||
    value.includes("mềm") ||
    value.includes("mem") ||
    value.includes("communication") ||
    value.includes("leadership")
  ) {
    return "soft" as const;
  }

  return "hard" as const;
}

type LocalizedRecord = Record<string, unknown>;

export function localizedText(
  record: LocalizedRecord | null | undefined,
  key: string,
  locale: Locale,
) {
  if (!record) {
    return null;
  }

  const localized = record[`${key}_${locale}`];
  const fallback = record[key];

  return typeof localized === "string" && localized.trim()
    ? localized
    : typeof fallback === "string" && fallback.trim()
      ? fallback
      : null;
}

export function localizedList(
  record: LocalizedRecord | null | undefined,
  key: string,
  locale: Locale,
) {
  if (!record) {
    return [];
  }

  const localized = record[`${key}_${locale}`];
  const fallback = record[key];

  if (Array.isArray(localized) && localized.length) {
    return localized.filter((item): item is string => typeof item === "string" && Boolean(item.trim()));
  }

  if (Array.isArray(fallback)) {
    return fallback.filter((item): item is string => typeof item === "string" && Boolean(item.trim()));
  }

  return [];
}
