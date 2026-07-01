"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

interface NavItem {
  href: string;
  label: string;
}

export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="order-3 flex w-full items-center gap-1 overflow-x-auto md:order-none md:w-auto">
      {items.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

        return (
          <Button
            key={item.href}
            asChild
            variant="ghost"
            size="sm"
            className={
              isActive
                ? "bg-white/10 text-cyan-300 dark:bg-white/10 dark:text-cyan-300"
                : ""
            }
          >
            <Link href={item.href}>
              {item.label}
              {isActive && (
                <span className="sr-only"> (current page)</span>
              )}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}
