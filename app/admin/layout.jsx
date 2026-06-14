import { redirect } from "next/navigation";
import { getPayload } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }) {
  const payload = await getPayload();
  if (!payload || payload.role !== "admin") redirect("/dashboard");

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
