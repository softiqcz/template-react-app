"use client";

import { ArrowPathIcon, CircleStackIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { AdminHeader, DashboardIntro } from "@/components/admin/AdminHeader";
import { DataTable } from "@/components/admin/DataTable";
import { TablePagination } from "@/components/admin/TablePagination";
import {
  AGENT_COLUMNS,
  ROWS_PER_PAGE,
  type Row,
  type SortState,
  USER_EDITABLE_AGENT_COLUMNS,
} from "@/components/admin/types";
import {
  agentUpdateField,
  collator,
  formatValue,
  normalizedKey,
} from "@/components/admin/utils";
import { API_BASE_URL, API_ENDPOINTS } from "@/constants/api";
import { useSession } from "@/context/SessionContext";

export function UserDashboard({
  session,
}: {
  session: { email: string; token: string };
}) {
  const { logout } = useSession();
  const [agents, setAgents] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastFetchedAt, setLastFetchedAt] = useState<Date | null>(null);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortState>({
    dataSet: "agents",
    column: "created_dt",
    direction: "descending",
  });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.USER_ASSIGNED_AGENTS_GET}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.token}`,
          },
          body: JSON.stringify({
            email: session.email,
            token: session.token,
          }),
        },
      );
      const payload = await response.json().catch(() => null);
      if (!response.ok || !Array.isArray(payload?.data)) {
        throw new Error(
          typeof payload?.message === "string"
            ? payload.message
            : "Agenty se nepodařilo načíst.",
        );
      }
      setAgents(payload.data);
      setPage(1);
      setLastFetchedAt(new Date());
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Agenty se nepodařilo načíst.",
      );
    } finally {
      setLoading(false);
    }
  }, [session.email, session.token]);

  useEffect(() => void load(), [load]);

  const columns = useMemo(
    () => [
      ...AGENT_COLUMNS,
      ...Array.from(new Set(agents.flatMap(Object.keys))).filter(
        (column) =>
          !AGENT_COLUMNS.some(
            (known) => normalizedKey(known) === normalizedKey(column),
          ),
      ),
    ],
    [agents],
  );
  const sortedAgents = useMemo(() => {
    return [...agents].sort((a, b) => {
      const sortKey = normalizedKey(sort.column);
      const isDateColumn = sortKey === "createddt" || sortKey === "updateddt";
      const leftValue = formatValue(a[sort.column]);
      const rightValue = formatValue(b[sort.column]);
      const primary = collator.compare(
        isDateColumn ? leftValue.slice(0, 10) : leftValue,
        isDateColumn ? rightValue.slice(0, 10) : rightValue,
      );
      const result =
        primary === 0 && isDateColumn
          ? collator.compare(formatValue(a.id), formatValue(b.id))
          : primary;
      return sort.direction === "ascending" ? result : -result;
    });
  }, [agents, sort]);
  const pageCount = Math.max(1, Math.ceil(sortedAgents.length / ROWS_PER_PAGE));
  const currentPage = Math.min(page, pageCount);
  const rows = sortedAgents.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE,
  );

  const updateAgent = async (
    agentId: string,
    column: string,
    value: unknown,
  ) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.USER_AGENT_UPDATE}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.token}`,
          },
          body: JSON.stringify({
            email: session.email,
            token: session.token,
            agentId,
            [agentUpdateField(column)]: value,
          }),
        },
      );
      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(
          typeof payload?.message === "string"
            ? payload.message
            : "Změnu se nepodařilo uložit.",
        );
      }
      setAgents((current) =>
        current.map((agent) =>
          String(agent.id) === agentId ? { ...agent, [column]: value } : agent,
        ),
      );
      toast.success("Agent byl upraven.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Změnu se nepodařilo uložit.",
      );
      throw error;
    }
  };

  return (
    <main id="main-content" className="min-h-dvh bg-background pb-24">
      <AdminHeader email={session.email} onLogout={() => void logout()} />
      <div className="mx-auto max-w-[96rem] px-6 py-8 lg:px-12">
        <DashboardIntro
          lastFetchedAt={lastFetchedAt}
          loading={loading}
          onReload={() => void load()}
          description="Agenti, kteří jsou přiřazeni vašemu účtu."
        />
        <section className="mt-8" aria-live="polite">
          {loading ? (
            <div className="flex min-h-64 items-center justify-center text-muted-foreground">
              <ArrowPathIcon className="mr-3 size-6 animate-spin" />
              Načítám agenty…
            </div>
          ) : agents.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center text-muted-foreground">
              <CircleStackIcon className="mb-4 size-10" />
              <p>Nemáte přiřazené žádné agenty.</p>
            </div>
          ) : (
            <>
              <DataTable
                dataSet="agents"
                columns={columns}
                rows={rows}
                sort={sort}
                editableAgentColumns={USER_EDITABLE_AGENT_COLUMNS}
                onUpdateAgent={updateAgent}
                onSort={(column) => {
                  setSort((current) => ({
                    dataSet: "agents",
                    column,
                    direction:
                      current.column === column &&
                      current.direction === "ascending"
                        ? "descending"
                        : "ascending",
                  }));
                  setPage(1);
                }}
              />
              <TablePagination
                label="Agenti"
                currentPage={currentPage}
                pageCount={pageCount}
                totalRows={sortedAgents.length}
                onPageChange={(nextPage) =>
                  setPage(Math.min(Math.max(nextPage, 1), pageCount))
                }
              />
            </>
          )}
        </section>
      </div>
    </main>
  );
}
