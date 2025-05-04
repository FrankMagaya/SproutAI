import { useState } from "react";
import { Link, Outlet } from "@remix-run/react";
import {
  BellIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  CloudIcon,
  ChatBubbleLeftRightIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { name: "Crops", href: "/crops", icon: CloudIcon },
  { name: "Weather", href: "/weather", icon: CloudIcon },
  { name: "QnA Forum", href: "/forum", icon: ChatBubbleLeftRightIcon },
  { name: "Find an Expert", href: "/experts", icon: MagnifyingGlassCircleIcon },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:inset-auto md:shadow-none`}
      >
        <div className="h-full overflow-y-auto py-4">
          <div className="px-6 mb-6 text-2xl font-bold">FarmApp</div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={closeSidebar}
                className="flex items-center gap-3 px-6 py-2 text-gray-700 hover:bg-gray-100"
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Overlay on mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-20 bg-black opacity-30 md:hidden"
        ></div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between bg-white px-4 py-3 shadow-md md:px-6">
          <div className="flex items-center gap-4">
            {/* Hamburger */}
            <button
              className="text-gray-700 focus:outline-none md:hidden"
              onClick={toggleSidebar}
            >
              {sidebarOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
            {/* Logo */}
            <div className="text-xl font-semibold">FarmApp</div>
          </div>
          <div className="flex items-center gap-4">
            <BellIcon className="h-6 w-6 text-gray-700" />
            <UserCircleIcon className="h-8 w-8 text-gray-700" />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}