function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function inlineMarkdown(value: string) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
}

export function Markdown({ content }: { content: string }) {
  const html = content
    .split(/\n{2,}/)
    .map((block) => {
      const trimmed = block.trim();

      if (trimmed.startsWith("### ")) {
        return `<h3>${inlineMarkdown(trimmed.slice(4))}</h3>`;
      }
      if (trimmed.startsWith("## ")) {
        return `<h2>${inlineMarkdown(trimmed.slice(3))}</h2>`;
      }
      if (trimmed.startsWith("# ")) {
        return `<h1>${inlineMarkdown(trimmed.slice(2))}</h1>`;
      }
      if (trimmed.startsWith("- ")) {
        const items = trimmed
          .split("\n")
          .filter((line) => line.startsWith("- "))
          .map((line) => `<li>${inlineMarkdown(line.slice(2))}</li>`)
          .join("");
        return `<ul>${items}</ul>`;
      }
      if (trimmed.startsWith("```")) {
        const code = trimmed.replace(/^```[a-z]*\n?/i, "").replace(/```$/, "");
        return `<pre><code>${escapeHtml(code)}</code></pre>`;
      }

      return `<p>${inlineMarkdown(trimmed).replace(/\n/g, "<br />")}</p>`;
    })
    .join("");

  return (
    <div
      className="prose prose-invert max-w-none prose-a:text-cyan-300 prose-code:rounded prose-code:bg-white/10 prose-code:px-1 prose-code:py-0.5 prose-pre:border prose-pre:border-white/10 prose-pre:bg-slate-950/80"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
