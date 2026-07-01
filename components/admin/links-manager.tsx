"use client";

import { useState } from "react";
import { Plus, GripVertical } from "lucide-react";
import type { ProjectLink } from "@/lib/portfolio/types";

interface LinksManagerProps {
  links: ProjectLink[];
  labels: {
    links: string;
    label: string;
    url: string;
    icon: string;
    deleteText: string;
    addLinkText: string;
    placeholderUrl: string;
    placeholderLabel: string;
  };
}

export function LinksManager({ links, labels }: LinksManagerProps) {
  const [linkItems, setLinkItems] = useState<ProjectLink[]>(
    links && links.length > 0
      ? links
      : [{ label: "", label_vi: "", label_en: "", url: "", icon: "link2" }]
  );

  const addLink = () => {
    setLinkItems([
      ...linkItems,
      { label: "", label_vi: "", label_en: "", url: "", icon: "link2" },
    ]);
  };

  const removeLink = (index: number) => {
    setLinkItems(linkItems.filter((_, i) => i !== index));
  };

  const updateLink = (index: number, field: keyof ProjectLink, value: string) => {
    setLinkItems(
      linkItems.map((item, i) => {
        if (i !== index) return item;
        const updated = { ...item, [field]: value };
        if (field === "label_vi") {
          updated.label = value;
        } else if (field === "label_en" && !updated.label_vi) {
          updated.label = value;
        }
        return updated;
      })
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-slate-300">{labels.links}</h3>
      <div className="space-y-3">
        {linkItems.map((link, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 rounded-lg border border-white/10 bg-white/[0.02]"
          >
            <GripVertical className="mt-1 h-5 w-5 text-slate-500 cursor-grab" />
            <div className="flex-1 grid gap-3 md:grid-cols-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  {labels.label} (VI)
                </label>
                <input
                  type="hidden"
                  name={`links[${index}].label`}
                  value={link.label || ""}
                />
                <input
                  type="text"
                  name={`links[${index}].label_vi`}
                  value={link.label_vi || ""}
                  placeholder={labels.placeholderLabel}
                  className="w-full rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
                  onChange={(e) => updateLink(index, "label_vi", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  {labels.label} (EN)
                </label>
                <input
                  type="text"
                  name={`links[${index}].label_en`}
                  value={link.label_en || ""}
                  placeholder={labels.placeholderLabel}
                  className="w-full rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
                  onChange={(e) => updateLink(index, "label_en", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  {labels.url}
                </label>
                <input
                  type="url"
                  name={`links[${index}].url`}
                  value={link.url || ""}
                  placeholder={labels.placeholderUrl}
                  className="w-full rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
                  onChange={(e) => updateLink(index, "url", e.target.value)}
                />
              </div>
              <div className="md:col-span-3 grid gap-3 md:grid-cols-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    {labels.icon}
                  </label>
                  <select
                    name={`links[${index}].icon`}
                    value={link.icon || "link2"}
                    className="w-full rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
                    onChange={(e) => updateLink(index, "icon", e.target.value)}
                  >
                    <option value="github">GitHub</option>
                    <option value="link2">Link</option>
                    <option value="external-link">External</option>
                    <option value="book-open">Docs</option>
                    <option value="globe">Website</option>
                    <option value="code">Code</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removeLink(index)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    {labels.deleteText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addLink}
        className="flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200"
      >
        <Plus className="h-4 w-4" /> {labels.addLinkText}
      </button>
    </div>
  );
}
