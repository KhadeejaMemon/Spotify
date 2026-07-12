import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Music2,
  Disc3,
  Mic2,
  Users,
} from "lucide-react";

const AdminSidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      isActive
        ? "bg-green-600 text-white"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <div className="w-64 bg-[#121212] border-r border-gray-800 p-5">
      <h1 className="text-2xl font-bold text-green-500 mb-8">
        Spotify Admin
      </h1>

      <nav className="space-y-2">
        <NavLink to="/admin" end className={linkClass}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink to="/admin/songs" className={linkClass}>
          <Music2 size={20} />
          Songs
        </NavLink>

        <NavLink to="/admin/albums" className={linkClass}>
          <Disc3 size={20} />
          Albums
        </NavLink>

        <NavLink to="/admin/artists" className={linkClass}>
          <Mic2 size={20} />
          Artists
        </NavLink>

        <NavLink to="/admin/users" className={linkClass}>
          <Users size={20} />
          Users
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;