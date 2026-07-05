"use client";

import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { AgentAssignmentCell } from "./AgentAssignmentCell";
import { EditableAgentCell } from "./EditableAgentCell";
import type { DataSet, Row, SortState } from "./types";
import { formatColumnLabel, formatTableValue, normalizedKey } from "./utils";

function columnLayout(column: string) {
  const key = normalizedKey(column);
  if (key === "email") return { width: "w-72", singleLine: true };
  if (key === "name") return { width: "w-64", singleLine: true };
  if (key === "phone") return { width: "w-40", singleLine: true };
  if (key === "adress" || key === "address")
    return { width: "w-96", singleLine: true };
  return { width: "", singleLine: false };
}

export function DataTable({
  dataSet,
  columns,
  rows,
  sort,
  onSort,
  onAssignAgent,
  assignmentEmails = [],
  editableAgentColumns,
  onUpdateAgent,
}: {
  dataSet: DataSet;
  columns: string[];
  rows: Row[];
  sort: SortState | null;
  onSort: (column: string) => void;
  onAssignAgent?: (
    agentIds: string[],
    assignedTo: string | null,
  ) => Promise<void>;
  assignmentEmails?: string[];
  editableAgentColumns?: "all" | readonly string[];
  onUpdateAgent?: (
    agentId: string,
    column: string,
    value: unknown,
  ) => Promise<void>;
}) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkValue, setBulkValue] = useState("");
  const [bulkSaving, setBulkSaving] = useState(false);
  const pageAgentIds = useMemo(
    () =>
      dataSet === "agents"
        ? rows.map((row) => String(row.id ?? "")).filter(Boolean)
        : [],
    [dataSet, rows],
  );
  const selectedOnPage = pageAgentIds.filter((id) => selectedIds.has(id));
  const allPageSelected =
    pageAgentIds.length > 0 && selectedOnPage.length === pageAgentIds.length;

  useEffect(() => setSelectedIds(new Set()), [dataSet]);

  const toggleRow = (agentId: string, checked: boolean) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (checked) next.add(agentId);
      else next.delete(agentId);
      return next;
    });
  };

  return (
    <>
      {dataSet === "agents" && selectedIds.size > 0 && onAssignAgent && (
        <div className="mb-6 flex flex-wrap items-center gap-4 rounded-lg bg-foreground/[0.04] p-4">
          <p className="text-base font-medium text-foreground">
            Vybráno: {selectedIds.size}
          </p>
          <label className="sr-only" htmlFor="bulk-agent-assignment">
            Přiřadit vybrané agenty
          </label>
          <select
            id="bulk-agent-assignment"
            className="ui-input max-w-sm"
            value={bulkValue}
            disabled={bulkSaving}
            onChange={async (event) => {
              const nextValue = event.target.value;
              if (!nextValue) return;
              setBulkValue(nextValue);
              setBulkSaving(true);
              try {
                await onAssignAgent(
                  Array.from(selectedIds),
                  nextValue === "__unassign__" ? null : nextValue,
                );
                setSelectedIds(new Set());
              } finally {
                setBulkValue("");
                setBulkSaving(false);
              }
            }}
          >
            <option value="">
              {bulkSaving ? "Ukládám…" : "Přiřadit vybrané…"}
            </option>
            <option value="__unassign__">Zrušit přiřazení</option>
            {assignmentEmails.map((email) => (
              <option key={email} value={email}>
                {email}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="neo-table relative left-1/2 w-[calc(100vw-2rem)] -translate-x-1/2 sm:w-[calc(100vw-3rem)] lg:w-[calc(100vw-4rem)]">
        <table
          className={`w-full table-auto text-left text-sm text-muted-foreground ${dataSet === "agents" ? "min-w-[88rem]" : "min-w-[64rem]"}`}
        >
          <thead>
            <tr>
              {columns.map((column) => {
                const layout = columnLayout(column);
                const isExportColumn =
                  normalizedKey(column) === "exportovanodocdfp";
                return (
                  <th
                    key={column}
                    className={`whitespace-nowrap px-6 py-3 text-sm font-medium text-muted-foreground ${layout.width}`}
                    aria-sort={
                      sort?.dataSet === dataSet && sort.column === column
                        ? sort.direction
                        : "none"
                    }
                  >
                    <div className="flex items-center gap-3">
                      {dataSet === "agents" &&
                        onAssignAgent &&
                        column === columns[0] && (
                          <Checkbox
                            aria-label="Vybrat všechny agenty na této stránce"
                            checked={
                              allPageSelected
                                ? true
                                : selectedOnPage.length > 0
                                  ? "indeterminate"
                                  : false
                            }
                            className="size-5"
                            onCheckedChange={(checked) =>
                              setSelectedIds((current) => {
                                const next = new Set(current);
                                pageAgentIds.forEach((id) => {
                                  if (checked === true) next.add(id);
                                  else next.delete(id);
                                });
                                return next;
                              })
                            }
                          />
                        )}
                      <button
                        type="button"
                        title={
                          isExportColumn ? "Exportováno do CDFP" : undefined
                        }
                        aria-label={
                          isExportColumn ? "Exportováno do CDFP" : undefined
                        }
                        className="inline-flex min-h-8 items-center gap-2 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        onClick={() => onSort(column)}
                      >
                        {formatColumnLabel(column)}
                        {sort?.dataSet === dataSet &&
                          sort.column === column &&
                          (sort.direction === "ascending" ? (
                            <ArrowUpIcon className="size-3.5" />
                          ) : (
                            <ArrowDownIcon className="size-3.5" />
                          ))}
                      </button>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={String(row.id ?? index)}
                className="odd:bg-background even:bg-foreground/[0.04]"
              >
                {columns.map((column, columnIndex) => {
                  const Cell = columnIndex === 0 ? "th" : "td";
                  const isAssignmentColumn =
                    dataSet === "agents" &&
                    normalizedKey(column) === "assignedto";
                  const agentId = String(row.id ?? "");
                  const normalizedColumn = normalizedKey(column);
                  const isEditable =
                    dataSet === "agents" &&
                    agentId &&
                    onUpdateAgent &&
                    normalizedColumn !== "id" &&
                    (editableAgentColumns === "all" ||
                      editableAgentColumns?.includes(normalizedColumn));
                  return (
                    <Cell
                      key={column}
                      scope={columnIndex === 0 ? "row" : undefined}
                      className={`whitespace-nowrap px-6 py-4 align-top leading-6 ${columnIndex === 0 ? "font-medium text-foreground" : "font-normal"}`}
                    >
                      {dataSet === "agents" &&
                        onAssignAgent &&
                        columnIndex === 0 &&
                        agentId && (
                          <Checkbox
                            aria-label={`Vybrat agenta ${agentId}`}
                            checked={selectedIds.has(agentId)}
                            className="mr-3 inline-flex size-5 align-middle"
                            onCheckedChange={(checked) =>
                              toggleRow(agentId, checked === true)
                            }
                          />
                        )}
                      {isAssignmentColumn && onAssignAgent && agentId ? (
                        <AgentAssignmentCell
                          agentId={agentId}
                          assignedTo={
                            row[column] == null ? "" : String(row[column])
                          }
                          emailOptions={assignmentEmails}
                          onAssign={onAssignAgent}
                        />
                      ) : isEditable ? (
                        <EditableAgentCell
                          agentId={agentId}
                          column={column}
                          value={row[column]}
                          onUpdate={onUpdateAgent}
                        />
                      ) : row[column] == null ? (
                        <span className="text-muted-foreground">—</span>
                      ) : (
                        formatTableValue(column, row[column])
                      )}
                    </Cell>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
