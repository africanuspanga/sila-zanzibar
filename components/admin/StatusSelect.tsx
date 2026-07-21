"use client";

// A status dropdown that submits a server action the moment it changes.
// The colour follows the selected value so it reads like a live status pill.
export function StatusSelect({
  id,
  current,
  options,
  action,
}: {
  id: string;
  current: string;
  options: { value: string; label: string }[];
  action: (formData: FormData) => void;
}) {
  const tone: Record<string, string> = {
    new: "border-navy-200 bg-navy-50 text-navy-700",
    contacted: "border-amber-200 bg-amber-50 text-amber-700",
    closed: "border-sand-300 bg-sand-100 text-muted",
    pending_review: "border-amber-200 bg-amber-50 text-amber-700",
    approved: "border-emerald-200 bg-emerald-50 text-emerald-700",
    rejected: "border-crimson-200 bg-crimson-50 text-crimson-700",
  };
  return (
    <form action={action} className="inline-flex">
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={current}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className={`cursor-pointer rounded-full border px-2.5 py-1 text-xs font-medium outline-none focus:ring-2 focus:ring-navy-500/20 ${
          tone[current] ?? "border-sand-300 bg-white text-navy-700"
        }`}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </form>
  );
}
