import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function getCurrentUserClaims() {
  const supabase = await createClient();
  if (!supabase) {
    return null;
  }
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    return null;
  }

  return data.claims;
}

export async function isAdminUser() {
  const claims = await getCurrentUserClaims();

  if (!claims?.sub) {
    return false;
  }

  const supabase = await createClient();
  if (!supabase) {
    return false;
  }
  const { data, error } = await supabase
    .from("admin_profiles")
    .select("user_id")
    .eq("user_id", claims.sub)
    .maybeSingle();

  if (error) {
    console.error("Failed to check admin profile", error.message);
    return false;
  }

  return Boolean(data);
}

export async function requireAdmin() {
  const claims = await getCurrentUserClaims();

  if (!claims) {
    redirect("/admin/login");
  }

  const allowed = await isAdminUser();

  if (!allowed) {
    redirect("/admin/login?error=access-denied");
  }

  return claims;
}
