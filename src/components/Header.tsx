import type { FC } from "react";
import { Search, Bell } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  BreadcrumbEllipsis,
} from "./ui/breadcrumb";

import logo from "../assets/Panel.svg";          // logo (left)
import avatar from "../assets/avatar.svg"      // user avatar 40×40

type HeaderProps = Record<string, never>;

const Header: FC<HeaderProps> = () => {
  const unread = 3;              // <- change to dynamic count later
  const userName = "John Doe";

  return (
    <header className=" w-full flex items-center justify-between bg-white px-4 py-2 border-b">
      {/* ───── Left: logo + breadcrumb ───── */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-6 w-6" />

        <Breadcrumb>
          <BreadcrumbList className="flex items-center gap-1 text-sm">
            <BreadcrumbItem>
              <BreadcrumbLink href="#" className="font-semibold text-gray-400">
                Workspace
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#" className="font-semibold text-gray-400">
                Folder 2
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="flex items-center gap-1">
              <BreadcrumbPage className="font-semibold text-gray-800">
                Spreadsheet 3
              </BreadcrumbPage>
              <BreadcrumbEllipsis className="text-gray-300 size-5" />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* ───── Right: search | bell | avatar+name ───── */}
      <div className="flex items-center gap-4">
        {/* Search box */}
        <label className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="search"
            placeholder="Search within sheet"
            className="pl-8 pr-3 py-1.5 w-52 rounded-md border text-sm placeholder:text-gray-500
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        {/* Notification bell */}
        <div className="relative cursor-pointer">
          <Bell className="h-6 w-6 text-gray-600" />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 bg-green-900 text-white text-xs
                             rounded-full h-4 w-4 flex items-center justify-center">
              {unread}
            </span>
          )}
        </div>

        {/* Avatar + name */}
        <div className="flex items-center gap-2">
          <img
            src={avatar}
            alt="User avatar"
            className="h-8 w-8 rounded-full object-cover"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium text-gray-700">{userName}</span>
            <span className="text-xs text-gray-400">UX Designer</span>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
