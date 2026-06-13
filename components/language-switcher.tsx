"use client";

import { useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";

type Locale = "vi" | "en";
const localeCookieName = "portfolio_locale";

export function LanguageSwitcher({
  locale,
  compact = false,
}: {
  locale: Locale;
  compact?: boolean;
}) {
  const router = useRouter();

  function setLocale(nextLocale: Locale) {
    document.cookie = `${localeCookieName}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] p-1">
      {!compact && <Languages className="mx-1 h-4 w-4 text-slate-400" />}
      {(["vi", "en"] as const).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLocale(item)}
          className={cn(
            "h-7 rounded px-2 text-xs font-medium transition",
            locale === item
              ? "bg-cyan-400 text-slate-950"
              : "text-slate-300 hover:bg-white/10 hover:text-white",
          )}
          aria-pressed={locale === item}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
