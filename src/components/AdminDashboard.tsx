"use client";

import { ArrowPathIcon, CircleStackIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { AdminHeader, DashboardIntro } from "@/components/admin/AdminHeader";
import { DataTable } from "@/components/admin/DataTable";
import { DashboardTabs } from "@/components/admin/DashboardTabs";
import { StatisticsView } from "@/components/admin/StatisticsView";
import { TablePagination } from "@/components/admin/TablePagination";
import { UserManagement } from "@/components/admin/UserManagement";
import {
  unwrapUsers,
  userRequest,
} from "@/components/admin/userManagementUtils";
import {
  AGENT_COLUMNS,
  labels,
  ROWS_PER_PAGE,
  type AdminData,
  type DataSet,
  type SortState,
  type View,
} from "@/components/admin/types";
import {
  agentUpdateField,
  buildOriginStats,
  collator,
  formatValue,
  normalizedKey,
} from "@/components/admin/utils";
import { API_BASE_URL, API_ENDPOINTS } from "@/constants/api";
import { useSession } from "@/context/SessionContext";

export function AdminDashboard({
  session,
}: {
  session: { email: string; token: string };
}) {
  const { logout } = useSession();
  const [data, setData] = useState<AdminData>({ agents: [], subjects: [] });
  const [active, setActive] = useState<View>("agents");
  const [sort, setSort] = useState<SortState | null>({
    dataSet: "agents",
    column: "created_dt",
    direction: "descending",
  });
  const [pages, setPages] = useState<Record<DataSet, number>>({
    agents: 1,
    subjects: 1,
  });
  const [loading, setLoading] = useState(true);
  const [sessionVerified, setSessionVerified] = useState(false);
  const [lastFetchedAt, setLastFetchedAt] = useState<Date | null>(null);
  const [syncingCharacter, setSyncingCharacter] = useState<string | null>(null);
  const [assignmentEmails, setAssignmentEmails] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;

    const verifySession = async () => {
      setSessionVerified(false);
      try {
        const response = await fetch(
          `${API_BASE_URL}${API_ENDPOINTS.AUTH_VERIFY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: session.email,
              token: session.token,
            }),
          },
        );
        const payload = await response.json().catch(() => null);
        if (!response.ok || typeof payload?.data?.token !== "string") {
          throw new Error();
        }
        if (!cancelled) setSessionVerified(true);
      } catch {
        if (!cancelled) {
          toast.error("Platnost přihlášení vypršela.");
          await logout();
        }
      }
    };

    void verifySession();
    return () => {
      cancelled = true;
    };
  }, [logout, session.email, session.token]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.ADMIN_ALL_DATA}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.token}`,
          },
          body: JSON.stringify({ email: session.email, token: session.token }),
        },
      );
      const payload = await response.json();
      if (!response.ok || !payload.data) throw new Error();
      setData(payload.data);
      setLastFetchedAt(new Date());

      const knownEmails = new Set<string>();
      for (const agent of payload.data.agents ?? []) {
        const key = Object.keys(agent).find(
          (column) => normalizedKey(column) === "assignedto",
        );
        const value = key ? agent[key] : null;
        if (typeof value === "string" && value.trim()) {
          knownEmails.add(value.trim());
        }
      }
      try {
        const users = unwrapUsers(
          await userRequest(
            `${API_BASE_URL}${API_ENDPOINTS.ADMIN_USERS_GET}`,
            session.email,
            session.token,
          ),
        );
        users.forEach((user) => knownEmails.add(user.email));
      } catch {
        // Existing assignments remain available if user suggestions cannot load.
      }
      setAssignmentEmails(Array.from(knownEmails).sort(collator.compare));

      try {
        const utilsResponse = await fetch(
          `${API_BASE_URL}${API_ENDPOINTS.ADMIN_UTILS}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.token}`,
              "X-Auth-Email": session.email,
              "X-Auth-Token": session.token,
            },
            body: JSON.stringify({
              email: session.email,
              token: session.token,
            }),
          },
        );
        if (!utilsResponse.ok) throw new Error();
        const utilsPayload = await utilsResponse.json();
        setSyncingCharacter(
          typeof utilsPayload.data === "string" ? utilsPayload.data : null,
        );
      } catch {
        setSyncingCharacter(null);
      }
    } catch {
      toast.error("Data se nepodařilo načíst.");
    } finally {
      setLoading(false);
    }
  }, [session.email, session.token]);
  useEffect(() => {
    if (sessionVerified) void load();
  }, [load, sessionVerified]);

  const dataSet: DataSet =
    active === "agents" || active === "subjects" ? active : "subjects";
  const sourceRows = useMemo(() => data[dataSet] ?? [], [data, dataSet]);
  const originStats = useMemo(() => buildOriginStats(data), [data]);
  const latestDate = useMemo(
    () =>
      originStats.reduce<Date | null>(
        (latest, stat) =>
          stat.lastScrapedAt && (!latest || stat.lastScrapedAt > latest)
            ? stat.lastScrapedAt
            : latest,
        null,
      ),
    [originStats],
  );
  const columns = useMemo(() => {
    const available = Array.from(
      new Set(sourceRows.flatMap(Object.keys)),
    ).filter(
      (column) => active === "agents" || normalizedKey(column) !== "isreported",
    );
    if (active === "agents") {
      return [
        ...AGENT_COLUMNS,
        ...available.filter(
          (column) =>
            !AGENT_COLUMNS.some(
              (known) => normalizedKey(known) === normalizedKey(column),
            ),
        ),
      ];
    }
    return available;
  }, [active, sourceRows]);
  const sortedRows = useMemo(() => {
    if (
      active === "statistics" ||
      active === "management" ||
      !sort ||
      sort.dataSet !== active
    )
      return sourceRows;
    return [...sourceRows].sort((a, b) => {
      const sortKey = normalizedKey(sort.column);
      const isDateColumn = sortKey === "createddt" || sortKey === "updateddt";
      const leftValue = formatValue(a[sort.column]);
      const rightValue = formatValue(b[sort.column]);
      const primaryResult = collator.compare(
        isDateColumn ? leftValue.slice(0, 10) : leftValue,
        isDateColumn ? rightValue.slice(0, 10) : rightValue,
      );
      const result =
        primaryResult === 0 && isDateColumn
          ? collator.compare(formatValue(a.id), formatValue(b.id))
          : primaryResult;
      return sort.direction === "ascending" ? result : -result;
    });
  }, [active, sort, sourceRows]);
  const pageCount = Math.max(1, Math.ceil(sortedRows.length / ROWS_PER_PAGE));
  const currentPage = Math.min(pages[dataSet], pageCount);
  const rows = sortedRows.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE,
  );
  const goToPage = (page: number) =>
    active !== "statistics" &&
    active !== "management" &&
    setPages((current) => ({
      ...current,
      [active]: Math.min(Math.max(page, 1), pageCount),
    }));
  const updateSort = (column: string) => {
    if (active === "statistics" || active === "management") return;
    setSort((current) => ({
      dataSet: active,
      column,
      direction:
        current?.dataSet === active &&
        current.column === column &&
        current.direction === "ascending"
          ? "descending"
          : "ascending",
    }));
    setPages((current) => ({ ...current, [active]: 1 }));
  };
  const assignAgents = async (
    agentIds: string[],
    assignedTo: string | null,
  ) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.ADMIN_AGENT_ASSIGNMENT_BULK}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.token}`,
          },
          body: JSON.stringify({
            email: session.email,
            token: session.token,
            agentIds,
            assignedTo,
          }),
        },
      );
      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(
          typeof payload?.message === "string"
            ? payload.message
            : "Přiřazení se nepodařilo uložit.",
        );
      }
      setData((current) => ({
        ...current,
        agents: current.agents.map((row) => {
          if (!agentIds.includes(String(row.id))) return row;
          const assignmentKey =
            Object.keys(row).find(
              (key) => normalizedKey(key) === "assignedto",
            ) ?? "assigned_to";
          return { ...row, [assignmentKey]: assignedTo };
        }),
      }));
      toast.success(
        assignedTo
          ? agentIds.length === 1
            ? "Agent byl přiřazen."
            : `Přiřazeno agentů: ${agentIds.length}.`
          : agentIds.length === 1
            ? "Přiřazení agenta bylo zrušeno."
            : `Přiřazení zrušeno u agentů: ${agentIds.length}.`,
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Přiřazení se nepodařilo uložit.";
      toast.error(message);
      throw error;
    }
  };

  const updateAgent = async (
    agentId: string,
    column: string,
    value: unknown,
  ) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.ADMIN_AGENT_UPDATE}`,
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
      setData((current) => ({
        ...current,
        agents: current.agents.map((row) =>
          String(row.id) === agentId ? { ...row, [column]: value } : row,
        ),
      }));
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
        />
        <DashboardTabs
          active={active}
          data={data}
          originCount={originStats.length}
          onChange={setActive}
        />
        <section className="mt-8" aria-live="polite">
          {active === "management" ? (
            <UserManagement email={session.email} token={session.token} />
          ) : loading ? (
            <div className="flex min-h-64 items-center justify-center text-muted-foreground">
              <ArrowPathIcon className="mr-3 size-6 animate-spin" />
              Načítám data…
            </div>
          ) : active === "statistics" ? (
            <StatisticsView
              stats={originStats}
              latestDate={latestDate}
              syncingCharacter={syncingCharacter}
            />
          ) : sourceRows.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center text-muted-foreground">
              <CircleStackIcon className="mb-4 size-10" />
              <p>Datová sada je prázdná.</p>
            </div>
          ) : (
            <>
              <DataTable
                dataSet={active}
                columns={columns}
                rows={rows}
                sort={sort}
                onSort={updateSort}
                onAssignAgent={assignAgents}
                assignmentEmails={assignmentEmails}
                editableAgentColumns="all"
                onUpdateAgent={updateAgent}
              />
              <TablePagination
                label={labels[active]}
                currentPage={currentPage}
                pageCount={pageCount}
                totalRows={sortedRows.length}
                onPageChange={goToPage}
              />
            </>
          )}
        </section>
      </div>
    </main>
  );
}
