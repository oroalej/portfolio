"use client";

import { BreadcrumbList } from "@/app/admin/_components/Breadcrumbs";
import { MdLogout, MdNotifications } from "react-icons/md";
import { useAuth } from "@/context/SupabaseContext";

const Header = () => {
  const { onLogout } = useAuth();

  return (
    <div className="flex items-center justify-between h-16">
      <BreadcrumbList />

      <div className="flex gap-0.5 items-center">
        <div className="flex gap-2.5 items-center cursor-pointer hover:bg-neutral-100 px-3 py-1.5 rounded-md h-10">
          <div className="w-7 rounded-md aspect-square bg-neutral-800" />
          <div className="text-sm font-medium text-neutral-700">
            Alexander Oro
          </div>
        </div>

        <div className="hover:bg-neutral-100 px-3 py-1.5 rounded-md cursor-pointer h-10 flex items-center">
          <MdNotifications className="text-lg text-neutral-800" />
        </div>

        <button
          className="hover:bg-neutral-100 px-3 py-1.5 rounded-md cursor-pointer h-10 flex items-center"
          data-tooltip-id="admin-tooltip"
          data-tooltip-content="Logout"
          onClick={onLogout}
        >
          <MdLogout className="text-lg text-neutral-800" />
        </button>
      </div>
    </div>
  );
};

export default Header;
