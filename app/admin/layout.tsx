import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          <Link href="/admin" className="block hover:text-green-400">Dashboard</Link>
          <Link href="/admin/hero" className="block hover:text-green-400">Hero Section</Link>
          <Link href="/admin/herolist" className="block hover:text-green-400">Hero List</Link> {/* New Link to Hero List */}
          {/* Add more links as needed */}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-8">{children}</main>
    </div>
  );
}
