"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { isAdmin } from "@/lib/admin/guard";

const ENQUIRY_STATUSES = ["new", "contacted", "closed"];
const SUBMISSION_STATUSES = ["pending_review", "approved", "rejected"];

export async function updateEnquiryStatus(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !ENQUIRY_STATUSES.includes(status)) return;
  const admin = getSupabaseAdminClient();
  await admin.from("enquiries").update({ status }).eq("id", id);
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
}

export async function updateSubmissionStatus(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !SUBMISSION_STATUSES.includes(status)) return;
  const admin = getSupabaseAdminClient();
  await admin.from("property_submissions").update({ status }).eq("id", id);
  revalidatePath("/admin/submissions");
  revalidatePath("/admin");
}
