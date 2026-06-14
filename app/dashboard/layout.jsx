import { redirect } from "next/navigation";
import { getPayload } from "@/lib/auth";
import DashboardSidebar from "@/components/DashboardSidebar";

export default async function DashboardLayout({ children }) {
  const payload = await getPayload();
  if (!payload) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <DashboardSidebar role={payload.role} />
      {children}
    </div>
  );
}
