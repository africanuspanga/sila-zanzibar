// Admin-side team (agents) reads — service role, includes unpublished rows.

import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseAdminConfigured } from "@/lib/supabase/env";

export interface TeamRow {
  id: string;
  name: string;
  title: string;
  base: string;
  image: string | null;
  published: boolean;
  sort_order: number;
  created_at: string;
}

export const TEAM_BASES = ["Zanzibar", "Mainland Tanzania"] as const;

export async function listTeam(): Promise<TeamRow[]> {
  if (!isSupabaseAdminConfigured) return [];
  try {
    const admin = getSupabaseAdminClient();
    const { data } = await admin
      .from("team_members")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    return (data ?? []) as TeamRow[];
  } catch {
    return [];
  }
}

export async function getTeamMember(id: string): Promise<TeamRow | null> {
  if (!isSupabaseAdminConfigured) return null;
  try {
    const admin = getSupabaseAdminClient();
    const { data } = await admin.from("team_members").select("*").eq("id", id).maybeSingle();
    return (data as TeamRow) ?? null;
  } catch {
    return null;
  }
}
