import { AdminDashboard } from "@/components/AdminDashboard";
import { LoginView } from "@/components/LoginView";
import { UserDashboard } from "@/components/UserDashboard";
import { getVerifiedSession } from "@/utils/serverAuth";

export default async function Home() {
  const session = await getVerifiedSession();
  if (!session) return <LoginView />;
  if (session.role === "ADMIN") return <AdminDashboard session={session} />;
  return <UserDashboard session={session} />;
}
