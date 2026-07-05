"use client";

import { useEffect, useState } from "react";
import { normalizedKey } from "./utils";

export function EditableAgentCell({
  agentId,
  column,
  value,
  onUpdate,
}: {
  agentId: string;
  column: string;
  value: unknown;
  onUpdate: (agentId: string, column: string, value: unknown) => Promise<void>;
}) {
  const original = value == null ? "" : String(value);
  const [draft, setDraft] = useState(original);
  const [saving, setSaving] = useState(false);
  const key = normalizedKey(column);

  useEffect(() => setDraft(original), [original]);

  const save = async () => {
    if (draft === original) return;
    setSaving(true);
    try {
      const nextValue =
        key === "isreported"
          ? draft === "true"
          : (key === "createddt" || key === "updateddt") && !draft
            ? null
            : draft;
      await onUpdate(agentId, column, nextValue);
    } catch {
      setDraft(original);
    } finally {
      setSaving(false);
    }
  };

  if (key === "isreported") {
    return (
      <select
        className="ui-input min-w-36"
        aria-label={`Upravit ${column} agenta ${agentId}`}
        value={draft || "false"}
        disabled={saving}
        onChange={async (event) => {
          setDraft(event.target.value);
          setSaving(true);
          try {
            await onUpdate(agentId, column, event.target.value === "true");
          } catch {
            setDraft(original);
          } finally {
            setSaving(false);
          }
        }}
      >
        <option value="true">Ano</option>
        <option value="false">Ne</option>
      </select>
    );
  }

  return (
    <div className="relative min-w-48">
      <input
        className="ui-input min-w-48"
        type={key === "createddt" || key === "updateddt" ? "date" : "text"}
        aria-label={`Upravit ${column} agenta ${agentId}`}
        value={draft}
        disabled={saving}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={() => void save()}
        onKeyDown={(event) => {
          if (event.key === "Enter") event.currentTarget.blur();
          if (event.key === "Escape") {
            setDraft(original);
            event.currentTarget.blur();
          }
        }}
      />
      {saving && (
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
          …
        </span>
      )}
    </div>
  );
}
