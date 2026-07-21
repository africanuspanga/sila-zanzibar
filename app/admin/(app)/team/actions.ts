"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { isAdmin } from "@/lib/admin/guard";
import { TEAM_BASES } from "@/lib/admin/team";

export type ActionResult = { ok?: boolean; error?: string };

export type TeamInput = {
  id?: string;
  name: string;
  title: string;
  base: string;
  image?: string;
  published: boolean;
  sort_order?: number | string;
};

function num(v: unknown, def = 0): number {
  if (v === "" || v === null || v === undefined) return def;
  const n = Number(v);
  return Number.isNaN(n) ? def : n;
}

function revalidate() {
  revalidatePath("/team");
  revalidatePath("/admin/team");
  revalidatePath("/admin");
}

export async function saveTeamMember(input: TeamInput): Promise<ActionResult> {
  if (!(await isAdmin())) return { error: "Not authorised" };
  if (!input.name?.trim() || !input.title?.trim()) return { error: "Name and title are required" };
  const base = (TEAM_BASES as readonly string[]).includes(input.base) ? input.base : "Zanzibar";
  const record = {
    name: input.name.trim(),
    title: input.title.trim(),
    base,
    image: input.image || null,
    published: !!input.published,
    sort_order: num(input.sort_order, 0),
  };
  try {
    const admin = getSupabaseAdminClient();
    const res = input.id
      ? await admin.from("team_members").update(record).eq("id", input.id)
      : await admin.from("team_members").insert(record);
    if (res.error) return { error: res.error.message };
    revalidate();
    return { ok: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Save failed" };
  }
}

export async function deleteTeamMember(id: string): Promise<ActionResult> {
  if (!(await isAdmin())) return { error: "Not authorised" };
  try {
    const admin = getSupabaseAdminClient();
    const { error } = await admin.from("team_members").delete().eq("id", id);
    if (error) return { error: error.message };
    revalidate();
    return { ok: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Delete failed" };
  }
}

export async function toggleTeamPublished(id: string, published: boolean): Promise<ActionResult> {
  if (!(await isAdmin())) return { error: "Not authorised" };
  try {
    const admin = getSupabaseAdminClient();
    const { error } = await admin.from("team_members").update({ published }).eq("id", id);
    if (error) return { error: error.message };
    revalidate();
    return { ok: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Update failed" };
  }
}
