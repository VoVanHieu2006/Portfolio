"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function MediaUploader({
  labels,
}: {
  labels: {
    upload: string;
    uploading: string;
    chooseFile: string;
    publicUrl: string;
  };
}) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setUrl("");

    const form = new FormData(event.currentTarget);
    const file = form.get("file");

    if (!(file instanceof File) || !file.size) {
      setError(labels.chooseFile);
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const extension = file.name.split(".").pop();
    const path = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage
      .from("portfolio-media")
      .upload(path, file, { upsert: false });

    if (uploadError) {
      setError(uploadError.message);
      setLoading(false);
      return;
    }

    const { data } = supabase.storage.from("portfolio-media").getPublicUrl(path);
    setUrl(data.publicUrl);
    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        name="file"
        type="file"
        accept="image/*,.pdf"
        className="w-full rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white"
      />
      <Button disabled={loading} className="bg-cyan-400 text-slate-950 hover:bg-cyan-300">
        <Upload /> {loading ? labels.uploading : labels.upload}
      </Button>
      {error && <p className="text-sm text-red-300">{error}</p>}
      {url && (
        <div className="rounded-md border border-cyan-300/30 bg-cyan-300/10 p-3">
          <p className="text-sm text-cyan-100">{labels.publicUrl}</p>
          <input readOnly value={url} className="mt-2 w-full rounded bg-slate-950 px-3 py-2 text-sm text-white" />
        </div>
      )}
    </form>
  );
}
