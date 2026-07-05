"use client";

import { useEffect, useState } from "react";

export function AgentAssignmentCell({
  agentId,
  assignedTo,
  emailOptions,
  onAssign,
}: {
  agentId: string;
  assignedTo: string;
  emailOptions: string[];
  onAssign: (agentIds: string[], assignedTo: string | null) => Promise<void>;
}) {
  const [value, setValue] = useState(assignedTo);
  const [saving, setSaving] = useState(false);

  useEffect(() => setValue(assignedTo), [assignedTo]);

  const options =
    assignedTo && !emailOptions.includes(assignedTo)
      ? [assignedTo, ...emailOptions]
      : emailOptions;

  return (
    <div className="relative min-w-72">
      <label className="sr-only" htmlFor={`assigned-to-${agentId}`}>
        Přiřazeno uživateli pro agenta {agentId}
      </label>
      <select
        id={`assigned-to-${agentId}`}
        className="ui-input min-w-72 pr-10"
        value={value}
        disabled={saving}
        onChange={async (event) => {
          const nextValue = event.target.value;
          setValue(nextValue);
          setSaving(true);
          try {
            await onAssign([agentId], nextValue || null);
          } catch {
            setValue(assignedTo);
          } finally {
            setSaving(false);
          }
        }}
      >
        <option value="">Nepřiřazeno</option>
        {options.map((email) => (
          <option key={email} value={email}>
            {email}
          </option>
        ))}
      </select>
      {saving && (
        <span className="pointer-events-none absolute right-9 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
          …
        </span>
      )}
    </div>
  );
}
